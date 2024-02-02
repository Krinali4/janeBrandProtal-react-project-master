import axios, { AxiosInstance } from "axios";
import { ApiError } from "./ApiError";
import Strings from "../utils/Strings";
import TextUtils from "./../utils/TextUtils";
import SessionManager from '../utils/SessionManager';
import ApiEndpoints from "../../services/ApiEndpoints";

class WebServiceUtils {
  public static NETWORK_ERROR_STATUS_CODE = 0;
  public static async get(
    config = {},
    url = process.env.REACT_APP_GRAPH_QL_URL
  ) {
    let response;
    let success;

    try {
      response = await WebServiceUtils.getAxioInstance().get(url, config);
      success = true;
    } catch (e: any) {
      response = e.response;
      success = false;
    }

    const fatal = !response;
    const data = fatal ? null : response.data;
    const headers = fatal ? null : response.headers;

    return { fatal, data, headers, success, response };
  }

  public static async post(
    body = {},
    config = {},
    url = process.env.REACT_APP_GRAPH_QL_URL
  ) {
    let response;
    let success;

    try {
      response = await WebServiceUtils.getAxioInstance().post(
        url,
        body,
        config
      );
      success = true;
    } catch (e: any) {
      response = e.response;
      success = false;
    }

    const fatal = !response;
    const data = fatal ? null : response.data;
    const headers = fatal ? null : response.headers;

    return { fatal, data, headers, success, response };
  }

  public static async put(
    body = {},
    config = {},
    url = process.env.REACT_APP_GRAPH_QL_URL
  ) {
    let response;
    let success;

    try {
      response = await WebServiceUtils.getAxioInstance().put(
        url,
        body,
        config
      );
      success = true;
    } catch (e: any) {
      response = e.response;
      success = false;
    }

    const fatal = !response;
    const data = fatal ? null : response.data;
    const headers = fatal ? null : response.headers;

    return { fatal, data, headers, success, response };
  }

  public static async multipartPost(
    file: any,
    url = '',
    fileKey = 'files[file1]',
    fieldNameVal = 'field_image'
  ) {
    let response;
    let success;

    try {
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      const formData = new FormData();
      formData.append(fileKey, file)
      if (fieldNameVal && fieldNameVal.length > 0) {
        formData.append('field_name', fieldNameVal)
      }
      response = await WebServiceUtils.getAxioInstance().post(
        url,
        formData,
        config
      );
      success = true;
    } catch (e: any) {
      response = e.response;
      success = false;
    }

    const fatal = !response;
    const data = fatal ? null : response.data;
    const headers = fatal ? null : response.headers;

    return { fatal, data, headers, success, response };
  }

  public static handleNetworkError(serviceResponse: {
    fatal: boolean;
    data: any;
    headers: any;
    success: boolean;
    response: any;
  }) {
    if (!serviceResponse.fatal) {
      const err = serviceResponse.data;
      const errorCode = serviceResponse.response.status;
      if (err) {
        let errMsg;
        if (Array.isArray(err)) {
          errMsg = err.length === 1 ? err[0].message : undefined;
        } else if (err.errors) {
          errMsg = err.errors.length > 0 ? err.errors[0].message : undefined;
        }

        if (!TextUtils.isEmpty(errMsg)) {
          return Promise.reject(
            new ApiError(errorCode, errMsg)
          );
        }
      }

      if (serviceResponse.response) {
        const respData = serviceResponse.response.data
        if (respData && (typeof respData === 'string' || respData instanceof String)) {
          return Promise.reject(
            new ApiError(errorCode, respData as string)
          );
        }

        if (errorCode === 401) {
          return Promise.reject(
            new ApiError(errorCode, Strings.UNAUTHORIZED_ERROR)
          );
        }

        const errorMsg = serviceResponse.response.statusText;
        if (errorCode > -1 && errorMsg) {
          return Promise.reject(new ApiError(errorCode, errorMsg));
        }
      }
    }

    if (!serviceResponse.response) {
      return Promise.reject(
        new ApiError(
          WebServiceUtils.NETWORK_ERROR_STATUS_CODE,
          Strings.NETWORK_ERROR
        )
      );
    } else {
      return Promise.reject(new ApiError(-1, ""));
    }
  }

  public static async validateAccessToken() {
    try {
      if (!SessionManager.shared().isTokenAvailable()) {
        return Promise.reject(
          new ApiError(400, Strings.BEARER_TOKEN_NOT_AVAILABLE_ERROR)
        );
      }
    } catch (e) {

    }
  }

  public static async validatePartnerAuthToken() {
    try {
      if (!SessionManager.shared().isTokenAvailable()) {
        return Promise.reject(
          new ApiError(400, Strings.BEARER_TOKEN_NOT_AVAILABLE_ERROR)
        );
      }
    } catch (e) {

    }
  }

  private static axiosInstance = axios.create({});

  private static getAxioInstance(): AxiosInstance {
    // Request interceptor for API calls
    this.axiosInstance.interceptors.request.use(config => {
      let urlConfig = config.url!;
      var dictHeader = {};
      if (SessionManager.shared().isTokenAvailable()) {
        // @ts-ignore
        dictHeader['X-CSRF-Token'] = SessionManager.shared().accessToken;
        // @ts-ignore
        dictHeader['X-Cookie'] = SessionManager.shared().cookieValue;
      }
      // @ts-ignore
      dictHeader['Content-Type'] = 'application/json; charset=UTF-8';
      if (urlConfig.includes("/loyalty/upload_image_callback.json")) {
        // @ts-ignore
        dictHeader['Content-Type'] = 'multipart/form-data';
      }
      config.headers = dictHeader;
      return config;
    });

    // Response interceptor for API calls
    this.axiosInstance.interceptors.response.use(response => {
      return response;
    },
      async error => {
        // Reject promise if usual error
        return Promise.reject(error);
        /*
        if (error.response.status !== 401) {
          return Promise.reject(error);
        }
        
        // Logout if Refresh token expires.
        const refreshTokenApi = process.env.REACT_APP_PARTNER_BACKEND_BASE_URL + '/walletOauth2/token'
        const janeAuthApi = process.env.REACT_APP_JANE_ROOTS_BASE_URL + '/token';
        if(error.response.config.url == refreshTokenApi || error.response.config.url == janeAuthApi) {
          return Promise.reject(error);
        }
        
        // If refresh token is working
        if (error.response.config.url.includes('/phoenix')) {
          // refresh token api call
          return Promise.reject(error);
        } else {
          // refresh token api call
          return Promise.reject(error);
        }*/
      });
    return this.axiosInstance;
  }
}

export default WebServiceUtils;
