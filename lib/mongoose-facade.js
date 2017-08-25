function MongooseFacade(mongoose, userSchemaName, subNetQueryDelegate, toHelpQueryDelegate, docCoercionDelegate) {
  var _mongoose = mongoose;
  var _userSchemaName = userSchemaName;
  var _subNetQueryDelegate = subNetQueryDelegate;
  var _toHelpQueryDelegate = toHelpQueryDelegate;
  var _docCoercionDelegate = docCoercionDelegate;

  this.getUsers = getUsers;
  this.getSubNetworkForUser = getSubNetworkForUser;
  this.getUsersToHelp = getUsersToHelp;
  this.convertDoc = convertDoc;

  function getUsers(query, onSuccessCallback, onErrorCallback) {
    _mongoose.model(_userSchemaName).find(query || {})
      .exec((users, err) => {
        if (err) {
          return onErrorCallback(err);
        }

        return onSuccessCallback(users.map(u => _docCoercionDelegate(u)));
      });
  }

  function getSubNetworkForUser(user, onSuccessCallback, onErrorCallback) {
    return this.getUsers(_subNetQueryDelegate(user), onSuccessCallback, onErrorCallback);
  }

  function getUsersToHelp(user, onSuccessCallback, onErrorCallback) {
    return this.getUsers(_toHelpQueryDelegate(user), onSuccessCallback, onErrorCallback);
  }

  function convertDoc(userDoc) {
    return _docCoercionDelegate(userDoc);
  }
}

module.exports = MongooseFacade;