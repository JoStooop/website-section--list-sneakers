export const getPageCount = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
};

export const getLimitedListOutput = (arr, page, limit) => {
  const lastIndex = page * limit;
  const firstIndex = lastIndex - limit;

  return arr.slice(firstIndex, lastIndex);
};
