type DataTableStoreState = {
	columnFilters: import("@tanstack/react-table").ColumnFiltersState;
	columnOperators: any[];
	columnOrder: import("@tanstack/react-table").ColumnOrderState;
	columnSizing: import("@tanstack/react-table").ColumnSizingState;
	columnVisibility: import("@tanstack/react-table").VisibilityState;
	expanded: import("@tanstack/react-table").ExpandedState;
	filteredColumnFilters: import("@tanstack/react-table").ColumnFiltersState;
	globalFilter: string;
	grouping: import("@tanstack/react-table").GroupingState;
	pageIndex: number;
	pageSize: number;
	quickFilters: any[];
	sorting: import("@tanstack/react-table").SortingState;
};

type DataTableStoreActions = {
	getParams: () => { [key: string]: any };
	setColumnFilters: (columnFilters: import("@tanstack/react-table").ColumnFiltersState) => void;
	setColumnOperators: (columnOperators: any[]) => void;
	setColumnOrder: (columnOrder: import("@tanstack/react-table").ColumnOrderState) => void;
	setColumnSizing: (columnSizing: import("@tanstack/react-table").ColumnSizingState) => void;
	setColumnVisibility: (columnVisibility: import("@tanstack/react-table").VisibilityState) => void;
	setExpanded: (expanded: import("@tanstack/react-table").ExpandedState) => void;
	setGlobalFilter: (globalFilter: string) => void;
	setGrouping: (grouping: import("@tanstack/react-table").GroupingState) => void;
	setPageIndex: (pageIndex: number) => void;
	setPageSize: (pageSige: number) => void;
	setPagination: (pagination: import("@tanstack/react-table").PaginationState) => void;
	setQuickFilters: (specialFilters: any[]) => void;
	setSorting: (sorting: import("@tanstack/react-table").SortingState) => void;
};

type DataTableStoreType = DataTableStoreState & DataTableStoreActions;

interface CreateDataTableStoreProps {
	id: string;
	initialState: Partial<DataTableStoreState>;
}
