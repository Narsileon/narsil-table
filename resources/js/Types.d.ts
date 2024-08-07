type DataTableCollection<T = { [key: string]: any }> = Collection<T> & {
	columns: import("@tanstack/react-table").ColumnDef<any, any>[];
};

type DataShowResource<T = { [key: string]: any }> = Resource<T> & {
	columns: import("@tanstack/react-table").ColumnDef<any, any>[];
};
