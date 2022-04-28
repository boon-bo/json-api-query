import { FindOperator } from '../FindOperator'

export function LessThan<T>(value: T | FindOperator<T>): FindOperator<T> {
    return new FindOperator('lessThan', value)
}
