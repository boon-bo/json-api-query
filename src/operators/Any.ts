import { FindOperator } from '../FindOperator'

export function Any<T>(value: T[] | FindOperator<T>): FindOperator<T> {
    return new FindOperator('any', value as any, true, true)
}
