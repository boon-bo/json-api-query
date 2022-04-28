import { FindOperator } from '../FindOperator'

export function GreaterThanOrEqual<T>(value: T | FindOperator<T>): FindOperator<T> {
    return new FindOperator('greaterOrEqual', value)
}
