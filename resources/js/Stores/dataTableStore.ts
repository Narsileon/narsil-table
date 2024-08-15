import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DataTableColumnStoreState } from "./dataTableColumnStore";
import { isEmpty, omitBy } from "lodash";

export type DataTableStoreState = {
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

export type DataTableStoreActions = {
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
	unsetColumnFilter: (id: string) => void;
};

export type DataTableStoreType = DataTableStoreState & DataTableStoreActions;

export interface CreateDataTableStoreProps {
	id: string;
	initialState: Partial<DataTableStoreState>;
}

const defaultState: DataTableStoreState = {
	columnFilters: [],
	columnOperators: [],
	columnOrder: [],
	columnSizing: {},
	columnVisibility: {},
	expanded: {},
	globalFilter: "",
	grouping: [],
	filteredColumnFilters: [],
	pageIndex: 0,
	pageSize: 10,
	quickFilters: [],
	sorting: [],
};

function filterColumnFilters(columnFilters: DataTableStoreState["columnFilters"]) {
	return columnFilters.filter((columnFilter) => {
		let filter = columnFilter.value as DataTableColumnStoreState;

		return !isEmpty(filter?.firstFilter) || !isEmpty(filter?.secondFilter);
	});
}

function formatColumFilters(columnFilters: DataTableStoreState["columnFilters"]) {
	return columnFilters.reduce(
		(acc, { id, value }) => {
			acc[id] = value;
			return acc;
		},
		{} as Record<string, unknown>
	);
}

function formatSorting(sorting: DataTableStoreState["sorting"]) {
	return sorting.reduce(
		(acc, { id, desc }) => {
			acc[id] = desc ? "desc" : "asc";
			return acc;
		},
		{} as Record<string, "asc" | "desc">
	);
}

function minimizeColumnFilters(columnFilters: DataTableStoreState["columnFilters"]) {
	return columnFilters.map((columnFilter) => {
		let filter = columnFilter.value as DataTableColumnStoreState;

		if (isEmpty(filter?.firstFilter) || isEmpty(filter?.secondFilter)) {
			filter = {
				...filter,
				operator: null,
			};
		}

		return {
			...columnFilter,
			value: omitBy(filter, (value) => isEmpty(value)),
		};
	});
}

function removeColumnFilter(columnFilters: DataTableStoreState["columnFilters"], id: string) {
	return columnFilters.filter((columnFilter) => {
		return columnFilter.id !== id;
	});
}

const createDataTableStore = ({ id, initialState }: CreateDataTableStoreProps) =>
	create<DataTableStoreType>()(
		persist(
			(set, get) => ({
				...defaultState,
				...initialState,
				getParams: () => {
					const params = {
						globalFilter: get().globalFilter,
						columnFilters: formatColumFilters(get().filteredColumnFilters),
						pageSize: get().pageSize,
						sorting: formatSorting(get().sorting),
					};

					const filteredParams = omitBy(
						params,
						(value) => value === null || (Array.isArray(value) && value.length === 0)
					);

					return filteredParams;
				},
				setColumnFilters: (columnFilters) =>
					set({
						columnFilters: columnFilters,
						filteredColumnFilters: minimizeColumnFilters(filterColumnFilters(columnFilters)),
					}),
				setColumnOperators: (columnOperators) =>
					set({
						columnOperators: columnOperators,
					}),
				setColumnOrder: (columnOrder) =>
					set({
						columnOrder: columnOrder,
					}),
				setColumnSizing: (columnSizing) =>
					set({
						columnSizing: columnSizing,
					}),
				setColumnVisibility: (columnVisibility) =>
					set({
						columnVisibility: columnVisibility,
					}),
				setExpanded: (expanded) =>
					set({
						expanded: expanded,
					}),
				setGlobalFilter: (globalFilter) =>
					set({
						globalFilter: globalFilter,
					}),
				setGrouping: (grouping) =>
					set({
						grouping: grouping,
					}),
				setPageIndex: (pageIndex) =>
					set({
						pageIndex: pageIndex,
					}),
				setPageSize: (pageSize) =>
					set({
						pageSize: pageSize,
					}),
				setPagination: (pagination) =>
					set({
						pageIndex: pagination.pageIndex,
						pageSize: pagination.pageSize,
					}),
				setQuickFilters: (quickFilters) =>
					set({
						quickFilters: quickFilters,
					}),
				setSorting: (sorting) =>
					set({
						sorting: sorting,
					}),
				unsetColumnFilter: (id) =>
					set({
						columnFilters: removeColumnFilter(get().columnFilters, id),
					}),
			}),
			{
				name: `app:tables:${id}`,
				storage: createJSONStorage(() => localStorage),
			}
		)
	);

export default createDataTableStore;
