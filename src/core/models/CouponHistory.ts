import DateUtils from "../utils/DateUtils";
import { discountType } from "./Reward";

export enum CouponHistoryType {
  REDEEM = "Redeem",
  AVAILABLE = "Available",
  BLOCKED = "Blocked",
  EXPIRED = "Expired",
  POINTS = "Points"
}
export type ICouponHistory = {
  coupon_code: string;
  reason: string;
  redemption_date: string;
  user_txn_operation: string;
  redeemed_bill_no: string;
  type: CouponHistoryType;
  issue_date: string;
  valid_from: string;
  valid_till: string;
  discount_value: string;
  min_shopping_value: string;
  promo_title?: string;
  max_discount_value?: string;
  discount_type?: discountType;
  expiry_date?: string
  // expired_on?:string;
}

export default class CouponHistory {

  private mCouponCode: string
  public get couponCode() {
    return this.mCouponCode
  }

  private mReason: string
  public get reason() {
    return this.mReason
  }

  private mRedemptionDate: string
  public get redemptionDate() {
    return this.mRedemptionDate
  }

  private mUserTxnOperation: string
  public get userTxnOperation() {
    return this.mUserTxnOperation
  }

  private mRedeemedBillNo: string
  public get redeemedBillNo() {
    return this.mRedeemedBillNo
  }

  private mType: CouponHistoryType
  public get type() {
    return this.mType
  }

  private mIssueDate: string
  public get issueDate() {
    return this.mIssueDate
  }

  private mValidFrom: string
  public get validFrom() {
    return this.mValidFrom
  }

  private mValidTill: string
  public get validTill() {
    return this.mValidTill
  }
  private mExpiredDate: string
  public get expiredDate() {
    return this.mExpiredDate
  }
  public getHeading = (): string => {
    switch (this.mType) {
      case CouponHistoryType.AVAILABLE:
        return `Your available Coupon ${this.mCouponCode}`;
      case CouponHistoryType.BLOCKED:
        return `Your coupon ${this.mCouponCode} has blocked`;
      case CouponHistoryType.EXPIRED:
        return `Your coupon ${this.mCouponCode} has expired`;
      default:
        return `You have redeemed coupon ${this.mCouponCode}`;
    }
  }

  private static dateFormate(timeStamp: string): string {
    return DateUtils.displayDateWithTimeStamp(timeStamp);
  }

  public getIssueDate() {
    return CouponHistory.dateFormate(this.mIssueDate)
  }
  public getValidFrom() {
    return CouponHistory.dateFormate(this.mValidFrom)
  }
  public getValidTill() {
    return CouponHistory.dateFormate(this.mValidTill)
  }
  public getRedemptionDate() {
    return CouponHistory.dateFormate(this.mRedemptionDate)
  }
  public getExpiredDate() {
    return CouponHistory.dateFormate(this.mExpiredDate)
  }
  private mDiscountValue: string
  public get discountValue() {
    return this.mDiscountValue
  }

  private mMinShoppingValue: string
  public get minShoppingValue() {
    return this.mMinShoppingValue
  }

  private mPromoTitle: string
  public get promoTitle() {
    return this.mPromoTitle
  }
  private mMaxDiscountValue: string;
  public get maxDiscountValue() {
    return this.mMaxDiscountValue;
  }
  private mDiscountType: discountType
  public get discountType() {
    return this.mDiscountType
  }

  constructor(res: ICouponHistory) {
    this.mCouponCode = res.coupon_code
    this.mReason = res.reason
    this.mRedemptionDate = res.redemption_date
    this.mUserTxnOperation = res.user_txn_operation
    this.mRedeemedBillNo = res.redeemed_bill_no
    this.mType = res.type == CouponHistoryType.REDEEM ? res.type : CouponHistoryType.EXPIRED
    this.mIssueDate = res.issue_date
    this.mValidFrom = res.valid_from
    this.mValidTill = res.valid_till
    this.mDiscountValue = res?.discount_value?.length > 0 ? res?.discount_value : "40"
    this.mMinShoppingValue = res.min_shopping_value
    this.mPromoTitle = res.promo_title
    this.mMaxDiscountValue = res?.max_discount_value?.length > 0 ? res?.max_discount_value : "40"
    this.mExpiredDate = res?.expiry_date
    this.mDiscountType = res?.discount_type
  }

}