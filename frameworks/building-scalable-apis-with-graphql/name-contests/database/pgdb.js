const { orderedFor } = require('../lib/util');
const humps = require('humps');
const { normalize, slug } = require('../lib/util');

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

    addNewContest({ apiKey, title, description }) {
      return pgPool
        .query(
          `
          INSERT INTO
            contests(code, title, description, created_by)
          VALUES
            (
              $1,
              $2,
              $3,
              (
                SELECT
                  id
                FROM
                  users
                WHERE
                  api_key = $4
              )
            )
          RETURNING *
      `,
          [slug(title), title, description, apiKey],
        )
        .then((res) => {
          return humps.camelizeKeys(res.rows[0]);
        });
    },

    addNewName({ apiKey, contestId, label, description }) {
      return pgPool
        .query(
          `
          INSERT INTO
            names(contest_id, label, normalized_label, description, created_by)
          VALUES
            (
              $1,
              $2,
              $3,
              $4,
              (
                SELECT
                  id
                FROM
                  users
                WHERE
                  api_key = $5
              )
            )
          RETURNING *
      `,
          [contestId, label, normalize(label), description, apiKey],
        )
        .then((res) => {
          return humps.camelizeKeys(res.rows[0]);
        });
    },

    getActivitiesForUserIds(userIds) {
      return pgPool
        .query(
          `
          SELECT
            created_by,
            created_at,
            label,
            '' AS title,
            'name' AS activity_type
          FROM
            names
          WHERE
            created_by = ANY($1)
          UNION
          SELECT
            created_by,
            created_at,
            '' AS label,
            title,
            'contest' AS activity_type
          FROM
            contests
          WHERE
            created_by = ANY($1)
        `,
          [userIds],
        )
        .then((res) => {
          return orderedFor(res.rows, userIds, 'createdBy', false);
        });
    },
  };
};
