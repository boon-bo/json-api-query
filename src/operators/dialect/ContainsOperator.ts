import { IComparisonOperator } from '../../IComparisonOperator'

export class ContainsOperator implements IComparisonOperator {
    _property: string
    _value: string

    constructor(public property: string, public value: string) {
        this._property = property
        this._value = value
    }

    toString(): string {
        return `contains(${this._property},'${this._value}')`
    }
}
