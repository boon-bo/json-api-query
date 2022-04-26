import {SparseField} from "./SparseField";

export class SparseFieldSet {
    model: string | null;
    params: Array<SparseField>;
    
    constructor(public modelName: string | null, ...params: Array<SparseField>) { 
        this.model = modelName;
        this.params = params;
    }

    addField(field: SparseField): SparseFieldSet {
        let find = this.params.filter( x=>x.modelName == field.modelName)
        if ( find !== null && find.length > 0){
            find[0].addFields(field.fields);
            return this;
        }
        
        this.params.push(field);
        return this;
    }

    toString(): string {
        return this.params.map(x=>x.toString()).join('&')
    }
}

