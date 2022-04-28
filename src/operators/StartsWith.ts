import { FindOperator } from '../FindOperator'

export function StartsWith<T>(value: T | FindOperator<T>): FindOperator<T> {
    return new FindOperator('startsWith', value)
}
