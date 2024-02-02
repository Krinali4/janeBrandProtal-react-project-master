import WebServiceUtils from "../core/webservice/WebServiceUtils"
import { ApiError } from "../core/webservice/ApiError"
import Strings from '../core/utils/Strings';
import TextUtils from "../core/utils/TextUtils"
import SessionManager from '../core/utils/SessionManager';
import ApiEndpoints from "./ApiEndpoints"
import User from "../core/models/User"
import UserManager from "../core/utils/UserManager"

export default class AuthService {

  public static async login(cid: string, mid: string) {
    
    if (TextUtils.isEmpty(mid)) {
      return Promise.reject(
        new ApiError(400, "Merchant ID is not available.")
      )
    }

    if (TextUtils.isEmpty(cid)) {
      return Promise.reject(
        new ApiError(400, "Mobile number is not available.")
      )
    }
    
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
    const params = {
      "phone": cid,
      "muid": mid,
      "channel": "fh_webapp",
      "access_channel": "fh_webapp",
      "country_code": "IN",
      "timezone": "Asia\/Kolkata",
      "parent_profile": `${null}`,
      "email": "",
      "otp_verified": 1,
      "pid": ""
    }

    const apiUrl = process.env.REACT_APP_API_BASE_URL + "/" + ApiEndpoints.AUTH_URL;

    const response = await WebServiceUtils.post(params, config, apiUrl)
    if (response.success && response.data) {
      try {
        const user = new User(response.data.user);
        if(user) {

          if(!user.isActive) {
            SessionManager.shared().clearUserSessionData()
            return Promise.reject(
              new ApiError(601, "User account has been blocked.")
            )
          }

          SessionManager.shared().saveToken(response.data);
          SessionManager.shared().setUserId(user.userId);
          SessionManager.shared().setCustomerId(cid);
          UserManager.shared().setUser(user);
          return Promise.resolve(user);
        } else {
          return Promise.reject(
            new ApiError(500, Strings.DEFAULT_ERROR_MSG)
          )
        }
      } catch (error) { 
        return Promise.reject(
          new ApiError(500, Strings.DEFAULT_ERROR_MSG)
        )
      }
    }
    return WebServiceUtils.handleNetworkError(response)
  }
}
