module.exports = (mPool) => {
  return {
    getCounts(user, countsField) {
      // For some reason, passing the database name with the `url` didn't seem to work.
      return mPool
        .db('contests')
        .collection('users')
        .findOne({ userId: user.id })
        .then((userCounts) => userCounts[countsField]);
    },
  };
};
