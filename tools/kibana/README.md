# Kibana

## elastic.co

### [Get started](https://www.elastic.co/guide/en/kibana/current/getting-started.html)

- Set up on cloud
  - Start a [free trial](https://www.elastic.co/cloud/elasticsearch-service/signup?baymax=docs-body&elektra=docs).
  - Create a deployment.
    - `hello-world`.
  - Launch Kibana

### [Explore Kibana using sample data](https://www.elastic.co/guide/en/kibana/current/tutorial-sample-data.html)

- Load sample flight data
- Query the data
  - Flights out of Rome:
    - `OriginCityName:Rome`
  - More complex query:
    - `OriginCityName:Rome AND (Carrier:JetBeats OR "Kibana Airlines")`
- Discover the data
  - Side navigation: `Discover`
  - Index pattern: `kibana_sample_data_flights`
  - By default, all fields are displayed.
    - To select fields to display as columns:
      - `Available fields` &rarr; `add`
- Edit a visualization
  - Menu bar: `Edit`
  - Gear icon for a visualization &rarr; `Options` &rarr; `Edit visualization`
  - Create a bucket aggregation
    - Buckets pane &rarr; `Add` &rarr; `Split group`
    - `Save`
  - Can rearrange in `Edit` mode.
- Inspect the data
  - Dashboard &rarr; visualization upper-right ellipses &rarr; `Options` &rarr; `Inspect`
  - To see query: `View` &rarr; `Requests`.
- Remove sample data
  - `Sample data` &rarr; `Sample flight data` &rarr; `Remove`

### [Build your own dashboard](https://www.elastic.co/guide/en/kibana/current/tutorial-build-dashboard.html)

---

### [Search Data](https://www.elastic.co/guide/en/kibana/current/search.html)

- [Kibana Query Language](https://www.elastic.co/guide/en/kibana/current/kuery-query.html)

  - Documents where response field is `200`.
    - `response:200`
  - Use double quotes for a phrase search
    - `message:"Quick brown fox"`
      - Search for `Quick brown fox` in message field.
  - White space between search terms is an implicit `or`.
    - `response:200 extension:php` &rarr; `response:200 or extension:php`
      - Boolean operators are case insensitive.
      - `and` has a higher precedence than `or`.
      - Grouping (via parentheses) overrides default precedence.
  - Search for multiple values on a field:
    - `response:(200 or 404)`
  - Terms can be inverted with a `not` prefix.
    - `not response: 200`
      - Documents where the response is not `200`.
      - `not` can be used to invert groups also.
  - Range operators:
    - `>`
    - `>=`
    - `<`
    - `<=`
  - Exist queries can simply use a wildcard:
    - `response:*`
      - Documents that have a `response` field.
  - Wildcard queries
    - `machine.os:win*`
      - Documents where the `machine.os` field starts with `win`.

- Sample document:

```json
{
  "grocery_name": "Elastic Eats",
  "items": [
    {
      "name": "banana",
      "stock": "12",
      "category": "fruit"
    },
    {
      "name": "peach",
      "stock": "10",
      "category": "fruit"
    },
    {
      "name": "carrot",
      "stock": "9",
      "category": "vegetable"
    },
    {
      "name": "broccoli",
      "stock": "5",
      "category": "vegetable"
    }
  ]
}
```

- Find stores with more than 10 bananas in stock:
  - `items:{ name:banana and stock > 10 }`
    - `items` is the 'nested path'.
      - Everything inside the curly braces (the 'nested group') must match a single nested document.
  - `items:{ name:banana } and items:{ stock:9 }`
    - These subqueries are in different nested groups and can match different nested documents.
  - `items:{ name:banana and stock > 10 } and items:{ category:vegetable }`
    - Find a store with more than 10 bananas that also stock vegetables.
    - The first nested group (`name:banana and stock > 10`) must match a single document, but the second subquery (`category:vegetables`) can match a different nested document.
- Sample document:

```json
{
  "level1": [
    {
      "level2": [
        {
          "prop1": "foo",
          "prop2": "bar"
        },
        {
          "prop1": "baz",
          "prop2": "qux"
        }
      ]
    }
  ]
}
```

- To query a nested field inside another nested field, the full path must be specified:
  - `level1.level2:{ prop1:foo and prop2:bar }`
