import { FindOperator } from '../FindOperator'

export function LessThanOrEqual<T>(value: T | FindOperator<T>): FindOperator<T> {
    return new FindOperator('lessThanOrEqual', value)
}
