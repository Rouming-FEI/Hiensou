import type { GalleryConfig } from "@/types/galleryConfig";

// 相册全局配置
// 相册列表由 scanAlbums() 自动扫描 public/gallery/*/album.md 生成
export const galleryConfig: GalleryConfig = {
	// 瀑布流最小列宽(px)，浏览器根据容器宽度自动计算列数，默认 240
	columnWidth: 240,
};
