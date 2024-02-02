import WebServiceUtils from "../core/webservice/WebServiceUtils"
import ApiEndpoints from "./ApiEndpoints"
import { PointHistoryList } from "../core/models/PointHistoryList";
import SessionManager from "../core/utils/SessionManager";

export default class PointService {
    public static async getPointHistory(page: number) {

        const uid = SessionManager.shared().getUserID();

        const apiUrl = process.env.REACT_APP_API_BASE_URL + "/" + ApiEndpoints.POINT_HISTORY_LIST_URL + "/" +
            `${uid}.json?page=${page}`;

        const response = await WebServiceUtils.get({}, apiUrl);
       
        if (response) {
            try {
                if (response.response.status === 200) {
                    const pointHistoryList = new PointHistoryList(response.data.data);
                    console.log(JSON.stringify(pointHistoryList))
                    pointHistoryList.setTotalRecords(response.data.total_records);
                    return Promise.resolve(pointHistoryList)
                }
            } catch (error) { console.log("error :- ", error) }
        }
        return WebServiceUtils.handleNetworkError(response)

    }
}
