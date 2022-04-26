import {FindOptionsSelect} from "./FindOptionsSelect";

/**
 * A single property handler for FindOptionsSelect.
 */
export type FindOptionsSelectProperty<Property> = Property extends Promise<infer I>
    ? FindOptionsSelectProperty<I> | boolean
    : Property extends Array<infer I>
        ? FindOptionsSelectProperty<I> | boolean
        : Property extends Function
            ? boolean
            : Property extends Date
                ? boolean
                : Property extends object
                    ? FindOptionsSelect<Property>
                    : boolean
