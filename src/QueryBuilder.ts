import {
    AndOperator,
    AnyOperator,
    ContainsOperator,
    EndsWithOperator,
    EqualsOperator,
    GreaterThanOperator,
    GreaterThanOrEqualOperator,
    HasOperator,
    LessThanOperator,
    LessThanOrEqualOperator,
    NotOperator,
    OrOperator,
    StartsWithOperator,
} from './operators/dialect'
import {IComparisonOperator} from './IComparisonOperator'
import {IPageInfo} from './IPageInfo'
import {FindOptionsWhere} from './FindOptionsWhere'
import {FindManyOptions} from './FindManyOptions'
import {InstanceChecker} from './InstanceChecker'
import {SparseFieldSet} from './SparseFieldSet'
import {FindOperator} from './FindOperator'
import {FindOptionsRelations} from './FindOptionsRelations'
import {FindOptionsSelect} from './FindOptionsSelect'
import {SparseField} from './SparseField'
import {FindOptionsOrder} from './FindOptionsOrder'
import {FindOptionsOrderValue} from './FindOptionsOrderValue'
import {Sorts} from './Sorts'
import {SortField} from './SortField'
import {resolve} from "path";

import * as TJS from "typescript-json-schema";
import {Definition, DefinitionOrBoolean} from "typescript-json-schema";

// For convenience
type Primitive = string | number | bigint | boolean | undefined | symbol;

// To infinity and beyond >:D
export type PropertyStringPath<T, Prefix=''> = {
    [K in keyof T]: T[K] extends Primitive | Array<any>
        ? `${string & Prefix}${ string & K }`
        : `${string & Prefix}${ string & K }` | PropertyStringPath <T[K], `${ string & Prefix }${ string & K }.`> ;
}[keyof T];

export class QueryBuilder<T> {
    private _operators: Array<IComparisonOperator> = []
    private _pageInfo: IPageInfo | null = null
    private _includes: Array<string> = []
    private _sorts: Sorts | null = null
    private _fields: SparseFieldSet | null = null
    private _childQueryBuilders: QueryBuilder<T>[] = []
    private _findOptions: FindManyOptions<T> | undefined
    private readonly _originalSchema: TJS.Definition | TJS.DefinitionOrBoolean;

    constructor(
        public modelType: string = '',
        public schema: Definition | DefinitionOrBoolean = null,
        public property: string = '',
        public isToManyFromParent: boolean = false,
        public parentQueryBuilder: QueryBuilder<T> | null = null,
        public childQueryBuilder: QueryBuilder<T> | null = null,
    ) {
        this.childQueryBuilder = childQueryBuilder
        this.property = property
        this._originalSchema = schema
        this.schema = (schema as TJS.Definition).definitions [modelType]
        this.isToManyFromParent = isToManyFromParent
        this.modelType = modelType
        this.parentQueryBuilder = parentQueryBuilder
    }

    public getPrentPath(){
        if(this.parentQueryBuilder && this.parentQueryBuilder.getPrentPath() !== ""){
            return `${this.parentQueryBuilder.getPrentPath()}.${this.property}`
        }

        return this.property
    }

    /**
     * Finds entities that match given find options.
     */
    find(options?: FindManyOptions<T>): QueryBuilder<T> {
        this._findOptions = options

        return this
    }

    // /**
    //  * Finds entities that match given find options.
    //  */
    // findBy(
    //     where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    // ): T[] {
    //     return null;
    // }

    isNullOrWhiteSpace(input: string) {
        return !input || !input.trim()
    }

    hasQuery(uriToBeAppended: string) {
        let queryIndex = uriToBeAppended.indexOf('?')
        return queryIndex != -1
    }

    protected buildSorts(selects: FindOptionsOrder<T> | undefined): Sorts {
        let fields = new Sorts(this.property)
        for (let key in selects) {
            if (typeof selects[key] === 'string') {
                fields.addField(new SortField(null, selects[key], [key]))
            } else {
                this.getRelationForSorts(selects[key], fields, key)
            }
        }

        return fields
    }

    private getRelationForSorts(selects, fields, path) {
        for (let key in selects) {
            if (typeof selects[key] === 'string' || selects[key].direction) {
                if (!selects[key].direction) {
                    fields.addField(new SortField(path, selects[key], [key]))
                } else {
                    fields.addField(new SortField(path, selects[key].direction, [key]))
                }
            } else {
                this.getRelationForSorts(selects[key], fields, path + '.' + key)
            }
        }
    }

    protected buildIncludes(relations: FindOptionsRelations<T>): string[] {
        let result: string[] = []
        for (let key in relations) {
            if (typeof relations[key] === 'boolean' && (relations[key] as boolean) == true) {
                result.push(key)
            } else {
                this.getRelationForIncludes(relations[key], result, key)
            }
        }

        return result
    }

