import { FindManyOptions, ObjectLiteral, Repository } from "typeorm";

export type IPaginationMeta = {
  currentPage: number;
  lastPage: number;
  prevPage: number | null;
  nextPage: number | null;
  total: number;
  from: number;
  to: number;
};

export type IPaginatedResponse<T> = { data: T[]; meta: IPaginationMeta };

export const createPaginationMeta = ({
  total,
  page,
  limit,
}: {
  page: number;
  limit: number;
  total: number;
}): IPaginationMeta => ({
  currentPage: page,
  lastPage: !!limit ? Math.ceil(Math.max(total / limit, 1)) : 1,
  prevPage: page - 1 || null,
  nextPage: !!limit && page * limit < total ? page + 1 : null,
  total,
  from: Math.min(total, (page - 1) * limit + 1),
  to: Math.min(page * limit, total),
});

export const createPaginationMetaFromFindManyOption = (
  findOptions: FindManyOptions | undefined,
  total: number,
): IPaginationMeta => {
  const { skip, take } = findOptions || {};
  if (skip === undefined || take === undefined)
    return {
      currentPage: 1,
      lastPage: 1,
      prevPage: null,
      nextPage: null,
      total,
      from: 0,
      to: total,
    };

  const page = Math.floor(skip / take) + 1;
  return createPaginationMeta({ page, limit: take, total });
};

export const findAllWithPaginationMeta = async <T extends ObjectLiteral>(
  repository: Repository<T>,
  findOptions: FindManyOptions<T>,
): Promise<IPaginatedResponse<T>> => {
  const [data, total] = await repository.findAndCount(findOptions);
  const meta = createPaginationMetaFromFindManyOption(findOptions, total);
  return { data, meta };
};
