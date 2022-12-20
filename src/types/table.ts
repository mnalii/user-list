type TableProps = {
  page: number;
  rowsPerPage: number;
  order: 'asc' | 'desc';
  orderBy: string;

  onSort: (id: string) => void;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;

  setPage: React.Dispatch<React.SetStateAction<number>>;
  setOrder: React.Dispatch<React.SetStateAction<'desc' | 'asc'>>;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
};

export default TableProps;
