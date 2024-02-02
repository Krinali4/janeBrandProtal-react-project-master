import Strings from "../utils/Strings";
import { BaseResponse } from "./BaseResponse";

export type IOtpResponse = {
  reqOtpId: string
  generatedOtp: string
  responseCode: string
  mobileNumber: string
  otpExpiryTime: number
  otpDelayWaitTime: number
  smsOperator: string
}

export default class OtpResponse extends BaseResponse {
  
  private GENERATE_OTP_SUCCESS_CODE = "1701";

  public mMobileNumber: string;
  public get mobileNumber(): string {
    return this.mMobileNumber;
  }
  
  public mOtpCode: string;
  public get otpCode(): string {
    return this.mOtpCode;
  }

  private mResponseCode: string;
  public get responseCode(): string {
    return this.mResponseCode;
  }

  private mOtpExpiryTime: string;
  public get otpExpiryTime(): number {
    return parseInt(this.mOtpExpiryTime); // In Seconds, multiply by 1000 if milliseconds
  }

  private mOtpDelayWaitTime: string;
  public get otpDelayWaitTime(): number {
    return parseInt(this.mOtpDelayWaitTime); // In Seconds, multiply by 1000 if milliseconds
  }

  private mSuccess: boolean;
  public get success(): boolean {
    return this.mSuccess;
  }

  private mOtpId: string;
  public get otpId(): string {
    return this.mOtpId;
  }

  private mSMSOperator: string;
  public get smsOperator(): string {
    return this.mSMSOperator;
  }

  public isSuccess(): boolean {
    if(this.mSMSOperator == 'ROUTE') {
      return this.mResponseCode === this.GENERATE_OTP_SUCCESS_CODE;
    }
    return this.mSuccess;
  }

  public initWithResponse(responseJson: any, mobile: string, otp:string) {
    if(process.env.REACT_APP_COUNTRY === "US") {
      this.initWithUSResponse(responseJson,mobile,otp);
    } else {
      this.initWithINResponse(responseJson,mobile,otp);
    }
  }

  public initWithINResponse(responseJson: any, mobile: string, otp:string) {
    super.init(responseJson);

    this.mMobileNumber = mobile
    this.mOtpCode = otp

    this.mSMSOperator = 'ROUTE';
    this.mResponseCode = responseJson.success_code;
    this.mOtpExpiryTime = responseJson.exptime;
    this.mOtpDelayWaitTime = responseJson.delaywaittime;

    this.mSuccess = this.isSuccess();
    this.mOtpId = '';
  }

  // New API Response (smsapi/otprequest.json)
  public initWithUSResponse(responseJson: any, mobile: string, otp:string) {
    super.init(responseJson);

    this.mMobileNumber = mobile
    this.mOtpCode = otp

    this.mSuccess = responseJson.success || false;
    if(this.mSuccess) {
      this.mResponseCode = (this.mSuccess) ? '1701' : '';
      this.mOtpId = responseJson.otp_id || '';
      this.mOtpExpiryTime = responseJson.exptime;
      this.mOtpDelayWaitTime = responseJson.delaywaittime;
      this.mSMSOperator = responseJson.sms_operator;
    } else {
      this.mErrorCode = '8888';
      const eCode = responseJson.error_code;
      if(eCode) {
          if(isNaN(eCode)) {
            this.mErrorCode = eCode
          } else {
            this.mErrorCode = eCode.toString()
          }
      }
      let eMsg = responseJson.error_message || Strings.DEFAULT_ERROR_MSG;
      this.mErrorMessage = eMsg + ' (' + this.mErrorCode + ')';
    }
  }

  public getOtpResponseObject(): IOtpResponse {
    let resp: IOtpResponse = {
      generatedOtp: this.mOtpCode,
      reqOtpId: this.mOtpId,
      responseCode: this.mResponseCode,
      mobileNumber: this.mMobileNumber,
      otpExpiryTime: parseInt(this.mOtpExpiryTime),
      otpDelayWaitTime: parseInt(this.mOtpDelayWaitTime),
      smsOperator: this.mSMSOperator
    };
    return resp
  }
}

/* 
{
    "success_code": "1701",
    "success_message": "Message sent",
    "exptime": "90",
    "delaywaittime": "20"
}
*/
