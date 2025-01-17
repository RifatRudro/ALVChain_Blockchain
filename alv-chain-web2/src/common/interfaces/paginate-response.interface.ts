interface IPaginateResponse {
    total: number,
    currentPage: number,
    nextPage: number | null,
    prevPage: number | null,
    lastPage: number,
    from: number,
    to: number;
}

export { IPaginateResponse };
