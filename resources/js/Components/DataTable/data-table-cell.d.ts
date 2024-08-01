interface DataTableCellProps {
	cell: import("@tanstack/react-table").Cell<any, any>;
	grouping?: Record<string, any>;
	format?: string;
	locale: string;
}
