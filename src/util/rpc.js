import Config from './config';
import axios from "axios";
import BigNumber from "bignumber.js";
import _store from '@/store'
import WalletConnectProvider from "@walletconnect/web3-provider";
// import Web3Modal from 'web3modal';
// import Web3Modal from '../plugins/web3modal';
import Web3 from 'web3';
import ethConfig from '@/assets/abi/eth/config'

export class Web3Connector {
	chainList = [
		{
			'name': 'mainnet',
			'showname': 'ETH'
		},
		{
			'name': 'sepolia',
			'showname': 'sepolia'
		},
	]

	chainIdx = 0

	// eslint-disable-next-line no-unused-vars
	constructor(Web3) {
		let tmpidx = parseInt(localStorage.getItem('chainIdx') || '0')
		if (isNaN(tmpidx)) {
			tmpidx = 0
		}
		this.chainName = this.chainList[tmpidx].name
		this.config = ethConfig()
		this.chainId = this.getChainId(this.config)
		this.chainUrl = this.getConfig('chain')
		// this.initWalletConnect()
		// this.initWeb3Modal()
		this.web3 = new Web3(new Web3.providers.HttpProvider(this.chainUrl));
		// console.log(this.web3)

		this.web3Ethereum = window.ethereum
		//存放智能合约
		this.contracts = {};
		this.tool = new RpcTools(this)
		this.mainReq = null
		this.miningReq = null
		//当账号可用时的监听
		this.accountsChangedListeners = []
		this.chainChangedListeners = []
		this.onAccountConnectListener = []
		this.handleAccountsChangedActived = false
		this.listenerInit = false
		console.log('Web3 object inited')
		// this.contractObjInit()
		// this.provider = null
	}

	_isHexStrict(hex) {
		return this.web3.utils.isHexStrict(hex) ? this.web3.utils.hexToNumber(hex) : hex
	}

	getWalletConnectOption() {
		const rpc = {}
		rpc[this._isHexStrict(this.chainId)] = this.chainUrl
		return {
			infuraId: '3cf5ce43b5794c0698efc84ba9484a73', // TODO infuraId
			rpc: rpc,
			chainId: this._isHexStrict(this.chainId),
			rpcUrl: this.chainUrl
		}
	}

	initWalletConnect() {
		const options = this.getWalletConnectOption()
		this.provider = new WalletConnectProvider(options);
	}

	initWeb3Modal() {
		const options = this.getWalletConnectOption()
		const providerOption = {
			walletconnect: {
				package: WalletConnectProvider,
				options: options,
			},
		}
		const networkName = this.getConfig('name')
		return new Web3Modal({
			theme: 'dark',
			network: networkName,
			cacheProvider: false,
			providerOptions: providerOption
		});
	}

	async contractObjInit() {
		this.miningReq = new RpcSubRequestor(this)
		this.mainReq = new RpcMainRequestor(this)
		this.boxReq = new RpcBoxRequestor(this)
		this.blackReq = new RpcBlackRequestor(this)
		this.rebateReq = new RpcRebateRequestor(this)
		this.shareReq = new RpcShareRequestor(this)
	}

	getChainId(theConfig) {
		return this.getConfig('chainid', theConfig)
	}

	setChainIdx(idx) {
		localStorage.setItem('chainIdx', idx)
	}

