const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require("graphql");

const { fromSnakeCase } = require("../../lib/util");

module.exports = new GraphQLObjectType({
  name: "MeType",

  fields: {
    id: { type: GraphQLID },
    firstName: fromSnakeCase(GraphQLString),
    lastName: fromSnakeCase(GraphQLString),
    email: { type: GraphQLNonNull(GraphQLString) },
    createdAt: fromSnakeCase(GraphQLString),
  },
});
