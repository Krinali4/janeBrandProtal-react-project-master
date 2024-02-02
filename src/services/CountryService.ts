
import { CountryList } from "../core/models/CountryList";
import WebServiceUtils from "../core/webservice/WebServiceUtils"

export default class CountryService {
    public static async getCountryDetails() {       
     
        // const apiUrl = process.env.REACT_APP_API_BASE_URL + "/" + ApiEndpoints.MERCHANT_URL;
        const apiUrl =`${process.env.REACT_APP_API_BASE_URL}/fhglobal/countryphone.json`
        const response = await WebServiceUtils.post({},{},apiUrl)
        if (response.success) {
            try {
                if (response.success) {
                    const countryObj = new CountryList(response.data);
                    console.log(JSON.stringify(countryObj.CountryList));                  
                    return Promise.resolve(countryObj.CountryList)}
            } catch (error) { }
        }
        return WebServiceUtils.handleNetworkError(response)
    }
}
