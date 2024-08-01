interface DataTableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
	columnOrder: import("@tanstack/react-table").ColumnOrderState;
	header: import("@tanstack/react-table").Header<any, any>;
	setColumnOrder: (
		updater: import("@tanstack/react-table").Updater<import("@tanstack/react-table").ColumnOrderState>
	) => void;
}
