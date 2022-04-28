import { FindOperator } from '../FindOperator'

export function Has<T>(value: T[] | FindOperator<T>): FindOperator<T> {
    return new FindOperator('has', value as any, true, true)
}
