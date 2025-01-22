import { Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modeQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modeQuery;
    this.query = query;
  }

  search(searchAbleFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        title: { $regex: 'technology', $options: 'i' },
      });
    }

    return this;
  }

  filter() {
    if (Object.keys(this.query).length > 0) {
      const queryObj = { ...this.query };

      const excludeFields = [
        'search',
        'sortBy',
        'sortOrder',
        'limit',
        'page',
        'fields',
      ];
      excludeFields.forEach((el) => delete queryObj[el]);
      const author = {
        author: queryObj.filter,
      };

      this.modelQuery = this.modelQuery.find(author);
    }

    return this;
  }

  sortBy() {
    const sortBy =
      (this?.query?.sortBy as string)?.split(',')?.join(' ') || '-createdAt';
    const sortOrder = (this?.query?.sortOrder as string) === 'asc' ? '' : '-';
    const sort = `${sortOrder}${sortBy}`;
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }
  
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }
}

export default QueryBuilder;
