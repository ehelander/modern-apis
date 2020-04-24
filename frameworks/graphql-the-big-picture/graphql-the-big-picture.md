# [GraphQL: The Big Picture](https://app.pluralsight.com/library/courses/graphql-big-picture) (Adhithi Ravichandran, 2019-08-08)

## Course Overview

### [Course Overview](https://app.pluralsight.com/player?course=graphql-big-picture&author=adhithi-ravichandran&name=c285d927-5cc5-42a9-a2a2-af72ff1cd0b1&clip=0&mode=live)

## What Is GraphQL?

### [Introduction](https://app.pluralsight.com/course-player?clipId=413c09ea-e2be-4b47-bc46-7cf2dc1579bb)

### [History](https://app.pluralsight.com/course-player?clipId=0d33032a-1fee-43eb-8b50-c89246738e1a)

- Facebook started GraphQL as an internal project in 2012.
- Facebook open-sourced GraphQL in 2015.
- GraphQL came into existence due to the need for better flexibility and efficiency in client-server communication.

### [What Is GraphQL](https://app.pluralsight.com/course-player?clipId=0e8fac57-6a06-40fd-b18f-7bf9ccdf5d64)

- GraphQL is a query language for your API.
  - Not a:
    - library
    - product
    - database
- A more flexible and efficient alternative to REST.
  - Query and receive only the fields requested, within a single request.
  - Language-agnostic.

### [Who Is Using GraphQL?](https://app.pluralsight.com/course-player?clipId=a80bd2aa-accd-477d-82d3-c918dbfc0825)

- Facebook
- PayPal
- Twitter
- Yelp
- Shopify
- GitHub

### [REST vs. GraphQL](https://app.pluralsight.com/course-player?clipId=2b0e7ae4-8e52-4e8c-9e55-c112125ce646)

- With REST, a developer ends up calling multiple endpoints, receiving much more data than is needed.
  - Caching is build into the HTTP spec.
- With GraphQL, just one request is needed, with JSON for exactly what was requested.
  - Caching must be implemented by the developer (Apollo, Relay, etc.).

### [Is GraphQL Right for My Business?](https://app.pluralsight.com/course-player?clipId=bef8e9be-4776-4516-a118-312e97f244a3)

- Increases multi-team productivity
- Facilitates rapid product development
- Improved web & mobile app performance
- Reduced cost in testing and deployment
  - Need to be tested only when there are new schemas or changes in a schema
- Can be used to unify an existing system (legacy system, microservice, etc.).

### [Summary](https://app.pluralsight.com/course-player?clipId=d7b39155-f6cc-42d5-8039-f8b4192f097f)

## GraphQL Core Concepts

### [Types](https://app.pluralsight.com/course-player?clipId=d5ba5210-eca1-4ac2-ab67-e4bba39af27c)

- Types
  - Scalar
    - Int
    - Float
    - String
    - Boolean
    - ID
      - Usually used to re-fetch an object, or as the key for a cache
  - Object
  - Enumeration
- Schema types
  - Query
  - Mutation
- Non-nullable types
  - By default, each scalar type can be set to null. Appending a `!` overrides this.

### [Queries - Fields](https://app.pluralsight.com/course-player?clipId=9c15ffa3-29a5-40fc-8131-3037ae6d516c)

