import {createRouter, createWebHistory} from "vue-router";
// import Common from "@/views/Common";
// import NFooter from "@/views/NFooter";
// import {markRaw, toRaw} from "vue";

import HIndex from "../views/sections/HIndex.vue";
import NFTDetail from "../views/sections/NFTDetail.vue";
import Profile from "@/views/sections/Profile.vue";
import ERC721 from "../views/sections/ERC721.vue";
import Connect from "../views/sections/Connect.vue";
import Items from "../views/sections/Items.vue";
import Account from "../views/sections/Account.vue";

import Search from "../views/sections/Search.vue";
import Collection from "../views/sections/Collection.vue";
import AllCollection from "../views/sections/AllCollection.vue";
import Markterplace from "../views/sections/Markterplace.vue";

import Message from "../views/sections/Message.vue";

import NoFound from "@/views/sections/NoFound.vue";
import orderMock from "../views/sections/orderMock/index.vue";

const routes = [
	// {
	//   path: "/",
	//   name: "Root",
	//   component: () => Common,
	//   children: [
	//     {
	//       path: "/",
	//       name: "home",
	//       component: () => HIndex,
	//     },
	//     {
	//       path: "/orderMock",
	//       name: "orderMock",
	//       component: () => orderMock,
	//     },
	//     {
	//       path: "/items",
	//       component: () => Items,
	//       name: "items",
	//       meta: {
	//         auth: true,
	//       },
	//     },
	//     {
	//       path: "/erc721",
	//       name: "erc721",
	//       component: () => ERC721,
	//       meta: {
	//         auth: true,
	//       },
	//     },
	//     {
	//       path: "/profile",
	//       name: "profile",
	//       component: () => Profile,
	//       meta: {
	//         auth: true,
	//       },
	//     },
	//     {
	//       path: "/account/:address",
	//       name: "account",
	//       component: () => Account,
	//     },
	//     {
	//       path: "/search",
	//       name: "Search",
	//       component: () => Search,
	//     },
	//     {
	//       path: "/allcollection",
	//       name: "allcollection",
	//       component: () => AllCollection,
	//     },
	//     {
	//       path: "/markterplace",
	//       name: "markterplace",
	//       component: () => Markterplace,
	//     },
	//     {
	//       path: "/collection/:contract",
	//       name: "collection",
	//       component: () => Collection,
	//     },
	//     {
	//       path: "/detail/:contract/:tokenId",
	//       name: "detail",
	//       component: () => NFTDetail,
	//     },
	//     // {
	//     //   path: "/account",
	//     //   name: "account",
	//     //   component: () => AllCollection,
	//     // },
	//     {
	//       path: "/message",
	//       name: "message",
	//       component: () => Message,
	//       meta: {
	//         auth: true,
	//       },
	//     },
	//     {
	//       path: "/404",
	//       name: "404",
	//       component: () => NoFound,
	//     },
	//   ],
	// },
	{
		path: "/",
		name: "home",
		component: () => import("../views/sections/HIndex.vue"),
	},
	{
		path: "/orderMock",
		name: "orderMock",
		component: () => import("../views/sections/orderMock/index.vue"),
	},
	{
		path: "/items",
		component: () => import("../views/sections/Items.vue"),
		name: "items",
		meta: {
			auth: true,
		},
	},
	{
		path: "/erc721",
		name: "erc721",
		component: () => import("../views/sections/ERC721.vue"),
		meta: {
			auth: true,
		},
	},
	{
		path: "/profile",
		name: "profile",
		component: () => import("@/views/sections/Profile.vue"),
		meta: {
			auth: true,
		},
	},
	{
		path: "/account/:address",
		name: "account",
		component: () => import("../views/sections/Account.vue"),
	},
	{
		path: "/search",
		name: "Search",
		component: () => import("../views/sections/Search.vue"),
	},
	{
		path: "/allcollection",
		name: "allcollection",
		component: () => import("../views/sections/AllCollection.vue"),
	},
	{
		path: "/markterplace",
		name: "markterplace",
		component: () => import("../views/sections/Markterplace.vue"),
	},
	{
		path: "/collection/:contract",
		name: "collection",
		component: () => import("../views/sections/Connect.vue"),
	},
	{
		path: "/detail/:contract/:tokenId",
		name: "detail",
		component: () => import("../views/sections/NFTDetail.vue"),
	},
	// {
	//   path: "/account",
	//   name: "account",
	//   component: () => AllCollection,
	// },
	{
		path: "/message",
		name: "message",
		component: () => import("../views/sections/Message.vue"),
		meta: {
			auth: true,
		},
	},
	{
		path: "/404",
		name: "404",
		component: () => import("@/views/sections/NoFound.vue"),
	},
	{
		path: "/connect",
		name: "connect",
		component: () => import("../views/sections/Connect.vue"),
	},
	{
		path: "/:pathMatch(.*)",
		name: "NoFound",
		redirect: "/404",
	},
];

const router = createRouter({
	scrollBehavior() {
		document.getElementById("app").scrollIntoView();
	},
	history: createWebHistory(),
	routes,
});

export default router;
