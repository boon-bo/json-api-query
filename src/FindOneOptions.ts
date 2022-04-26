import {FindOptionsWhere} from "./FindOptionsWhere";
import {FindOptionsSelect} from "./FindOptionsSelect";
import {FindOptionsRelations} from "./FindOptionsRelations";
import {FindOptionsOrder} from "./FindOptionsOrder";

/**
 * Defines a special criteria to find specific entity.
 */
export interface FindOneOptions<Entity = any> {
   
    /**
     * Specifies what columns should be retrieved.
     */
    fields?: FindOptionsSelect<Entity>

    /**
     * Simple condition that should be applied to match entities.
     */
    where?: FindOptionsWhere<Entity>[] | FindOptionsWhere<Entity>

    /**
     * Indicates what relations of entity should be loaded (simplified left join form).
     */
    relations?: FindOptionsRelations<Entity>


    /**
     * Order, in which entities should be ordered.
     */
    order?: FindOptionsOrder<Entity>


}
