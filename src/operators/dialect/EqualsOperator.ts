import { IComparisonOperator } from '../../IComparisonOperator'
import * as TJS from "typescript-json-schema";

export class EqualsOperator implements IComparisonOperator {
    _property: string
    _value: string

    constructor(public property: string, public value: string, public parent: string = null) {
        this._property = property
        this._value = value
    }

    toString(): string {

        // if(this.parent){
        //     // special case for null
        //     if (this._value + '' != 'null' || this._value != null) {
        //         return `filter[${this.parent}]=equals(${this._property},'${this._value}')`
        //     } else {
        //         return `filter[${this.parent}]=equals(${this._property},${this._value})`
        //     }
        // }

        // special case for null
        if (this._value + '' != 'null' || this._value != null) {
            return `equals(${this._property},'${this._value}')`
        } else {
            return `equals(${this._property},${this._value})`
        }
    }
}