    private getRelationForIncludes(relations, result, path) {
        for (let key in relations) {
            if (typeof relations[key] === 'boolean') {
                result.push(path + '.' + key)
            } else {
                this.getRelationForIncludes(relations[key], result, path + '.' + key)
            }
        }
    }

    protected buildSparseFieldsets(selects: FindOptionsSelect<T>): SparseFieldSet {
        let fields = new SparseFieldSet(this.property)
        for (let key in selects) {
            if (typeof selects[key] === 'boolean' && (selects[key] as boolean) == true) {
                fields.addField(new SparseField(null, [key]))
            } else {
                this.getRelationForSparseFieldSet(selects[key], fields, key)
            }
        }

        return fields
    }

    private getRelationForSparseFieldSet(relations, fields: SparseFieldSet, path) {
        for (let key in relations) {
            if (typeof relations[key] === 'boolean') {
                fields.addField(new SparseField(path, [key]))
            } else {
                this.getRelationForSparseFieldSet(relations[key], fields, key)
            }
        }
    }

    protected buildWhere(where: FindOptionsWhere<any>): IComparisonOperator[] {
        let operators: Array<IComparisonOperator> = []

        if (Array.isArray(where) && where.length > 1) {
            operators.push(
                new OrOperator(
                    ...where.map((whereItem) => {
                        return this.buildWhere(whereItem)
                    }),
                ),
            )
        } else {
            if (Array.isArray(where) && where.length === 1) {
                where = where[0]
            }

            let ops = Array<IComparisonOperator>()
            for (let key in where) {
                if (where[key] === undefined || where[key] === null) continue

                let isToMany = false

                let schema = (this.schema as TJS.Definition).properties[key] as TJS.Definition

                if (schema.type && schema.type === "array") isToMany = true

                if (!InstanceChecker.isFindOperator(where[key])) {
                    if (where[key] == null) {
                        //null or undefined
                    } else if (typeof where[key] == 'object') {
                        // TODO: if the object @ where[key] on the actual model being queried is an array
                        // create the child QB otherwise we need to do Equals(parent.child,'something')

                        let t = isToMany ?
                            ((this.schema as TJS.Definition).properties[key] as TJS.Definition).items['$ref'].replace('#/definitions/', '')
                            : ((this.schema as TJS.Definition).properties[key] as TJS.Definition)['$ref'].replace('#/definitions/', '')

                       if(isToMany){
                           let cqb = new QueryBuilder(t, this._originalSchema as TJS.Definition, key, isToMany, this, null)
                           cqb.find({where: where[key]})
                           this._childQueryBuilders.push(cqb)
                       }else{

                           // search down the where[key] until we get a findOperator
                           // use the path to build the operator
                           let op: IComparisonOperator[] | null = this.getChildOperators(where[key], key)
                           if (op) {
                               ops.push(...op)
                           }

                       }
                        continue
                    } else {
                        ops.push(new EqualsOperator(key, where[key], key))
                        continue
                    }
                }

                let path = this.getPrentPath()

                if(path && !this.isToManyFromParent) {
                    path = `${path}.${key}`
                }else {
                    path = key
                }

                let op: IComparisonOperator | null = this.getOperator(where[key], `${path}`)
                if (op) {
                    ops.push(op)
                }
            }

            if (ops.length > 1) {
                operators.push(new AndOperator(ops))
            } else if (ops.length > 0) {
                operators.push(ops[0])
            }
        }

        return operators
    }

    private getChildOperators(whereElement: any, parentKey: string) {
        let ops = this.findOperators(whereElement)
        let result = []

       for (var i = 0; i < ops.length; i ++){
           let o = ops[i]
           //for (let key in o as any) {
               let path = `${parentKey}.${ this.getPath(whereElement, o.prop)}`
               let op: IComparisonOperator | null = this.getOperator(o.op, `${path}`)
               if (op) {
                   result.push(op)
               }
           //}
       }

       return result
    }

    getPath(obj, key) {
       let paths = []

        function getPaths(obj, path) {
            if (obj instanceof Object && !(obj instanceof Array)) {
                for (var k in obj){
                    paths.push(path + "." + k)
                    getPaths(obj[k], path + "." + k)
                }
            }
        }

        getPaths(obj, "")
        return paths.map(function(p) {
            return p.slice(p.lastIndexOf(".") + 1) == key ? p.slice(1) : ''
        }).sort(function(a, b) {return b.split(".").length - a.split(".").length;})[0];
    }


    findOperators(o) :  Array<IComparisonOperator>{
        let ops = Array<IComparisonOperator>()
        if(o instanceof Array) {
            for(let i = 0; i < o.length; i++) {
                let c = [...this.findOperators(o[i])]
                ops.push(c);
            }
        }
        else
        {
            for(let prop in o) {
                console.log(prop + ': ' + o[prop]);
                if(InstanceChecker.isFindOperator(o[prop])) {
                    ops.push({
                        prop: prop,
                        op: o[prop]
                    })
                }else {
                    let c = [...this.findOperators(o[prop])]
                    ops.push(c);
                }
            }
        }
        return ops;
    }

