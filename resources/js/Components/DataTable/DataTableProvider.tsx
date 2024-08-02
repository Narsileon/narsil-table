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
	getCoreRowModel,
	getExpandedRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getGroupedRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	PaginationState,
	SortingState,
	Table,
	Updater,
	useReactTable,
} from "@tanstack/react-table";

declare module "@tanstack/table-core" {
	interface TableMeta<TData> {
		filterable: boolean;
		manual: boolean;
		getLayout: () => { [key: string]: any };
		reload: () => void;
		save: () => void;
		setAutoUpdate: (value: boolean) => void;
		setColumnOperators: (value: []) => void;
		setData: (value: []) => void;
		setSpecialFilters: (value: []) => void;
		template: {
			id: number;
			name: string;
			type: string;
		};
	}

	interface Cell<TData, TValue> {
		format?: string;
	}

	interface TableOptions<TData> {
		paginated?: boolean;
	}

	interface TableState {
		autoUpdate?: boolean;
		columnOperators?: [];
		specialFilters?: [];
	}
}

type TableContextType = {
	table: Table<unknown>;
};

interface DataTableProviderProps {
	children: React.ReactNode;
	columns: ColumnDef<any, any>[];
	currentPage: number;
	data: any[];
	id: string;
}

const DataTableContext = createContext<TableContextType | null>(null);

const DataTableProvider = ({ children, columns, currentPage, data, id }: DataTableProviderProps) => {
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

	const defaultColumn = {
		minSize: 100,
	};

	const handleColumnFiltersChange = (filters: any[] | ((old: any[]) => any[])) => {
		tableStore.setColumnFilters(typeof filters === "function" ? filters(tableStore.columnFilters) : filters);
	};

	const handleColumnOrderChange = (order: string[] | ((old: string[]) => string[])) => {
		tableStore.setColumnOrder(typeof order === "function" ? order(tableStore.columnOrder) : order);
	};

	const handleColumnSizingChange = (
		sizing: Record<string, number> | ((old: Record<string, number>) => Record<string, number>)
	) => {
		tableStore.setColumnSizing(typeof sizing === "function" ? sizing(tableStore.columnSizing) : sizing);
	};

	const handleColumnVisibilityChange = (
		visibility: Record<string, boolean> | ((old: Record<string, boolean>) => Record<string, boolean>)
	) => {
		tableStore.setColumnVisibility(
			typeof visibility === "function" ? visibility(tableStore.columnVisibility) : visibility
		);
	};

	const handleExpandedChange = (
		expanded: Record<string, boolean> | ((old: Record<string, boolean>) => Record<string, boolean>)
	) => {
		tableStore.setExpanded(typeof expanded === "function" ? expanded(tableStore.expanded) : expanded);
	};

	const handleGlobalFilterChange = (filter: string) => tableStore.setGlobalFilter(filter);

	const handleGroupingChange = (grouping: any[] | ((old: any[]) => any[])) => {
		tableStore.setGrouping(typeof grouping === "function" ? grouping(tableStore.grouping) : grouping);
	};

	const handlePaginationChange = (pagination: PaginationState | ((old: PaginationState) => PaginationState)) => {
		tableStore.setPagination(
			typeof pagination === "function"
				? pagination({
						pageIndex: currentPage,
						pageSize: tableStore.pageSize,
				  })
				: pagination
		);
	};

	const handleSortingChange = (updaterOrValue: Updater<SortingState> | SortingState) => {
		if (typeof updaterOrValue === "function") {
			// If updaterOrValue is a function, call it with the current sorting state
			tableStore.setSorting(updaterOrValue(tableStore.sorting));
		} else {
			// If updaterOrValue is a value, set it directly
			tableStore.setSorting(updaterOrValue);
		}
	};

	const table = useReactTable({
		columnResizeMode: "onChange",
		columns: columns,
		data: data,
		defaultColumn: defaultColumn,
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
				pageIndex: currentPage,
				pageSize: tableStore.pageSize,
			},
			sorting: tableStore.sorting,
			specialFilters: tableStore.specialFilters,
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
		onGlobalFilterChange: handleGlobalFilterChange,
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

	const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}));

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
	}, [tableStore]);

	return (
		<DataTableContext.Provider
			value={{
				table: table,
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
