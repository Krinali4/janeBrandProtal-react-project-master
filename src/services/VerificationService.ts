import GeneralUtils from "../core/utils/GeneralUtils";
import WebServiceUtils from "../core/webservice/WebServiceUtils"
import ApiEndpoints from "./ApiEndpoints"
import Strings from '../core/utils/Strings';
import DateUtils from "../core/utils/DateUtils";
import OtpResponse, { IOtpResponse } from "../core/models/OtpResponse";
import { ApiError } from '../core/webservice/ApiError';
import UserManager from '../core/utils/UserManager';
import AuthService from "./AuthService";
import SessionManager from "../core/utils/SessionManager";
export default class VerificationService {
    public static async sendOtp(mobileNum: string) {
        const otp = GeneralUtils.generateFourDigitRandomNumber();
        let otpMessage = otp + Strings.OTP_MESSAGE;
        let mid = '0'
        let enableThirdPartyLogs = '0'
        if(UserManager.shared().merchant) {
            const merchant = UserManager.shared().merchant
            mid = merchant.merchantId
            enableThirdPartyLogs = merchant.thirdPartyLogFlag
            if(merchant.dltFromName && merchant.dltFromName.length > 0) {
                otpMessage = otpMessage + ' ' + merchant.dltFromName + '.';
            }
        }

        var postBody: any = {
            merchant_id: mid,
            store_id: '0',
            kiosk_id: '0',
            user_mobile: mobileNum,
            platform: 'web_app',
            channel: 'fh_webapp',
            access_channel: 'fh_webapp',
            version: process.env.REACT_APP_VERSION,
            sms_text: otpMessage,
            field_enable_thirdparty_logs: enableThirdPartyLogs,
            country_code: 'IN',
            dial_code: '91',
            request_submit_time: DateUtils.getCurrentTimeUnixTimestamp()
        }

        if (process.env.REACT_APP_COUNTRY === "IN") {
            postBody["request_type"] = "OTP Request"
        } else {
            postBody["country_code"] = "US"
            postBody["dial_code"] = "1"
        }
        const apiEndPoint = (process.env.REACT_APP_COUNTRY === "US") ? ApiEndpoints.SEND_OTP_US_URL : ApiEndpoints.SEND_OTP_IN_URL
        const apiEndPointUrl = process.env.REACT_APP_API_BASE_URL + "/" + apiEndPoint
        const response = await WebServiceUtils.post(postBody,{},apiEndPointUrl);
        if (response.success) {
            const otpResponse = new OtpResponse();
            otpResponse.initWithResponse(response.data,mobileNum,`${otp}`);
            if (otpResponse.isSuccess()) {
              return Promise.resolve(otpResponse);
            } else {
              return Promise.reject(
                new ApiError(
                  Number.parseInt(otpResponse.errorCode),
                  otpResponse.errorMessage
                )
              );
            }
          }else{
            return Promise.reject(
              new ApiError(
                Number.parseInt(response.response.status),
                response.data[0]
              )
            );
          }
    }

    public static async verifyOtp(enteredOtp: string, receivedOtpResponse: IOtpResponse, merchantId: string) {    
        if (process.env.REACT_APP_COUNTRY === "IN") {
          if(enteredOtp === receivedOtpResponse.generatedOtp) {
            return new Promise<boolean>((resolve,reject) => {
              AuthService.login(receivedOtpResponse.mobileNumber, merchantId)
              .then(() => {
                resolve(true);
              })
              .catch((apiError: ApiError) => {
                reject(apiError);
              })    
            });
          } else {
            return Promise.reject(
              new ApiError(
                701,
                Strings.OTP_INCORRECT_CODE
              )
            );
          } 
        }

        let mid = '0'
        let enableThirdPartyLogs = '0'
        if(UserManager.shared().merchant) {
            const merchant = UserManager.shared().merchant
            mid = merchant.merchantId
            enableThirdPartyLogs = merchant.thirdPartyLogFlag
        }

        var postBody: any = {
            otpid: receivedOtpResponse.reqOtpId,
            otp: enteredOtp,
            sms_provider: receivedOtpResponse.smsOperator,
            merchant_id: mid,
            store_id: '0',
            kiosk_id: '0',
            user_mobile: receivedOtpResponse.mobileNumber,
            platform: 'web_app',
            channel: 'fh_webapp',
            access_channel: 'fh_webapp',
            version: process.env.REACT_APP_VERSION,
            field_enable_thirdparty_logs: enableThirdPartyLogs,
            country_code: 'IN',
            dial_code: '91',
            request_submit_time: DateUtils.getCurrentTimeUnixTimestamp()
        }

        if (process.env.REACT_APP_COUNTRY === "US") {
            postBody["country_code"] = "US"
            postBody["dial_code"] = "1"
        }
        
        const apiEndPoint = process.env.REACT_APP_API_BASE_URL + "/" + ApiEndpoints.VERIFY_OTP_US_URL
        const response = await WebServiceUtils.post(postBody,{},apiEndPoint);
    
        if (response.success) {
          const otpVerifyResponse = new OtpResponse();
          otpVerifyResponse.initWithResponse(response.data,receivedOtpResponse.mobileNumber,enteredOtp);
        
          if (otpVerifyResponse.isSuccess()) {
            return new Promise<boolean>((resolve,reject) => {
              AuthService.login(receivedOtpResponse.mobileNumber, merchantId)
              .then(() => {
                resolve(true);
              })
              .catch((apiError: ApiError) => {
                reject(apiError);
              })    
            });
          } else {
            return Promise.reject(
              new ApiError(
                Number.parseInt(otpVerifyResponse.errorCode),
                otpVerifyResponse.errorMessage
              )
            );
          }
        }
        return WebServiceUtils.handleNetworkError(response);
    }
}