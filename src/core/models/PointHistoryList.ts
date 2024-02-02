import PointHistory from "./PointHistory";

export class PointHistoryList {

    private mPointHistoryList: PointHistory[] = [];
    public get pointHistoryList(): PointHistory[] {
        return this.mPointHistoryList
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
                let pointHistory = new PointHistory(item);
                this.pointHistoryList.push(pointHistory);
            })
        }
    }
}