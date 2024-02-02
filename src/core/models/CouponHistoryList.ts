import CouponHistory from "./CouponHistory";

export class CouponHistoryList {

    private mCouponHistoryList: CouponHistory[] = [];
    public get couponHistoryList(): CouponHistory[] {
        return this.mCouponHistoryList
    }

    private mTotalRecords: string;
    public get totalRecords(): string {
        return this.mTotalRecords;
    }
    public setTotalRecords(data: string) {
        this.mTotalRecords = data;
    }

    constructor(data: any) {
        if (Array.isArray(data)) {
            data.forEach((item) => {
                if (item != null) {
                    let couponHistory = new CouponHistory(item);
                    this.couponHistoryList.push(couponHistory);
                }
            })
        }
    }
}