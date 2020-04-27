const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require("graphql");

module.exports = new GraphQLObjectType({
  name: "MeType",

  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLNonNull(GraphQLString) },
    createdAt: { type: GraphQLString },
  },
});
