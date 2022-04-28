import { SparseField } from './SparseField'
import { FindOptionsOrderValue } from './FindOptionsOrderValue'
import { FindOptionsOrder } from './FindOptionsOrder'

export class SortField {
    modelName: string | null
    fields: Array<string> = []

    constructor(
        model: string | null,
        dir: FindOptionsOrderValue | FindOptionsOrder<string> | undefined,
        fields: Array<string>,
    ) {
        this.modelName = model
        fields.forEach((x) => this.addField(x, dir))
    }

    addField(field: string, dir: FindOptionsOrderValue | FindOptionsOrder<string> | undefined): SortField {
        switch (dir) {
            case 'desc' || 'DESC':
                this.fields.push(`-${field}`)
                break
            default:
                this.fields.push(field)
        }
        return this
    }

    toString(): string {
        if (this.modelName) {
            return `sort[${this.modelName}]=${this.fields.join(',')}`
        } else {
            return `sort=${this.fields.join(',')}`
        }
    }
}
