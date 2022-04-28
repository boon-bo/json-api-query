import { IComparisonOperator } from '../../IComparisonOperator'

export class GreaterThanOrEqualOperator implements IComparisonOperator {
    _property: string
    _value: string

    constructor(public property: string, public value: any) {
        this._property = property
        this._value = value
    }

    toString(): string {
        return `greaterOrEqual(${this._property},'${this._value}')`
    }
}
