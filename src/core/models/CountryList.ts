import Country from "./Country";

export class CountryList {

    private mCountryList: Country[] = [];
    public get CountryList(): Country[] {
        return this.mCountryList
    }
    constructor(data: any) {
        if (Array.isArray(data)) {
            data.forEach((item) => {
                let CountryPhone = new Country(item);
                this.CountryList.push(CountryPhone);
            })
        }
    }
}