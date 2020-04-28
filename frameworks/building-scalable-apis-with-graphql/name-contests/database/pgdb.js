const humps = require('humps');
const _ = require('lodash');

module.exports = (pgPool) => {
  const orderedFor = (rows, collection, field, singleObject) => {
    const data = humps.camelizeKeys(rows);
    const inGroupsOfFields = _.groupBy(data, field);
    return collection.map((element) => {
      const elementArray = inGroupsOfFields[element];
      if (elementArray) {
        return singleObject ? elementArray[0] : elementArray;
      }
      return singleObject ? {} : [];
    });
  };

  return {
    getUsersByIds(userIds) {
      return pgPool
        .query(
          `
        SELECT  *
        FROM    users
        WHERE   id = ANY($1)
      `,
          [userIds],
        )
        .then((res) => {
          return orderedFor(res.rows, userIds, 'id', true);
        });
    },

    getUsersByApiKeys(apiKeys) {
      return pgPool
        .query(
          `
        SELECT  * 
        FROM    users
        WHERE   api_key = ANY($1)
      `,
          [apiKeys],
        )
        .then((res) => {
          return orderedFor(res.rows, apiKeys, 'apiKey', true);
        });
    },

    getContestsForUserIds(userIds) {
      return pgPool
        .query(
          `
        SELECT  *
        FROM    contests
        WHERE   created_by = ANY($1)
      `,
          [userIds],
        )
        .then((res) => {
          return orderedFor(res.rows, userIds, 'createdBy', false);
        });
    },

    getNamesForContestIds(contestIds) {
      return pgPool
        .query(
          `
          SELECT  *
          FROM    names
          WHERE   contest_id = ANY($1)
        `,
          [contestIds],
        )
        .then((res) => {
          return orderedFor(res.rows, contestIds, 'contestId', false);
        });
    },
  };
};
