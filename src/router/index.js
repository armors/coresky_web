import { createRouter, createWebHistory } from 'vue-router';
const routes = [
	{
		path: '/',
		name: 'home',
		component: () =>
			import(/* webpackChunkName: "home" */ '../views/sections/HIndex'),
	},
	{
		path: '/orderMock',
		name: 'orderMock',
		component: () =>
			import(
				/* webpackChunkName: "orderMock" */ '../views/sections/orderMock/index'
			),
	},
	{
		path: '/reservoir',
		name: 'reservoir',
		component: () =>
			import(
				/* webpackChunkName: "reservoir" */ '../views/sections/orderMock/reservoir'
			),
	},
	{
		path: '/items',
		component: () =>
			import(/* webpackChunkName: "Items" */ '../views/sections/Items'),
		name: 'items',
		meta: {
			auth: true,
		},
	},
	{
		path: '/erc721',
		name: 'erc721',
		component: () =>
			import(/* webpackChunkName: "erc721" */ '../views/sections/ERC721'),
		meta: {
			auth: true,
		},
	},
	{
		path: '/profile',
		name: 'profile',
		component: () =>
			import(
				/* webpackChunkName: "profile" */ '../views/sections/Profile'
			),
		meta: {
			auth: true,
		},
	},
	{
		path: '/account/:address',
		name: 'account',
		component: () =>
			import(
				/* webpackChunkName: "account" */ '../views/sections/Account'
			),
	},
	{
		path: '/listings/:contract/:tokenId',
		name: 'listings',
		component: () =>
			import(
				/* webpackChunkName: "listings" */ '../views/sections/listings'
			),
	},
	{
		path: '/search',
		name: 'Search',
		component: () =>
			import(/* webpackChunkName: "search" */ '../views/sections/Search'),
	},
	{
		path: '/allcollection',
		name: 'allcollection',
		component: () =>
			import(
				/* webpackChunkName: "allcollection" */ '../views/sections/AllCollection'
			),
	},
	{
		path: '/markterplace',
		name: 'markterplace',
		component: () =>
			import(
				/* webpackChunkName: "markterplace" */ '../views/sections/Markterplace'
			),
	},
	{
		path: '/collection/:contract',
		name: 'collection',
		component: () =>
			import(
				/* webpackChunkName: "collection" */ '../views/sections/Collection'
			),
	},
	{
		path: '/collectionnew/:contract',
		name: 'collectionnew',
		component: () =>
			import(
				/* webpackChunkName: "collectionnew" */ '../views/sections/CollectionNew'
			),
		meta: {
			layout: 'fullscreen',
		},
	},
	{
		path: '/detail/:contract/:tokenId',
		name: 'detail',
		component: () =>
			import(
				/* webpackChunkName: "detail" */ '../views/sections/NFTDetail'
			),
	},
	{
		path: '/launchpads',
		name: 'launchpads',
		component: () =>
			import(
				/* webpackChunkName: "launchpads" */ '../views/sections/launchpads'
			),
	},
	{
		path: '/launchpad/:item',
		name: 'launchpadItem',
		component: () =>
			import(
				/* webpackChunkName: "launchpadItem" */ '../views/sections/launchpadItem'
			),
	},
	{
		path: '/message',
		name: 'message',
		component: () =>
			import(
				/* webpackChunkName: "message" */ '../views/sections/Message'
			),
		meta: {
			auth: true,
		},
	},
	{
		path: '/404',
		name: '404',
		component: () =>
			import(/* webpackChunkName: "404" */ '../views/sections/NoFound'),
	},
	{
		path: '/connect',
		name: 'connect',
		component: () =>
			import(
				/* webpackChunkName: "connect" */ '../views/sections/Connect'
			),
	},
	{
		path: '/reward',
		name: 'reward',
		component: () =>
			import(/* webpackChunkName: "reward" */ '../views/sections/reward'),
	},
	{
		path: '/corecard',
		name: 'coreCard',
		component: () =>
			import(
				/* webpackChunkName: "reward" */ '../views/sections/corecard/coreCard'
			),
	},
	{
		path: '/coreCardBind',
		name: 'coreCardBind',
		component: () =>
			import(
				/* webpackChunkName: "coreCardBind" */ '../views/sections/coreCardBind'
			),
	},
	{
		path: '/coreCardMint',
		name: 'coreCardMint',
		component: () =>
			import(
				/* webpackChunkName: "coreCardMint" */ '../views/sections/coreCardMint'
			),
	},
	{
		path: '/launch',
		name: 'launch',
		component: () =>
			import(/* webpackChunkName: "launch" */ '../views/sections/launch'),
	},
	{
		path: '/referral/:code',
		name: 'referral',
		component: () =>
			import(/* webpackChunkName: "referral" */ '../views/sections/referral'),
	},
	{
		path: '/:pathMatch(.*)',
		name: 'NoFound',
		redirect: '/404',
	},
];

const router = createRouter({
	scrollBehavior(to, from) {
		if (to.name !== from.name) {
			document.documentElement.scrollTop = 0;
		}
	},
	history: createWebHistory(),
	// scrollBehavior: () => ({ y: 0 }),
	routes,
});

export default router;
