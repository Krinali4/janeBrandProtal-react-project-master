import WebServiceUtils from "../core/webservice/WebServiceUtils"
import ApiEndpoints from './ApiEndpoints';
import User, { IUserUpdate } from "../core/models/User";
import DateUtils from '../core/utils/DateUtils';
import SessionManager from "../core/utils/SessionManager";
import { ApiError } from "../core/webservice/ApiError";
import Strings from "../core/utils/Strings";

export enum UserInfoType {
  NAME = "field_your_name",
  MOBILE_NUMBER = "field_kiosk_consumer_phone",
  EMAIL_ADDRESS = "field_kiosk_consumer_email",
  GENDER = "field_gender",
  DATE_OF_BIRTH = "field_date_of_birth",
  DATE_OF_ANNIVERSARY = "field_date_of_anniversary",
  IMAGE = "field_profile_image_custom"
}
export default class UserService {
  public static async getUserProfile() {
    const uid = SessionManager.shared().getUserID();

    const apiUrl = process.env.REACT_APP_API_BASE_URL + "/" + ApiEndpoints.USER_URL + "/" +
      `${uid}.json`;

    const response = await WebServiceUtils.get({}, apiUrl);

    if (response) {
      try {
        if (response.response.status === 200) {
          const user = new User(response.data);
          console.log(JSON.stringify(user))
          return Promise.resolve(user)
        }
      } catch (error) { console.log("error :- ", error) }
    }
    return WebServiceUtils.handleNetworkError(response)
  }

  public static async uploadImage(file: any) {
    var fileName = file.name
    var allowedExtensions =
      /(\.jpeg|\.jpg|\.JPG|\.JPEG|\.gif|\.GIF|\.png|\.PNG|\.svg|\.SVG)$/
    if (fileName !== "" && !allowedExtensions.exec(fileName)) {
      return Promise.reject(new ApiError(400, Strings.INVALID_FILE_ERROR))
    }
    const apiUrl = process.env.REACT_APP_API_BASE_URL + "/loyalty/upload_image_callback.json"
    console.log(file)
    await WebServiceUtils.validatePartnerAuthToken()
    const response = await WebServiceUtils.multipartPost(
      file,
      apiUrl,
      "file1",
      ''
    )
    if (response.success) {
      try {
        if (response.data &&
          response.data.data && Array.isArray(response.data.data) &&
          response.data.data.length > 0) {
          const fid = response.data.data[0].fid
          return Promise.resolve(fid)
        } else {
          return Promise.reject(new ApiError(500, Strings.DEFAULT_ERROR_MSG))
        }
      } catch (error) {
        return Promise.reject(new ApiError(500, Strings.DEFAULT_ERROR_MSG))
      }
    }
    return WebServiceUtils.handleNetworkError(response)
  }

  public static async updateUserProfile(userInfo: IUserUpdate, fid?: string) {
    console.log(JSON.stringify(userInfo))
    const apiEndPoint = process.env.REACT_APP_API_BASE_URL + "/" + ApiEndpoints.USER_URL + '/' + SessionManager.shared().getUserID() + '.json';
    var userInfoReq: any = {
      [UserInfoType.NAME]: userInfo[UserInfoType.NAME] && {
        und: [
          {
            value: userInfo[UserInfoType.NAME]
          }
        ]
      },
      [UserInfoType.EMAIL_ADDRESS]: userInfo[UserInfoType.EMAIL_ADDRESS] && {
        und: [
          {
            value: userInfo[UserInfoType.EMAIL_ADDRESS]
          }
        ]
      },
      [UserInfoType.MOBILE_NUMBER]: userInfo[UserInfoType.MOBILE_NUMBER] && {
        und: [
          {
            value: userInfo[UserInfoType.MOBILE_NUMBER]
          }
        ]
      },
      field_country: userInfo[UserInfoType.MOBILE_NUMBER] && {
        und: [
          {
            iso2: 'IN'
          }
        ]
      },
      timezone: userInfo[UserInfoType.MOBILE_NUMBER] && DateUtils.getSystemTimeZone(),
      [UserInfoType.NAME]: userInfo[UserInfoType.NAME] && {
        und: [
          {
            value: userInfo[UserInfoType.NAME]
          }
        ]
      },
      [UserInfoType.GENDER]: userInfo[UserInfoType.GENDER] && {
        und: userInfo[UserInfoType.GENDER]
      },
      [UserInfoType.DATE_OF_BIRTH]: userInfo[UserInfoType.DATE_OF_BIRTH] && {
        und: [
          {
            value: {
              date: DateUtils.convertToDateFormat(
                userInfo[UserInfoType.DATE_OF_BIRTH],
                DateUtils.DATE_FORMAT_A
              )
            }
          }
        ]
      },
      [UserInfoType.DATE_OF_ANNIVERSARY]: userInfo[UserInfoType.DATE_OF_ANNIVERSARY] && {
        und: [
          {
            value: {
              date: DateUtils.convertToDateFormat(
                userInfo[UserInfoType.DATE_OF_ANNIVERSARY],
                DateUtils.DATE_FORMAT_A
              )
            }
          }
        ]
      },
      [UserInfoType.IMAGE]: fid && {
        und: [
          {
            "fid": fid
          }
        ]
      }
    };

    console.log('userInfoReq =>'+JSON.stringify(userInfoReq))
    const response = await WebServiceUtils.put(userInfoReq, {}, apiEndPoint);

    if (response.success) {
      return Promise.resolve(response.success);
    }
    return WebServiceUtils.handleNetworkError(response);
  }
}
