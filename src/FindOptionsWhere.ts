import { FindOptionsWhereProperty } from './FindOptionsWhereProperty'

/** :
 * Used for find operations.
 */
export type FindOptionsWhere<Entity> = {
    [P in keyof Entity]?: FindOptionsWhereProperty<NonNullable<Entity[P]>>
}
