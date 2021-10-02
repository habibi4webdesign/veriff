const compare = (a: number, b: number) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

const sort = (list: any[], field: string): any[] => {
  return list.sort((a, b) => {
    if (a[field] && b[field]) {
      return compare(a[field], b[field]);
    } else {
      return compare(a, b);
    }
  });
};

export default sort;
