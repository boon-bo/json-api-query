import {FindOptionsOrderValue} from "./FindOptionsOrderValue";
import {FindOptionsOrder} from "./FindOptionsOrder";

/**
 * A single property handler for FindOptionsOrder.
 */
export type FindOptionsOrderProperty<Property> = Property extends Promise<infer I>
    ? FindOptionsOrderProperty<NonNullable<I>>
    : Property extends Array<infer I>
        ? FindOptionsOrderProperty<NonNullable<I>>
        : Property extends Function
            ? FindOptionsOrderValue
            : Property extends Date
                ? FindOptionsOrderValue
                : Property extends object
                    ? FindOptionsOrder<Property>
                    : FindOptionsOrderValue
