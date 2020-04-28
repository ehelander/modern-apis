const { orderedFor } = require('../lib/util');

module.exports = (pgPool) => {
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

    getTotalVotesByNameIds(nameIds) {
      return pgPool
        .query(
          `
        SELECT  name_id,
                up,
                down
        FROM    total_votes_by_name
        WHERE   name_id = ANY($1)
      `,
          [nameIds],
        )
        .then((res) => {
          return orderedFor(res.rows, nameIds, 'nameId', true);
        });
    },
  };
};
