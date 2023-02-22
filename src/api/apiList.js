export default {
  home: {
    list: {
      url: "/home/query",
      method: "post",
    },
    search: {
      url: "/home/search",
      method: "post",
    },
    searchuser: {
      url: "/home/searchuser",
      method: "post",
    },
    indexlist: {
      url: "/home/indexlist",
      method: "post",
    },
    addTopic: {
      url: "/home/addTopic",
      method: "post",
    }
  },
  config: {
    fetch: {
      url: "/user/config",
      method: "post",
    },
    gasTracker: {
      url: "/config/gasTracker",
      method: "post",
    },
  },
  user: {
    setbanner: {
      url: "/user/setbanner",
      method: "post",
    },
    login: {
      url: "/user/login",
      method: "post",
    },
    stat: {
      url: "/user/stat",
      method: "post",
    },
    reload: {
      url: "/user/reload",
      method: "post",
    },
    profile: {
      url: "/user/profile",
      method: "post",
    },
    setprofile: {
      url: "/user/setprofile",
      method: "post",
    },
    info: {
      url: "/user/info",
      method: "post",
    },
    update: {
      url: "/user/update",
      method: "post",
    },
    match: {
      url: "/user/match",
      method: "post",
    },
    listbyaddr: {
      url: "/user/listbyaddr",
      method: "post",
    },
    contract: {
      url: "/user/contract",
      method: "post",
    },
    onsales: {
      url: "/user/onsales",
      method: "post",
    },
    collections: {
      url: "/user/collections",
      method: "post",
    },
    listcontract: {
      url: "/user/listcontract",
      method: "post",
    },
    created: {
      url: "/user/created",
      method: "post",
    },
    like: {
      url: "/user/like",
      method: "post",
    },
    following: {
      url: "/user/following",
      method: "post",
    },
    follows: {
      url: "/user/follows",
      method: "post",
    },
    bid: {
      url: "/user/bid",
      method: "post",
    },
    token: {
      url: "/user/token",
      method: "post",
    },
    activity: {
      url: "/user/activity",
      method: "post",
    },
    scoreDetail: {
      url: "/user/score/detail",
      method: "post",
    },
  },
  collect: {
    tokenQuery: {
      url: '/collection/token/query',
      method: "post",
    },
    tokenCancel: {
      url: '/collection/token/cancel',
      method: "post",
    },
    tokenFollow: {
      url: '/collection/token/follow',
      method: "post",
    },
    contractQuery: {
      url: '/collection/contract/query',
      method: "post",
    },
    contractCancel: {
      url: '/collection/contract/cancel',
      method: "post",
    },
    contractFollow: {
      url: '/collection/contract/follow',
      method: "post",
    },
    info: {
      url: "/collections/info",
      method: "post",
    },
    query: {
      url: "/collections/query",
      method: "post",
    },
    tokenInfo: {
      url: "/token/info",
      method: "post",
    },
    tokenOrderOffer: {
      url: "/token/orders",
      method: "post",
    },
    tokenEvent: {
      url: "/token/event",
      method: "post",
    },
    tokenActivity: {
      url: "/token/activity",
      method: "post",
    }
  },
  contract: {
    getinfo: {
      url: "/contract/getinfo",
      method: "post",
    },
    list: {
      url: "/contract/list",
      method: "post",
    },
    listbyaddr: {
      url: "/contract/listbyaddr",
      method: "post",
    },
    listitems: {
      url: "/contract/listitems",
      method: "post",
    },
    info: {
      url: "/contract/info",
      method: "post",
    },
    stat: {
      url: "/contract/stat",
      method: "post",
    },
    create: {
      url: "/contract/create",
      method: "post",
    },
    listall: {
      url: "/contract/listall",
      method: "post",
    },
  },
  paytoken: {
    list: {
      url: "/paytoken/list",
      method: "post",
    },
  },
  follow: {
    add: {
      url: "/follow/add",
      method: "post",
    },
    delete: {
      url: "/follow/delete",
      method: "post",
    },
    match: {
      url: "/follow/match",
      method: "post",
    },
    follows: {
      url: "/follow/follows",
      method: "post",
    },
    followers: {
      url: "/follow/followers",
      method: "post",
    },
  },
  notice: {
    read: {
      url: "/notices/read",
      method: "post",
    },
    readall: {
      url: "/notices/readall",
      method: "post",
    },
    count: {
      url: "/notices/count",
      method: "post",
    },
    list: {
      url: "/notices/list",
      method: "post",
    },
    unread: {
      url: "/notices/unread",
      method: "post",
    },
    countunread: {
      url: "/notices/countunread",
      method: "post",
    },
  },
  dapp: {
    sign: {
      url: "/dapp/sign",
      method: "post",
    },
  },
  nft: {
    add: {
      url: "/nft/add",
      method: "post",
    },
    list: {
      url: "/home/list",
      method: "post",
    },
    detail: {
      url: "/nft/detail",
      method: "post",
    },
    owners: {
      url: "/nft/owners",
      method: "post",
    },
    bids: {
      url: "/nft/bids",
      method: "post",
    },
    history: {
      url: "/nft/history",
      method: "post",
    },
    activebids: {
      url: "/nft/activebids",
      method: "post",
    },
    activesales: {
      url: "/nft/activesales",
      method: "post",
    },
    getmedia: {
      url: "/nft/getmedia",
      method: "post",
    },
    getroyalties: {
      url: "/nft/getroyalties",
      method: "post",
    },
  },
  like: {
    add: {
      url: "/like/add",
      method: "post",
    },
    remove: {
      url: "/like/remove",
      method: "post",
    },
    listuserlike: {
      url: "/like/listuserlike",
      method: "post",
    },
  },
  order: {
    // self start
    create: {
      url: "/order/create",
      method: "post",
    },
    finish: {
      url: "/order/finish",
      method: "post",
    },
    batchFinish: {
      url: "/order/batchFinish",
      method: "post",
    },
    check: {
      url: "/order/check",
      method: "post",
    },
    auctionFinish: {
      url: "/order/auctionFinish",
      method: "post",
    },
    cancel: {
      url: "/order/cancel",
      method: "post",
    },
    orderInfo: {
      url: "/order/info",
      method: "post",
    },
    orderAuction: {
      url: "/order/auction",
      method: "post",
    },
    // self end
    submit: {
      url: "/order/submit",
      method: "post",
    },
    list: {
      url: "/order/list",
      method: "post",
    },
    prepare: {
      url: "/order/prepare",
      method: "post",
    },
    buyerFee: {
      url: "/order/buyerFee",
      method: "post",
    },
    add: {
      url: "/order/add",
      method: "post",
    },
    get: {
      url: "/order/get",
      method: "post",
    },
  },
  category: {
    list: {
      url: "/category/list",
      method: "post",
    },
  },
  storage: {
    list: {
      url: "/storage/list",
      method: "post",
    },
    upload: {
      url: "/storage/upload",
      method: "post",
    },
    read: {
      url: "/storage/read",
      method: "post",
    },
    update: {
      url: "/storage/update",
      method: "post",
    },
    delete: {
      url: "/storage/delete",
      method: "post",
    },
    multiupload: {
      url: "/storage/multiupload",
      method: "post",
    },
  },
  token: {
    query: {
      url: "/token/query",
      method: "post",
    },
    price: {
      url: "/token/price",
      method: "post",
    }
  },
  collections: {
    type: {
      url: "/collections/type",
      method: "post",
    },
    filter: {
      url: "/collections/filter",
      method: "post",
    }
  },
  launchpad: {
    info: {
      url: "/launchpad/info",
      method: "post",
    },
    buy: {
      url: "/launchpad/buy",
      method: "post",
    },
    bet: {
      url: "/launchpad/bet",
      method: "post",
    },
    query: {
      url: "/launchpad/query",
      method: "post",
    },
    result: {
      url: "/launchpad/result",
      method: "post",
    }
  },
  oss: {
    url: "/oss",
    method: "get",
  },

};
