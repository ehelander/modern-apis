const { orderedFor } = require('../lib/util');

module.exports = (mPool) => {
  return {
    getUsersByIds(userIds) {
      // For some reason, passing the database name with the `url` didn't seem to work.
      return mPool
        .db('contests')
        .collection('users')
        .find({ userId: { $in: userIds } })
        .toArray()
        .then((rows) => {
          return orderedFor(rows, userIds, 'userId', true);
        });
    },
  };
};
