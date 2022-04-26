/**
 * Value of order by in find options.
 */
export type FindOptionsOrderValue =
    | "ASC"
    | "DESC"
    | "asc"
    | "desc"
    | { direction?: "asc" | "desc" | "ASC" | "DESC" }
