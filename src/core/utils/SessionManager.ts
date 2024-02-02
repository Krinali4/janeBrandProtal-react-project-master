import TextUtils from "./TextUtils";
import LocalStorageUtils from "./LocalStorageUtils";
import Strings from "./Strings";
import User from "../models/User";

export default class SessionManager {

  private ACCESS_TOKEN = "pAuthToken";
  private COOKIE = "pCookie";
  private CID = "pCid";
  private MID = "pMid";
  private UID = "pUid";

  public static shared(): SessionManager {
    if (!SessionManager.sSessionManager) {
      SessionManager.sSessionManager = new SessionManager();
    }
    return SessionManager.sSessionManager;
  }

  private static sSessionManager: SessionManager | null;

  // access token
  private mAccessToken: string | undefined;
  public get accessToken(): string | undefined {
    if (this.mAccessToken) {
      return this.mAccessToken;
    } else {
      const sessionAuthToken = LocalStorageUtils.getItem(this.ACCESS_TOKEN);
      if (sessionAuthToken) {
        return (this.mAccessToken = sessionAuthToken);
      }
      return undefined;
    }
  }

  private mCookies: string | undefined;
  public get cookieValue(): string | undefined {
    if (this.mCookies) {
      return this.mCookies;
    } else {
      const cValue = LocalStorageUtils.getItem(this.COOKIE);
      if (cValue) {
        return (this.mCookies = cValue);
      }
      return undefined;
    }
  }

  private constructor() { }

  public init() {
    this.mAccessToken = undefined;
    this.mCookies = undefined;
  }

  public saveUserDetails(loginResponse: any) {
    this.clearSession();
    if (!loginResponse) return;
    let accessToken = loginResponse.accessToken;
    let refreshToken = loginResponse.refreshToken;
    if (accessToken && !TextUtils.isEmpty(accessToken) && refreshToken && !TextUtils.isEmpty(refreshToken)) {
      this.mAccessToken = accessToken;
      LocalStorageUtils.storeItem(this.ACCESS_TOKEN, accessToken);
    } else {
      this.mAccessToken = undefined;
    }
  }

  public saveRefreshTokenDetails(loginResponse: any) {
    if (!loginResponse) return;
    let accessToken = loginResponse.accessToken;
    if (accessToken && !TextUtils.isEmpty(accessToken)) {
      this.mAccessToken = accessToken;
      LocalStorageUtils.storeItem(this.ACCESS_TOKEN, accessToken);
    } else {
      this.mAccessToken = undefined;
      localStorage.removeItem(this.ACCESS_TOKEN);
    }
  }

  public isTokenAvailable(): boolean {
    const authToken = this.accessToken;
    return authToken && !TextUtils.isEmpty(authToken) ? true : false;
  }

  /* Clear Session */
  public clearSession() {
    if (LocalStorageUtils.localStorageAvailable()) {
      localStorage.removeItem(this.ACCESS_TOKEN);
      // localStorage.removeItem(this.REFRESH_TOKEN);
    }
    this.mAccessToken = undefined;
    // this.mRefreshToken = undefined;
    SessionManager.sSessionManager = null;
  }


  /* set mid */
  public setMerchentID(mid: string) {
    localStorage.setItem(this.MID, mid);
  }

  /* set cid */
  public setCustomerId(cid: string) {
    localStorage.setItem(this.CID,cid);
  }

  /* set uid */
  public setUserId(uid: string) {
    localStorage.setItem(this.UID,uid);
  }


  /* get mid */
  public getMerchentID() {
    return JSON.parse(localStorage.getItem(this.MID));
  }

  /* get cid */
  public getCustomerID() {
    return JSON.parse(localStorage.getItem(this.CID));
  }

  /* get uid */
  public getUserID() {
    return JSON.parse(localStorage.getItem(this.UID));
  }

  /* set tokens  */
  public saveToken(loginResponse: any) {
    if (!loginResponse) return;
    let accessToken = loginResponse.token;
    let cookies = `${loginResponse.session_name}=${loginResponse.sessid}`;
    if (accessToken && !TextUtils.isEmpty(accessToken)) {
      this.mAccessToken = accessToken;
      this.mCookies = cookies;
      localStorage.setItem(this.ACCESS_TOKEN, accessToken);
      localStorage.setItem(this.COOKIE, cookies);
    } else {
      this.mAccessToken = undefined;

      localStorage.removeItem(this.ACCESS_TOKEN);
    }
  }

  /* Clear Session */
  public clearSessionData() {
    if (LocalStorageUtils.localStorageAvailable()) {
      localStorage.removeItem(this.ACCESS_TOKEN);
      localStorage.removeItem(this.COOKIE);
      localStorage.removeItem(this.MID);
      localStorage.removeItem(this.CID);
    }
    this.mAccessToken = undefined;
    this.mCookies = undefined;
    SessionManager.sSessionManager = null;
  }

  public clearUserSessionData() {
    if (LocalStorageUtils.localStorageAvailable()) {
      localStorage.removeItem(this.ACCESS_TOKEN);
      localStorage.removeItem(this.COOKIE);
      localStorage.removeItem(this.CID);
      localStorage.removeItem(this.UID);
    }
    this.mAccessToken = undefined;
    this.mCookies = undefined;
    SessionManager.sSessionManager = null;
  }

}
