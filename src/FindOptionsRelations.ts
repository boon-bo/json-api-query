import {FindOptionsRelationsProperty} from "./FindOptionsRelationsProperty";

/**
 * Relations find options.
 */
export type FindOptionsRelations<Entity> = {
    [P in keyof Entity]?: FindOptionsRelationsProperty<NonNullable<Entity[P]>>
}
