export default class AbstractCache {
    constructor() {
        this.add = (key, value, policy) => {
            if (this.includes(key)) {
                throw new Error(`Key ${key} is already present!`);
            }
            return this.set(key, value, policy);
        };
        this.set = (key, value, policy) => {
            throw new Error('method is abstract');
        };
        this.get = (key) => {
            throw new Error('method is abstract');
        };
        this.getOrAdd = (key, factory, policy) => {
            if (this.includes(key)) {
                return this.get(key);
            }
            return this.add(key, factory(key), policy);
        };
        this.addOrUpdate = (key, addFactory, updateFactory, policy) => {
            if (this.includes(key)) {
                return this.set(key, updateFactory(key, this.get(key)), policy);
            }
            return this.set(key, addFactory(key), policy);
        };
        this.remove = (key) => {
            throw new Error('method is abstract');
        };
        this.includes = (key) => {
            throw new Error('method is abstract');
        };
    }
    checkAndHandleExpiry(item) {
        if (item.isExpired) {
            this.remove(item.key);
            return null;
        }
        return item.value;
    }
}
