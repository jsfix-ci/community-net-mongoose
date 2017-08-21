var MongooseFacade = require('community-net-mongoose');

// Finds all other users within the same zip code
// Assumes that the User Schema has a zip code property named 'zip'
var subNetQueryDelegate = function (user) {
  return {
    _id: { '$ne': user._id },
    zip: user.zip
  };
};

// Finds all other users that have a need that the user has a skill for
// Assumes that the User Schema has array properties named 'needs' and 'skills'
var toHelpQueryDelegate = function (user) {
  return {
    _id: { '$ne': user._id },
    needs: { '$in': user.skills }
  };
};

// The interface requires an object with the following keys
// name
// email
// needs
// skills
var docCoercionDelegate = function (user) {
  return {
    name: user.displayName,
    email: user.email,
    needs: user.needs,
    skills: user.skills
  };
};

var facade = new MongooseFacade('User', subNetQueryDelegate, toHelpQueryDelegate, docCoercionDelegate);