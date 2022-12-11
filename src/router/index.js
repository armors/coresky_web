import {createRouter, createWebHistory} from "vue-router";
// import Common from "../views/Common";
// import NFooter from "../views/NFooter";
// import {markRaw, toRaw} from "vue";

import HIndex from "../views/sections/HIndex";
import NFTDetail from "../views/sections/NFTDetail";
import Profile from "../views/sections/Profile";
import ERC721 from "../views/sections/ERC721";
import Connect from "../views/sections/Connect";
import Items from "../views/sections/Items";
import Account from "../views/sections/Account";

import Search from "../views/sections/Search";
import Collection from "../views/sections/Collection";
import AllCollection from "../views/sections/AllCollection";
import Markterplace from "../views/sections/Markterplace";

import Message from "../views/sections/Message";

import NoFound from "../views/sections/NoFound";
import orderMock from "../views/sections/orderMock/index";

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
		component: () => import(/* webpackChunkName: "HIndex" */ "../views/sections/HIndex"),
	},
	{
		path: "/orderMock",
		name: "orderMock",
		component: () => import(/* webpackChunkName: "orderMock" */ "../views/sections/orderMock/index"),
	},
	{
		path: "/items",
		component: () => import(/* webpackChunkName: "Items" */ "../views/sections/Items"),
		name: "items",
		meta: {
			auth: true,
		},
	},
	{
		path: "/erc721",
		name: "erc721",
		component: () => import(/* webpackChunkName: "erc721" */ "../views/sections/ERC721"),
		meta: {
			auth: true,
		},
	},
	{
		path: "/profile",
		name: "profile",
		component: () => import(/* webpackChunkName: "profile" */ "../views/sections/Profile"),
		meta: {
			auth: true,
		},
	},
	{
		path: "/account/:address",
		name: "account",
		component: () => import(/* webpackChunkName: "account" */ "../views/sections/Account"),
	},
	{
		path: "/search",
		name: "Search",
		component: () => import(/* webpackChunkName: "search" */ "../views/sections/Search"),
	},
	{
		path: "/allcollection",
		name: "allcollection",
		component: () => import(/* webpackChunkName: "allcollection" */ "../views/sections/AllCollection"),
	},
	{
		path: "/markterplace",
		name: "markterplace",
		component: () => import(/* webpackChunkName: "markterplace" */ "../views/sections/Markterplace"),
	},
	{
		path: "/collection/:contract",
		name: "collection",
		component: () => import(/* webpackChunkName: "collection" */ "../views/sections/Collection"),
	},
	{
		path: "/detail/:contract/:tokenId",
		name: "detail",
		component: () => import(/* webpackChunkName: "detail" */ "../views/sections/NFTDetail"),
	},
	// {
	//   path: "/account",
	//   name: "account",
	//   component: () => AllCollection,
	// },
	{
		path: "/message",
		name: "message",
		component: () => import(/* webpackChunkName: "message" */ "../views/sections/Message"),
		meta: {
			auth: true,
		},
	},
	{
		path: "/404",
		name: "404",
		component: () => import(/* webpackChunkName: "404" */ "../views/sections/NoFound"),
	},
	{
		path: "/connect",
		name: "connect",
		component: () => import(/* webpackChunkName: "connect" */ "../views/sections/Connect"),
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