    // TODO: refactor this into a factory class
    getOperator(op: FindOperator<any> | undefined, key: string): IComparisonOperator | null {
        let parameterValue = op?.value

        if (InstanceChecker.isEqualOperator(op)) {
            return new EqualsOperator(key, parameterValue)
        }

        if (InstanceChecker.isAnyOperator(op)) {
            return new AnyOperator(key, parameterValue)
        }

        if (InstanceChecker.isContainsOperator(op)) {
            return new ContainsOperator(key, parameterValue)
        }

        if (InstanceChecker.isEndsWithOperator(op)) {
            return new EndsWithOperator(key, parameterValue)
        }

        if (InstanceChecker.isGreaterThanOperator(op)) {
            return new GreaterThanOperator(key, parameterValue)
        }

        if (InstanceChecker.isGreaterThanOrEqualOperator(op)) {
            return new GreaterThanOrEqualOperator(key, parameterValue)
        }

        if (InstanceChecker.isLessThanOperator(op)) {
            return new LessThanOperator(key, parameterValue)
        }

        if (InstanceChecker.isLessThanOrEqualOperator(op)) {
            return new LessThanOrEqualOperator(key, parameterValue)
        }

        if (InstanceChecker.isHasOperator(op)) {
            return new HasOperator(key, parameterValue)
        }

        if (InstanceChecker.isNotOperator(op)) {
            return new NotOperator(this.getOperator((op as FindOperator<any>).child, key))
        }

        if (InstanceChecker.isStartsWithOperator(op)) {
            return new StartsWithOperator(key, parameterValue)
        }

        if (InstanceChecker.isOrOperator(op)) {
            let ors = (op as FindOperator<any>).value.map((x: FindOperator<any>) => this.getOperator(x, key))

            return new OrOperator(...ors)
        }

        return null
    }

    build(final: string = ''): string {
        if (this._findOptions?.fields) {
            this._fields = this.buildSparseFieldsets(this._findOptions?.fields)
        }

        if (this._findOptions?.relations) {
            this._includes.push(...this.buildIncludes(this._findOptions?.relations))
        }

        if (this._findOptions?.where) {
            this._operators.push(...this.buildWhere(this._findOptions?.where))
        }

        if (this._findOptions?.order) {
            this._sorts = this.buildSorts(this._findOptions?.order)
        }

        if (this._findOptions?.size !== undefined) {
            if (this._pageInfo === null) {
                this._pageInfo = {} as IPageInfo
            }
            this._pageInfo.size = this._findOptions?.size
        }

        if (this._findOptions?.number !== undefined) {
            if (this._pageInfo === null) {
                this._pageInfo = {} as IPageInfo
            }
            this._pageInfo.number = this._findOptions?.number || 0
        }

        let compiled: string
        let includes: string = ''
        let sorts: string = ''
        let filterPropertyExpression: string = 'filter'

        if (this.isToManyFromParent &&  this.property) {
            filterPropertyExpression = `filter[${this.property}]`
        }

        compiled = this._operators.map((x) => `${filterPropertyExpression}=${x.toString()}`).join('&')

        if (this._includes.length > 0) {
            includes = 'include=' + this._includes.join(',')
        }

        if (this._sorts != null) {
            final += this.hasQuery(final) ? `&${this._sorts.toString()}` : `?${this._sorts.toString()}`
        }

        if (this.childQueryBuilder) {
            final += this.childQueryBuilder.build(final)
        }

        if (!this.isNullOrWhiteSpace(compiled) && compiled !== 'filter=') {
            final += this.hasQuery(final) ? `&${compiled}` : `?${compiled}`
        }

        if (!this.isNullOrWhiteSpace(includes)) {
            final += this.hasQuery(final) ? `&${includes}` : `?${includes}`
        }

        if (!this.isNullOrWhiteSpace(sorts)) {
            final += this.hasQuery(final) ? `&${sorts}` : `?${sorts}`
        }

        if (this._fields != null) {
            final += this.hasQuery(final) ? `&${this._fields.toString()}` : `?${this._fields.toString()}`
        }

        if (this._pageInfo) {
            final += this.hasQuery(final)
                ? `&page[size]=${this._pageInfo.size}&page[number]=${this._pageInfo.number}`
                : `?page[size]=${this._pageInfo.size}&page[number]=${this._pageInfo.number}`
        }

        if (this._childQueryBuilders.length) {
            this._childQueryBuilders.forEach((x) => {
                let intermediary = x.build(final)
                if (intermediary[0] !== '?' && intermediary[0] !== '&') {
                    final += this.hasQuery(final) ? `&${intermediary}` : `?${intermediary}`
                } else {
                    final = intermediary
                }
            })
        }

        return final
    }


}
