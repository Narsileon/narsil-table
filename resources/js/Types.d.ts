type DataTableCollection<T = { [key: string]: any }> = Collection<T> & {
	columns: import("@tanstack/react-table").ColumnDef<any, any>[];
};

type ShowTableResource<T = { [key: string]: any }> = Resource<T> & {
	columns: import("@tanstack/react-table").ColumnDef<any, any>[];
};
