import { ITown } from "./ITown";
import { IImage } from "./IImage";
import { IBooking } from "./IBooking";
import { IBookingException } from "./IBookingException";

export interface IProfileDetails {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  stageName: string;
  isActive: boolean;
  facebookUrl: string;
  youTubeUrl: string;
  instagramUrl: string;
  legacyId: string;

  images: IImage[];

  description: string;
  mobile: string;
  videoUrl: string;
  biography: string;
  keywords: string;
  quote1: string;
  quote2: string;
  quote3: string;
  quote4: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  termsAcknowledged: boolean;
  dbsApproved: boolean;
  dbsExpires: Date;
  pliApproved: boolean;
  pliExpiry: Date;
  caeApproved: boolean;
  longitude: number;
  latitude: number;
  travelMiles: number;
  rating: number;
  town: ITown;

  company: string;
  contactPhone: string;
  companySite: string;
  country: string;
  language: string;
  timeZone: string;
  currency: string;
  communications: {
    email: boolean | undefined;
    phone: boolean | undefined;
  };
  allowMarketing: boolean;
  "booking-exceptions": IBookingException[]
}
