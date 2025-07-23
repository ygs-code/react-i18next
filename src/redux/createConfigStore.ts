import { combineReducers, createStore } from 'redux';
import {
  configureStore,
  createSlice,
  createAction,
  createReducer,
} from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { CheckDataType } from '@/utils';

import lodash from 'lodash';

declare global {
  interface Window {
    __PRELOADED_STATE__?: any;
  }
}

interface Model {
  name: string;
  initialState?: any;
  effects?: (
    dispatchActions: DispatchActions,
  ) => Record<string, (state: any, action: { payload: any }) => void>;
  [key: string]: any;
}

interface Models {
  [key: string]: Model;
}

interface Reducers {
  [key: string]: any;
}

interface Actions {
  [key: string]: any;
}

interface InitialStates {
  [key: string]: any;
}

interface DispatchActions {
  [key: string]: {
    [key: string]: (...args: any[]) => void;
  };
}

interface MapRedux {
  (modelsName?: string | string[]): (Component: any) => any;
}

interface ConfigStore {
  mapRedux: MapRedux;
  actions: Actions;
  dispatch: DispatchActions;
  store: ReturnType<typeof createStore>;
}

const isBrowser = () => {
  return typeof window !== 'undefined';
};

// 创建全局的 action
const setAllIinitialStateAction = createAction('setAll/initialState');

const createConfigStore = ({
  // 模块 redux
  models,
  // 同步全局设置 初始化 redux
  initialStates = {},
  // 异步全局设置 初始化 redux
  asyncInitialStates,
  // 中间件
  applyMiddleware,
}: {
  models?: Models[string] | Model[string];
  initialStates?: InitialStates;
  asyncInitialStates?: InitialStates;
  applyMiddleware?: any;
}): ConfigStore => {
  if (CheckDataType.isArray(models)) {
    models = (models as Model[]).reduce((acc, model) => {
      if (model.name === undefined || model.name === null) {
        throw new Error('Redux model name is required');
      }

      acc = {
        ...acc,
        [model.name]: model,
      };
      return acc;
    }, {} as Models);
  }

  let reducers: Reducers = {};
  let $actions: Actions = {};

  // let initialStates: InitialStates = {};

  for (const key in models) {
    const { effects=()=>({}), name, ...more } = models[key];

    if (name === undefined || name === null) {
      throw new Error('Redux model name is required');
    }
    // if (isBrowser()) {
    //   initialStates = window.__PRELOADED_STATE__ || {};
    // } else {
    //   initialStates[key] = models[key].initialState;
    // }
    const { reducer, actions } = createSlice({
      ...more,
      name: key,
    });

    reducers[key] = reducer;
    for (const _key in actions) {
      if (actions.hasOwnProperty(_key)) {
        if (`${key}_${_key}` in $actions) {
          throw `action ${key}.${_key} is already exist`;
        }
        $actions[`${key}`] = {
          ...($actions[`${key}`] || {}),
          [`${_key}`]: actions[_key],
        };
      }
    }
  }

  let actionType = setAllIinitialStateAction().type.replace(/\//, '.');
  lodash.set($actions, actionType, setAllIinitialStateAction);

  const rootReducer = combineReducers({
    ...reducers,
  });

  const store = createStore(
    (
      state:
        | { [x: string]: unknown }
        | Partial<{ [x: string]: unknown }>
        | undefined,
      action,
    ) => {
      if (action.type === setAllIinitialStateAction.type && isBrowser()) {
        state = asyncInitialStates; //window.__PRELOADED_STATE__;
      }
      return rootReducer(state, action);
    },
    initialStates,
    applyMiddleware,
  );

  const { dispatch, getState } = store;

  let dispatchActions: DispatchActions = {};
  for (let key in $actions) {
    dispatchActions[key] = dispatchActions[key] || {};
    for (let _key in $actions[key]) {
      dispatchActions[key][_key] = (...ags) => {
        dispatch($actions[key][_key](...ags));
      };
    }
  }

  for (const key in models) {
    const { effects = () => ({}) } = (models as Models)[key];
    let $effects: Record<
      string,
      (state: any, action: { payload: any }) => void
    > = effects(dispatchActions);
    dispatchActions[key] = dispatchActions[key] || {};
    for (let _key in $effects) {
      dispatchActions[key][_key] = (newState) => {
        return $effects[_key](getState(), {
          payload: newState,
        });
      };
    }
  }

  const mapRedux: MapRedux = (modelsName) => (Component) => {
    const mapStateToProps = (state: any) => {
      let newState: any = {};
      if (CheckDataType.isUndefined(modelsName)) {
        newState = state;
      } else if (CheckDataType.isArray(modelsName)) {
        for (const key of modelsName as string[]) {
          if (state[key]) {
            newState[key] = state[key];
          }
        }
      } else if (CheckDataType.isString(modelsName)) {
        if (state[modelsName as string]) {
          newState[modelsName as string] = state[modelsName as string];
        }
      }
      return {
        state: newState,
      };
    };

    const mapDispatchToProps = (dispatch: any) => {
      let newDispatch: any = {};
      if (CheckDataType.isUndefined(modelsName)) {
        newDispatch = dispatchActions;
      } else if (CheckDataType.isArray(modelsName)) {
        for (const key of modelsName as string[]) {
          if (dispatchActions[key]) {
            newDispatch[key] = dispatchActions[key];
          }
        }
      } else if (CheckDataType.isString(modelsName)) {
        if (dispatchActions[modelsName as string]) {
          newDispatch[modelsName as string] =
            dispatchActions[modelsName as string];
        }
      }
      return {
        dispatch: newDispatch,
      };
    };
    return connect(mapStateToProps, mapDispatchToProps)(Component);
  };

  return {
    mapRedux,
    actions: $actions,
    dispatch: dispatchActions,
    store,
  };
};

export default createConfigStore;
