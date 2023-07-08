import { DateTime } from 'luxon';

export abstract class Utils {

  static zeroPad(num: number, desiredLength: number): string {
    let result: string = num.toString();
    while (result.length < desiredLength) {
      result = '0' + result;
    }
    return result;
  }

  static getDateFormatBasedOnSystemLocale(): string {
    // We want the dateRangePicker's input format to change based on locale
    const locale = DateTime.now().locale.toLowerCase();

    if (locale === 'es-us' || locale === 'es-mx' || locale === 'pt-br') {
      return 'DD/MM/YYYY';
    } else {
      return 'MM/DD/YYYY';
    }
  }

  static getDateTimeFormatBasedOnSystemLocale(): string {
    // We want the dateRangePicker's input format to change based on locale
    const locale = DateTime.now().locale.toLowerCase();

    if (locale === 'es-us' || locale === 'es-mx' || locale === 'pt-br') {
      return 'DD/MM/YYYY H:mm:ss';
    } else {
      return 'MM/DD/YYYY h:mm:ss a';
    }
  }

  static ensureEnumKey<T>(type: any, key: T|string): T {
    if (typeof key === 'string') {
      return type[key];
    } else {
      return key;
    }
  }
}
