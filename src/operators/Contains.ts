import {FindOperator} from "../FindOperator";

export function Contains<T>(value: T | FindOperator<T>): FindOperator<T> {
    return new FindOperator("contains", value)
}
