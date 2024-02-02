import WebServiceUtils from "../core/webservice/WebServiceUtils"
import ApiEndpoints from "./ApiEndpoints"
import SessionManager from '../core/utils/SessionManager';
export default class AccountService {
    public static async logOut() {

        if (SessionManager.shared().isTokenAvailable) {

            const apiUrl = process.env.REACT_APP_API_BASE_URL + "/" + ApiEndpoints.LOGOUT_URL;

            const response = await WebServiceUtils.post({}, {}, apiUrl);

            if (response.success) {
                try {
                    if (response.response.status === 200) {
                        return Promise.resolve(response.data[0])
                    }
                } catch (error) { }
            }
            return WebServiceUtils.handleNetworkError(response)
        }
    }

    public static async logOutUser() {
        if(!SessionManager.shared().isTokenAvailable()) {
            SessionManager.shared().clearUserSessionData()
            return Promise.resolve(true)
        }
        const apiUrl = process.env.REACT_APP_API_BASE_URL + "/" + ApiEndpoints.LOGOUT_URL;
        const response = await WebServiceUtils.post({}, {}, apiUrl);
        if (response.success) {
            SessionManager.shared().clearUserSessionData()
            return Promise.resolve(true)
        }
        SessionManager.shared().clearUserSessionData()
        return Promise.resolve(true)
    }

}
