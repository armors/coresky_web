import store from "@/store";
import i18n from "@/i18n/i18n";
import tools from "@/util/tools";
import moment from 'moment'
const isAbsoluteURL = (str) => /^[a-z][a-z0-9+.-]*:/.test(str);

export function fullImageUrl(url) {
  console.log(url)
  if (!url) return "";
  if (url.toLowerCase().startsWith("ipfs:/")) {
    let urlArr = url.split("/");
    if (url.indexOf("image") > -1 || url.indexOf("animation") > -1) {
      url =
        "ipfs/" + urlArr[urlArr.length - 2] + "/" + urlArr[urlArr.length - 1];
    } else {
      url = "ipfs/" + urlArr[urlArr.length - 1];
    }
    return store.state.config.ipfsUrl + "/" + url;
  }
  // not ipfs url
  if (isAbsoluteURL(url)) {
    return url;
  }
  var cdnUrl = store.state.config.cdnUrl;
  return cdnUrl ? cdnUrl + url : url;
}

export function ellipsisAddress(address, start=7, end=-4) {
  if (!address) return '--'
  return address.slice(0, start) + "..." + address.slice(end);
}
export function hashExplore(hash) {
  if (!hash) {
    return {
      hashShort: '--',
      href: `${process.env.VUE_APP_EXPLORE}`
    }
  }
  return {
    hashShort: ellipsisAddress(hash),
    href: `${process.env.VUE_APP_EXPLORE}/tx/${hash}`
  }
}
export function contractExplore(hash) {
  if (!hash) {
    return {
      hashShort: '--',
      href: `${process.env.VUE_APP_EXPLORE}`
    }
  }
  return {
    hashShort: ellipsisAddress(hash),
    href: `${process.env.VUE_APP_EXPLORE}/address/${hash}`
  }
}
export function milliFormat(num, isK =true) {
  if (!num) return '--'
  if (isK) {
    if (num > 10000) {
      num = keepPoint(num / 10000, 1)
      return num && num.toString()
        .replace(/\d+/, (s) => s.replace(/(\d)(?=(\d{3})+$)/g, '$1,'))
    } else {
      return num && num.toString()
        .replace(/\d+/, (s) => s.replace(/(\d)(?=(\d{3})+$)/g, '$1,'))
    }
  }
  return num && num.toString()
    .replace(/\d+/, (s) => s.replace(/(\d)(?=(\d{3})+$)/g, '$1,'))

  // return (
  //   num &&
  //   num.toString().replace(/\d+/, function(s) {
  //     return s.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  //   })
  // );
}
export function openWindow(url) {
  window.open(url, '_blank'); //注意第二个参数

}

export function decimal(num, v) {
  var vv = Math.pow(10, v);
  return Math.round(num * vv) / vv;
}
export function feeFormat(fee) {
  return fee ? (fee / 1000 + '%') : '--';
}
export function timeFormat(time) {
  var previous = new Date(time * 1000);
  var current = new Date();
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;
  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + i18n.global.t("time.secondsAgo");
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + i18n.global.t("time.minutesAgo");
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + i18n.global.t("time.hoursAgo");
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + i18n.global.t("time.daysAgo");
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + i18n.global.t("time.monthsAgo");
  } else {
    return Math.round(elapsed / msPerYear) + i18n.global.t("time.yearsAgo");
  }
}

export function timeFormatTime(time) {
  var previous = new Date(time * 1000);
  var current = new Date();
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = previous - current;
  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + i18n.global.t("time.seconds");
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + i18n.global.t("time.minutes");
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + i18n.global.t("time.hours");
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + i18n.global.t("time.daysS");
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + i18n.global.t("time.months");
  } else {
    return Math.round(elapsed / msPerYear) + i18n.global.t("time.years");
  }
}

export function timeFormatMoment (time, formatType = 'YYYY.MM.DD') {
  return moment(time * 1000).format(formatType);    // 2022/12/10;               // 12月 10日 22
}

export function timeToUTC(time, isMonth = false) {
  if (!time) return '--'
  let date = new Date(time * 1000); //Wed Jan 02 2019 00:00:00 GMT+0800 (China Standard Time)

  let chinaDate = date.toDateString(); //"Tue, 01 Jan 2019 16:00:00 GMT"
  //注意：此处时间为中国时区，如果是全球项目，需要转成【协调世界时】（UTC）
  let globalDate = date.toUTCString(); //"Wed Jan 02 2019"

  //之后的处理是一样的
  let chinaDateArray = chinaDate.split(' '); //["Wed", "Jan", "02", "2019"]

  // let displayDate = `${chinaDateArray[1]} ${chinaDateArray[2]}, ${chinaDateArray[3]}`; //"Jan 02, 2019"
   //"Jan, 2019"
  return isMonth ? `${chinaDateArray[1]}   ${chinaDateArray[2]}` : `${chinaDateArray[1]}   ${chinaDateArray[3]}`
}
export function nftURI (v) {
  if (v.metadataContent) {
    return tools.analysis(v.metadataContent);
  } else if (v.media) {
    return tools.analysis(v.media);
  }
  return {};
}

export function keepPoint(num, point = 4, isRound = false) {
  if (isRound) {
    return parseFloat(num).toFixed(point);
  } else {
    return parseFloat(num)
      .toFixed(point + 1 || 3)
      .slice(0, -1);
  }
}

export function ckCollectionsInfoEntity(v) {
  console.log(v, v.ckCollectionsInfoEntity, v.ckCollectionsInfoEntity.bannerImage)
  return v.ckCollectionsInfoEntity.bannerImage
}
