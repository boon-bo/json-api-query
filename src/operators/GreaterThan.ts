/**
 * Find Options Operator.
 * Example: { someField: MoreThan(10) }
 */
import { FindOperator } from '../FindOperator'

export function GreaterThan<T>(value: T | FindOperator<T>): FindOperator<T> {
    return new FindOperator('greaterThan', value)
}
