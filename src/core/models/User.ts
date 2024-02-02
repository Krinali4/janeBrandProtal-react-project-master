import Loyalty from "./Loyalty";
import DateUtils from '../utils/DateUtils';
import TextUtils from "../utils/TextUtils";
import JsonUtils from '../utils/JsonUtils';
export type IUserField = {
    und: {
        iso2?: string,
        target_id?: string,
        value?: string
    }[]
}

export type IUser = {
    uid: string;
    status: string;
    field_kiosk_attached_merchant: IUserField;
    field_your_name: IUserField;
    field_kiosk_consumer_email: IUserField;
    field_kiosk_consumer_phone: IUserField;
    field_gender: IUserField;
    field_date_of_birth: IUserField;
    timezone: string;
    field_country: IUserField;
    loyalty: Loyalty;
    mail?: string;
    picture?:any;
    field_date_of_anniversary?:IUserField;
};

export type IUserUpdate = {
    uid: string;
    field_your_name: string;
    field_kiosk_consumer_email: string;
    field_kiosk_consumer_phone: string;
    field_gender: string;
    field_date_of_birth: string;
    field_date_of_anniversary: string;

};

export default class User {

    private mUserId: string;
    public get userId() {
        return this.mUserId;
    }

    private mMerchantId: string;
    public get merchantId() {
        return this.mMerchantId;
    }
    private mName: string;
    public get name() {
        return this.mName;
    }

    private mEmail: string;
    public get email() {
        return this.mEmail;
    }

    private mPhone: string;
    public get phone() {
        return this.mPhone;
    }

    private mGender: string;
    public get gender() {
        return this.mGender;
    }

    private mDateofbirth: string;
    public get dateofbirth() {
        return this.mDateofbirth;
    }

    private mTimezone: string;
    public get timezone() {
        return this.mTimezone;
    }

    private mCountry: string;
    public get country() {
        return this.mCountry;
    }

    private mLoyalty: Loyalty;
    public get loyalty() {
        return this.mLoyalty;
    }

    private mImgUrl: string;
    public get imgUrl() {
        return this.mImgUrl;
    }

    private mAnniversaryDate: string;
    public get anniversaryDate() {
        return this.mAnniversaryDate;
    }

    private mIsActive: boolean;
    public get isActive() {
        return this.mIsActive;
    }

    public static userMobileNumber(number: string):string {
        const data = number.split("-")
        return data[0];
    }

    public displayDOB() {
        let dobStr = ""
        if(!TextUtils.isEmpty(this.mDateofbirth)) {
            dobStr = DateUtils.convertToDateFormat(this.mDateofbirth,'MM/DD/YYYY')
        }
        return dobStr
    }

    public displayDOA() {
        let doaStr = ""
        if(!TextUtils.isEmpty(this.mAnniversaryDate)) {
            doaStr = DateUtils.convertToDateFormat(this.mAnniversaryDate,'MM/DD/YYYY')
        }
        return doaStr
    }
    //"status": "1",
    constructor(resp: IUser) {
        this.mUserId = resp.uid;
        this.mIsActive = resp.status && resp.status === "1" ? true : false
        this.mImgUrl = resp?.picture?.full_url;
        this.mMerchantId = JsonUtils.getUndTargetId(resp.field_kiosk_attached_merchant);
        this.mName = JsonUtils.getUndValue(resp.field_your_name);
        this.mEmail = JsonUtils.getUndValue(resp.field_kiosk_consumer_email);
        this.mPhone = User.userMobileNumber(resp.mail);
        this.mGender = JsonUtils.getUndValue(resp.field_gender);
        this.mTimezone = resp.timezone;
        this.mCountry = JsonUtils.getUndIso2(resp.field_country);
        
        this.mDateofbirth = ""
        let dobVal = JsonUtils.getUndValue(resp.field_date_of_birth)
        if(dobVal) {
            dobVal = DateUtils.convertToDateFormat(dobVal,'YYYY-MM-DD')
            this.mDateofbirth = dobVal
        }

        this.mAnniversaryDate = ""
        let doaVal = JsonUtils.getUndValue(resp.field_date_of_anniversary)
        if(doaVal) {
            doaVal = DateUtils.convertToDateFormat(doaVal,'YYYY-MM-DD')
            this.mAnniversaryDate = doaVal
        }
        
        if ('current_points' in resp.loyalty) {
            const loyaltyResp = new Loyalty(resp.loyalty);
            this.mLoyalty = loyaltyResp;
        }
        
    }
}