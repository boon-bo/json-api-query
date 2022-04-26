import { IComparisonOperator } from "../../IComparisonOperator";
import { IBooleanOperator } from "../../IBooleanOperator";

export class OrOperator implements IBooleanOperator {
    _operators: Array<IComparisonOperator> = [];

    constructor(...params: Array<IComparisonOperator>) {
        this._operators = params;
    }
    toString(): string {
        if (this._operators.length < 2) {
            throw new Error("Cannot use OrOperator with a single comparison operator");
        }

        let final = this._operators.map(x => x.toString()).join(',');
        return `or(${final})`;
    }
}


