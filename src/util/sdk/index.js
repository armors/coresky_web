import utils_web3 from "@/util/web3/index";
import types from "./types";
import utils from "./utils";
import constants from "./constants";
import BigNumber from 'bignumber.js'
import {BIG_TEN} from './bigBumer'

var Web3 = require("web3");
const eth_util = require("ethereumjs-util");
import web3 from "@/util/web3/index.js";
import {ethers} from 'ethers'

const encodeERC721ReplacementPatternSell = '0x000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000';
const encodeERC721ReplacementPatternBuy = '0x00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';

const contract_ABI = [
	"function transferFrom(address from, address to, uint256 tokenId)",
	"function safeTransferFrom(address _from, address _to, uint256 _id, uint256 _value, bytes calldata _data)",
	"function safeBatchTransferFrom(address from, address to, uint256[] calldata ids, uint256[] calldata amounts, bytes calldata data)",
	"function atomicize(address[] calldata addrs, uint256[] calldata values, uint256[] calldata calldataLengths, bytes calldata calldatas)"
];
const iface = new ethers.utils.Interface(contract_ABI)
const ZERO_ADDRESS = ethers.constants.AddressZero;
const ZERO_HASH = ethers.constants.HashZero;
const ZERO = ethers.constants.Zero;
const SALT = new Date().getTime();
export default {
	// self start
	// 注册合约
	async getMarketRegistryContract() {
		let abi = utils.contractAbi("MARKET_REGISTRY");
		return await utils.contractAt({abi}, process.env.VUE_APP_MARKET_REGISTRY);
	},
	// nft交易合约
	async getMarketExchangeContract() {
		let abi = utils.contractAbi("MARKET_EXCHANGE");
		return await utils.contractAt({abi}, process.env.VUE_APP_MARKET_EXCHANGE);
	},
	// nft批量购买合约
	async getMarketWrapContract() {
		let abi = utils.contractAbi("MARKET_WRAP");
		return await utils.contractAt({abi}, process.env.VUE_APP_NFT_MARKET_WRAP);
	},
	// 注册合约进行注册地址
	async getOwnerProxy(address) {
		let contract = await this.getMarketRegistryContract();
		if (contract.error) return contract;
		let proxiesAddress = null
		try {
			proxiesAddress = await contract.proxies(address);
			console.log(proxiesAddress, process.env.VUE_APP_MARKET_REGISTRY)
			if (proxiesAddress === this.NULL_ADDRESS()) {
				await contract.registerProxy({from: address})
				proxiesAddress = await contract.proxies(address);
			}
			return {
				proxiesAddress
			}
		} catch (e) {
			console.log(e)
			return {error: e.message};
		}
	},
	//订单签名
	async callhashOrder_(params) {
		let contract = await this.getMarketExchangeContract();
		let tx = await contract.hashOrder_(...params)
		return tx
	},
	// 取消订单
	async cancelOrder_(params, owner) {
		let contract = await this.getMarketExchangeContract();
		const arrayParams = [
			[
				params.exchange,
				params.maker,
				params.taker,
				params.feeRecipient,
				params.target,
				params.staticTarget,
				params.paymentToken
			],
			[
				params.makerRelayerFee,
				params.takerRelayerFee,
				params.makerProtocolFee,
				params.takerProtocolFee,
				params.basePrice,
				params.extra,
				params.listingTime,
				params.expirationTime,
				params.salt
			],
			params.feeMethod,
			params.side,
			params.saleKind,
			params.howToCall,
			params.calldata,
			params.replacementPattern,
			params.staticExtradata,
			params.v,
			params.r,
			params.s
		]
		let tx = await contract.cancelOrder_(...arrayParams,
			{
				from: owner
			})
		return tx
	},
	//hash签名
	async callhashToSign_(params) {
		let contract = await this.getMarketExchangeContract();
		let tx = await contract.hashToSign_(...params)
		return tx
	},
	//订单参数验证
	async validateOrder_(...args) {
		let contract = await this.getMarketExchangeContract();
		console.log(...args)
		let tx = await contract.validateOrder_(...args)
		return tx
	},
	getEIP712TypedData(orderStr, eip712Domain, nonce) {
		const order = JSON.parse(orderStr);
		return {
			types: {
				Order: [
					{type: 'address', name: 'exchange'},
					{type: 'address', name: 'maker'},
					{type: 'address', name: 'taker'},
					{type: 'uint256', name: 'makerRelayerFee'},
					{type: 'uint256', name: 'takerRelayerFee'},
					{type: 'uint256', name: 'makerProtocolFee'},
					{type: 'uint256', name: 'takerProtocolFee'},
					{type: 'address', name: 'feeRecipient'},
					{type: 'uint8', name: 'feeMethod'},
					{type: 'uint8', name: 'side'},
					{type: 'uint8', name: 'saleKind'},
					{type: 'address', name: 'target'},
					{type: 'uint8', name: 'howToCall'},
					{type: 'bytes', name: 'calldata'},
					{type: 'bytes', name: 'replacementPattern'},
					{type: 'address', name: 'staticTarget'},
					{type: 'bytes', name: 'staticExtradata'},
					{type: 'address', name: 'paymentToken'},
					{type: 'uint256', name: 'basePrice'},
					{type: 'uint256', name: 'extra'},
					{type: 'uint256', name: 'listingTime'},
					{type: 'uint256', name: 'expirationTime'},
					{type: 'uint256', name: 'salt'},
					{type: 'uint256', name: 'nonce'}
				]
			},
			domain: eip712Domain,
			primaryType: 'Order',
			message: {
				exchange: order.exchange,
				maker: order.maker,
				taker: order.taker,
				makerRelayerFee: order.makerRelayerFee,
				takerRelayerFee: order.takerRelayerFee,
				makerProtocolFee: order.makerProtocolFee,
				takerProtocolFee: order.takerProtocolFee,
				feeRecipient: order.feeRecipient,
				feeMethod: Number(order.feeMethod),
				side: Number(order.side),
				saleKind: Number(order.saleKind),
				target: order.target,
				howToCall: Number(order.howToCall),
				calldata: order.calldata,
				replacementPattern: order.replacementPattern,
				staticTarget: order.staticTarget,
				staticExtradata: order.staticExtradata,
				paymentToken: order.paymentToken,
				basePrice: order.basePrice,
				extra: order.extra,
				listingTime: order.listingTime,
				expirationTime: order.expirationTime,
				salt: order.salt,
				nonce
			}
		}
	},

	/** sign 签名订单信息
	 * @returns
	 * @param order
	 * @param walletAccount
	 */
	async signature(order, walletAccount) {
		const sender = web3.getSigner(walletAccount)
		console.log(sender)
		const eip712Domain = {
			name: 'Core Sky Exchange Contract',
			version: '1.0',
			chainId: 5,
			verifyingContract: process.env.VUE_APP_MARKET_EXCHANGE,
		};
		let contract = await this.getMarketExchangeContract();
		const nonces = await contract.nonces(walletAccount);
		const nonce = nonces.toString();

		const typedData = this.getEIP712TypedData(JSON.stringify(order), eip712Domain, Number(nonce))
		const signature = await sender._signTypedData(
			typedData.domain,
			typedData.types,
			typedData.message
		);
		console.log(signature)
		const vrs = await ethers.utils.splitSignature(signature);
		const sig = {
			signature: signature,
			v: vrs.v,
			s: vrs.s,
			r: vrs.r
		}
		// // testing
		let verifiedAddress = ethers.utils.verifyTypedData(typedData.domain, typedData.types, typedData.message, signature)

		console.log({
			"sender": walletAccount,
			verifiedAddress
		});

		return sig;
	},
	getDecimalAmount(amount, decimals = 18) {
		return new BigNumber(amount).times(BIG_TEN.pow(decimals))
	},
	async orderCalldataCanMatch(buy, sell) {
		let contract = await this.getMarketExchangeContract();
		return await contract.orderCalldataCanMatch(
			buy.calldata,
			buy.replacementPattern,
			sell.calldata,
			sell.replacementPattern
		);
	},
	buyERC721ABI(buyer, id, from) {
		if (!from) {
			from = ZERO_ADDRESS;
		}
		return iface.encodeFunctionData("transferFrom", [from, buyer, id]);
	},
	sellERC721ABI(seller, id, to) {
		if (!to) {
			to = ZERO_ADDRESS;
		}
		return iface.encodeFunctionData("transferFrom", [seller, to, id]);
	},
	/**
	 * 订单数据结构初始化
	 * @param exchangeAddress
	 * @param sender
	 * @param nftAddress
	 * @param side
	 * @param tokenId
	 * @returns {{howToCall: number, side: number, salt: number, staticExtradata: string, _sender: *, listingTime: number, maker: *, makerRelayerFee: number, takerProtocolFee: number, target: *, paymentToken: string, staticTarget: string, takerRelayerFee: number, calldata: *, expirationTime: number, extra: number, exchange: *, saleKind: number, taker: string, makerProtocolFee: number, feeRecipient: string, feeMethod: number, replacementPattern: (string), basePrice: BigNumber}}
	 */
	makeOrder(exchangeAddress, sender, nftAddress, side = 0, tokenId = null) {
		return {
			exchange: exchangeAddress,     // 当前 exhcnage 合约地址 default : exchangeAddress
			maker: sender,                 // 订单创建者 default sender
			taker: ZERO_ADDRESS,           // 订单参与者 require
			makerRelayerFee: 250,          // 手续费  default: 0
			takerRelayerFee: 0,            // 手续费  default: 0
			makerProtocolFee: 0,           // 协议费  default: 0
			takerProtocolFee: 0,           // 协议费  default: 0
			feeRecipient: ZERO_ADDRESS,    // 平台费 接收账户 default: 0x0 买方和买方必须有一个是零地址
			feeMethod: 1,                  // enum FeeMethod { ProtocolFee, SplitFee }  费用收取方法：只用支付协议费，或者 是需要同时支付协议费 和 平台费
			side: side,                    // enum Side { Buy, Sell } 该订单是 卖方单 还是 买方单
			saleKind: 0,                   // { FixedPrice, DutchAuction } 销售方式是 固定价格，还是采用 竞拍的方式
			target: nftAddress,            // 交易的 nft 完成 NFT 转移
			howToCall: 0,                  // 调用方式是 call 还是 delegatecall
			calldata:
				tokenId !== null ? (side === 1 ?
					this.sellERC721ABI(sender, tokenId)
					: this.buyERC721ABI(sender, tokenId)) : '0x',                // target 执行时的 calldata
			replacementPattern: side === 1 ? encodeERC721ReplacementPatternSell : encodeERC721ReplacementPatternBuy,      // target 执行时的 calldata 可替换的参数
			staticTarget: ZERO_ADDRESS,    // 静态调用（不修改状态）的 target 账户地址；为 0 表示没有这种调用
			staticExtradata: '0x',         // 静态调用时设置的额外数据，最终交给 staticTarget 处理
			paymentToken: ZERO_ADDRESS,    // 该地址为 0 ，表示使用 ether 支付，否则，表示使用一个 erc20 token 支付
			basePrice: ZERO,               // 如果是 saleKind 固定价格，则该值就表示固定价格；否则，真正的价格，还包括 extra 部分. 价格单位为 Wei
			extra: 0,                      // 竞拍方式下，extra 表示需要额外的最大值. 价格单位为 Wei
			listingTime: 0,                // 挂单时间
			expirationTime: 0,             // 订单过期失效时间
			salt: SALT,                    // for collision
			_sender: sender        // for wrap【不计算 hash 】
		}
	},
	// 验证订单参数
	async validateOrderParameters(order) {
		let contract = await this.getMarketExchangeContract();
		console.log(contract)
		const params = [
			[order.exchange, order.maker, order.taker, order.feeRecipient, order.target, order.staticTarget, order.paymentToken],
			[order.makerRelayerFee,
				order.takerRelayerFee,
				order.makerProtocolFee,
				order.takerProtocolFee,
				order.basePrice,
				order.extra,
				order.listingTime,
				order.expirationTime,
				order.salt],
			order.feeMethod,
			order.side,
			order.saleKind,
			order.howToCall,
			order.calldata,
			order.replacementPattern,
			order.staticExtradata
		]
		console.log(params)
		return await contract.validateOrderParameters_(...params);
	},
	// atomicMatch数据验证
	async orderCanMatch(buy, sell) {
		let contract = await this.getMarketExchangeContract();
		console.log(
			[buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken, sell.exchange, sell.maker, sell.taker, sell.feeRecipient, sell.target, sell.staticTarget, sell.paymentToken],
			[buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt, sell.makerRelayerFee, sell.takerRelayerFee, sell.makerProtocolFee, sell.takerProtocolFee, sell.basePrice, sell.extra, sell.listingTime, sell.expirationTime, sell.salt],
			[buy.feeMethod, buy.side, buy.saleKind, buy.howToCall, sell.feeMethod, sell.side, sell.saleKind, sell.howToCall],
			buy.calldata,
			sell.calldata,
			buy.replacementPattern,
			sell.replacementPattern,
			buy.staticExtradata,
			sell.staticExtradata
		)
		return contract.ordersCanMatch_(
			[buy.exchange, buy.maker, buy.taker, buy.feeRecipient, buy.target, buy.staticTarget, buy.paymentToken, sell.exchange, sell.maker, sell.taker, sell.feeRecipient, sell.target, sell.staticTarget, sell.paymentToken],
			[buy.makerRelayerFee, buy.takerRelayerFee, buy.makerProtocolFee, buy.takerProtocolFee, buy.basePrice, buy.extra, buy.listingTime, buy.expirationTime, buy.salt, sell.makerRelayerFee, sell.takerRelayerFee, sell.makerProtocolFee, sell.takerProtocolFee, sell.basePrice, sell.extra, sell.listingTime, sell.expirationTime, sell.salt],
			[buy.feeMethod, buy.side, buy.saleKind, buy.howToCall, sell.feeMethod, sell.side, sell.saleKind, sell.howToCall],
			buy.calldata,
			sell.calldata,
			buy.replacementPattern,
			sell.replacementPattern,
			buy.staticExtradata,
			sell.staticExtradata
		);
	},
	// 若为eth支付，计算当前订单需要支付的eth
	async calculateMatchPrice_(seller, buyer) {
		let contract = await this.getMarketExchangeContract();
		const params = [
			[
				buyer.exchange,
				buyer.maker,
				buyer.taker,
				buyer.feeRecipient,
				buyer.target,
				buyer.staticTarget,
				buyer.paymentToken,
				seller.exchange,
				seller.maker,
				seller.taker,
				seller.feeRecipient,
				seller.target,
				seller.staticTarget,
				seller.paymentToken,
			],
			[
				buyer.makerRelayerFee,
				buyer.takerRelayerFee,
				buyer.makerProtocolFee,
				buyer.takerProtocolFee,
				buyer.basePrice,
				buyer.extra,
				buyer.listingTime,
				buyer.expirationTime,
				buyer.salt,
				seller.makerRelayerFee,
				seller.takerRelayerFee,
				seller.makerProtocolFee,
				seller.takerProtocolFee,
				seller.basePrice,
				seller.extra,
				seller.listingTime,
				seller.expirationTime,
				seller.salt
			],
			[
				buyer.feeMethod,
				buyer.side,
				buyer.saleKind,
				buyer.howToCall,
				seller.feeMethod,
				seller.side,
				seller.saleKind,
				seller.howToCall,
			],
			buyer.calldata,
			seller.calldata,
			buyer.replacementPattern,
			seller.replacementPattern,
			buyer.staticExtradata,
			seller.staticExtradata,
		]
		console.log('若为eth支付', params)
		let tx = await contract.calculateMatchPrice_(
			...params
		)
		return tx
	},
	// 订单成交
	async atomicMatch(seller, buyer, owner, sender) {
		let contract = await this.getMarketExchangeContract();
		const params = [
			[
				buyer.exchange,
				buyer.maker,
				buyer.taker,
				buyer.feeRecipient,
				buyer.target,
				buyer.staticTarget,
				buyer.paymentToken,
				seller.exchange,
				seller.maker,
				seller.taker,
				seller.feeRecipient,
				seller.target,
				seller.staticTarget,
				seller.paymentToken,
				sender,
			],
			[
				buyer.makerRelayerFee,
				buyer.takerRelayerFee,
				buyer.makerProtocolFee,
				buyer.takerProtocolFee,
				buyer.basePrice,
				buyer.extra,
				buyer.listingTime,
				buyer.expirationTime,
				buyer.salt,
				seller.makerRelayerFee,
				seller.takerRelayerFee,
				seller.makerProtocolFee,
				seller.takerProtocolFee,
				seller.basePrice,
				seller.extra,
				seller.listingTime,
				seller.expirationTime,
				seller.salt
			],
			[
				buyer.feeMethod,
				buyer.side,
				buyer.saleKind,
				buyer.howToCall,
				seller.feeMethod,
				seller.side,
				seller.saleKind,
				seller.howToCall,
			],
			buyer.calldata,
			seller.calldata,
			buyer.replacementPattern,
			seller.replacementPattern,
			buyer.staticExtradata,
			seller.staticExtradata,
			[
				buyer.v,
				parseInt(seller.v)
			],
			[
				buyer.r,
				buyer.s,
				seller.r,
				seller.s,
				ethers.constants.HashZero
			],
		]
		console.log(params)
		let pa = {}
		if (seller.paymentToken === ZERO_ADDRESS && buyer.paymentToken === ZERO_ADDRESS) {
			pa = {
				// value: await this.calculateMatchPrice_(seller, buyer),
				value: seller.basePrice,
			}
		}
		console.log(pa)
		let tx = await contract.atomicMatch_(
			...params,
			{
				...{
					from: owner,
				},
				...{
					pa
				}
			}
		)
		return tx
	},
	//获取nft是否授权
	async isApprovedForAll(asset, owner, operator) {
		asset.type = 3;
		asset = this.getFullAsset(asset);
		let contract = await this.getAssetContract(asset);
		if (contract.error) return contract;

		try {
			return await contract.isApprovedForAll(owner, operator);
		} catch (e) {
			return {error: e.message};
		}
	},
	// nft授权
	async setApprovalForAll(asset, coinbase, operator, approved) {
		asset.type = 3;
		asset = this.getFullAsset(asset);
		let contract = await this.getAssetContract(asset);
		if (contract.error) return contract;

		try {
			return await contract.setApprovalForAll(operator, approved, {
				from: coinbase,
			});
		} catch (e) {
			return {error: e.message};
		}
	},
	// 获取erc20 token 的授权数量
	async allowancePayToken(asset, owner, spender) {
		console.log(asset, owner, spender)
		asset = this.getFullAsset(asset);
		console.log(asset)
		let contract = await this.getAssetContract(asset);
		if (contract.error) return contract;
		try {
			return await contract.allowance(owner, spender);
		} catch (e) {
			return {error: e.message};
		}
	},
	// erc20 token授权
	async approvePayToken(asset, owner, spender) {
		asset = this.getFullAsset(asset);
		let contract = await this.getAssetContract(asset);
		if (contract.error) return contract;
		try {
			return await contract.approve(spender, constants.MAX_APPROVE_AMOUNT, {
				from: owner,
			});
		} catch (e) {
			return {error: e.message};
		}
	},

	changeKey(obj, old_key, new_key) {
		Object.keys(obj).forEach(key => {
			console.log(key)
			if (key === old_key) {
				obj[new_key] = obj[key];
				delete obj[key];
			} else {
				obj[`_${key}`] = obj[key];
				delete obj[key];

				obj[`${key}`] = obj[`_${key}`];
				delete obj[`_${key}`];
			}
		});

		return obj;
	},
	getAtomicMatchWrapOrder(order, isBeta=true) {
		let calld = {
			"calldataBeta": order.calldata,
		}
		if (!isBeta) {
			calld = {
				"calldata": order.calldata,
			}
		}
		return {
			...{
				"exchange": order.exchange,
				"maker": order.maker,
				"taker": order.taker,
				"makerRelayerFee": order.makerRelayerFee,
				"takerRelayerFee": order.takerRelayerFee,
				"makerProtocolFee": order.makerProtocolFee,
				"takerProtocolFee": order.takerProtocolFee,
				"feeRecipient": order.feeRecipient,
				"feeMethod": order.feeMethod,
				"side": order.side,
				"saleKind": order.saleKind,
				"target": order.target,
				"howToCall": order.howToCall,
				"replacementPattern": order.replacementPattern,
				"staticTarget": order.staticTarget,
				"staticExtradata": order.staticExtradata,
				"paymentToken": order.paymentToken,
				"basePrice": order.basePrice,
				"extra": order.extra,
				"listingTime": order.listingTime,
				"expirationTime": order.expirationTime,
				"salt": order.salt,
			},
			...calld
		}
	},
	async _atomicMatchWrap(buyers, sellers, owner) {
		let buys = []
		let sells = []
		let buySigs = []
		let sellSigs = []
		for (let i = 0; i < buyers.length; i++) {
			buys.push(this.getAtomicMatchWrapOrder(buyers[i]))
			sells.push(this.getAtomicMatchWrapOrder(sellers[i]))
			buySigs.push({
					'v': buyers[i].v,
					'r': buyers[i].r,
					's': buyers[i].s
			})
			sellSigs.push({
				'v': sellers[i].v,
				'r': sellers[i].r,
				's': sellers[i].s
			})
		}
		console.log(buys)
		console.log(sells)
		console.log(buySigs)
		console.log(sellSigs)
		let contract = await this.getMarketWrapContract();
		let tx = await contract.atomicMatchWrap(
			buys,
			buySigs,
			sells,
			sellSigs,
			ZERO_HASH,
			{
				from: owner,
				value: ethers.utils.parseEther("0.04")
			}
		)
		return tx
	},
	// self start

	async totalSupply(asset) {
		asset = this.getFullAsset(asset);
		let contract = await this.getAssetContract(asset);
		if (contract.error) return contract;
		return await contract.totalSupply();
	},
	async mintToken(owner, asset) {
		asset.type = 3;
		asset = this.getFullAsset(asset);
		let contract = await this.getAssetContract(asset);

		if (contract.error) return contract;
		try {
			return await contract.mint(
				asset.tokenId,
				asset.signature.v,
				asset.signature.r,
				asset.signature.s,
				asset.fees,
				asset.tokenURI,
				{from: owner}
			);
		} catch (e) {
			return {error: e.message};
		}
	},
	getFullAsset(asset) {
		let type = types.keyAssetType(asset.type);
		console.log(type)
		let abi = utils.contractAbi(type);
		asset.abi = abi;
		return asset;
	},
	async fromWeiNum(value) {
		var web3 = await utils_web3.getWeb3();
		return web3.utils.fromWei(value.toString(), "ether");
	},
	async getBalance(asset, owner) {
		var web3 = await utils_web3.getWeb3();
		try {
			if (asset.address == this.NULL_ADDRESS()) {
				let balance = await web3.eth.getBalance(owner);
				return web3.utils.fromWei(balance.toString(), "ether");
			} else {
				asset.type = types.valueAssetType("ERC20");
				asset = this.getFullAsset(asset);
				let contract = await this.getAssetContract(asset);
				if (contract.error) return contract;
				return await contract.balanceOf(owner);
			}
		} catch (e) {
			return {error: e.message};
		}
	},
	async getAssetContract(asset) {
		asset.contractAddress = asset.address;
		return await utils.contractAt(asset.abi, asset.contractAddress);
	},
	async transferAsset(asset, from, to) {
		asset.type = 3;
		asset = this.getFullAsset(asset);
		let contract = await this.getAssetContract(asset);
		if (contract.error) return contract;
		try {
			return await contract.transferFrom(from, to, asset.tokenId, {
				from: from,
			});
		} catch (e) {
			return {error: e.message};
		}
	},
	async burnAsset(asset) {
		asset.type = 3;
		asset = this.getFullAsset(asset);
		let contract = await this.getAssetContract(asset);
		if (contract.error) return contract;

		try {
			return await contract.burn(asset.tokenId, {from: asset.owner});
		} catch (e) {
			return {error: e.message};
		}
	},
	async cancelOrder(owner, asset) {
		let contract = await this.getExchangeContract(asset, owner);
		if (contract.error) return contract;

		let orderKey = utils.getOrderKey(asset);
		if (!orderKey) return {error: "error Token"};
		orderKey = utils.tupleOrderKey(orderKey);
		try {
			return await contract.cancel(orderKey, {from: owner});
		} catch (e) {
			return {error: e.message};
		}
	},
	async exchangeOrder(owner, asset) {
		let contract = await this.getExchangeContract(asset);
		if (contract.error) return contract;

		let order = utils.createOrder(asset);
		if (!order) return {error: "error Token"};
		let Sig = this.parseSignatureHex(asset.signature);
		Sig = [Sig.v, Sig.r, Sig.s];
		let buyerFeeSig = asset.buyerFeeSig;
		buyerFeeSig = [buyerFeeSig.v, buyerFeeSig.r, buyerFeeSig.s];
		order = utils.tupleOrder(order);
		let value = Web3.utils.toWei(asset.value, "ether").toString();
		try {
			return await contract.exchange(
				order,
				Sig,
				asset.buyerFee,
				buyerFeeSig,
				asset.amount,
				asset.buyer,
				{from: owner, value: value}
			);
		} catch (e) {
			return {error: e.message};
		}
	},
	async getExchangeContract(asset, owner) {
		let abi = utils.contractAbi("EXCHANGE");
		asset.contractAddress = asset.exchangeAddress;
		return await utils.contractAt(abi, asset.contractAddress);
	},

	parseSignatureHex(signature) {
		if (!signature) {
			return {
				v: 0,
				r: "0x0000000000000000000000000000000000000000000000000000000000000000",
				s: "0x0000000000000000000000000000000000000000000000000000000000000000",
			};
		}
		const validVParamValues = [27, 28];
		const ecSignatureRSV = _parseSignatureHexAsRSV(signature);
		if (validVParamValues.includes(ecSignatureRSV.v)) {
			return ecSignatureRSV;
		}
		const ecSignatureVRS = _parseSignatureHexAsVRS(signature);
		if (validVParamValues.includes(ecSignatureVRS.v)) {
			return ecSignatureVRS;
		}
		throw new Error("Invalid signature");

		function _parseSignatureHexAsVRS(signatureHex) {
			const signatureBuffer = eth_util.toBuffer(signatureHex);
			let v = signatureBuffer[0];
			if (v < 27) {
				v += 27;
			}
			const r = signatureBuffer.slice(1, 33);
			const s = signatureBuffer.slice(33, 65);
			const ecSignature = {
				v,
				r: eth_util.bufferToHex(r),
				s: eth_util.bufferToHex(s),
			};
			return ecSignature;
		}

		function _parseSignatureHexAsRSV(signatureHex) {
			const {v, r, s} = eth_util.fromRpcSig(signatureHex);
			const ecSignature = {
				v,
				r: eth_util.bufferToHex(r),
				s: eth_util.bufferToHex(s),
			};
			return ecSignature;
		}
	},
	getAssetType(asset) {
		switch (asset.type) {
			case "ERC721":
				return 3;
		}
		return 0;
	},
	keyOrderType(value) {
		return types.keyOrderType(value);
	},
	valueOrderType(key) {
		return types.valueOrderType(key);
	},
	keyCommonType(value) {
		return types.keyCommonType(value);
	},
	valueCommonType(key) {
		return types.valueCommonType(key);
	},
	keyAssetType(value) {
		return types.keyAssetType(value);
	},
	valueAssetType(key) {
		return types.valueAssetType(key);
	},
	NULL_ADDRESS() {
		return constants.NULL_ADDRESS;
	},
	ERC721_REPLACEMENT_SELL() {
		return constants.ERC721_REPLACEMENT_SELL;
	},
	RELAYER_FEE() {
		return constants.RELAYER_FEE;
	},
	FEE_ADDRESS() {
		return constants.FEE_ADDRESS;
	},
	ERC721_REPLACEMENT_BUY() {
		return constants.ERC721_REPLACEMENT_BUY;
	},
	ADDRESS_ZERO() {
		return constants.ADDRESS_ZERO;
	}
};
