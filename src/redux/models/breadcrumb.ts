/*
 * @Date: 2022-08-15 09:17:55
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-15 14:03:23
 * @FilePath: /react-ssr-lazy-loading/@/redux/models/home.js
 * @Description:
 */

interface BreadcrumbState {
  items: any[]; // Replace `any` with a more specific type if known
}

interface SetBreadcrumbAction {
  payload: any[]; // Replace `any` with a more specific type if known
}

export default {
  name: 'breadcrumb',
  initialState: {
    items: [] as BreadcrumbState['items'],
  },
  reducers: {
    setBreadcrumb(state: BreadcrumbState, { payload }: SetBreadcrumbAction) {
      state.items = payload;

      return state;
    },
  },
};
