import {FindOperator} from "../FindOperator";

export function Or<T>(value: T | FindOperator<T> | FindOperator<T>[]): FindOperator<T> {
    return new FindOperator("or", value)
}
