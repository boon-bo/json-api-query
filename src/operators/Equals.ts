import {FindOperator} from "../FindOperator";

export function Equals<T>(value: T | FindOperator<T>): FindOperator<T> {
    return new FindOperator("equal", value)
}
