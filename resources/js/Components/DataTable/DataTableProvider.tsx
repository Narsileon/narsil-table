import { arrayMove } from "@dnd-kit/sortable";
import { createContext, useContext } from "react";
import { debounce, isString } from "lodash";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { router } from "@inertiajs/react";
import * as React from "react";
import createTableStore from "@narsil-table/Stores/tableStore";

import {
	type DragEndEvent,
	closestCenter,
	DndContext,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";

import {
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
	SortingState,
	Table,
	Updater,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";

declare module "@tanstack/table-core" {
	interface Cell<TData, TValue> {
		format?: string;
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

type TableContextType = {
	table: Table<unknown>;
	tableStore: TableStoreType;
};

interface DataTableProviderProps {
	children: React.ReactNode;
	columns: ColumnDef<any, any>[];
	data: any[];
	id: string;
}

const DataTableContext = createContext<TableContextType | null>(null);

const DataTableProvider = ({ children, columns, data, id }: DataTableProviderProps) => {
	function getColumnOrder() {
		const columnOrder = columns.reduce((array: string[], column) => {
			if (!isString(column.id) || array.includes(column.id)) {
				return array;
			}

			return array.concat(column.id);
		}, []);

		return columnOrder;
	}

	const useTableStore = React.useMemo(
		() =>
			createTableStore({
				id: id,
				initialState: {
					columnOrder: getColumnOrder(),
					pageSize: 10,
				},
			}),
		[id]
	);

	const tableStore = useTableStore((state) => state);

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

	const handleColumnVisibilityChange = (visibility: VisibilityState | ((old: VisibilityState) => VisibilityState)) => {
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

	const handleSortingChange = (sorting: Updater<SortingState> | SortingState) => {
		tableStore.setSorting(typeof sorting === "function" ? sorting(tableStore.sorting) : sorting);
	};

	const table = useReactTable({
		columnResizeMode: "onChange",
		columns: columns,
		data: data,
		defaultColumn: {
			minSize: 100,
		},
		state: {
			columnFilters: tableStore.columnFilters,
			columnOperators: tableStore.columnOperators,
			columnOrder: tableStore.columnOperators,
			columnSizing: tableStore.columnSizing,
			columnVisibility: tableStore.columnVisibility,
			expanded: tableStore.expanded,
			globalFilter: tableStore.globalFilter,
			grouping: tableStore.grouping,
			pagination: {
				pageIndex: 0,
				pageSize: tableStore.pageSize,
			},
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
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: handleColumnFiltersChange,
		onColumnOrderChange: handleColumnOrderChange,
		onColumnSizingChange: handleColumnSizingChange,
		onColumnVisibilityChange: handleColumnVisibilityChange,
		onExpandedChange: handleExpandedChange,
		onGlobalFilterChange: tableStore.setGlobalFilter,
		onGroupingChange: handleGroupingChange,
		onPaginationChange: handlePaginationChange,
		onSortingChange: handleSortingChange,
	});

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (active && over && active.id !== over.id) {
			table.setColumnOrder((columnOrder) => {
				const oldIndex = columnOrder.indexOf(active.id as string);
				const newIndex = columnOrder.indexOf(over.id as string);

				return arrayMove(columnOrder, oldIndex, newIndex);
			});
		}
	}

	const filter = React.useCallback(
		debounce((params) => {
			router.get(window.location.href, params, {
				preserveState: true,
			});
		}, 300),
		[]
	);

	React.useEffect(() => {
		filter(tableStore.getParams());

		return () => filter.cancel();
	}, [tableStore.pageSize, tableStore.sorting]);

	const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}));

	return (
		<DataTableContext.Provider
			value={{
				table: table,
				tableStore: tableStore,
			}}
		>
			<DndContext
				collisionDetection={closestCenter}
				modifiers={[restrictToHorizontalAxis]}
				onDragEnd={handleDragEnd}
				sensors={sensors}
			>
				{children}
			</DndContext>
		</DataTableContext.Provider>
	);
};

export function useDataTable() {
	const context = useContext(DataTableContext);

	if (!context) {
		throw new Error("useDataTable must be used within a <DataTableProvider />");
	}

	return context;
}

export default DataTableProvider;
