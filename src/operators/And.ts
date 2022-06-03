import { FindOperator } from '../FindOperator'

export function And<T>(value: T | FindOperator<T>| FindOperator<T>[]): FindOperator<T> {
    return new FindOperator('and', value)
}
