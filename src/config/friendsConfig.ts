import type { FriendLink, FriendsPageConfig } from "../types/friendsConfig";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 是否显示底部自定义内容（friends.mdx 中的内容）
	showCustomContent: false,

	// 是否显示评论区，需要先在commentConfig.ts启用评论系统
	showComment: false,

	// 是否开启随机排序配置，如果开启，就会忽略权重，构建时进行一次随机排序
	randomizeSort: false,
};

// 友链配置
export const friendsConfig: FriendLink[] = [
	// {
	// 	title: "废江流",
	// 	imgurl:
	// 		"https://blog.rouming-fei.top/assets/images/avatar/avatar.jpg",
	// 	desc: "废江流的博客",
	// 	siteurl: "https://blog.example.com",
	// 	tags: ["Blog"],
	// 	weight: 10, // 权重，数字越大排序越靠前
	// 	enabled: true, // 是否启用
	// },
	// {
	// 	title: "Hiensou Docs",
	// 	imgurl: "https://docs.example.com/logo.png",
	// 	desc: "Hiensou主题模板文档",
	// 	siteurl: "https://docs.example.com",
	// 	tags: ["Docs"],
	// 	weight: 9,
	// 	enabled: true,
	// },
	// {
	// 	title: "Astro",
	// 	imgurl: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640",
	// 	desc: "The web framework for content-driven websites. ⭐️ Star to support our work!",
	// 	siteurl: "https://github.com/withastro/astro",
	// 	tags: ["Framework"],
	// 	weight: 8,
	// 	enabled: true,
	// },

	{
	title: "SeanDictionary",
	imgurl:
		"",
	desc: "安全爷就是爷",
	siteurl: "https://seandictionary.top",
	tags: ["Blog"],
	weight: 10, 
	enabled: true, 
	},

	{
	title: "y11han",
	imgurl:
		"https://q.qlogo.cn/g?b=qq&nk=2172029629&s=640",
	desc: "",
	siteurl: "https://blog.y11han.icu",
	tags: ["Blog"],
	weight: 10, 
	enabled: true, 
	},

	{
	title: "cube",
	imgurl:
		"https://cube1345.github.io/img/lilisi1.jpg",
	desc: "软硬全栈大神",
	siteurl: "https://cube1345.github.io",
	tags: ["Blog"],
	weight: 10, 
	enabled: true, 
	},

	{
	title: "emmm",
	imgurl:
		"https://avatars.githubusercontent.com/u/86453687?v=4",
	desc: "",
	siteurl: "https://blog.zzemy.top",
	tags: ["Blog"],
	weight: 10, 
	enabled: true, 
	},

	{
	title: "s3loy",
	imgurl:
		"https://blog.s3loy.top/images/1.jpg",
	desc: "arc大手子",
	siteurl: "https://blog.s3loy.top",
	tags: ["Blog"],
	weight: 10, 
	enabled: true, 
	},

	{
	title: "io-wy",
	imgurl:
		"https://io-wy.github.io//avatar.jpg",
	desc: "大神",
	siteurl: "https://io-wy.github.io",
	tags: ["Blog"],
	weight: 10, 
	enabled: true, 
	},

	{
	title: "Ptilopsis",
	imgurl:
		"https://blog.ptilopsis.cn/images/avatar.png",
	desc: "虫需云力白勺虫且",
	siteurl: "https://blog.ptilopsis.cn",
	tags: ["Blog"],
	weight: 10, 
	enabled: true, 
	},

	{
	title: "PureStream",
	imgurl:
		"https://marblue.pink/img/purestream.jpg",
	desc: "",
	siteurl: "https://marblue.pink",
	tags: ["Blog"],
	weight: 10, 
	enabled: true, 
	},

	{
	title: "Symb0x76",
	imgurl:
		"https://blog.symb0x76.top/img/avatar.webp",
	desc: "wmc？！",
	siteurl: "https://blog.symb0x76.top",
	tags: ["Blog"],
	weight: 10, 
	enabled: true, 
	},

	{
	title: "朔尘",
	imgurl:
		"https://syzigrain.com/assets/images/avatar/avatar.jpg",
	desc: "摄影大触！",
	siteurl: "https://syzigrain.com/",
	tags: ["Blog"],
	weight: 10, 
	enabled: true, 
	}
];

// 获取启用的友链并进行排序
export const getEnabledFriends = (): FriendLink[] => {
	const friends = friendsConfig.filter((friend) => friend.enabled);

	if (friendsPageConfig.randomizeSort) {
		return friends.sort(() => Math.random() - 0.5);
	}

	return friends.sort((a, b) => b.weight - a.weight);
};
