
const key = 'loginInfo';

function setLoginInfo(loginInfo: Record<string, unknown>) {
    localStorage.setItem(key, JSON.stringify(loginInfo));
}

function getLoginInfo() {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

function removeLoginInfo() {
    localStorage.removeItem(key);
}

export {setLoginInfo, getLoginInfo, removeLoginInfo};