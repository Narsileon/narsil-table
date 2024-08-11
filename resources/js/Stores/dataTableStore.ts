import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { isEmpty, omitBy } from "lodash";

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

function setfilteredColumnFilters(columnFilters: DataTableStoreState["columnFilters"]) {
	const filteredColumnFilters = columnFilters.filter((columnFilter) => {
		let filter = columnFilter.value as DataTableColumnStoreState;

		return !isEmpty(filter?.firstFilter) || !isEmpty(filter?.secondFilter);
	});

	const minimizedColumnFilters = filteredColumnFilters.map((columnFilter) => {
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

	return minimizedColumnFilters;
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
						columnFilters: get().filteredColumnFilters,
						pageSize: get().pageSize,
						sorting: get().sorting.reduce(
							(acc, { id, desc }) => {
								acc[id] = desc ? "desc" : "asc";
								return acc;
							},
							{} as Record<string, "asc" | "desc">
						),
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
						filteredColumnFilters: setfilteredColumnFilters(columnFilters),
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
			}),
			{
				name: `app:tables:${id}`,
				storage: createJSONStorage(() => localStorage),
			}
		)
	);

export default createDataTableStore;
