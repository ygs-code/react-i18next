import { set } from 'lodash';

interface CommonState {
  menuId: string | undefined;
  menuLoading: boolean;
  tablePageSearchParams: Record<string, any>;
}

interface SetMenuLoadingAction {
  payload: boolean;
}

interface SetMenuIdAction {
  payload: string | undefined;
}

export default {
  name: 'common',
  initialState: {
    menuId: undefined,
    menuLoading: true,
    tablePageSearchParams: {},
  } as CommonState,
  reducers: {
    setTablePageSearchParams: (
      state: CommonState,
      { payload }: { payload: Record<string, any> },
    ) => {
      state.tablePageSearchParams = payload;
    },
    setMenuLoading: (state: CommonState, { payload }: SetMenuLoadingAction) => {
      state.menuLoading = payload;
    },
    setMenuId: (state: CommonState, { payload }: SetMenuIdAction) => {
      state.menuId = payload;
    },
  },
};
