/**
 * 同步文章仓库到 src/content/
 *
 * 通过环境变量 CONTENT_REPO_URL 指定文章仓库地址，
 * 在每次构建前浅克隆最新内容到 src/content/ 目录。
 *
 * Usage: npx tsx scripts/sync-content.ts
 *
 * Environment variables:
 *   CONTENT_REPO_URL    - Git clone URL (required)
 *   CONTENT_REPO_BRANCH - 分支名 (default: "main")
 */

import { execSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const ROOT_DIR = join(import.meta.dirname, "..");
const TARGET_DIR = join(ROOT_DIR, "src", "content");

const REPO_URL = process.env.CONTENT_REPO_URL;
const BRANCH = process.env.CONTENT_REPO_BRANCH || "main";
const DEPTH = "1";

if (!REPO_URL) {
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
		`git clone --depth ${DEPTH} --branch ${BRANCH} --single-branch "${REPO_URL}" "${TARGET_DIR}"`,
		{ stdio: "inherit", cwd: ROOT_DIR },
	);
	console.log("Content synced successfully.");
} catch (error) {
	console.error("Failed to clone content repository:", error);
	process.exit(1);
}
