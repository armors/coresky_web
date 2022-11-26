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

const contract_ABI = [
	"function transferFrom(address from, address to, uint256 tokenId)",
	"function safeTransferFrom(address _from, address _to, uint256 _id, uint256 _value, bytes calldata _data)",
	"function safeBatchTransferFrom(address from, address to, uint256[] calldata ids, uint256[] calldata amounts, bytes calldata data)",
	"function atomicize(address[] calldata addrs, uint256[] calldata values, uint256[] calldata calldataLengths, bytes calldata calldatas)"
];
const iface = new ethers.utils.Interface(contract_ABI)
const ZERO_ADDRESS = ethers.constants.AddressZero;
const ZERO = ethers.constants.Zero;
const SALT = new Date().getTime();
export default {
	// self start
	async getMarketRegistryContract() {
		let abi = utils.contractAbi("MARKET_REGISTRY");
		return await utils.contractAt({abi}, process.env.VUE_APP_MARKET_REGISTRY);
	},
	async getMarketExchangeContract() {
		let abi = utils.contractAbi("MARKET_EXCHANGE");
		return await utils.contractAt({abi}, process.env.VUE_APP_MARKET_EXCHANGE);
	},
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

	async callhashOrder_(params) {
		let contract = await this.getMarketExchangeContract();
		let tx = await contract.hashOrder_(...params)
		return tx
	},
	async callhashToSign_(params) {
		let contract = await this.getMarketExchangeContract();
		let tx = await contract.hashToSign_(...params)
		return tx
	},
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

	/** sign
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
	makeOrder(exchangeAddress, sender, nftAddress) {
		return {
			exchange: exchangeAddress,     // 当前 exhcnage 合约地址 default : exchangeAddress
			maker: sender,         // 订单创建者 default sender
			taker: ZERO_ADDRESS,           // 订单参与者 require
			makerRelayerFee: 250,          // 手续费  default: 0
			takerRelayerFee: 0,            // 手续费  default: 0
			makerProtocolFee: 0,           // 协议费  default: 0
			takerProtocolFee: 0,           // 协议费  default: 0
			feeRecipient: ZERO_ADDRESS,    // 平台费 接收账户 default: 0x0
			feeMethod: 1,                  // enum FeeMethod { ProtocolFee, SplitFee }  费用收取方法：只用支付协议费，或者 是需要同时支付协议费 和 平台费
			side: 0,                       // enum Side { Buy, Sell } 该订单是 卖方单 还是 买方单
			saleKind: 0,                   // { FixedPrice, DutchAuction } 销售方式是 固定价格，还是采用 竞拍的方式
			target: nftAddress,            // 交易的 nft 完成 NFT 转移
			howToCall: 0,                  // 调用方式是 call 还是 delegatecall
			calldata: '0x',                // target 执行时的 calldata
			replacementPattern: '0x',      // target 执行时的 calldata 可替换的参数
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
	async validateOrderParameters(order) {
		let contract = await this.getMarketExchangeContract();
		return await contract.validateOrderParameters_(
			[order.exchange, order.maker, order.taker, order.feeRecipient, order.target, order.staticTarget, order.paymentToken],
			[order.makerRelayerFee, order.takerRelayerFee, order.makerProtocolFee, order.takerProtocolFee, order.basePrice, order.extra, order.listingTime, order.expirationTime, order.salt],
			order.feeMethod,
			order.side,
			order.saleKind,
			order.howToCall,
			order.calldata,
			order.replacementPattern,
			order.staticExtradata
		);
	},
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
	async atomicMatch(params, owner) {
		let contract = await this.getMarketExchangeContract();
		console.log(ethers.utils.parseEther("2"))
		let tx = await contract.atomicMatch_(
			...params,
			{
				from: owner,
				value: ethers.utils.parseEther("0.3"),
				gasLimit: 4100000
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
	getFullAsset(asset) {
		let type = types.keyAssetType(asset.type);
		let abi = utils.contractAbi(type);
		asset.abi = abi;
		return asset;
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
	async allowancePayToken(asset, owner, spender) {
		asset = this.getFullAsset(asset);
		let contract = await this.getAssetContract(asset);
		if (contract.error) return contract;
		try {
			return await contract.allowance(owner, spender);
		} catch (e) {
			return {error: e.message};
		}
	},
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
