// 设置默认语言
export const fallbackLng = 'en';

export const languagesOptions = [
    { value: fallbackLng, label: 'EN' },
    { value: 'de', label: 'DE' },
    { value: 'it', label: 'IT' },
    { value: 'zhs', label: '简体中文' },
    { value: 'zht', label: '繁體中文' },
];

export const languages = languagesOptions.map((item => item.value));

export const defaultNS = 'translation';

// cookieName
export const cookieName = 'language';

// headerName 设置请求头
export const headerName = 'language';

export const localStorageName = 'language';

export const sessionStorageName = 'language';