	switchChain(theConfig) {
		let chainid = theConfig ? this.getConfig('chainid', theConfig) : this.getConfig('chainid')
		console.log(chainid)
		console.log(this.web3Ethereum)
		// console.log(chainid)
		return this.web3Ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [{
				chainId: this.web3.utils.numberToHex(chainid)
			}]
		})
	}

	addChain(theConfig) {
		let chainid = theConfig ? this.getConfig('chainid', theConfig) : this.getConfig('chainid')
		let chainname = theConfig ? this.getConfig('name', theConfig) : this.getConfig('name')
		let chainurl = theConfig ? this.getConfig('chain', theConfig) : this.getConfig('chain')
		return this.web3Ethereum.request({
			method: 'wallet_addEthereumChain',
			params: [{
				chainId: this.web3.utils.numberToHex(chainid),
				chainName: chainname,
				rpcUrls: [chainurl]
			}]
		})
	}
	/**
	 * 初始化链接
	 */
	initConnection({onConnect, onSpender}) {
		if (onConnect) {
			this.onConnect = onConnect
		}
		window.ethereum.request({method: 'eth_requestAccounts'})
			.then(this.handleAccountsChanged.bind(this))
			.catch((error) => {
				if (this.onConnect) {
					this.onConnect(null, 'Connection Failure')
				}
				if (error.code === 4001) {
					console.log('Please connect to MetaMask.')
				} else {
					console.error(error)
				}
			})
			.then(async () => {
				//获取spender
				// let res = await this.mainReq.getDVoteAddress()
				// console.log('invoke getDVoteAddress get spender = >',res)
				// this.spender = res
				if (onSpender) {
					onSpender()
				}
			})

		if (!this.listenerInit) {
			window.ethereum.on('accountsChanged', (accounts) => {
				console.log("window.ethereum.on('accountsChanged'", accounts)
				this.handleAccountsChanged(accounts)
				if (this.accountsChangedListeners) {
					for (let i = 0; i < this.accountsChangedListeners.length; i++) {
						this.accountsChangedListeners[i](accounts)
					}
				}
			});
			window.ethereum.on('chainChanged', (chainId) => {
				console.log("window.ethereum.on('chainChanged'", chainId)
				if (this.chainChangedListeners) {
					for (let i = 0; i < this.chainChangedListeners.length; i++) {
						this.chainChangedListeners[i](chainId)
					}
				}
			});
			this.listenerInit = true
		}
	}

	/**
	 * 初始化链接
	 */
	async initConnectionWeb3Modal({onConnect, onSpender}) {
		if (onConnect) {
			this.onConnect = onConnect
		}
		try {
			const _web3Modal = this.initWeb3Modal()
			console.log(_web3Modal)
			this.provider = await _web3Modal.connect()
			this.web3Ethereum = this.provider
			console.log(this.provider)
			const web3 = new Web3(this.provider);
			const accounts = await web3.eth.getAccounts();

			this.handleAccountsChanged(accounts)
			this.listenerEthereum(this.provider)
		} catch (error) {
			if (this.onConnect) {
				this.onConnect(null, 'Connection Failure')
			}
			if (error.code === 4001) {
				console.log('Please connect to MetaMask.')
			} else {
				console.error(error)
			}
		}
		if (onSpender) {
			onSpender()
		}
		// window.ethereum.request({ method: 'eth_requestAccounts' })
		// .then(this.handleAccountsChanged.bind(this))
		// .catch((error) => {
		//   if(this.onConnect){
		//     this.onConnect(null,'Connection Failure')
		//   }
		//   if (error.code === 4001) {
		//     console.log('Please connect to MetaMask.')
		//   } else {
		//     console.error(error)
		//   }
		// })
		// .then(async ()=>{
		//   //获取spender
		//   // let res = await this.mainReq.getDVoteAddress()
		//   // console.log('invoke getDVoteAddress get spender = >',res)
		//   // this.spender = res
		//   if(onSpender){
		//     onSpender()
		//   }
		// })
	}

	async resetConnect() {
		// console.log(this.walletInfo)
		// let web3Modal
		// if (!this.walletInfo) {
		//   const networkName = this.getConfig('name')
		//   web3Modal = await useWallet(networkName)
		// } else {
		//   web3Modal = this.walletInfo.web3Modal
		// }
		const web3 = this.web3
		console.log(this.provider)
		// console.log(web3)
		// console.log(this.provider)
		if (web3 && web3.currentProvider && web3.currentProvider.close) {
			try {
				await web3.currentProvider.close();
			} catch (e) {
				console.log(e)
			}
			// eslint-disable-next-line no-prototype-builtins
		} else if (this.provider.hasOwnProperty('clearCachedProvider')) {
			this.provider.clearCachedProvider();
			localStorage.removeItem('WEB3_CONNECT_CACHED_PROVIDER')
		} else if (this.provider?.disconnect) {
			await this.provider.disconnect();
		}
		_store.dispatch('system/setAccount', '')
	}

	listenerEthereum() {
		if (!this.listenerInit) {
			// window.ethereum.on('accountsChanged', (accounts) => {
			//   this.accountsChanged(accounts)
			// });
			// window.ethereum.on('chainChanged', (chainId) => {
			//   this.chainChanged(chainId)
			// });
			this.provider.on('close', () => {
				console.log('close')
				this.resetConnect()
			});
			this.provider.on("accountsChanged", (accounts) => {
				this.accountsChanged(accounts)
			});
			this.provider.on("chainChanged", (chainId) => {
				this.chainChanged(chainId)
			});
			this.provider.on("disconnect", (code, reason) => {
				console.log(code, reason);
				console.log("disconnected");
				this.resetConnect()
			});
			this.listenerInit = true
		}
	}

	accountsChanged(accounts) {
		console.log("window.ethereum.on('accountsChanged'", accounts)
		this.handleAccountsChanged(accounts)
		if (this.accountsChangedListeners) {
			for (let i = 0; i < this.accountsChangedListeners.length; i++) {
				this.accountsChangedListeners[i](accounts)
			}
		}
	}

	chainChanged(chainId) {
		console.log("window.ethereum.on('chainChanged'", chainId)
		if (this.chainChangedListeners) {
			for (let i = 0; i < this.chainChangedListeners.length; i++) {
				this.chainChangedListeners[i](chainId)
			}
		}
	}

	getAddress(name, theConfig) {
		if (!theConfig) {
			theConfig = this.config
		}
		let cont = theConfig.scene[Config.isDebug ? 'test' : 'product']
		if (cont.contracts[name]) {
			return cont.contracts[name].address
		} else {
			console.error('配置文件中没有找到' + name + '的地址')
			return ''
		}
	}

	getConfig(type, theConfig) {
		if (!theConfig) {
			theConfig = this.config
		}
		let cont = theConfig.scene[Config.isDebug ? 'test' : 'product']
		if (cont[type]) {
			return cont[type]
		} else {
			console.error('配置文件中没有找到' + type + '的配置')
			return ''
		}
	}

	getContract(name) {
		// if (!(name in this.contracts)) {
		// 	let contrs = this.getConfig('contracts')
		// 	if (contrs[name]) {
		// 		let address = contrs[name].address;
		// 		let abi =  require('@/assets/abi/source/' + name + '.json')
		// 		// let contra =
		// 		this.contracts[name] = this._genContract(abi, address)
		// 	} else {
		// 		console.error('没有找到对应的合约:', name)
		// 		return null
		// 	}
		// }
		// return this.contracts[name]
	}

	async _getContractWithAddress(address) {
		// throw Error('方法废弃，立即更改' + address)
		// 获取api.json
		const that = this
		return new Promise((resolve) => {
			getTheObj(address)

			async function getTheObj(add) {
				let res = await axios.get(Config.abiUrl.myformat(add))
				if (res.data.status === '0') {
					// 没有读取到
					setTimeout(() => {
						getTheObj(add)
					}, 500)
				} else {
					let abi = res.data
					resolve(that._genContract(abi, address))
				}
			}
		})
	}

	/**
	 * 可用账号临听
	 * @param {} listener
	 */
	addAccountUsableListener(listener) {
		this.onAccountConnectListener.push(listener)
	}

	/**
	 * 处理账号变化的事件
	 */
	handleAccountsChanged(accounts) {
		if (this.handleAccountsChangedActived) {
			return
		}
		this.handleAccountsChangedActived = true
		if (accounts && accounts.length > 0) {
			this.account = accounts[0]
			this.chainId = this.web3Ethereum.chainId
			console.log('handleAccountsChanged current Account =>>>>>>  ', this.account, 'chain id = ' + this.chainId)
			if (this.onConnect) {
				this.onConnect(this.account)
			}
		}
		if (this.onAccountConnectListener) {
			for (let i = 0; i < this.onAccountConnectListener.length; i++) {
				this.onAccountConnectListener[i](this.account)
			}
		}
		setTimeout(() => {
			this.handleAccountsChangedActived = false
		}, 100)
	}

	async getContractFree(name, address) {
		// console.log(name)
		// console.log(address)
		if (this.contracts[name]) {
			return this.contracts[name]
		} else {
			// 获取abi.json
			let contra = await this._getContractWithAddress(address)
			this.contracts[name] = contra
			return contra
		}
	}

	getHashSearchUrl() {
		return this.getConfig('hashurl')
	}

	/**
	 * 检测hash上链情况
	 * @param hash hash值
	 * @param retryCount 尝试次数
	 * @returns {Promise<any>}
	 */
	checkHashStatus(hash, retryCount = 10) {
		console.log('checkBlockStatusV2 hash = ' + hash + ', retryCount = ' + retryCount)
		const that = this
		return new Promise((resolve) => {
			doCheck()

			async function doCheck() {
				if (retryCount < 0) {
					resolve({
						res: false,
						err: 'Request TimeOut'
					})
				} else {
					let trans = await that.web3.eth.getTransactionReceipt(hash)
					//上链成功
					console.log('上链状态======>', trans)
					if (trans) {
						if (trans.blockHash && trans.blockNumber > 0 && trans.status) {
							resolve({
								res: true,
								data: {
									hash,
									trans
								}
							})
						} else {
							resolve({
								res: false,
								err: 'Transaction Failure'
							})
						}
					} else {
						setTimeout(() => {
							retryCount--;
							doCheck()
						}, 1000)
					}
				}
			}
		})
	}

	_genContract(abi, address) {
		return new this.web3.eth.Contract(abi, address);
	}
}

