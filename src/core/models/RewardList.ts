import Reward from "./Reward";

export class RewardList {

    private mRewardList: Reward[] = [];
    public get rewardList(): Reward[] {
        return this.mRewardList
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
                let couponHistory = new Reward(item);
                this.mRewardList.push(couponHistory);
            })
        }
    }

}