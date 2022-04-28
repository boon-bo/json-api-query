import { FindOperator } from './FindOperator'
import { EqualOperator } from './EqualOperator'

export class InstanceChecker {
    static isFindOperator(obj: unknown): obj is FindOperator<any> {
        return this.check(obj, 'FindOperator') || this.check(obj, 'EqualOperator')
    }

    static isEqualOperator(obj: unknown): obj is EqualOperator<any> {
        return this.check(obj, 'FindOperator') && (obj as FindOperator<any>).type === 'equal'
    }

    static isAnyOperator(obj: unknown): obj is EqualOperator<any> {
        return this.check(obj, 'FindOperator') && (obj as FindOperator<any>).type === 'any'
    }

    static isContainsOperator(obj: unknown): obj is EqualOperator<any> {
        return this.check(obj, 'FindOperator') && (obj as FindOperator<any>).type === 'contains'
    }

    static isEndsWithOperator(obj: unknown): obj is EqualOperator<any> {
        return this.check(obj, 'FindOperator') && (obj as FindOperator<any>).type === 'endsWith'
    }

    static isGreaterThanOperator(obj: unknown): obj is EqualOperator<any> {
        return this.check(obj, 'FindOperator') && (obj as FindOperator<any>).type === 'greaterThan'
    }

    static isGreaterThanOrEqualOperator(obj: unknown): obj is EqualOperator<any> {
        return this.check(obj, 'FindOperator') && (obj as FindOperator<any>).type === 'greaterOrEqual'
    }

    static isLessThanOperator(obj: unknown): obj is EqualOperator<any> {
        return this.check(obj, 'FindOperator') && (obj as FindOperator<any>).type === 'lessThan'
    }

    static isLessThanOrEqualOperator(obj: unknown): obj is EqualOperator<any> {
        return this.check(obj, 'FindOperator') && (obj as FindOperator<any>).type === 'lessThanOrEqual'
    }

    static isHasOperator(obj: unknown): obj is EqualOperator<any> {
        return this.check(obj, 'FindOperator') && (obj as FindOperator<any>).type === 'has'
    }

    static isNotOperator(obj: unknown): obj is EqualOperator<any> {
        return this.check(obj, 'FindOperator') && (obj as FindOperator<any>).type === 'not'
    }

    static isOrOperator(obj: unknown): obj is EqualOperator<any> {
        return this.check(obj, 'FindOperator') && (obj as FindOperator<any>).type === 'or'
    }

    static isStartsWithOperator(obj: unknown): obj is EqualOperator<any> {
        return this.check(obj, 'FindOperator') && (obj as FindOperator<any>).type === 'startsWith'
    }

    private static check(obj: unknown, name: string) {
        return (
            typeof obj === 'object' &&
            obj !== null &&
            (obj as { '@instanceof': Symbol })['@instanceof'] === Symbol.for(name)
        )
    }
}
