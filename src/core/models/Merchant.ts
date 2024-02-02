import TextUtils from "../utils/TextUtils"

export type IMerchant = {
    merchantId: string,
    logo: string,
    business_name: string,
    tp_logs: string,
    dlt_param: any
}

export default class Merchant {
    private mMerchantId: string
    public get merchantId() {
        return this.mMerchantId
    }
    private mLogo: string
    public get logo() {
        return this.mLogo
    }
    private mBusinessName: string
    public get business_name() {
        return this.mBusinessName
    }

    private mDLTFromName: string;
    public get dltFromName(): string {
        return this.mDLTFromName;
    }

    private mThirdPartyLogFlag: string;
    public get thirdPartyLogFlag(): string {
        return this.mThirdPartyLogFlag;
    } 

    constructor(resp: IMerchant) {
        this.mMerchantId = resp.merchantId;
        this.mLogo = resp.logo;
        this.mBusinessName = resp.business_name;

        this.mThirdPartyLogFlag = resp.tp_logs;

        this.mDLTFromName = ""
        if (resp.dlt_param) {
            let dltParam = resp.dlt_param;
            if(dltParam.from_name && !TextUtils.isEmpty(dltParam.from_name)) {
                this.mDLTFromName = dltParam.from_name
            }
        }
    }

}