class RpcMainRequestor {
	constructor(rpc) {
		this.rpc = rpc
		this.contractTdex = this.rpc.getContract('tdex')
		this.tool = new RpcTools(rpc)
	}

	// getTTAllowance (spender) {
	//   let owner = this.rpc.account ;
	//   // let spender = this.rpc.spender
	//   // console.log(owner)
	//   // console.log(spender)
	//   let promise = this.contractTT.methods.allowance(owner, spender).call()
	//   // this._resolveRequest(promise,callback)
	//   return promise
	// }

	// /**
	//  * 获取Dvote合约地址
	//  * @returns {Promise<any>}
	//  */
	// getDVoteAddress () {
	//   return this.contractDvote.methods.getDVoteAddress().call()
	// }

	/**
	 * 获取交易挖矿合约地址
	 * @returns {Promise<any>}
	 */
	getMiningAddress() {
		if (this.rpc.chainName === 'heco') {
			return this.contractTdex.methods.mining().call()
		} else {
			return this.rpc.getAddress('mining')
		}
	}

	getBalanceWithAddress(address) {
		let sender = this.rpc.account
		// let sender = "0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F"
		return this.contractTdex.methods.balanceOf(address, sender).call()
	}

	getEntrustingOrderLen(address) {
		let sender = this.rpc.account
		// let sender = "0x073817f58541a2e0ad2abc42609f359e80efaf03"
		// let sender = "0x194ad74EB7BC6b46b98f0d3cdA9B643eC0c6C0Fc"
		// let sender = "0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F"
		return this.contractTdex.methods.getOrderUnmatchedListLength(address, sender).call()
	}

