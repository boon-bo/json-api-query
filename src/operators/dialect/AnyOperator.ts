import { IComparisonOperator } from "../../IComparisonOperator";


export class AnyOperator implements IComparisonOperator {

    _property: string;
    _values: Array<string>;

    constructor(public property: string, ...params: Array<string>) {
        this._property = property;
        this._values = params;
    }

    toString(): string {
        return `any(${this._property},${this._values.join(',')})`;
    }
}


