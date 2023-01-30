const QueryBuilder = require('./_queryBuilder');
const NewsStatus = require('../../core/enums/news-statuses.enum');
const { isNil } = require('lodash');

module.exports = class NewsQueryBuilder extends QueryBuilder {
    constructor(model, context) {
        super(model);
        this.context = context;
        this.query.include = [{
            model: this.context.NewsImages,
            as: 'images',
            attributes: ['url'],
        }];
    }

    setStatus(status) {
        if (isNil(status)) return this;
        switch (status) {
            case NewsStatus.BREAKING:
                this.#setBreaking();
                break;
        }
        return this;
    }

    #setBreaking() {
        this.query.where.isBreaking = true;
    }
}