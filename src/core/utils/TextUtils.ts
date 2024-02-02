import Strings from "./Strings";
import GeneralUtils from "./GeneralUtils";

export default class TextUtils {

  public static commaSepratedFormat(text: string): string {
    var digit = parseInt(text);
    return digit.toLocaleString(["en-US"]);
  }

  public static isEmpty(text: string | undefined | null): boolean {
    if (text && text === 'null') {
      return true;
    }
    return !text || /^\s*$/.test(text);
  }

  public static toString(anyData: any): string {
    return "" + anyData;
  }

  public static stringCompare(text1: string, text2: string): number {
    if (text1 === text2) return 0;
    else if (text1 > text2) return 1;
    else return -1;
  }

  public static formatString(str: string, ...val: string[]) {
    for (let index = 0; index < val.length; index++) {
      str = str.replace(`{${index}}`, val[index]);
    }
    return str;
  }

  public static formatUSPhoneNumber(phoneNumberString: string) {
    if (phoneNumberString && phoneNumberString.length > 0) {
      let phone = "+1" + phoneNumberString;
      var cleaned = ("" + phone).replace(/\D/g, "");
      var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        var intlCode = match[1] ? "+1 " : "";
        return [intlCode, "(", match[2], ") ", match[3], " ", match[4]].join(
          ""
        );
      } else {
        return phone;
      }
    }
    return "";
  }

  public static isValidEmailId(text: string): boolean {
    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    return regexp.test(text);
  }

  public static checkPhoneFormat(phone: string): boolean {
    if (!phone) return false;
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return regex.test(phone);
  }

  public static drivingLicenseLengthValid = (
    value: string,
    minlength: number,
    maxlength: number
  ): boolean => {
    var field = value;
    var mnlen = minlength;
    var mxlen = maxlength;
    if ((field && field.length < mnlen) || (field && field.length > mxlen)) {
      return false;
    } else {
      return true;
    }
  };

  public static isDLNumberValid = (value: string): boolean => {
    var letters = /^[0-9a-zA-Z-]+$/;
    if (value && value.match(letters)) {
      return true;
    } else {
      return false;
    }
  };

  public static withCurrencySymbol(amount: any): string {
    const formattedCurrencyAmt = GeneralUtils.numberFormatWithLocale(amount, false);
    return Strings.DOLLAR_SYMBOL + formattedCurrencyAmt;
  }

  public static withAmountCurrencySymbol(amount: any): string {
    const formattedCurrencyAmt = GeneralUtils.numberFormatWithLocale(amount, true);
    return Strings.DOLLAR_SYMBOL + formattedCurrencyAmt;
  }

  public static withTokenSymbol(amount: any): string {
    return Strings.TOKEN_SYMBOL + amount;
  }

  public static stripNonNumeric(text: string): string {
    if (TextUtils.isEmpty(text)) {
      return text;
    } else {
      return text.replace("[^0-9]", "");
    }
  }

  public static toUsPhoneNumberFormat(phoneNumber: string): string {
    phoneNumber = TextUtils.stripNonNumeric(phoneNumber);

    if (!TextUtils.isEmpty(phoneNumber) && phoneNumber.length === 10) {
      return (
        "+1" +
        TextUtils.formatString(
          " ({0}) {1}-{2}",
          phoneNumber.substring(0, 3),
          phoneNumber.substring(3, 6),
          phoneNumber.substring(6)
        )
      );
    } else {
      return phoneNumber;
    }
  }

  public static isDigitsOnly(text: string): boolean {
    return /^\d+$/.test(text);
  }

  public static isNonZeroDigitsOnly(text: string): boolean {
    return new RegExp("^[1-9]+$").test(text);
  }

  public static isDecimal(text: string): boolean {
    return /^\d+(\.\d{0,2})?$/.test(text);
  }

  public static decimalRoundOff(num: number, uptoPlace: number) {
    if (num) {
      return num.toFixed(uptoPlace);
    }
    return num;
  }

  public static trimString(originalString: string | undefined) {
    if (originalString && originalString.length > 0) {
      var newString = originalString.replace(/^\s+|\s+$/g, "");
      return newString;
    }
    return originalString;
  }

  public static capitalize(word: string | undefined) {
    if (word && word.length > 0) {
      const lower = word.toLowerCase();
      return word.charAt(0).toUpperCase() + lower.slice(1);
    }
    return word;
  }

}
