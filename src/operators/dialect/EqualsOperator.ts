import { IComparisonOperator } from '../../IComparisonOperator'

export class EqualsOperator implements IComparisonOperator {
    _property: string
    _value: string

    constructor(public property: string, public value: string) {
        this._property = property
        this._value = value
    }

    toString(): string {
        // special case for null
        if (this._value + '' != 'null' || this._value != null) {
            return `equals(${this._property},'${this._value}')`
        } else {
            return `equals(${this._property},${this._value})`
        }
    }
}
