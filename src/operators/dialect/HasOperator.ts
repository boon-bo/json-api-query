import { IComparisonOperator } from "../../IComparisonOperator";


export class HasOperator implements IComparisonOperator {

    _property: string;
    _filterCondition: IComparisonOperator | null;

    constructor(public property: string, public filterCondition: IComparisonOperator | null = null) {
        this._property = property;
        this._filterCondition = filterCondition;
    }

    toString(): string {
        if(this._filterCondition != null) {
            return `has(${this._property},${this._filterCondition.toString()})`;
        }

        return `has('${this._property}')`;
    }
}
