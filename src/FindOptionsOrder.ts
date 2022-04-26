import {FindOptionsOrderProperty} from "./FindOptionsOrderProperty";

/**
 * Order by find options.
 */
export type FindOptionsOrder<Entity> = {
    [P in keyof Entity]?: FindOptionsOrderProperty<NonNullable<Entity[P]>>
}
