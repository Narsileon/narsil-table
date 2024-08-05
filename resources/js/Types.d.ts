type TableCollection<T = { [key: string]: any }> = Collection<T> & {
	columns: import("@tanstack/react-table").ColumnDef<any, any>[];
};
