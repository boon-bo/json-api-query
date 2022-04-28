import { FindOptionsRelations } from './FindOptionsRelations'

/**
 * A single property handler for FindOptionsRelations.
 */
export type FindOptionsRelationsProperty<Property> = Property extends Promise<infer I>
    ? FindOptionsRelationsProperty<NonNullable<I>> | boolean
    : Property extends Array<infer I>
    ? FindOptionsRelationsProperty<NonNullable<I>> | boolean
    : Property extends Function
    ? never
    : Property extends Date
    ? never
    : Property extends object
    ? FindOptionsRelations<Property> | boolean
    : boolean