	getEntrustingOrderList(address, start, end) {
		let sender = this.rpc.account
		// let sender = "0x073817f58541a2e0ad2abc42609f359e80efaf03"
		// let sender = "0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F"
		// let sender = "0x194ad74EB7BC6b46b98f0d3cdA9B643eC0c6C0Fc"
		// console.log(start)
		// console.log(end)
		return this.contractTdex.methods.getOrderUnmatchedList(address, sender, start, end).call()
	}

	getEntrustingOrderDetail(address, orderid) {
		return this.contractTdex.methods.getOrder(address, orderid).call()
	}

	getOrderMatchingList(address, orderid) {
		return this.contractTdex.methods.getOrderMatching(address, orderid).call()
	}

	getOrderMatchDetail(address, matchid) {
		return this.contractTdex.methods.getMatch(address, matchid).call()
	}

	getOrderFinishLen(address) {
		let sender = this.rpc.account
		// let sender = "0x073817f58541a2e0ad2abc42609f359e80efaf03"
		// let sender = "0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F"
		// console.log(start)
		// console.log(end)
		return this.contractTdex.methods.getOrderFinishedListLength(address, sender).call()
	}

	getOrderFinishList(address, start, end) {
		let sender = this.rpc.account
		// let sender = "0x073817f58541a2e0ad2abc42609f359e80efaf03"
		// let sender = "0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F"
		return this.contractTdex.methods.getOrderFinishedList(address, sender, start, end).call()
	}

	getBuyOrderLen(address) {
		return this.contractTdex.methods.getBuyOrderPriceListLength(address).call()
	}

	getBuyOrderList(address, count) {
		return this.contractTdex.methods.getBuyOrderPublished(address, count).call()
	}

	getSellOrderLen(address) {
		return this.contractTdex.methods.getSellOrderPriceListLength(address).call()
	}

	getSellOrderList(address, count) {
		return this.contractTdex.methods.getSellOrderPublished(address, count).call()
	}

	cancelTheOrder(address, orderid) {
		let sendAbi = this.contractTdex.methods.Cancel(address, orderid).encodeABI();
		return this.tool._writeOprationV2(sendAbi, this.rpc.getAddress('tdex'), 'cancelTheOrder')
	}

	checkAndInitContractObj(token) {
		// return new Promise((resolve) => {
		// 	if (this.rpc.contracts[token]) {
		// 		resolve(this.rpc.contracts[token])
		// 	} else {
		// 		// let contract = null
		// 		let abi =  require('@/assets/abi/ierc20.json')
		// 		let contra = this.rpc._genContract(abi, token)
		// 		this.rpc.contracts[token] = contra
		// 		resolve(contra)
		// 		// this.rpc._getContractWithAddress(token).then(res => {
		// 		//   contract = res
		// 		//   this.rpc.contracts[token] = contract
		// 		//   resolve(contract)
		// 		// })
		// 	}
		// })
	}

