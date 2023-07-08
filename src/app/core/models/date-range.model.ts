import { DateTime } from 'luxon';

export class DateRange {
  start: DateTime;
  end: DateTime;

  constructor(start: DateTime, end: DateTime) {
    this.start = start;
    this.end = end;
  }

  static fromJSDates(start: Date, end: Date) {
    return new DateRange(
      DateTime.fromJSDate(start),
      DateTime.fromJSDate(end)
    );
  }

  static last7Days(): DateRange {
    return new DateRange(
      DateTime.now().minus({ days: 6 }),
      DateTime.now()
    );
  }

  setDayBoundaries(): void {
    this.start = this.start.set({ hour: 0, minute: 0, second: 0 });
    this.end = this.end.set({ hour: 23, minute: 59, second: 59 });
  }
}
