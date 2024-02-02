import WebServiceUtils from "../core/webservice/WebServiceUtils"
import { ApiError } from "../core/webservice/ApiError"
import TextUtils from "../core/utils/TextUtils"
import ApiEndpoints from "./ApiEndpoints"
import UserManager from "../core/utils/UserManager"
import Merchant from "../core/models/Merchant"

export default class MerchantService {
    public static async getMechantDetails(mid: string) {
        if (TextUtils.isEmpty(mid)) {
            return Promise.reject(
                new ApiError(400, "EMPTY MID")
            )
        }
        const config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
        const params = {
            "muid": mid
        }
        const apiUrl = process.env.REACT_APP_API_BASE_URL + "/" + ApiEndpoints.MERCHANT_URL;
        const response = await WebServiceUtils.post(params, config, apiUrl)
        if (response.success) {
            try {
                if (response.data) {
                    const merchantObj = new Merchant(response.data);
                    console.log(JSON.stringify(merchantObj));
                    UserManager.shared().setMerchant(merchantObj);
                    return Promise.resolve(merchantObj)
                }
            } catch (error) { }
        }
        return WebServiceUtils.handleNetworkError(response)
    }
}
