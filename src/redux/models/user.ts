interface UserState {
    userInfo: Record<string, any>;
}

interface SetUserInfoPayload {
    payload: Record<string, any>;
}

interface EffectsPayload {
    payload?: Record<string, any>;
}

export default {
    name: 'user',
    initialState: {
        userInfo: {},
    } as UserState,
    reducers: {
        setUserInfo: (state: UserState, { payload }: SetUserInfoPayload) => {
            state.userInfo = {
                ...payload,
            };
            return state;
        },
    },
    effects: (dispatch: any) => {
        return {
            async getUserInfo(state: UserState, { payload: param = {} }: EffectsPayload = {}) {
                // 异步请求
                // setTimeout(() => {
                //     dispatch.user.setUser({
                //         name: 'yao guan shou',
                //         age: 35,
                //     });
                // }, 3000);
                // const {data} = await getUserInfo(param);

                // return  data
            },
        };
    },
};
