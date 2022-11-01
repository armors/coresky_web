import BigNumber from 'bignumber.js'
import moment from 'moment'

export function isMobile () {
  let tmpU = window.navigator.userAgent.toLowerCase()
  return /AppleWebKit.*Mobile.*/i.test(tmpU)
}

export function getWindowScale () {
  if (document.documentElement.clientWidth > 500) {
    return 1
  } else {
    return 750 / document.documentElement.clientWidth
  }
}

export function formatTradeNums (nums) {
  let tmp = new BigNumber(nums)
  return tmp.div(new BigNumber(10).pow(25)).toFixed(6, 1).valueOf() + 'e+25'
  // return tmp.div(new BigNumber(10).pow(18)).toFixed(4, 1).valueOf() + 'E'
}

export function formatDeepNumber (deeps) {
  return new BigNumber(1).div(new BigNumber(10).pow(deeps)).valueOf()
}

export function formatNumsV2 (nums) {
  let tmp = new BigNumber(nums)
  let res = ''
  if (tmp.isLessThan(1000)) {
    res = tmp.toFixed(2, 1)
  } else if (tmp.isLessThan(1000 * 1000)) {
    res = tmp.div(1000).toFixed(2, 1) + 'K'
    // } else if (tmp.isLessThan(1000 * 1000 * 1000)) {
  } else {
    res = tmp.div(1000 * 1000).toFixed(2, 1) + 'M'
  }
  return res
}

export function formatNums (nums, deep = 4) {
  if (!nums || isNaN(nums) || nums === '0') {
    return 0
  }
  // console.log(deep)
  BigNumber.config({ EXPONENTIAL_AT: 100 })
  let tmp = new BigNumber(nums)
  let fixlen = 2
  if (deep === 2) {
    fixlen = 4
  }
  let res = ''
  if (tmp.isLessThan(1000)) {
    res = tmp.toFixed(fixlen, 1)
    if (deep !== 2 && res === '0.00') {
      res = '< 0.01'
    }
    if (deep === 2 && res === '0.0000') {
      res = '< 0.0001'
    }
  } else if (tmp.isLessThan(1000 * 1000)) {
    res = tmp.div(1000).toFixed(fixlen, 1) + 'K'
  // } else if (tmp.isLessThan(1000 * 1000 * 1000)) {
  } else {
    res = tmp.div(1000 * 1000).toFixed(fixlen, 1) + 'M'
  }
  return res
}

export function reverseObject (obj) {
  let tmp = []
  for (let i in obj) {
    tmp.push(obj[i])
  }
  return tmp.reverse()
}

export function formatDataList (datas) {
  datas.forEach(e => {
    e.fprice = formatPrice(e.price, e.decimals, e.price_decimals)
    e.fprice24 = formatPrice(e.price_24h_ago, e.decimals, e.price_decimals)
    e.uper = e.fprice >= e.fprice24 ? true : false
    // console.log(e.fprice24)
    if (e.fprice24 <= 0) {
      e.upernum = 0
    } else {
      e.upernum = Math.abs(e.fprice - e.fprice24) / e.fprice24 * 100
    }
    e.upernum = parseFloat(e.upernum.toFixed(2))
    e.deeps = getTokenDeep(e.fprice)
  })
  return datas
}

export function getTokenDeep (value) {
  value = parseFloat(value)
  let ruleDec = 0;
  if (value > 1000) {
    ruleDec = 2;
  } else if (value < 0.1) {
    ruleDec = 8;
  } else if (value >= 0.1 && value <= 1000) {
    ruleDec = 4;
  } else if (value == 0) {
    ruleDec = 8;
  }
  // 价格和数量的精度位数之和为8,当前价格为0精度都是8位
  // if (type == this.numberType.num) {
  //   if (value != 0) {
  //     ruleDec = 8 - ruleDec;
  //   }
  // }
  return ruleDec;
}

export function getIndexList (start, pagesize) {
  let tmp = []
  for (let i = start - 1; i >= 0; i--) {
    tmp.push(i)
    if (tmp.length >= pagesize) {
      break
    }
  }
  return tmp
}

export function formatErrorCode (str) {
  switch (str) {
    case 'Transaction Failure':
      return 'errorcode.transfail';
    case 'User denied transaction':
      return 'errorcode.denied';
    case 'Opration Failure':
      return 'errorcode.opfail';
  }
  return str
}

export function formatAmountV2 (amount, price) {
  let tmp = new BigNumber(amount)
  let dec = getTokenDeep(price)
  return tmp.toFixed(dec, 1)
}

export function formatFreeAmount (nums, decimals) {
  if (!nums || isNaN(nums)) {
    return '0'
  }
  let tmpf = 4
  if (decimals >= 18) {
    tmpf = 8
  }
  BigNumber.config({ EXPONENTIAL_AT: 100 })
  let tmp = new BigNumber(nums)
  // tmp =
  // let tmp = (nums / Math.pow(10, decimals)).toFixed(tmpf)
  let s = tmp.dividedBy(new BigNumber(10).pow(decimals)).toFixed(tmpf, 1)
  // return parseFloat(s.substring(0, s.length - 1))
  return parseFloat(s)
}

export function formatTTAmount (nums) {
  // let tmp = (nums / 10000).toFixed(5)
  // return tmp.substring(0, tmp.length - 1)
  if (nums === 0 || isNaN(nums)) {
    return '0'
  }
  return new BigNumber(nums).div(10000).toFixed(4, 1)
}

export function formatDataTimes (datas) {
  let time
  datas = parseInt(datas)
  if (isNaN(datas)) {
    time = moment()
  } else {
    time = moment(datas * 1000)
  }
  return time.format('YYYY-MM-DD HH:mm:ss')
}

export function formatAddress (address = '', firstlen = 6, lastlen = 3) {
  const tmp = []
  if (!address) {
    return ''
  }
  tmp.push(address.substr(0, firstlen))
  tmp.push('...')
  tmp.push(address.substr(-1 * lastlen))
  return tmp.join('')
}

export function formatPriceBack (price, decimals = '2', price_decimals = '2') {
  BigNumber.config({ EXPONENTIAL_AT: 100 })
  let udec = localStorage.getItem('usdtDecimals') || 18
  let p = new BigNumber(price)
  let dec = new BigNumber(10).pow(Math.abs(parseInt(decimals) - udec - parseInt(price_decimals)))
  // console.log(dec.valueOf())
  return p.times(dec).valueOf()
}

export function formatPrice (price, decimals = '2', price_decimals = '2') {
  // console.log(price)
  // console.log(decimals)
  // console.log(price_decimals)
  BigNumber.config({ EXPONENTIAL_AT: 100 })
  let udec = localStorage.getItem('usdtDecimals') || 18
  let p = new BigNumber(price)
  let dec = new BigNumber(10).pow(Math.abs(parseInt(decimals) - udec - parseInt(price_decimals)))
  // console.log(dec.valueOf())
  // console.log(Math.abs(udec - parseInt(decimals)) + parseInt(price_decimals))
  return p.div(dec).valueOf()
}

export function formatAjaxDatas (datas, that) {
  if (datas.code === 1) {
    return datas
  } else {
    that.$message({
      message: datas.msg,
      type: 'error'
    })
  }
}
