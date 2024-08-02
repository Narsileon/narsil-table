import { arrayMove } from "@dnd-kit/sortable";
import { createContext, useContext } from "react";
import { isString } from "lodash";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import React from "react";

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
	Table,
	TableState,
	useReactTable,
} from "@tanstack/react-table";
import { useLocalStorage } from "react-use";

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
	data: any[];
	id: string;
}

const DataTableContext = createContext<TableContextType | null>(null);

const DataTableProvider = ({ children, columns, data, id }: DataTableProviderProps) => {
	const localStorageKey = `app:tables:${id}`;

	function getColumnOrder(columns: ColumnDef<any, any>[]) {
		const columnOrder = columns.reduce((array: string[], column) => {
			if (!isString(column.id) || array.includes(column.id)) {
				return array;
			}

			return array.concat(column.id);
		}, []);

		return columnOrder;
	}

	const [tableCache, setTableCache] = useLocalStorage<Partial<TableState>>(localStorageKey);

	const [columnFilters, setColumnFilters] = React.useState(tableCache?.columnFilters ?? []);
	const [columnOperators, setColumnOperators] = React.useState(tableCache?.columnOperators ?? []);
	const [columnOrder, setColumnOrder] = React.useState(getColumnOrder(columns));
	const [columnSizing, setColumnSizing] = React.useState(tableCache?.columnSizing ?? {});
	const [columnVisibility, setColumnVisibility] = React.useState(tableCache?.columnVisibility ?? {});
	const [expanded, setExpanded] = React.useState(tableCache?.expanded ?? {});
	const [globalFilter, setGlobalFilter] = React.useState(tableCache?.globalFilter ?? "");
	const [grouping, setGrouping] = React.useState(tableCache?.grouping ?? []);
	const [sorting, setSorting] = React.useState(tableCache?.sorting ?? []);
	const [specialFilters, setSpecialFilters] = React.useState(tableCache?.specialFilters ?? []);

	const [pagination, setPagination] = React.useState(
		tableCache?.pagination ?? {
			pageIndex: 0,
			pageSize: 10,
		}
	);

	React.useEffect(() => {
		handleTableCacheChange("columnFilters", columnFilters);
	}, [columnFilters]);
	React.useEffect(() => {
		handleTableCacheChange("columnOrder", columnOrder);
	}, [columnOrder]);
	React.useEffect(() => {
		handleTableCacheChange("columnSizing", columnSizing);
	}, [columnSizing]);
	React.useEffect(() => {
		handleTableCacheChange("columnVisibility", columnVisibility);
	}, [columnVisibility]);
	React.useEffect(() => {
		handleTableCacheChange("grouping", grouping);
	}, [grouping]);
	React.useEffect(() => {
		handleTableCacheChange("sorting", sorting);
	}, [sorting]);

	const handleTableCacheChange = (key: keyof TableState, value: any) => {
		if (value) {
			setTableCache((previous) => ({
				...previous,
				[key]: value,
			}));
		}
	};

	const defaultColumn = {
		minSize: 100,
	};

	const table = useReactTable({
		columnResizeMode: "onChange",
		columns: columns,
		data: data,
		defaultColumn: defaultColumn,
		state: {
			columnFilters: columnFilters,
			columnOperators: columnOperators,
			columnOrder: columnOrder,
			columnSizing: columnSizing,
			columnVisibility: columnVisibility,
			expanded: expanded,
			globalFilter: globalFilter,
			grouping: grouping,
			pagination: pagination,
			sorting: sorting,
			specialFilters: specialFilters,
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
		onColumnFiltersChange: setColumnFilters,
		onColumnOrderChange: setColumnOrder,
		onColumnSizingChange: setColumnSizing,
		onColumnVisibilityChange: setColumnVisibility,
		onExpandedChange: setExpanded,
		onGlobalFilterChange: setGlobalFilter,
		onGroupingChange: setGrouping,
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
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
