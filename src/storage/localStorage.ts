import {
    CheckDataType
} from '@/utils';
class LocalStorage {
    static setItem(key: string, value: string) {
        if (CheckDataType.isArray(value) || CheckDataType.isObject(value)) {
            value = JSON.stringify(value)
        }
        localStorage.setItem(key, value);
    }
    static getItem(key: string) {
        let value = localStorage.getItem(key);
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    }
    static removeItem(key: string) {
        localStorage.removeItem(key);
    }
}

export default LocalStorage;