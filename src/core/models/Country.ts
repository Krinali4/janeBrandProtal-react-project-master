export type ICountry = {
  country: string
  country_code: string
  code: string
  flag_icon: string
  regex: string
  phone_min_length: number
  phone_max_length: number
}
export default class Country {
  private mCountry: string
  public get country() {
    return this.mCountry
  }

  private mCountryCode: string
  public get country_code() {
    return this.mCountryCode
  }

  private mCode: string
  public get code() {
    return this.mCode
  }

  private mFlagIcon: string
  public get flag_icon() {
    return this.mFlagIcon
  }

  private mRegex: string
  public get regex() {
    return this.mRegex
  }

  private mPhoneMinLength: number
  public get phone_min_length() {
    return this.mPhoneMinLength
  }

  private mPhoneMaxLength: number
  public get phone_max_length() {
    return this.mPhoneMaxLength
  }

  constructor(res: ICountry) {
    this.mCountry = res.country
    this.mCountryCode = res.country_code
    this.mCode = res.code
    this.mFlagIcon = res.flag_icon
    this.mRegex = res.regex
    this.mPhoneMinLength = res.phone_min_length
    this.mPhoneMaxLength = res.phone_max_length
  }

  public getCountry(): ICountry {
    const countryObj: ICountry = {
      country: this.mCountry,
      country_code: this.mCountryCode,
      code: this.mCode,
      flag_icon: this.mFlagIcon,
      regex: this.mRegex,
      phone_min_length: this.mPhoneMinLength,
      phone_max_length: this.mPhoneMaxLength
    }
    return countryObj
  }
}
