import {useMemo} from 'react';
import {createStore, applyMiddleware, Store} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

// to do: type Store properly
let store: Store | undefined;

function initStore(initialState: any) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store as Store;

  return _store;
};

export function useStore(initialState: any) {
  return useMemo(() => initializeStore(initialState), [initialState]);
}
