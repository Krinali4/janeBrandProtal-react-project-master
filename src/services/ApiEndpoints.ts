
export default class ApiEndpoints {

    public static MERCHANT_URL="loyalty/merchantdetails.json";
    public static SEND_OTP_US_URL = 'smsapi/otprequest.json'
    public static SEND_OTP_IN_URL = 'smsapi/sendsms.json'
    public static VERIFY_OTP_US_URL = 'smsapi/otpverify.json'
    public static AUTH_URL= "loyalty/pwa-connect.json";
    public static LOGOUT_URL= "user/logout.json";
    public static USER_URL= "user";
    public static NEW_REWARD_LIST_URL= "customer-rewards.json";
    public static POINT_HISTORY_LIST_URL= "points-history-pwa";
    public static NEW_COUPONS_HISTORY="loyalty-coupons-history.json";

    public static REWARD_LIST_URL= "loyalty-giveaway-offers"; // Deprecated
    public static COUPONS_HISTORY="coupons-history-pwa"; // Deprecated

    private constructor() {
    }

}