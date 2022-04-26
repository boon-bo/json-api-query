import {FindOperator} from "../FindOperator";

export function Not<T>(value: T | FindOperator<T>): FindOperator<T> {
    return new FindOperator("not", value)
}
