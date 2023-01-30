const { isNil } = require('lodash');

module.exports = class QueryBuilder {
    constructor(model) {
        this.model = model;
        this.query = {
            where: {},
            order: []
        };
    }

    build() {
        return this.model.findAll(this.query);
    }

    top(num) {
        if (isNil(num)) return this;
        this.query.limit = num;
        return this;
    }

    offset(num) {
        if (isNil(num)) return this;
        this.query.offset = num;
        return this;
    }
}