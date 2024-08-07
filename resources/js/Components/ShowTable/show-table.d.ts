interface ShowTableProps extends TableProps {
	columns: import("@tanstack/react-table").ColumnDef<any, any>[];
	data: { [key: string]: any };
}
