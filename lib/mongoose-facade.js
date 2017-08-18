function MongoooseFacade(userSchemaName, subNetQueryDelgate, toHelpQueryDelegate, docCoercionDelegate) {
  var _userSchemaName = userSchemaName;
  var _subNetQueryDelegate = subNetQueryDelegate;
  var _toHelpQueryDelegate = toHelpQueryDelegate;

  this.getUsers = getUsers;
  this.getSubNetworkForUser = getSubNetworkForUser;
  this.getUsersToHelp = getUsersToHelp;

  function getUsers(query, onSuccessCallback, onErrorCallback) {
    mongoose.model(_userSchemaName).find(query || {})
      .exec((users, err) => {
        if (err) {
          return onErrorCallback(err);
        }

        return onSuccessCallback(users);
      });
  }

  function getSubNetworkForUser(user, onSuccessCallback, onErrorCallback) {
    return this.getUsers(_subNetworkQueryDelegate(user), onSuccessCallback, onErrorCallback);
  }

  function getUsersToHelp(user, onSuccessCallback, onErrorCallback) {
    return this.getUsers(_toHelpQueryDelegate(user), onSuccessCallback, onErrorCallback);
  }
}

module.exports = MongooseFacade;