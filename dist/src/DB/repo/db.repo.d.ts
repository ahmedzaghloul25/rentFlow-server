import { Aggregate, AggregateOptions, DeleteResult, FilterQuery, Model, PipelineStage, PopulateOptions, ProjectionType, SortOrder, UpdateQuery, UpdateResult } from "mongoose";
export declare abstract class DbRepo<T> {
    private readonly model;
    constructor(model: Model<T>);
    createNew(data: Partial<T> | Partial<T>[]): Promise<T | T[]>;
    findOneRecord(query: FilterQuery<T>, populate?: PopulateOptions | (PopulateOptions | string)[], options?: ProjectionType<T>): Promise<T | null>;
    findAllRecords(query?: FilterQuery<T>, options?: ProjectionType<T>, skip?: number, limit?: number, populate?: PopulateOptions | (PopulateOptions | string)[], sort?: {
        [key: string]: SortOrder;
    }): Promise<T[]>;
    countRecords(query?: FilterQuery<T>): Promise<number>;
    findRecordById(id: string, options?: ProjectionType<T>, populate?: PopulateOptions | (PopulateOptions | string)[]): Promise<T | null>;
    deleteOneRecord(query: FilterQuery<T>): Promise<DeleteResult>;
    deleteManyRecord(query: FilterQuery<T>): Promise<DeleteResult>;
    findOneRecordAndUpdate(query: FilterQuery<T>, data: UpdateQuery<T>): Promise<T | null>;
    findOneRecordAndDelete(query: FilterQuery<T>): Promise<T | null>;
    updateOneRecord(query: FilterQuery<T>, data: UpdateQuery<T>): Promise<UpdateResult>;
    updateManyRecord(query: FilterQuery<T>, data: UpdateQuery<T>): Promise<UpdateResult>;
    aggregate(pipeline: PipelineStage[], options?: AggregateOptions): Promise<Aggregate<T[]>>;
}
