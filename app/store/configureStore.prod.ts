/**
 * TagSpaces - universal file and folder organizer
 * Copyright (C) 2017-present TagSpaces UG (haftungsbeschraenkt)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License (version 3) as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */

import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import onlineListener from '../services/onlineListener';

const enhancer = compose(
  applyMiddleware(thunk) // , router)
  // autoRehydrate()
);

function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  onlineListener(store.dispatch);
  const persistor = persistStore(
    store
  ); /* , null, () => {
    document.dispatchEvent(new Event('storeLoaded'));
  }); */
  return { store, persistor };
}

export default { configureStore };
