import { IComparisonOperator } from '../../IComparisonOperator'

export class NotOperator implements IComparisonOperator {
    _comparison: IComparisonOperator | null

    constructor(public comparison: IComparisonOperator | null) {
        this._comparison = comparison
    }

    toString(): string {
        return `not(${this._comparison?.toString()})`
    }
}
