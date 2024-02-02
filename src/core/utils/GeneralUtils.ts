import TextUtils from "./TextUtils";
import compareVersions from "compare-versions";
// import { ReasonItem } from '../model/UnloadWalletOrder';

export default class GeneralUtils {
  private constructor() { }

  public static makeACall(phoneNum: string | undefined) {
    if (!TextUtils.isEmpty(phoneNum)) {
      window.location.href = "tel:" + phoneNum;
    }
  }

  public static isAndroidOS(): boolean {
    let userAgent = navigator.userAgent.toLowerCase();
    return /android/.test(userAgent);
  }

  public static isSafariBrowser(): boolean {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }

  public static toAmount = (value:any, defValue = 0) => {
    return value ? (value / 100).toFixed(2) : defValue;
  }

  public static toTokens = (value:any, defValue = 0) =>
    value && parseFloat(value) ? Number((parseFloat(value) * 100).toFixed(2)) : defValue;

  public static forceAppUpdateRequired(latestVersion: string, latestBuildVersion: string): boolean {
    var storeAppVersion = latestVersion;
    var currentAppV = process.env.REACT_APP_VERSION
      ? process.env.REACT_APP_VERSION
      : "";
    var storeAppBuildVersion = latestBuildVersion;
    var currentAppBuildV = process.env.REACT_APP_BUILD_VERSION
      ? process.env.REACT_APP_BUILD_VERSION
      : "";

    if (
      !TextUtils.isEmpty(storeAppVersion) &&
      !TextUtils.isEmpty(currentAppV)
    ) {
      // let versionComparator = compareVersions(currentAppV, storeAppVersion);
      // if (versionComparator === -1) {
      //   return true;
      // }
    }

    if (
      !TextUtils.isEmpty(storeAppBuildVersion) &&
      !TextUtils.isEmpty(currentAppBuildV)
    ) {
      // let buildComparator = compareVersions(
      //   currentAppBuildV,
      //   storeAppBuildVersion
      // );
      // if (buildComparator == -1) {
      //   return true;
      // }
    }

    return false;
  }

  public static numberFormatWithLocale(x: string | undefined, withFractionDigits: boolean): string {
    if (x && !TextUtils.isEmpty(x)) {
      const userLocale = "en-US";
      if (withFractionDigits) {
        return new Intl.NumberFormat(userLocale, { minimumFractionDigits: 2 }).format(Number(x))
      }
      return new Intl.NumberFormat(userLocale, {}).format(Number(x))

    }
    if (!x) return "0.00";
    return x;
  }

  public static validEmail: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public static url = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");

  public static currencySymbol = "$";

  public static phoneNoFormat(data: string): string {
    if (data && data.length == 10) {
        const front = data.slice(0, 3);
        const back3 = data.slice(3, 6);
        const last4 = data.slice(6, 10);
        return `+1 (${front}) ${back3}-${last4}`
    } else {
        const frontFirst = data.slice(0, 2)
        const front = data.slice(2, 5);
        const back = data.slice(5, 8);
        const last = data.slice(8, 12);
        return `${frontFirst} (${front}) ${back}-${last}`
    }
 }

 public static getAppVersion(): string {
  return `v${process.env.REACT_APP_VERSION} ${process.env.REACT_APP_BUILD_VERSION}`
 }

 public static generateFourDigitRandomNumber(): number {
  return Math.floor(1000 + Math.random() * 9000);
  }

  public static isValidEmailId(text: string): boolean {
    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  
    return regexp.test(text);
  }
}
