import { SortField } from './SortField'

export class Sorts {
    model: string | null
    params: Array<SortField>

    constructor(public modelName: string | null, ...params: Array<SortField>) {
        this.model = modelName
        this.params = params
    }

    addField(field: SortField): Sorts {
        let find = this.params.filter((x) => x.modelName == field.modelName)
        if (find !== null && find.length > 0) {
            field.fields.forEach((x) => find[0].addField(x, 'desc'))
            // find[0].addFields(field.fields);
            return this
        }

        this.params.push(field)
        return this
    }

    toString(): string {
        return this.params.map((x) => x.toString()).join('&')
    }
}
