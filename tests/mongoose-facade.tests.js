var test = require('ava');
var MongooseFacade = require('../index');

test.beforeEach(t => {
  var mongooseMock = {
    model: function (schemaName) {
      t.context.data.results.mongooseSchemaName = schemaName;

      return {
        find: function (query) {
          t.context.data.results.findQuery = query;

          return {
            exec: function (callback) {
              if (t.context.data.throws.getUsers) {
                return callback(null, new Error('getUsers'));
              }
              return callback([{
                name: 'Abel'
              }, {
                name: 'Bob'
              }, {
                name: 'Carl'
              }, {
                name: 'Don'
              }]);
            }
          }
        }
      }
    }
  };

  var schemaName = 'TestUser';

  var subNetQueryDelegate = function (user) {
    if (!t.context.data.results.subNetQueryInvocations){
      t.context.data.results.subNetQueryInvocations = 0;
    }

    t.context.data.results.subNetQueryInvocations++;

    return 'SubNet Query Stub';
  };

  var toHelpQueryDelegate = function (user) {
    if (!t.context.data.results.toHelpQueryInvocations){
      t.context.data.results.toHelpQueryInvocations = 0;
    }

    t.context.data.results.toHelpQueryInvocations++;

    return 'ToHelp Query Stub';
  };

  var docCoercionDelegate = function (user) {
    if (!t.context.data.results.docCoercionUsers){
      t.context.data.results.docCoercionUsers = [];
    }

    t.context.data.results.docCoercionUsers.push(user);

    return 'Doc Coercion Stub';
  };

  t.context.data = {
    facade: new MongooseFacade(mongooseMock, schemaName, subNetQueryDelegate, toHelpQueryDelegate, docCoercionDelegate),
    results: {},
    throws: {}
  };
});

test('correct schema name', t => {
  t.context.data.facade.getUsers({}, (users) => {
    t.is(t.context.data.results.mongooseSchemaName, 'TestUser');
  }, (err) => {
    t.fail('onErrorCallback should not have been invoked');
  });
});

// getUsers
test('getUsers - onErrorCallback invoked if error', t => {
  t.context.data.throws.getUsers = true;

  t.context.data.facade.getUsers({}, (users) => {
    t.fail('onSuccessCallback should not have been invoked');
  }, (err) => {
    t.is(err.message, 'getUsers');
  });
});

test('getUsers - onSuccessCallback invoked if success', t => {
  t.context.data.facade.getUsers({}, (users) => {
    t.pass();
  }, (err) => {
    t.fail('onErrorCallback should not have been invoked');
  });
});

test('getUsers - docCoercionDelegate invoked for all returned db docs', t => {
  t.context.data.facade.getUsers({}, (users) => {
    t.deepEqual(t.context.data.results.docCoercionUsers, [{
      name: 'Abel'
    }, {
      name: 'Bob'
    }, {
      name: 'Carl'
    }, {
      name: 'Don'
    }]);
  }, (err) => {
    t.fail('onErrorCallback should not have been invoked');
  });
});

test('getUsers - query passed to mongoose', t => {
  t.context.data.facade.getUsers('getUsers Query Stub', (users) => {
    t.is(t.context.data.results.findQuery, 'getUsers Query Stub');
  }, (err) => {
    t.fail('onErrorCallback should not have been invoked');
  });
});

// getSubNetworkForUser
test('getSubNetworkForUser - onErrorCallback invoked if error', t => {
  t.context.data.throws.getUsers = true;

  var user = {
    name: 'Testy Tester'
  };

  t.context.data.facade.getSubNetworkForUser(user, (subNet) => {
    t.fail('onSuccessCallback should not have been invoked');
  }, (err) => {
    t.is(err.message, 'getUsers');
  });
});

test('getSubNetworkForUser - onSuccessCallback invoked if success', t => {
  t.context.data.facade.getSubNetworkForUser({}, (subNetUsers) => {
    t.pass();
  }, (err) => {
    t.fail('onErrorCallback should not have been invoked');
  });
});

test('getSubNetworkForUser - docCoercionDelegate invoked for all returned db docs', t => {
  t.context.data.facade.getSubNetworkForUser({}, (subNetUsers) => {
    t.deepEqual(t.context.data.results.docCoercionUsers, [{
      name: 'Abel'
    }, {
      name: 'Bob'
    }, {
      name: 'Carl'
    }, {
      name: 'Don'
    }]);
  }, (err) => {
    t.fail('onErrorCallback should not have been invoked');
  });
});

test('getSubNetworkForUser - correct query passed to mongoose', t => {
  t.context.data.facade.getSubNetworkForUser({}, (subNetUsers) => {
    t.is(t.context.data.results.findQuery, 'SubNet Query Stub');
  }, (err) => {
    t.fail('onErrorCallback should not have been invoked');
  });
});

// getUsersToHelp
test('getUsersToHelp - onErrorCallback invoked if error', t => {
  t.context.data.throws.getUsers = true;

  var user = {
    name: 'Testy Tester'
  };

  t.context.data.facade.getUsersToHelp(user, (toHelp) => {
    t.fail('onSuccessCallback should not have been invoked');
  }, (err) => {
    t.is(err.message, 'getUsers');
  });
});

test('getUsersToHelp - onSuccessCallback invoked if success', t => {
  t.context.data.facade.getUsersToHelp({}, (toHelpUsers) => {
    t.pass();
  }, (err) => {
    t.fail('onErrorCallback should not have been invoked');
  });
});

test('getUsersToHelp - docCoercionDelegate invoked for all returned db docs', t => {
  t.context.data.facade.getUsersToHelp({}, (toHelpUsers) => {
    t.deepEqual(t.context.data.results.docCoercionUsers, [{
      name: 'Abel'
    }, {
      name: 'Bob'
    }, {
      name: 'Carl'
    }, {
      name: 'Don'
    }]);
  }, (err) => {
    t.fail('onErrorCallback should not have been invoked');
  });
});

test('getUsersToHelp - correct query passed to mongoose', t => {
  t.context.data.facade.getUsersToHelp({}, (toHelpUsers) => {
    t.is(t.context.data.results.findQuery, 'ToHelp Query Stub');
  }, (err) => {
    t.fail('onErrorCallback should not have been invoked');
  });
});