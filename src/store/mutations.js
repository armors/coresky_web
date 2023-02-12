import {
  setLocalStorage,
  removeLocalStorage,
  getLocalStorage,
} from "@/util/local-storage.js";
import sdk from "@/util/sdk/index.js";
import tools from "@/util/tools.js";
import * as filters from "@/filters";
import store from "@/store/index";

export default {
  WEB_LOADING (state) {
    state.webLoading = true;
  },
  ETH_PRICE (state, payload) {
    state.ethPrice = payload
  },
  CONFIG (state, payload) {
    console.log(payload);
    state.config = Object.assign({}, payload);
    state.config.protocolFeeHan = filters.feeFormat(state.config.protocolFee)
  },
  GAS_TRACKER (state, payload) {
    if (!payload) return;
    state.gasTracker = payload;
  },
  CONNECT (state, payload) {
    if (payload.coinbase)
      payload.coinbase = payload.coinbase.toLocaleLowerCase();

    state.user = Object.assign({}, state.user, {
      coinbase: payload.coinbase,
    });
    state.useAuthorization = `Coresky${state.user.coinbase}Authorization`
    state.useAuthorizationTime = `Coresky${state.user.coinbase}AuthorizationTime`
    state.web3 = Object.assign({}, state.web3, {
      networkId: payload.networkId,
      walletType: payload.walletType,
    });
    state.connected = true;
    setLocalStorage({
      connected: true,
    });
  },
  WEB3 (state, payload) {
    state.web3 = Object.assign({}, state.web3, {
      networkId: payload.networkId,
      walletType: payload.walletType,
    });
  },
  LOGIN (state, payload) {
    console.log(payload)
    state.token = payload.token;
    if (payload.user && payload.user.address) {
      payload.user.address = payload.user.address.toLocaleLowerCase();
    }
    state.user = Object.assign({}, state.user, {
      coinbase: payload.user.address || "",
      avatar: payload.user.photo || "",
      brief: payload.user.brief || "",
      nickname: payload.user.nickname || "",
      shortUrl: payload.user.shortUrl || "",
      bannerUrl: payload.user.bannerUrl || "",
      id: payload.user.id || "",
    });
    state.useAuthorization = `Coresky${state.user.coinbase}Authorization`
    state.useAuthorizationTime = `Coresky${state.user.coinbase}AuthorizationTime`
    state.web3 = Object.assign({}, state.web3, {
      networkId: payload.networkId,
      walletType: payload.walletType,
    });
    state.isLogin = true;
    state.connected = true;
    let auth = {}
    auth[state.useAuthorization] = payload.token
    auth[state.useAuthorizationTime] = new Date().getTime()
    setLocalStorage(auth);
    setLocalStorage({
      connected: true,
    });
  },
  LOGOUT (state) {
    removeLocalStorage(state.useAuthorization);
    removeLocalStorage(state.useAuthorizationTime);
    removeLocalStorage("connected");
    state.user = {
      coinbase: "",
      avatar: "",
      brief: "",
      nickname: "",
      shortUrl: "",
      bannerUrl: "",
      id: "",
    };
    state.web3 = {
      address: null,
      coinbase: null,
      error: null,
      instance: null,
      isInjected: false,
      walletType: "",
      networkId: null,
    };
    state.useAuthorization = undefined
    state.useAuthorizationTime = '0'
    state.ethBalance = "0";
    state.erc20Balance = {};
    state.token = null;
    state.isLogin = false;
    state.connected = false;
    state.notice_unread = 0;
    state.message = {
      total: 0,
      unread: 0,
    };
    state.shoppingCartList = []
    state.shoppingOpenseaCartList = []
  },
  RELOAD (state) {
    state.isLogin = true;
    var items = getLocalStorage(state.useAuthorization);
    state.token = items[state.useAuthorization];
  },
  USERINFO (state, payload) {
    if (payload.address) payload.address = payload.address.toLocaleLowerCase();

    state.user = Object.assign({}, state.user, {
      coinbase: payload.address || "",
      avatar: payload.photo || "",
      brief: payload.brief || "",
      nickname: payload.nickname || "",
      shortUrl: payload.shortUrl || "",
      bannerUrl: payload.bannerUrl || "",
      rewards: payload.rewards || 0,
      score: payload.score || 0,
      id: payload.id || "",
    });
    state.useAuthorization = `Coresky${state.user.coinbase}Authorization`
  },
  NOTICE_UNREAD (state, payload) {
    state.notice_unread = payload;
  },
  MESSAGE (state, payload) {
    state.message = {
      total: payload.totalCount,
      unread: payload.unreadCount,
    };
  },
  HEARTBEAT (state, timer) {
    state.heartbeatTimer = timer;
  },
  ETH_BALANCE (state, balance) {
    state.ethBalance = balance;
  },
  ERC20_BALANCE (state, payload) {
    state.erc20Balance = Object.assign({}, state.erc20Balance, payload);
  },
  PAYTOKENS (state, payTokens) {
    let _paytokens = [];
    for (var i = 0; i < payTokens.length; i++) {
      let paytoken = payTokens[i];
      if (paytoken.address == sdk.NULL_ADDRESS()) {
        paytoken.erc20 = false;
      } else {
        paytoken.erc20 = true;
      }
      if (paytoken.isDefault) {
        state.defalutPayToken = paytoken;
      }
      _paytokens.push(paytoken);
    }
    state.payTokens = _paytokens;
  },
  ADD_PAYTOKEN (state, payToken) {
    let payTokens = state.payTokens;
    let existed = false;
    for (var i = 0; i < payTokens.length; i++) {
      let _payToken = payTokens[i];
      if (
        _payToken.address == payToken.address &&
        _payToken.tokenId == payToken.address
      ) {
        return;
      }
    }
    if (payToken.address == sdk.NULL_ADDRESS()) {
      payToken.erc20 = false;
    } else {
      payToken.erc20 = true;
    }
    state.payTokens = [].concat(state.payTokens, payToken);
  },
  CATEGORYS (state, categorys) {
    state.categorys = categorys;
  },
  setCurrentView (state, newRoute) {
    state.currentView = newRoute.meta.view;
  },
  changeCurrentRouteTo (state, newRoute) {
    state.currentRoute = newRoute;
  },
  setShoppingCart (state, list) {
    state.shoppingCartList = list;
  },
  addShoppingCart (state, goods) {
    let cartName = 'coresky_cart_' + state.user.coinbase
    const local = getLocalStorage(cartName)
    let coresky_cart = local[cartName]
    if (local[cartName] !== null) {
      coresky_cart = JSON.parse(coresky_cart)
    } else {
      coresky_cart = []
    }
    coresky_cart.push(goods)
    const obj = {}
    obj[cartName] = JSON.stringify(coresky_cart)
    setLocalStorage(obj)
    state.shoppingCartList = coresky_cart;
  },
  addShoppingCartOpensea (state, payload) {
    let cartName = 'coresky_cart_opensea_' + state.user.coinbase
    const local = getLocalStorage(cartName)
    let coresky_cart = local[cartName]
    if (local[cartName] !== null) {
      coresky_cart = JSON.parse(coresky_cart)
    } else {
      coresky_cart = []
    }
    const isInCart = coresky_cart.find(item => item.orderHash === payload.orderHash)
    if (!isInCart) {
      coresky_cart.push(payload)
      const obj = {}
      obj[cartName] = JSON.stringify(coresky_cart)
      setLocalStorage(obj)
    }
    state.shoppingOpenseaCartList = coresky_cart;
  },
  initShoppingCart (state) {
    if (!state.user.coinbase) {
      state.shoppingCartList = []
      state.shoppingOpenseaCartList = []
      return
    }
    let cartName = 'coresky_cart_' + state.user.coinbase
    const local = getLocalStorage(cartName)
    let coresky_cart = local[cartName]
    if (local[cartName] !== null) {
      coresky_cart = JSON.parse(coresky_cart)
    } else {
      coresky_cart = []
    }
    state.shoppingCartList = coresky_cart;

    let cartNameOpnesea = 'coresky_cart_opensea_' + state.user.coinbase
    const localOpensea = getLocalStorage(cartNameOpnesea)
    let coresky_cart_opensea = localOpensea[cartNameOpnesea]
    if (localOpensea[cartNameOpnesea] !== null) {
      coresky_cart_opensea = JSON.parse(coresky_cart_opensea)
    } else {
      coresky_cart_opensea = []
    }
    state.shoppingOpenseaCartList = coresky_cart_opensea;
  }
};
