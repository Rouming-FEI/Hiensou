/**
 * 同步文章仓库到 src/content/
 *
 * 通过环境变量 CONTENT_REPO_URL 指定文章仓库地址，
 * 在每次构建前浅克隆最新内容到 src/content/ 目录。
 *
 * 如果 CONTENT_REPO_URL 未设置但 src/content/ 已有内容，
 * 则跳过同步，允许本地开发时手动管理内容。
 *
 * Usage: npx tsx scripts/sync-content.ts
 *
 * Environment variables:
 *   CONTENT_REPO_URL    - Git clone URL (required for CI; optional for local dev)
 *   CONTENT_REPO_BRANCH - 分支名 (default: "main")
 */

import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const ROOT_DIR = join(import.meta.dirname, "..");
const TARGET_DIR = join(ROOT_DIR, "src", "content");

const REPO_URL = process.env.CONTENT_REPO_URL;
const BRANCH = process.env.CONTENT_REPO_BRANCH || "main";

if (!REPO_URL) {
	// 未设置 REPO_URL 时，若本地已有内容则跳过同步
	if (existsSync(TARGET_DIR) && existsSync(join(TARGET_DIR, "posts"))) {
		console.warn(
			"WARNING: CONTENT_REPO_URL not set, using existing local content.",
		);
		console.warn(
			"To auto-update content, set CONTENT_REPO_URL env var.",
		);
		process.exit(0);
	}
	console.error("ERROR: CONTENT_REPO_URL environment variable is not set.");
	console.error(
		"Set it to the Git URL of your content repository.",
	);
	console.error(
		"Example: CONTENT_REPO_URL=https://github.com/user/hiensou-content",
	);
	process.exit(1);
}

// 清理旧的 content 目录，确保干净状态
if (existsSync(TARGET_DIR)) {
	console.log(`Removing existing ${TARGET_DIR}...`);
	rmSync(TARGET_DIR, { recursive: true, force: true });
}

console.log(
	`Cloning content from ${REPO_URL} (branch: ${BRANCH})...`,
);

try {
	execSync(
		`git clone --depth 1 --branch ${BRANCH} --single-branch "${REPO_URL}" "${TARGET_DIR}"`,
		{ stdio: "inherit", cwd: ROOT_DIR },
	);
	console.log("Content synced successfully.");
} catch (error) {
	console.error("Failed to clone content repository:", error);
	process.exit(1);
}

// 确保 content 集合所需的子目录存在（外部仓库可能不包含某些集合）
const requiredDirs = ["posts", "spec", "essays"];
for (const dir of requiredDirs) {
	const dirPath = join(TARGET_DIR, dir);
	if (!existsSync(dirPath)) {
		console.log(`Creating required content dir: ${dirPath}`);
		mkdirSync(dirPath, { recursive: true });
	}
}

// Remove non-content files that would cause build issues
const cleanDirs = ["manager", ".github", "docs", ".superpowers", ".git"];
const cleanFiles = ["package.json", "pnpm-lock.yaml", "README.md", "start-manager.bat", ".gitignore", "SETUP.md"];
for (const dir of cleanDirs) {
	const p = join(TARGET_DIR, dir);
	if (existsSync(p)) { rmSync(p, { recursive: true, force: true }); }
}
for (const file of cleanFiles) {
	const p = join(TARGET_DIR, file);
	if (existsSync(p)) { rmSync(p, { force: true }); }
}

// Sync gallery to public/gallery/ for static serving
const gallerySrc = join(TARGET_DIR, "gallery");
const galleryDest = join(ROOT_DIR, "public", "gallery");
if (existsSync(gallerySrc)) {
	console.log("Syncing gallery to public/gallery/...");
	if (existsSync(galleryDest)) rmSync(galleryDest, { recursive: true, force: true });
	cpSync(gallerySrc, galleryDest, { recursive: true });
	console.log("Gallery synced successfully.");
}
