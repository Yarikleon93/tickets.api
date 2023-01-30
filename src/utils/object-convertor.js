const { isNil, pick, pickBy, transform, cloneDeep } = require('lodash');

module.exports = class ObjectConvertor {
    #obj = {}
    constructor(obj) {
        this.#obj = cloneDeep(obj);
    }
    convertProperties(props, transformFn) {
        transform(pickBy(pick(this.#obj, props), (val) => !isNil(val)), (acc, val, key) => {
            acc[key] = transformFn(val);
        }, this.#obj);

        return this;
    }

    getValue() {
        return this.#obj;
    }
}