import {FindOperator} from "../FindOperator";

export function EndsWith<T>(value: T | FindOperator<T>): FindOperator<T> {
    return new FindOperator("endsWith", value)
}
