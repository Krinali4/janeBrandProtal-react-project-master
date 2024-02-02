import DateUtils from "../utils/DateUtils";

export enum discountType {
    FIXED = "Fixed",
    PERCENTAGE = "Percentage"
}

export enum type {
    COUPON = "coupon",
    OFFER = "offer",
    PROMOS = "promos",
}

export enum rewardType {
    AVAILABLE_REWARD = "available_reward",
    HIGHER_REWARD = "higher_reward"
}

export type IRewards = {
    cp_id: string;
    nid: string;
    promo_title: string;
    discount_type: discountType;
    coupon_code: string;
    image: string;
    type: type;
    issue_date: string;
    valid_from: string;
    discount_value: string;
    min_shopping_value: string;
    reward_type: rewardType;
    status: boolean;
    valid_till: string;
    desc: string;
    max_discount_value: string;
    point_required: string;
};

export default class Reward {

    private static dateFormate(timeStamp: string): string {
        return DateUtils.displayDateWithTimeStamp(timeStamp);
    }

    public getIssueDate() {
        return Reward.dateFormate(this.mIssueDate)
    }
    public getValidFrom() {
        return Reward.dateFormate(this.mValidFrom)
    }
    public getValidTill() {
        return Reward.dateFormate(this.mValidTill)
    }

    private mCpId: string;
    public get cp_id() {
        return this.mCpId;
    }
    private mNid: string;
    public get nid() {
        return this.mNid;
    }
    private mPromoTitle: string;
    public get promo_title() {
        return this.mPromoTitle;
    }
    private mDiscountType: discountType;
    public get discount_type() {
        return this.mDiscountType;
    }

    private mCouponCode: string;
    public get coupon_code() {
        return this.mCouponCode;
    }

    private mImageUrl: string;
    public get image() {
        return this.mImageUrl;
    }

    private mType: type;
    public get type() {
        return this.mType;
    }
    private mIssueDate: string;
    public get issue_date() {
        return this.mIssueDate;
    }

    private mValidFrom: string;
    public get valid_from() {
        return this.mValidFrom;
    }

    private mDiscountValue: string;
    public get discount_value() {
        return this.mDiscountValue;
    }
    private mMinShoppingValue: string;
    public get min_shopping_value() {
        return this.mMinShoppingValue;
    }
    private mStatus: boolean;
    public get status() {
        return this.mStatus;
    }

    private mRewardType: rewardType;
    public get reward_type() {
        return this.mRewardType;
    }
    private mValidTill: string;
    public get valid_till() {
        return this.mValidTill;
    }

    private mDesc: string;
    public get desc() {
        return this.mDesc;
    }
    private mMaxDiscountValue: string;
    public get max_discount_value() {
        return this.mMaxDiscountValue;
    }
    private mPointRequried: string;
    public get point_required() {
        return this.mPointRequried;
    }
    constructor(res: IRewards) {
        this.mCpId = res.cp_id;
        this.mNid = res.nid;
        this.mPromoTitle = res.promo_title;
        this.mDiscountType = res.discount_type;
        this.mCouponCode = res.coupon_code;
        this.mImageUrl = res.image;
        this.mType = res.type;
        this.mIssueDate = res.issue_date;
        this.mValidFrom = res.valid_from;
        this.mDiscountValue = res.discount_value;
        this.mMinShoppingValue = res.min_shopping_value;
        this.mRewardType = res.reward_type;
        if (res.status) { this.mStatus = true } else { this.mStatus = false }
        this.mValidTill = res.valid_till;
        this.mDesc = res.desc;
        this.mMaxDiscountValue = res.max_discount_value;
        if ("point_required" in res) {
            this.mPointRequried = res.point_required;
        } else {
            this.mPointRequried = null;
        }
    }
}