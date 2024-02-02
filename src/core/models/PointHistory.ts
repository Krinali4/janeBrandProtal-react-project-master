import DateUtils from "../utils/DateUtils"
import TextUtils from "../utils/TextUtils"
export enum CouponType {
  EXPIRED = "expired",
  REDEEMED = "redeemed",
  ROLLEDBACK = "rolledback",
  EARNED = "earned",
}
export type IPointHistory = {
  userpoints_txn_points: string
  reason: string
  date: string
  expiry_date: string
  userpoints_txn_operation: string
  type: string
  txn_id: string
  bill_amount?: { value: number; currency: string }
  invoice_id?: string
  store_name: string
}

export default class PointHistory {
  private mUserpointsTxnPoints: string
  public get userpoints_txn_points() {
    return this.mUserpointsTxnPoints
  }

  private mStoreName: string
  public get storeName() {
    return this.mStoreName
  }

  private mReason: string
  public get reason() {
    return this.mReason
  }

  private mDate: string
  public get date() {
    return this.mDate
  }

  private mType: CouponType
  public get type() {
    return this.mType
  }

  private mUserpointsTxnOperation: string
  public get userpoints_txn_operation() {
    return this.mUserpointsTxnOperation
  }

  private mTxnId: string
  public get txn_id() {
    return this.mTxnId
  }

  private mBillAmount: number
  public get billAmount() {
    return this.mBillAmount
  }

  private mCountryCode: string
  public get countryCode() {
    return this.mCountryCode
  }

  private mInvoiceId: string
  public get invoice_id() {
    return this.mInvoiceId
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

  public getHeading = (): string => {
    switch (this.mType) {
      case CouponType.EARNED:
        return `You have earned ${this.mUserpointsTxnPoints} points`
      case CouponType.EXPIRED:
        return `Your ${this.mUserpointsTxnPoints} points have expired`
      case CouponType.REDEEMED:
        return `You have redeemed ${this.mUserpointsTxnPoints} points`
      case CouponType.ROLLEDBACK:
        return `Your ${this.mUserpointsTxnPoints} points have been rolledback`
      default:
        return ""
    }
  }

  private static dateFormate(timeStamp: string): string {
    return DateUtils.displayDateWithTimeStamp(timeStamp);
  }
  public getValidTill() {
    return PointHistory.dateFormate(this.mDate)
  }
  public getRedemptionDate() {
    return PointHistory.dateFormate("")
  }
  public getExpiresOn() {
    if (this.mExpiryDate) {
      return PointHistory.dateFormate(this.mExpiryDate)
    }
    return ""
  }
  public getExpiredOn() {
    if (this.mType === CouponType.EXPIRED) {
      return PointHistory.dateFormate(this.mDate)
    }
    return ""
  }
  public getIssueDate() {
    return PointHistory.dateFormate(this.mIssueDate)
  }

  public getValidFrom() {
    return PointHistory.dateFormate(this.mValidFrom)
  }
  private mDiscountValue: string
  public get discountValue() {
    return this.mDiscountValue
  }

  private mMinShoppingValue: string
  public get minShoppingValue() {
    return this.mMinShoppingValue
  }

  private mPromotitle: string
  public get promotitle() {
    return this.mPromotitle
  }
  private mMaxDiscountValue: string
  public get maxDiscountValue() {
    return this.mMaxDiscountValue
  }

  private mExpiryDate: string
  public get expiryDate() {
    return this.mExpiryDate
  }


  
  constructor(res: IPointHistory) {
    this.mUserpointsTxnPoints = (res.userpoints_txn_points) ? res.userpoints_txn_points : ""

    if(this.mUserpointsTxnPoints.startsWith('-')) {
      this.mUserpointsTxnPoints = this.mUserpointsTxnPoints.replace('-','')
    }

    this.mReason = res.reason
    this.mDate = res.date
    this.mStoreName = res.store_name

    this.mExpiryDate = (res.expiry_date) ? res.expiry_date : undefined

    if (CouponType.EARNED == res.type) {
      this.mType = CouponType.EARNED
    } else if (CouponType.REDEEMED == res.type) {
      this.mType = CouponType.REDEEMED
    } else if (CouponType.ROLLEDBACK == res.type) {
      this.mType = CouponType.ROLLEDBACK
    } else {
      this.mType = CouponType.EXPIRED
    }

    this.mUserpointsTxnOperation = res.userpoints_txn_operation
    this.mTxnId = res.txn_id

    if ("invoice_id" in res) {
      this.mInvoiceId = res.invoice_id
    } else {
      this.mInvoiceId = ""
    }

    if ("bill_amount" in res) {
      if ("value" in res.bill_amount) {
        this.mBillAmount = res.bill_amount.value
      } else {
        this.mBillAmount = null
      }
      if ("currency" in res.bill_amount) {
        this.mCountryCode = res.bill_amount.currency
      } else {
        this.mCountryCode = ""
      }
    } else {
      this.mCountryCode = ""
      this.mBillAmount = null
    }
  }
}