	checkAllowanceWithTdex(token, amount) {
		BigNumber.config({EXPONENTIAL_AT: 100})
		return new Promise((resolve) => {
			this.checkAndInitContractObj(token).then(async contract => {
				let res = await contract.methods.allowance(this.rpc.account, this.rpc.getAddress('tdex')).call()
				console.log(res)
				if (new BigNumber(res).isLessThan(new BigNumber(amount))) {
					resolve(false)
				} else {
					resolve(true)
				}
			})
		})
	}

	allowanceWithTdex(token, amount) {
		return new Promise((resolve, reject) => {
			this.checkAndInitContractObj(token).then(async contract => {
				let sendAbi = contract.methods.approve(this.rpc.getAddress('tdex'), amount).encodeABI()
				let res = await this.tool._writeOprationV2(sendAbi, token, 'approveWithTdex')
				resolve(res)
			}).catch(e => {
				reject(e)
			})
		})
	}

	sendOrderBuy(address, price, amount) {
		// console.log(price)
		// console.log(amount)
		let sendAbi = this.contractTdex.methods.Buy(address, price, amount).encodeABI();
		return this.tool._writeOprationV2(sendAbi, this.rpc.getAddress('tdex'), 'sendOrderBuy')
	}

	sendOrderSell(address, price, amount) {
		// console.log(price)
		// console.log(amount)
		let sendAbi = this.contractTdex.methods.Sell(address, price, amount).encodeABI();
		return this.tool._writeOprationV2(sendAbi, this.rpc.getAddress('tdex'), 'sendOrderSell')
	}


	sendOrderBuyETH(price, amount) {
		// console.log(price)
		// console.log(amount)
		let sendAbi = this.contractTdex.methods.BuyETH(price, amount).encodeABI();
		return this.tool._writeOprationV2(sendAbi, this.rpc.getAddress('tdex'), 'sendOrderBuyETH')
	}

	sendOrderSellETH(price, amount) {
		// console.log(price)
		console.log(price)
		console.log(amount)
		let sendAbi = this.contractTdex.methods.SellETH(price).encodeABI();
		return this.tool._writeOprationV2(sendAbi, this.rpc.getAddress('tdex'), 'sendOrderSellETH', amount)
	}

}

class RpcSubRequestor {
	constructor(rpc) {
		this.rpc = rpc
		/**
		 * 交易挖矿合约对象
		 */
		this.contractMining = null
		/**
		 * 交易挖矿返佣合约对象
		 */
		this.contractRebate = null
		this.tool = new RpcTools(rpc)
		this.contractAddress = ''
	}

	// async miningContractInit (address) {
	// 	if (!this.contractMining) {
	// 		this.contractAddress = address
	// 		let abi = require('@/assets/abi/source/mining.json')
	// 		this.contractMining = this.rpc._genContract(abi, address)
	// 		// this.contractMining = await this.rpc._getContractWithAddress(address)
	// 		// let rebateAddress = this.rpc.getAddress('rebate')
	// 		// let abi2 = require('@/assets/abi/source/rebate.json')
	// 		// 交易挖矿返佣
	// 		this.contractRebate = this.rpc.getContract('rebate')
	// 		// this.contractRebate = this.rpc._genContract(abi2, rebateAddress)
	// 		// await this.tool._sleep(300)
	// 		// this.contractRebate = await this.rpc._getContractWithAddress(rebateAddress)
	// 	}
	// 	// return this.contractMining
	// }

	checkObjInited() {
		return this.contractMining && this.contractRebate
	}

	getMiningLevels(addresslist) {
		let sender = this.rpc.account
		// let sender = '0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F'
		// console.log(sender)
		return this.contractMining.methods.getLevels(addresslist, sender).call()
	}

	getMiningReleasedRevenueOf() {
		let sender = this.rpc.account
		return this.contractMining.methods.getReleasedRevenueOf(sender).call()
	}

	getMiningTotalExtract() {
		let sender = this.rpc.account
		return this.contractMining.methods.totalExtract(sender).call()
	}

	getMiningOrderRecordsLen(token) {
		// let sender = '0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F'
		let sender = this.rpc.account
		return this.contractMining.methods.getOrderMiningIdListLength(token, sender).call()
	}

	getMiningOrderRecords(token, index) {
		// let sender = '0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F'
		let sender = this.rpc.account
		// console.log(token)
		// console.log(index)
		return this.contractMining.methods.getOrderMiningsInIndexs(token, sender, index).call()
	}

