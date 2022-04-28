export class SparseField {
    modelName: string | null
    fields: Array<string>

    constructor(model: string | null, fields: Array<string>) {
        this.modelName = model
        this.fields = fields
    }

    addField(field: string): SparseField {
        this.fields.push(field)
        return this
    }

    addFields(fields: Array<string>): SparseField {
        this.fields.push(...fields)
        return this
    }

    toString(): string {
        if (this.modelName) {
            return `fields[${this.modelName}]=${this.fields.join(',')}`
        } else {
            return `fields=${this.fields.join(',')}`
        }
    }
}
