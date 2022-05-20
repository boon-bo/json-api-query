import { ITown } from "./ITown";

export interface IVenue {
  longitude: string;
  latitude: string;
  id: string;
  name: string;
  address1: string;
  address2: string;
  address3: string;
  postCode: string;
  email: string;
  phone: string;
  notes: string;
  invoiceEmail: string;
  xeroId: string;
  town: ITown;
}