	getMiningWithRecordsLen() {
		// let sender = '0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F'
		let sender = this.rpc.account
		return this.contractMining.methods.getUserReceiveRecordLength(sender).call()
	}

	getMiningWithRecords(index) {
		// let sender = '0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F'
		let sender = this.rpc.account
		// console.log(sender)
		// console.log(index)
		return this.contractMining.methods.getUserReceiveRecords(sender, index).call()
		// return this.contractMining.methods.getReceiveRecordLastId().call()
	}

	getMiningRebateIncome() {
		let sender = this.rpc.account
		// console.log(this.contractRebate.methods)
		// let sender = '0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F'
		return this.contractRebate.methods.getIncome(sender).call()
	}

	getMiningRebateRecordsLen() {
		// let sender = '0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F'
		let sender = this.rpc.account
		return this.contractRebate.methods.getUserTaxRecordLength(sender).call()
	}

	getMiningRebateRecordsList(index) {
		// let sender = '0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F'
		let sender = this.rpc.account
		console.log(index)
		return this.contractRebate.methods.getUserTaxRecordsInIndexs(sender, index).call()
	}

	getMiningRebateWithdrawRecordsLen() {
		// let sender = '0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F'
		// let sender = '0x8E2947c87Fb2Fd3f83c1863906F4CAc841Ac6e68'
		let sender = this.rpc.account
		return this.contractRebate.methods.getUserWithdrawLength(sender).call()
	}

	getMiningRebateWithdrawRecordsList(index) {
		// let sender = '0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F'
		// let sender = '0x8E2947c87Fb2Fd3f83c1863906F4CAc841Ac6e68'
		let sender = this.rpc.account
		return this.contractRebate.methods.getWithdrawRecordsInIndexs(sender, index).call()
	}

	miningWithdraw() {
		let sendAbi = this.contractMining.methods.sendReceive().encodeABI();
		return this.tool._writeOprationV2(sendAbi, this.contractAddress, 'miningWithdraw')
	}

	miningRebateWithdraw() {
		let sendAbi = this.contractRebate.methods.sendReceive().encodeABI();
		return this.tool._writeOprationV2(sendAbi, this.contractAddress, 'miningRebateWithdraw')
	}

	getCurrentCycleId() {
		return this.contractMining.methods.getCycleId().call()
	}

	async getCurrentMiners() {
		let id = await this.getCurrentCycleId()
		// console.log(id)
		// return this.contractMining.methods.getCycles([id]).call()
		return this.getMinerList([id])
	}

	async getMinerList(ids) {
		return this.contractMining.methods.getCycles(ids).call()
	}
}

class RpcBoxRequestor {
	constructor(rpc) {
		this.rpc = rpc
		this.contractBox = null
		this.contractBoxShare = null
		this.contractBoxGet = null
		this.contractBoxOpen = null
		this.tool = new RpcTools(rpc)
		this.contractObjInit()
	}

	async contractObjInit() {
		// await this.tool._sleep(500)
		// if (Config.isDebug) {
		//   this.contractBox = await this.rpc._getContractWithAddress(this.rpc.getAddress('box'))
		// } else {
		// this.contractBox = await this.rpc._getContractWithAddress(this.rpc.getAddress('box'))
		this.contractBox = this.rpc.getContract('box')
		// }
		this.contractBoxShare = this.rpc.getContract('boxshare')
		this.contractBoxGet = this.rpc.getContract('boxget')
		this.contractBoxOpen = this.rpc.getContract('boxopen')
		// await this.tool._sleep(500)

		// await this.tool._sleep(500)
		// this.contractBoxShare = await this.rpc._getContractWithAddress(this.rpc.getAddress('boxshare'))
		// await this.tool._sleep(500)
		// this.contractBoxGet = await this.rpc._getContractWithAddress(this.rpc.getAddress('boxget'))
		// await this.tool._sleep(500)
		// this.contractBoxOpen = await this.rpc._getContractWithAddress(this.rpc.getAddress('boxopen'))
	}

	checkObjInited() {
		return this.contractBox && this.contractBoxShare && this.contractBoxGet && this.contractBoxOpen
	}

	getShareCode() {
		let sender = this.rpc.account
		// return this.contractBox.methods.getCode(sender).call()
		return this.contractBoxShare.methods.getCode(sender).call()
	}

	getBoxHomeData() {
		// let sender = '0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F'
		let sender = this.rpc.account
		return this.contractBox.methods.getBlindBoxHomeData(sender).call()
	}

