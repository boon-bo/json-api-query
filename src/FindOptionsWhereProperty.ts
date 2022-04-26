import {FindOperator} from "./FindOperator";
import {EqualOperator} from "./EqualOperator";
import {FindOptionsWhere} from "./FindOptionsWhere";

/**
 * A single property handler for FindOptionsWere.
 */
export type FindOptionsWhereProperty<Property> = Property extends Promise<infer I>
    ? FindOptionsWhereProperty<NonNullable<I>>
    : Property extends Array<infer I>
        ? FindOptionsWhereProperty<NonNullable<I>>
        : Property extends Function
            ? Property | FindOperator<Property>
            : Property extends Date
                ? Property | FindOperator<Property>
                : Property extends object
                    ?
                    | FindOptionsWhere<Property>
                    | FindOptionsWhere<Property>[]
                    | EqualOperator<Property>
                    | FindOperator<any>
                    | boolean
                    : Property | FindOperator<Property>
