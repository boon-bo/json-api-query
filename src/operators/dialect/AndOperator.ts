import { IComparisonOperator } from "../../IComparisonOperator";
import { IBooleanOperator } from "../../IBooleanOperator";

export class AndOperator implements IBooleanOperator {
    _operators: Array<IComparisonOperator> = [];

    constructor(...params: Array<IComparisonOperator>) {
        this._operators = params;
    }

    toString(): string {
        return `and(${this._operators.map(x => x.toString()).join(',')})`;
    }
}