	getInfoFromCode(code) {
		return this.contractBox.methods.getForCode(code).call()
	}

	// setShareCode (address) {
	//   let sendAbi = this.contractBox.methods.setCode(address).encodeABI();
	//   return this.tool._writeOprationV2(sendAbi, this.rpc.getAddress('box'), 'setShareCode')
	// }

	doOpen() {
		let sendAbi = this.contractBoxOpen.methods.open().encodeABI();
		return this.tool._writeOprationV2(sendAbi, this.rpc.getAddress('boxopen'), 'doOpen')
	}

	getChildLen() {
		// let sender = '0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F'
		let sender = this.rpc.account
		return this.contractBoxShare.methods.getChildrenLength(sender).call()
	}

	getChildList(index) {
		// let sender = '0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F'
		let sender = this.rpc.account
		return this.contractBox.methods.getChildrenFrom(sender, index).call()
	}
}

class RpcBlackRequestor {
	constructor(rpc) {
		this.rpc = rpc
		this.contractBlack = null
		this.contractTradePool = null
		this.tool = new RpcTools(rpc)
		try {
			this.contractObjInit()
		} catch (e) {
			console.log(e)
		}
	}

	async contractObjInit() {
		this.contractBlack = this.rpc.getContract('blackhole')
		this.contractTradePool = this.rpc.getContract('tradepool')
		// await this.tool._sleep(300)
		// this.contractBlack = await this.rpc._getContractWithAddress(this.rpc.getAddress('blackhole'))
		// await this.tool._sleep(300)
		// this.contractTradePool = await this.rpc._getContractWithAddress(this.rpc.getAddress('tradepool'))
	}

	checkObjInited() {
		return this.contractBlack && this.contractTradePool
	}

	getBlackHoleAdd() {
		return this.rpc.getAddress('blackhole')
	}

	getBlackHoleTotalBalance() {
		return this.contractBlack.methods.total().call()
	}

	getTradePoolAdd() {
		return this.rpc.getAddress('tradepool')
	}

	getTradePoolRest() {
		return this.contractTradePool.methods.balance().call()
	}

	getTotalProduction() {
		return this.contractTradePool.methods.totalProduction().call()
	}

	getTotalBurn() {
		return this.contractTradePool.methods.totalBurn().call()
	}

	getDailyCap() {
		return this.contractTradePool.methods.dailyCap().call()
	}
}

class RpcRebateRequestor {
	constructor(rpc) {
		this.rpc = rpc
		this.contractRebate = null
		this.tool = new RpcTools(rpc)
		this.identity = null
		this.contractObjInit()
	}

	async contractObjInit() {
		if (this.rpc.chainName === 'heco') {
			this.contractRebate = this.rpc.getContract('rebatep')
		} else {
			this.contractRebate = this.rpc.getContract('rebatep2')
		}
		// await this.tool._sleep(300)
		// await this.tool._sleep(300)
		// this.contractRebate = await this.rpc._getContractWithAddress(this.rpc.getAddress('rebatep'))
		// await this.getIdentity()
	}

	checkObjInited() {
		return !!this.contractRebate
	}

	getIdentity() {
		return new Promise(resolve => {
			if (this.identity) {
				resolve(this.identity)
			} else {
				// let sender = '0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F'
				// let sender = '0x8E2947c87Fb2Fd3f83c1863906F4CAc841Ac6e68'
				let sender = this.rpc.account
				// let sender = '0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F'
				// let sender = '0x8E2947c87Fb2Fd3f83c1863906F4CAc841Ac6e68'
				this.contractRebate.methods.getIdentity(sender).call().then(res => {
					let tmp
					if (this.tool._is(res, 'String')) {
						tmp = {
							channel: "",
							tppBusiness: "",
							tppOwner: ""
						}
						if (res === 'IdentityTppOwner') {
							tmp.tppOwner = 'IdentityTppOwner'
						} else if (res === 'IdentityTppBusiness') {
							tmp.tppBusiness = 'IdentityTppBusiness'
						}
					} else {
						tmp = res
					}
					// res = 'IdentityTppBusiness'
					this.identity = tmp
					resolve(tmp)
				})
			}
		})
	}

	getChannelRevenList(addresslist) {
		let sender = this.rpc.account
		// let sender = '0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F'
		// let sender = '0x8E2947c87Fb2Fd3f83c1863906F4CAc841Ac6e68'
		return this.contractRebate.methods.channelRevenueList(addresslist, sender).call()
	}

