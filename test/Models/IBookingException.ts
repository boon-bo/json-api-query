import { IProfileDetails } from "./IProfileDetails";
import { IBooking } from "./IBooking";


export interface IBookingException {
  id: string;
  artists: Array<IProfileDetails>;
  booking: IBooking;
  exceptionDate: string;
  "booking-id": string;
}
