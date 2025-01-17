import { IReturnType } from "@/common/interfaces/return-type.interface.js";
import { NotFoundException } from "@nestjs/common";

export function paginateResponse(
  data: any,
  page: number,
  limit: number,
): IReturnType {
  const [result, total] = data;
  let lastPage = Math.ceil(total / limit);
  lastPage = lastPage > 0 ? lastPage : 1;
  const nextPage = page + 1 > lastPage ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;
  const from = (page - 1) * limit + 1;
  const to = from + limit - 1;

  if (page > lastPage) throw new NotFoundException(`page ${page} not found`);

  return {
    data: [...result],
    status: true,
    message: "success",
    meta: {
      total: total,
      currentPage: page,
      nextPage: nextPage,
      prevPage: prevPage,
      lastPage: lastPage,
      from: from,
      to: to,
    },
  };
}
