var ngrxStore = require('@ngrx/store');
var todos = require('./todos');

var reducer = ngrxStore.combineReducers(todos);

module.exports = ngrxStore.StoreModule.provideStore(reducer);
