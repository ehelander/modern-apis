const {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const mdb = require('../../database/mdb');
const ContestType = require('./contest');

module.exports = new GraphQLObjectType({
  name: 'UserType',

  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    fullName: {
      type: GraphQLString,
      resolve: (obj) => `${obj.firstName} ${obj.lastName}`,
    },
    email: { type: GraphQLNonNull(GraphQLString) },
    createdAt: { type: GraphQLString },
    contests: {
      type: new GraphQLList(ContestType),
      resolve(obj, args, { loaders }) {
        return loaders.contestsForUserIds.load(obj.id);
      },
    },
    contestsCount: {
      type: GraphQLInt,
      resolve(obj, args, { mPool }, { fieldName }) {
        return mdb(mPool).getCounts(obj, fieldName);
      },
    },
    namesCount: {
      type: GraphQLInt,
      resolve(obj, args, { mPool }, { fieldName }) {
        return mdb(mPool).getCounts(obj, fieldName);
      },
    },
    votesCount: {
      type: GraphQLInt,
      resolve(obj, args, { mPool }, { fieldName }) {
        return mdb(mPool).getCounts(obj, fieldName);
      },
    },
  },
});