type DataTableProviderState = {
	table: import("@tanstack/react-table").Table<any>;
	tableStore: TableStoreType;
};

type DataTableProviderAction = {};

type DataTableProviderType = DataTableProviderState & DataTableProviderAction;

interface DataTableProviderProps {
	children: React.ReactNode;
	columns: import("@tanstack/react-table").ColumnDef<any, any>[];
	data: { [key: string]: any };
	id: string;
	menu?: (props: import("@tanstack/react-table").CellContext<any, any>) => any;
}
