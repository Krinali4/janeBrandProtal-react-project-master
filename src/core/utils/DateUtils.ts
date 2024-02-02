import dayjs, { Dayjs } from "dayjs";
export default class DateUtils {

  public static readonly DATE_FORMAT_A = 'DD/MM/YYYY'

  /**
     * Returns current unix timestamp.
     *
     * @param {number} x The number to raise.
     * @param {number} n The power, must be a natural number.
     * @return {number} current unix timestamp.
  */
  public static getCurrentTimeUnixTimestamp(): number {
    const currTimestamp = dayjs().unix()
    return currTimestamp;
  }

  /**
     * Returns dayjs date object from unix timestamp.
     *
     * @param {string} strTimestamp The unix timestamp.
     * @return {Dayjs} Dayjs date object.
  */
  public static getDateWithTimeStamp(strTimestamp: string): Dayjs {
    let dt: Dayjs = undefined
    if(strTimestamp && strTimestamp.length > 0) {
      const intTimeStamp = parseInt(strTimestamp)
      dt = dayjs.unix(intTimeStamp)
      console.log(dt)
    }
    return dt
  }

  /**
     * Returns formatted date from timestamp and format.
     *
     * @param {string} strTimestamp The unix timestamp.
     * @param {string} dateFormat The date format i.e DD/MM/YYYY.
     * @return {string} formatted date as per the dateformat.
  */
  public static displayDateWithTimeStamp(strTimestamp: string, dateFormat?: string): string {
    let displayDate: string = ''
    const dt = this.getDateWithTimeStamp(strTimestamp)
    if(dt) {
      const toDateFormat = dateFormat ? dateFormat : DateUtils.DATE_FORMAT_A
      displayDate = dt.format(toDateFormat)
    }
    return displayDate
  }

  /**
     * Returns formatted date from the date.
     *
     * @param {string} strDate The input date i.e 01-11-2014.
     * @param {string} toDateFormat The new date format i.e DD/MM/YYYY.
     * @return {string} formatted date as per the dateformat.
  */
  public static convertToDateFormat(strDate: string, toDateFormat:string): string {
    let newDate: string = ''
    if(strDate && strDate.length > 0) {
      const dt = dayjs(strDate)
      if(dt.isValid()) {
        newDate = dt.format(toDateFormat)
      }
    }
    return newDate
  }

  public static getSystemTimeZone(): string {
    let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    //Temporary fix
    if (timeZone === "Asia/Calcutta") {
      timeZone = "Asia/Kolkata";
    }

    return timeZone;
  }

}
