import {StoreModule, combineReducers} from '@ngrx/store';
import {todos, visibility} from './todos';

const reducer = combineReducers({todos, visibility});

export const store = StoreModule.provideStore(reducer);
