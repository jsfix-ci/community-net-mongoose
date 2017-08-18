# community-net-mongoose
[Community Net](https://github.com/rdelhommer/community-net) database plugin for Mongoose

## Installation
```js
npm install community-net-mongoose
```

## Description
The MongooseFacade constructor takes 4 arguments:
* userSchemaName - The name of the mongoose User schema
* subNetQueryDelgate - A delegate that builds a query to find of users in a user's sub-network.
* toHelpQueryDelegate - A delegate that builds a query to find users that the current user can help.
* docCoercionDelegate - A delegate that coerces the Mongoose document into a form that can be consumed by the Community Net plugin interface.

See the next section for example implementations of each of these parameters

## Usage
See [example](https://github.com/rdelhommer/community-net-mongoose/blob/master/examples/example.js) for a implementation of the facade.  It assumes a User doc with a schema similar to the following

```js
{
  displayName: {
    type: String
  },
  zip: {
    type: String
  },
  email: {
    type: String
  },
  skills: [{
    type: String,
    enum: ['painting', 'carpentry', ... , 'composting'],
  }],
  needs: [{
    type: String,
    enum: ['painting', 'carpentry', ... , 'composting'],
  }],
}
```