	getOtherRevenList(addresslist) {
		let sender = this.rpc.account
		// let sender = '0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F'
		// let sender = '0x8E2947c87Fb2Fd3f83c1863906F4CAc841Ac6e68'
		return this.contractRebate.methods.tppRevenueList(addresslist, sender).call()
	}

	getBusinessTokenList() {
		let sender = this.rpc.account
		// let sender = '0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F'
		// let sender = '0x8E2947c87Fb2Fd3f83c1863906F4CAc841Ac6e68'
		return this.contractRebate.methods.getTppBusinessList(sender).call()
	}

	getOwnerTokenList() {
		let sender = this.rpc.account
		// let sender = '0x5D482E16A2c92d92841eaA2Cd4abcA76948d779F'
		// let sender = '0x8E2947c87Fb2Fd3f83c1863906F4CAc841Ac6e68'
		return this.contractRebate.methods.getTppOwnerList(sender).call()
	}

	doChannelWithdraw(address) {
		let sendAbi = this.contractRebate.methods.channelWithdraw(address).encodeABI();
		return this.tool._writeOprationV2(sendAbi, this.rpc.getAddress('rebatep'), 'doChannelWithdraw')
	}

	doPlatformWithdraw(address) {
		let sendAbi = this.contractRebate.methods.platformWithdraw(address).encodeABI();
		return this.tool._writeOprationV2(sendAbi, this.rpc.getAddress('rebatep'), 'doPlatformWithdraw')
	}

	doTppWithdraw(address) {
		let sendAbi = this.contractRebate.methods.tppWithdraw(address).encodeABI();
		return this.tool._writeOprationV2(sendAbi, this.rpc.getAddress('rebatep'), 'doTppWithdraw')
	}

	getWithdrawLen() {
		let sender = this.rpc.account
		// let sender = '0x8E2947c87Fb2Fd3f83c1863906F4CAc841Ac6e68'
		// let sender = '0x8E2947c87Fb2Fd3f83c1863906F4CAc841Ac6e68'
		return this.contractRebate.methods.getWithdrawLength(sender).call()
	}

	getWithdrawList(index) {
		let sender = this.rpc.account
		// let sender = '0x8E2947c87Fb2Fd3f83c1863906F4CAc841Ac6e68'
		// let sender = '0x8E2947c87Fb2Fd3f83c1863906F4CAc841Ac6e68'
		return this.contractRebate.methods.getWithdrawRecordsInIndexs(sender, index).call()
	}

	getWithdrawTppLen() {
		let sender = this.rpc.account
		// let sender = '0x8E2947c87Fb2Fd3f83c1863906F4CAc841Ac6e68'
		// let sender = '0x8E2947c87Fb2Fd3f83c1863906F4CAc841Ac6e68'
		return this.contractRebate.methods.getWithdrawTppLength(sender).call()
	}

	getWithdrawTppList(index) {
		let sender = this.rpc.account
		// let sender = '0x8E2947c87Fb2Fd3f83c1863906F4CAc841Ac6e68'
		// let sender = '0x8E2947c87Fb2Fd3f83c1863906F4CAc841Ac6e68'
		return this.contractRebate.methods.getWithdrawTppRecordsInIndexs(sender, index).call()
	}

}

class RpcTools {
	constructor(rpc) {
		this.rpc = rpc
	}

	_sleep(time) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve()
			}, time)
		})
	}

	_is(obj, type) {
		return type === Object.prototype.toString.call(obj).slice(8, -1)
	}

	_writeOprationV2(methodEncode, abiaddresss, methodName, amount = 0) {
		return new Promise((resolve) => {
			console.log('准备执行写方法v2 =====> ' + methodName + ', abiAdress ==> ' + abiaddresss)
			let param = {
				to: abiaddresss,
				from: this.rpc.account,
				data: methodEncode,
				chainId: this.rpc.chainId,
			};
			if (amount !== 0) {
				param.value = '0x' + new BigNumber(amount).toString(16)
			}
			// console.log(param)
			this.rpc.web3Ethereum.request({
				method: 'eth_sendTransaction',
				params: [param],
			}).then((data) => {
				console.log(methodName + ' 结果hash = ' + data)
				resolve({
					res: true,
					data
				})
				// //检测上链状态
				// return this._checkBlockStatusV2(data, 10, methodName)
			}).catch((err) => {
				console.log('writeOpration err = > ', err)
				if (err.code === 4001) {
					//用户取消
					resolve({
						res: false,
						err: 'User denied transaction'
					})
				} else {
					//操作失败
					resolve({
						res: false,
						err: 'Opration Failure'
					})
				}
			})
		})
	}
}
