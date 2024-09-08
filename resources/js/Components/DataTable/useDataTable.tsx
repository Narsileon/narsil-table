import { DataTableCollectionMeta } from "@narsil-tables/Types";
import { debounce, isString, sortBy } from "lodash";
import { router } from "@inertiajs/react";
import { TableCellType } from "@narsil-tables/Components/Table/TableCellRenderer";
import * as React from "react";
import createDataTableStore, { DataTableStoreState } from "@narsil-tables/Stores/dataTableStore";
import DataTableRowAction from "./DataTableRowAction";

import {
	CellContext,
	ColumnDef,
	ColumnFiltersState,
	ColumnOrderState,
	ColumnSizingState,
	ExpandedState,
	getCoreRowModel,
	getExpandedRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getGroupedRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	GroupingState,
	PaginationState,
	RowSelectionState,
	SortingState,
	TableOptions,
	Updater,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";

declare module "@tanstack/table-core" {
	interface ColumnMeta<TData, TValue> {
		formatString: string;
		type: TableCellType;
	}

	interface TableMeta<TData> {
		setColumnOperators: (value: []) => void;
		setQuickFilters: (value: []) => void;
	}

	interface TableState {
		columnOperators?: any[];
		quickFilters?: any[];
	}
}

export interface useDataTableProps extends Partial<TableOptions<any>> {
	columns: ColumnDef<any, any>[];
	groupingCounts?: DataTableCollectionMeta["grouping_counts"];
	id: string;
	initialStore?: Partial<DataTableStoreState>;
	manual?: boolean;
	menu?: (props: CellContext<any, any>) => any;
}

const useDataTable = ({
	columns,
	data,
	enableRowSelection = true,
	groupingCounts = {},
	id,
	initialStore = {},
	manual = true,
	menu,
	...props
}: useDataTableProps) => {
	const useTableStore = React.useMemo(
		() =>
			createDataTableStore({
				id: id,
				initialState: {
					pageSize: 10,
					...initialStore,
				},
			}),
		[id]
	);

	const tableStore = useTableStore((state) => state);

	if (menu) {
		columns = [
			...(enableRowSelection
				? [
						{
							id: "_select",
							enableColumnFilter: false,
							enableHiding: false,
							enableResizing: false,
							enableSorting: false,
							cell: (props: CellContext<any, any>) => <DataTableRowAction row={props.row} />,
						},
					]
				: []),
			...columns,
			{
				id: "_menu",
				enableColumnFilter: false,
				enableHiding: false,
				enableResizing: false,
				enableSorting: false,
				cell: menu,
			},
		];
	}

	const handleColumnFiltersChange = (
		filters: ColumnFiltersState | ((old: ColumnFiltersState) => ColumnFiltersState)
	) => {
		tableStore.setColumnFilters(typeof filters === "function" ? filters(tableStore.columnFilters) : filters);
	};

	const handleColumnOrderChange = (order: ColumnOrderState | ((old: ColumnOrderState) => ColumnOrderState)) => {
		tableStore.setColumnOrder(typeof order === "function" ? order(tableStore.columnOrder) : order);
	};

	const handleColumnSizingChange = (sizing: ColumnSizingState | ((old: ColumnSizingState) => ColumnSizingState)) => {
		tableStore.setColumnSizing(typeof sizing === "function" ? sizing(tableStore.columnSizing) : sizing);
	};

	const handleColumnVisibilityChange = (
		visibility: VisibilityState | ((old: VisibilityState) => VisibilityState)
	) => {
		tableStore.setColumnVisibility(
			typeof visibility === "function" ? visibility(tableStore.columnVisibility) : visibility
		);
	};

	const handleExpandedChange = (expanded: ExpandedState | ((old: ExpandedState) => ExpandedState)) => {
		tableStore.setExpanded(typeof expanded === "function" ? expanded(tableStore.expanded) : expanded);
	};

	const handleGroupingChange = (grouping: GroupingState | ((old: GroupingState) => GroupingState)) => {
		tableStore.setGrouping(typeof grouping === "function" ? grouping(tableStore.grouping) : grouping);
	};

	const handlePaginationChange = (pagination: PaginationState | ((old: PaginationState) => PaginationState)) => {
		tableStore.setPagination(
			typeof pagination === "function"
				? pagination({
						pageIndex: tableStore.pageIndex,
						pageSize: tableStore.pageSize,
					})
				: pagination
		);
	};

	const handleRowSelectionChange = (rowSelection: Updater<RowSelectionState> | RowSelectionState) => {
		tableStore.setRowSelection(
			typeof rowSelection === "function" ? rowSelection(tableStore.rowSelection) : rowSelection
		);
	};

	const handleSortingChange = (sorting: Updater<SortingState> | SortingState) => {
		tableStore.setSorting(typeof sorting === "function" ? sorting(tableStore.sorting) : sorting);
	};

	const table = useReactTable({
		columnResizeMode: "onEnd",
		columns: columns,
		data: data as any[],
		defaultColumn: {
			minSize: 100,
			filterFn: () => {
				return true;
			},
		},
		enableColumnFilters: true,
		enableColumnResizing: true,
		enableExpanding: true,
		enableFilters: true,
		enableGlobalFilter: true,
		enableGrouping: true,
		enableHiding: true,
		enableMultiRowSelection: true,
		enableMultiSort: true,
		enableRowSelection: enableRowSelection,
		enableSorting: true,
		groupedColumnMode: false,
		manualExpanding: false,
		manualFiltering: manual,
		manualGrouping: false,
		manualPagination: manual,
		manualSorting: manual,
		state: {
			columnFilters: tableStore.columnFilters,
			columnOperators: tableStore.columnOperators,
			columnOrder: tableStore.columnOrder,
			columnSizing: tableStore.columnSizing,
			columnVisibility: tableStore.columnVisibility,
			expanded: tableStore.expanded,
			globalFilter: tableStore.globalFilter,
			grouping: tableStore.grouping,
			pagination: {
				pageIndex: 0,
				pageSize: tableStore.pageSize,
			},
			rowSelection: tableStore.rowSelection,
			sorting: tableStore.sorting,
			quickFilters: tableStore.quickFilters,
		},
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFilteredRowModel: getFilteredRowModel(),
		getGroupedRowModel: getGroupedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getRowId: (row) => row.id,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: handleColumnFiltersChange,
		onColumnOrderChange: handleColumnOrderChange,
		onColumnSizingChange: handleColumnSizingChange,
		onColumnVisibilityChange: handleColumnVisibilityChange,
		onExpandedChange: handleExpandedChange,
		onGlobalFilterChange: tableStore.setGlobalFilter,
		onGroupingChange: handleGroupingChange,
		onPaginationChange: handlePaginationChange,
		onRowSelectionChange: handleRowSelectionChange,
		onSortingChange: handleSortingChange,
		...props,
	});

	const filter = React.useCallback(
		debounce((href, params) => {
			router.get(href, params, {
				preserveState: true,
			});
		}, 300),
		[]
	);

	React.useEffect(() => {
		if (table.options.enableGrouping) {
			tableStore.setGroupingCounts(groupingCounts);
		}
	}, [groupingCounts]);

	React.useEffect(() => {
		if (table.options.enableGrouping) {
			let columnOrder = columns.reduce((array: string[], column) => {
				if (!isString(column.id) || array.includes(column.id)) {
					return array;
				}

				return array.concat(column.id);
			}, []);

			columnOrder = sortBy(columnOrder, (column) => {
				if (column === "_select") {
					return -2;
				} else if (column === "_menu") {
					return 2;
				}

				return tableStore.grouping.includes(column) ? -1 : 1;
			});

			tableStore.setColumnOrder(columnOrder);
		}
	}, [tableStore.grouping]);

	React.useEffect(() => {
		if (manual) {
			const href = window.location.href.replace(location.search, "");

			filter(href, tableStore.getParams());

			return () => filter.cancel();
		}
	}, [
		tableStore.filteredColumnFilters,
		tableStore.globalFilter,
		tableStore.grouping,
		tableStore.pageSize,
		tableStore.sorting,
	]);

	return { table, tableStore };
};

export default useDataTable;