- GraphiQL
  - [https://developer.github.com/v4/explorer](https://developer.github.com/v4/explorer)
  - In explorer, hit `crtl` + `space` to view options.

### [Queries = Arguments](https://app.pluralsight.com/course-player?clipId=24e151e3-3ed0-476f-a979-1549b7143f21)

- Every field and nested object can receive its own set of arguments.

### [Queries = Aliases](https://app.pluralsight.com/course-player?clipId=d205713c-fab6-4df8-b7d3-b4a37d747ad9)

- In a basic GraphQL query, it is not possible to query for the same field with different arguments.
  - Aliases allow this: You can rename the result of a field.
  - Before the field name, include `alias: `.

### [Queries = Fragments](https://app.pluralsight.com/course-player?clipId=8f441397-bdff-41a7-8d3e-dd37de5d54d3)

- Fragments are GraphQL's reusable units, not altogether unlike functions.
  - Sets of fields that can be reused.

```graphql
fragment fragmentName on Type {
    field1
    field2
}
```

```graphql
{
    field {
        ...fragmentName
    }

}
```

- Can provide an operation name.

```gql
query queryName {
    fieldName
}
```

### [Queries = Variables](https://app.pluralsight.com/course-player?clipId=bbba55e8-4a03-476b-8572-9748a84dca51)

- Variables facilitate passing dynamic values as arguments.

```gql
query someQuery($isSomething: Boolean!) {
    field(arg: $isSomething)
}
```

```json
{
    "isSomething": true
}
```

### [Mutations](https://app.pluralsight.com/course-player?clipId=e229c024-3802-4124-9cbd-b9bcb9fa0980)

- Mutations are used to change data (create, update, delete)
- GraphQL assumes there are side-effects after mutations and changes the dataset after a mutation.
- Mutation fields run in series (whereas query fields run in parallel)

```gql
mutation changeSomething($input: InputType!) {
    someMutation(input: $input) {
        first
        nested {
            second
        }
    }
}
```

```json
{
    "input": {
        "first": "Some thing",
        "second": "Some other thing"
    }
}
```

### [Summary](https://app.pluralsight.com/course-player?clipId=3afb1025-9f69-4ec0-802b-78b84865f1e9)

## Why GraphQL?

### [Why GraphQL?](https://app.pluralsight.com/course-player?clipId=49eef780-a608-4d24-92c3-10286be710bb)

### [Declarative Data Fetching](https://app.pluralsight.com/course-player?clipId=3ac5e850-5e6e-4f1f-92c6-35024f95a968)

- GraphQL avoids round trips to fetch data.
- GraphQL avoids under-/over-fetching.

### [Strongly Typed Schema](https://app.pluralsight.com/course-player?clipId=db8b9549-20d4-450a-b73e-7843cf35dde2)

- The GraphQL schema acts as a contract between the client and the server. All objects are typed.
  - Code is predictable.
  - Frontend & backend teams can work independently.
    - E.g., frontend teams can begin development by calling mock endpoints; once the server is ready, the real data can be wired up.
  - Earlier detection of errors.
  - Facilitates building high-quality client tools (e.g., GraphiQL).

### [Superior Developer Experience](https://app.pluralsight.com/course-player?clipId=67d58cc4-2e33-403e-9c96-e075f8477f8a)

- GraphQL enables much greater flexibility.
  - No need for versioning with simple changes.
    - Adding new fields and types won't break anything.
  - Modifications to schemas are non-breaking changes.
- Ecosystem and tooling facilitate an excellent experience.
  - Schema is self-documenting.

### [Cost Effectiveness](https://app.pluralsight.com/course-player?clipId=c2bacc33-5e57-4bbe-9136-36852b89a9f9)

### [Growing Community](https://app.pluralsight.com/course-player?clipId=e1be44e6-0895-4316-a71b-ddbc77cfb96a)

- GraphQL Facebook group
- Twitter: #GraphQL, #ApolloGraphQL, #GraphQLWeekly
- StackOverflow
- graphql.org/community/upcoming-events
- Slack channels

### [Summary](https://app.pluralsight.com/course-player?clipId=b1cede9a-769c-47a1-a0cd-b37785a06460)

## GraphQL Ecosystem and Tooling

### [Introduction](https://app.pluralsight.com/course-player?clipId=3c0a8ee4-d85f-46ca-a997-a1a2197f07f7)

- GraphQL architecture
  - Client
    - Talk to the server, sending & receiving responses
  - Server
    - Handles the query from the client
  - Databases

### [GraphQL Client](https://app.pluralsight.com/course-player?clipId=6a6d9293-5b63-41a9-8aa4-e9f0d328d16e)

- Sends queries to the server; receives JSON response from server
- Manages error handling, schema validation
- Some provide local state management and caching
- Some handle paging
- Popular
  - Apollo Client
    - The to-go solution
  - Relay
    - Only for React

### [GraphQL Server](https://app.pluralsight.com/course-player?clipId=76d6034f-cb04-40ee-bacd-027c387d2608)

- The GraphQL server receives the query from the client and responds back.
- The backend developer develop creates the schema and resolver functions.
  - Resolver
    - A function that resolves a value for a type or field in the GraphQL schema (e.g., from databases, REST APIs)
- Handles the network layer
- GraphQL execution engine
  - Parses query from the client
  - Validates the schema
  - Returns JSON response
  - Executes resolvers for each field
    - Batched resolving
      - A given item is only fetched once.
- Popular
  - Apollo Server
  - Express GraphQL
  - GraphQL Yoga

### [Database to GraphQL Server](https://app.pluralsight.com/course-player?clipId=c35d2ed1-6848-4194-b5ca-301cd6e72f6c)

- Prisma sits between the GraphQL server and the database.
  - Supports SQL and NoSQL databases.
  - Replaces traditional ORMs; simplifies database workflows.
  - Facilitates type-safe database access.
  - Can implement GraphQL subscriptions.
  - Prisma admin includes data visualization
- Compatible with a variety of languages and databases

### [GraphQL Tools](https://app.pluralsight.com/course-player?clipId=d868b189-1aa1-48d6-a89b-9fbbd7c2bab8)

- GraphiQL
  - In-browser IDE for writing, validating, and testing GraphQL queries
  - Query & mutate
  - Live syntax and validation errors
- GraphQL Voyager
  - Represents any GraphQL API as an interactive graph.
  - Helpful for exploring complex GraphQL APIs.
  - Useful tool while designing data model.
- GraphQL Faker
  - Mock API with realistic data.
  - Useful for testing and for coding against future APIs.
- GraphQL Visual Editor
  - Create schemas by joining visual blocks.

### [Summary](https://app.pluralsight.com/course-player?clipId=6b45376e-62c1-48c0-a8ee-8cb179e62317)

## Summary & Next Steps

### [Course Summary](https://app.pluralsight.com/course-player?clipId=22c6558e-ffb9-43cb-9210-d37b06fcf2dd)
