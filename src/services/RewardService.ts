import WebServiceUtils from "../core/webservice/WebServiceUtils"
import ApiEndpoints from "./ApiEndpoints"
import SessionManager from "../core/utils/SessionManager"
import { RewardList } from "../core/models/RewardList"
import { CouponHistoryList } from "../core/models/CouponHistoryList";
import { ApiError } from "../core/webservice/ApiError";
import Strings from "../core/utils/Strings";

export default class RewardService {
    public static async getRewardList(page: number) {

        // const mid = parseInt(SessionManager.shared().getMerchentID());

        const apiUrl = process.env.REACT_APP_API_BASE_URL + "/" + ApiEndpoints.NEW_REWARD_LIST_URL +
            `?page=${page}`;
        // const apiUrl = process.env.REACT_APP_API_BASE_URL + "/" + ApiEndpoints.REWARD_LIST_URL + "/" +
        //     `${mid}.json?page=${page}`;

        const response = await WebServiceUtils.get({}, apiUrl);

        if (response) {
            try {
                if (response.response.status === 200) {
                    let arrOfRewards = []
                    let totalRecords = 0
                    if(response.data && response.data.data && Array.isArray(response.data.data)) {
                        arrOfRewards = response.data.data
                        totalRecords =  response.data.total_records ? response.data.total_records : 0
                    }
                    const rewardList = new RewardList(arrOfRewards);
                    rewardList.setTotalRecords(`${totalRecords}`);
                    console.log(JSON.stringify(rewardList))
                    return Promise.resolve(rewardList)
                } else {
                    return Promise.reject(
                        new ApiError(500, Strings.DEFAULT_ERROR_MSG)
                    );
                }
            } catch (error) { console.log("error :- ", error) }
        }
        return WebServiceUtils.handleNetworkError(response)

    }

    public static async getCouponHistoryList(page: number) {

        // const uid = SessionManager.shared().getUserID();
        // const apiUrl = process.env.REACT_APP_API_BASE_URL + "/" + ApiEndpoints.COUPONS_HISTORY + "/" +
        //     `${uid}.json?page=${page}`;

        const apiUrl = process.env.REACT_APP_API_BASE_URL + "/" + ApiEndpoints.NEW_COUPONS_HISTORY +
            `?page=${page}`;

        const response = await WebServiceUtils.get({}, apiUrl);

        if (response) {
            try {
                if (response.response.status === 200) {
                    const couponHistoryList = new CouponHistoryList(response.data.data);
                    couponHistoryList.setTotalRecords(response.data.total_records);
                    console.log(JSON.stringify(couponHistoryList))
                    return Promise.resolve(couponHistoryList)
                }
            } catch (error) { console.log("error :- ", error) }
        }
        return WebServiceUtils.handleNetworkError(response)

    }
}
