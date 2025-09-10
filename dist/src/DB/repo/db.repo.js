"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbRepo = void 0;
class DbRepo {
    model;
    constructor(model) {
        this.model = model;
    }
    async createNew(data) {
        return await this.model.create(data);
    }
    async findOneRecord(query, populate, options) {
        if (!populate)
            return await this.model.findOne(query, options);
        return await this.model.findOne(query, options).populate(populate);
    }
    async findAllRecords(query = {}, options, skip = 0, limit = 100, populate, sort) {
        if (!populate)
            return await this.model.find(query, options).sort(sort).skip(skip).limit(limit);
        return await this.model.find(query, options).sort(sort).skip(skip).limit(limit).populate(populate);
    }
    async countRecords(query) {
        return await this.model.countDocuments(query);
    }
    async findRecordById(id, options, populate) {
        if (!populate)
            return await this.model.findById(id, options);
        return await this.model.findById(id, options).populate(populate);
    }
    async deleteOneRecord(query) {
        return await this.model.deleteOne(query);
    }
    async deleteManyRecord(query) {
        return await this.model.deleteMany(query);
    }
    async findOneRecordAndUpdate(query, data) {
        return await this.model.findOneAndUpdate(query, data, { new: true });
    }
    async findOneRecordAndDelete(query) {
        return await this.model.findOneAndDelete(query);
    }
    async updateOneRecord(query, data) {
        return await this.model.updateOne(query, data);
    }
    async updateManyRecord(query, data) {
        return await this.model.updateMany(query, data);
    }
    async aggregate(pipeline, options) {
        return await this.model.aggregate(pipeline, options);
    }
}
exports.DbRepo = DbRepo;
//# sourceMappingURL=db.repo.js.map