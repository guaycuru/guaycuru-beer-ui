import { DateTime } from 'luxon';
import { Utils } from '../../shared/utils';

export class LocalTime {
  hour: number;
  minute: number;
  second: number;

  constructor(hour: number, minute = 0, second = 0) {
    this.hour = hour;
    this.minute = minute;
    this.second = second;
  }

  static parse(time: string): LocalTime {
    if(!time) {
      return null;
    }

    let hour = 0;
    let minute = 0;
    let second = 0;

    const colon1 = time.indexOf(':');
    if(colon1 > 0) {
      hour = Number(time.substring(0, colon1));

      const colon2 = time.indexOf(':', colon1 + 1);
      const dot = time.indexOf('.', colon2 + 1);
      if(colon2 > colon1) {
        minute = Number(time.substring(colon1 + 1, colon2));
        if(dot > colon2) {
          second = Number(time.substring(colon2 + 1, dot));
        } else {
          second = Number(time.substr(colon2 + 1, 2));
        }
      } else {
        minute = Number(time.substring(colon1 + 1));
      }
    }

    return new LocalTime(hour, minute, second);
  }

  static fromDate(date: Date): LocalTime {
    if(!date) {
      return null;
    }
    return new LocalTime(date.getHours(), date.getMinutes(), date.getSeconds());
  }

  static fromISO(isoString: string): LocalTime {
    const dateTime = DateTime.fromISO(isoString);
    dateTime.set({ millisecond: 0 });
    return LocalTime.parse(dateTime.toISOTime({ includeOffset: false, suppressMilliseconds: true }));
  }

  toString(): string {
    return Utils.zeroPad(this.hour, 2) + ':' + Utils.zeroPad(this.minute, 2) + ':' + Utils.zeroPad(this.second, 2);
  }

  toISO(): string {
    return this.toString();
  }

  toDate(): Date {
    const date = new Date();
    date.setHours(this.hour, this.minute, this.second);
    return date;
  }
}
