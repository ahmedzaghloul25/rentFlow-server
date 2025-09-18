import { Aggregate, AggregateOptions, DeleteResult, FilterQuery, Model, PipelineStage, PopulateOptions, ProjectionType, SortOrder, UpdateQuery, UpdateResult } from "mongoose";


export abstract class DbRepo<T> {
    constructor(private readonly model: Model<T>) { }

    async createNew(data: Partial<T> | Partial<T>[]): Promise<T | T[]> {
        return await this.model.create(data);
    }

    async findOneRecord(
        query: FilterQuery<T>,
        populate?: PopulateOptions | (PopulateOptions | string)[],
        options?: ProjectionType<T>
    ): Promise<T | null> {
        if (!populate) return await this.model.findOne(query, options);
        return await this.model.findOne(query, options).populate(populate)
    }

    async findAllRecords(
        query: FilterQuery<T> = {},
        options?: ProjectionType<T>,
        skip: number = 0,
        limit: number = 100,
        populate?: PopulateOptions | (PopulateOptions | string)[],
        sort?: { [key: string]: SortOrder },
    ): Promise<T[]> {
        if (!populate) return await this.model.find(query, options).sort(sort).skip(skip).limit(limit)
        return await this.model.find(query, options).sort(sort).skip(skip).limit(limit).populate(populate);
    }

    async countRecords(query?: FilterQuery<T>): Promise<number> {
        return await this.model.countDocuments(query);
    }

    async findRecordById(
        id: string,
        options?: ProjectionType<T>,
        populate?: PopulateOptions | (PopulateOptions | string)[],
    ): Promise<T | null> {
        if (!populate) return await this.model.findById(id, options);
        return await this.model.findById(id, options).populate(populate);
    }

    async deleteOneRecord(query: FilterQuery<T>): Promise<DeleteResult> {
        return await this.model.deleteOne(query);
    }

    async deleteManyRecord(query: FilterQuery<T>): Promise<DeleteResult> {
        return await this.model.deleteMany(query);
    }

    async findOneRecordAndUpdate(
        query: FilterQuery<T>,
        data: UpdateQuery<T>
    ): Promise<T | null> {
        return await this.model.findOneAndUpdate(query, data, { new: true });
    }
    async findOneRecordAndDelete(query: FilterQuery<T>): Promise<T | null> {
        return await this.model.findOneAndDelete(query);
    }
    async updateOneRecord(
        query: FilterQuery<T>,
        data: UpdateQuery<T>
    ): Promise<UpdateResult> {
        return await this.model.updateOne(query, data);
    }

    async updateManyRecord(
        query: FilterQuery<T>,
        data: UpdateQuery<T>
    ): Promise<UpdateResult> {
        return await this.model.updateMany(query, data);
    }

    async aggregate(pipeline: PipelineStage[], options?: AggregateOptions): Promise<Aggregate<T[]>> {
        return await this.model.aggregate(pipeline, options)
    }
}