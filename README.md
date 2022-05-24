## JSON-API-QUERY

A javascript client helper for APIs built with https://www.jsonapi.net/

> NOTE: this is not an API client - it's a query builder for you to use in your client code.

The design / inspiration of this API was lifted quite heavily from https://github.com/typeorm/typeorm - though it is not meant to match it.

## Examples:

The query builder aims to support all of the terms found in the [since v4.0] docs found here: https://www.jsonapi.net/usage/reading/filtering.html

Legacy syntax is not supported, there is some consideration in the code to add this later (as well as supporting evolved syntax later on) but I am not sure how worthwhile that would be.

The latest version of this package now uses `typescript-json-schema`. This was required so that the types can be infered in the query bulder code. Unlike C#, Typescript's type system is unavailable at runtime, so tailoring the query generation for `HasMany` relations is AFAICS impossible without providing some schema information.

To this end I have introduced `typescript-json-schema`. Generating schemas for your models is as easy as adding `typescript-json-schema tsconfig.schema.json \"*\" > test/Models/schema.json` to your NPM commands section. See this projects `package.json` for an example.

### Basic filtering:

```typescript
import * as schema  from "./Models/schema.json"

new QueryBuilder<TestClass>("TestClass", schema as TJS.Definition)
    .find({
        where: {
            numProp: 1,
        },
    })
    .build()
```

Generates the following:

`?filter=equals(numProp,'1')`

### Filtering using ANY:

```typescript
import * as schema  from "./Models/schema.json"

new QueryBuilder<TestClass>("TestClass", schema as TJS.Definition)
    .find({
        where: {
            numProp: Any([1, 2, 3]),
        },
    })
    .build()
```

Generates the following:

`?filter=any(numProp,1,2,3)`

### Filtering using CONTAINS:

```typescript
import * as schema  from "./Models/schema.json"

new QueryBuilder<TestClass>("TestClass", schema as TJS.Definition)
    .find({
        where: {
            numProp: Contains('lol'),
        },
    })
    .build()
```

Generates the following:

`?filter=contains(prop12,'lol')`

### Filtering using NEGATION:

```typescript
import * as schema  from "./Models/schema.json"

new QueryBuilder<TestClass>("TestClass", schema as TJS.Definition)
    .find({
        where: {
            numProp: Not(Equals(1)),
        },
    })
    .build()
```

Generates the following:

`?filter=not(equals(numProp,'1'))`

### Filtering using OR:

```typescript
import * as schema  from "./Models/schema.json"

new QueryBuilder<TestClass>("TestClass", schema as TJS.Definition)
    .find({
        where: {
            numProp: Or([Has([1, 2, 3]), Equals(1)]),
        },
    })
    .build()
```

Generates the following:

`?filter=or(has(numProp,1,2,3),equals(numProp,'1'))`

### Filtering using implicit OR:

```typescript
import * as schema  from "./Models/schema.json"

new QueryBuilder<TestClass>("TestClass", schema as TJS.Definition)
    .find({
        where: [
            {
                numProp: Has([1, 2, 3]),
            },
            {
                numProp: Equals(1),
            },
        ],
    })
    .build()
```

Generates the following:

`?filter=or(has(numProp,1,2,3),equals(numProp,'1'))`

### Filtering using nested properties:

```typescript
import * as schema  from "./Models/schema.json"

new QueryBuilder<TestClass>("TestClass", schema as TJS.Definition)
    .find({
        where: {
            nested: {
                property1Nested: Equals('test'),
            },
        },
    })
    .build()
```

Generates the following:

`?filter[nested]=equals(property1Nested,'test')`

### Including relationships:

```typescript
import * as schema  from "./Models/schema.json"

new QueryBuilder<TestClass>("TestClass", schema as TJS.Definition)
    .find({
        relations: {
            nested: {
                nestedAgain: true,
            },
        },
    })
    .build()
```

Generates the following:

`?include=nested.nestedAgain`

### Sparse fieldsets:

```typescript
import * as schema  from "./Models/schema.json"

new QueryBuilder<TestClass>("TestClass", schema as TJS.Definition)
    .find({
        fields: {
            property2: true,
        },
    })
    .build()
```

Generates the following:

`?fields=property2`

### Ordering:

```typescript
import * as schema  from "./Models/schema.json"

new QueryBuilder<TestClass>("TestClass", schema as TJS.Definition)
    .find({
        order: {
            property2: 'ASC',
            nested: {
                property1Nested: 'DESC',
                property2Nested: {
                    direction: 'ASC',
                },
            },
        },
    })
    .build()
```

Generates the following:

`?sort=property2&sort[nested]=property1Nested,-property2Nested`

### Putting it all together:

```typescript
import * as schema  from "./Models/schema.json"

new QueryBuilder<TestClass>("TestClass", schema as TJS.Definition)
    .find({
        where: {
            a: Contains('lol'),
            not1: Not(Equals('not5')),
            nested: {
                property2Nested: true,
                property1Nested: Has(['one', 'two']),
                nestedAgain: {
                    property1Nested: EndsWith('wot'),
                },
            },
        },
        relations: {
            nested: true,
        },
        fields: {
            firstName: true,
            lastName: true,
            nested: {
                property2Nested: true,
            },
        },
        number: 10,
        size: 0,
        order: {
            property2: 'ASC',
            nested: {
                property1Nested: 'DESC',
            },
        },
    })
    .build()
```

Generates the following:

```typescript
?sort=property2
    &sort[nested]=property1Nested
    &filter=and(contains(a,'lol'),not(equals(not1,'not5')))
    &include=nested
    &fields=firstName,lastName
    &fields[nested]=property2Nested
    &page[size]=0
    &page[number]=10
    &filter[nested]=and(equals(property2Nested,'true'),has(property1Nested,one,two))
    &filter[nestedAgain]=endsWith(property1Nested,'wot')
```
