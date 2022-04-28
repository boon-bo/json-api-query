import { FindOptionsSelectProperty } from './FindOptionsSelectProperty'

/**
 * Select find options.
 */
export type FindOptionsSelect<Entity> = {
    [P in keyof Entity]?: FindOptionsSelectProperty<NonNullable<Entity[P]>>
}
