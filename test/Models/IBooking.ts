import { IBookingException } from "./IBookingException";
import { IProfileDetails } from "./IProfileDetails";
import { IVenue } from "./IVenue";

//  export type RecurrenceFrequencyType = 'None' | 'Daily' |'Weekly' | 'Monthly' |'Yearly'

export enum RecurrenceFrequencyType{
  None = 0,
  // Secondly = 1,
  // Minutely = 2,
  // Hourly = 3,
  Daily = 4,
  Weekly = 5,
  Monthly = 6,
  Yearly = 7,
}

export enum Frequency {
  YEARLY = 0,
  MONTHLY = 1,
  WEEKLY = 2,
  DAILY = 3,
  HOURLY = 4,
  MINUTELY = 5,
  SECONDLY = 6
}

// export enum RRulerFrequency {
//   YEARLY = 0,
//   MONTHLY = 1,
//   WEEKLY = 2,
//   DAILY = 3,
//   HOURLY = 4,
//   MINUTELY = 5,
//   SECONDLY = 6
// }

export class IBooking {
  approvedBy: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  stageName: string;
  avatar: string;
  dateRequested: Date;
  approved: boolean;
  rejected: boolean;
  progress: number;
  phone: string;
  city: string;
  artists: Array<IProfileDetails>;
  recurrenceCount: number;
  recurrenceFrequency: RecurrenceFrequencyType;
  frequencyType: number;
  startDate: string;
  endDate: string;
  duration: number;
  venue: IVenue;
  "booking-exceptions": Array<IBookingException>;
  approvedDate: Date
  calFile: string
  recurrencePattern: string
}


