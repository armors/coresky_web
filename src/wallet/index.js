// import { arrayify, hexlify } from "@ethersproject/bytes";
import { ethers } from 'ethers';
const { ethereum } = window;

/**
 *  Web3Provider 实例化
 */
const getWeb3Provider = () => {
	if (!ethereum) {
		console.error('there is no web3 provider.');
		return null;
	}
	window.web3Provider = new ethers.providers.Web3Provider(ethereum, 'any');
	return window.web3Provider;
};

/**
 * MetaMask 是否安装
 */
const isInstalled = () => {
	return Boolean(ethereum && ethereum.isMetaMask);
};

/**
 * wallet disconnect
 */
const disconnected = async () => {
	console.warn('wallet disconnected');
	sessionStorage.removeItem('authorization');
};

/**
 * account changed
 */
const accountChanged = (accounts) => {
	let account = '';
	if (accounts && accounts.length === 0) {
		disconnected();
		account = accounts;
	} else {
		account = accounts[0];
		document.cookie = '__account__=' + account + ';max-age=1296000';
	}
	sessionStorage.removeItem('authorization');
	return account;
};

/**
 * chain changed
 */
const chainChanged = (chainId) => {
	console.log(
		'wallet chainId changed: ' + chainId + ' = ' + parseInt(chainId, 16)
	);
	return parseInt(chainId, 16);
};

/**
 * connect MetaMask
 */

const connectMetaMask = async () => {
	let accounts = [];
	console.log('try connect wallet...');
	// if (!window.getWeb3Provider) {
	//   console.error("there is no web3 provider.");
	//   getWeb3Provider();
	//   return false;
	// }
	try {
		accounts = await ethereum.request({
			method: 'eth_requestAccounts',
		});
		chainChanged(
			await ethereum.request({
				method: 'eth_chainId',
			})
		);
		requestGetSignature();
		ethereum.on('accountsChanged', accountChanged);
		ethereum.on('chainChanged', chainChanged);
	} catch (e) {
		console.error('could not get a wallet connection.', e);
		return false;
	}
	console.log('wallet connected');
	return accounts;
};

const address = async () => {
	let accounts = [];
	accounts = await ethereum.request({
		method: 'eth_requestAccounts',
	});
	return accounts;
};

const signMessage = async (msg) => {
	console.log('request sign message: ' + msg);
	return await getWeb3Provider()
		.getSigner()
		.signMessage(msg);
};

const requestGetSignature = async () => {
	let auth = sessionStorage.getItem('authorization');
	if (!auth) {
		let payload =
			'GET' + ' ' + new Date(Date.now() + 7200000).toISOString();
		let signature = await signMessage(payload);
		auth = 'ETHEREUM ' + payload + ' ' + signature;
		sessionStorage.setItem('authorization', auth);
	}
	return auth;
};

const requestPostSignature = async () => {
	let payload = 'POST' + ' ' + new Date(Date.now() + 60000).toISOString();
	let signature = await signMessage(payload);
	let auth = 'ETHEREUM ' + payload + ' ' + signature;
	return auth;
};

const requestSignature = async (type) => {
	return type === 'GET' ? requestGetSignature() : requestPostSignature();
};
export default {
	isInstalled,
	disconnected,
	accountChanged,
	chainChanged,
	connectMetaMask,
	address,
	getWeb3Provider,
	signMessage,
	requestPostSignature,
	requestGetSignature,
	requestSignature,
};
