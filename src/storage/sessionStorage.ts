import {
    CheckDataType
} from '@/utils';
class SessionStorage {
    static setItem(key: string, value: string) {
        if (CheckDataType.isArray(value) || CheckDataType.isObject(value)) {
            value = JSON.stringify(value)
        }
        sessionStorage.setItem(key, value);
    }
    static getItem(key: string) {
        let value = sessionStorage.getItem(key);
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    }
    static removeItem(key: string) {
        sessionStorage.removeItem(key);
    }
}

export default SessionStorage;