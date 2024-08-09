import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { omitBy } from "lodash";

const defaultState: TableStoreState = {
	columnFilters: [],
	columnOperators: [],
	columnOrder: [],
	columnSizing: {},
	columnVisibility: {},
	expanded: {},
	globalFilter: "",
	grouping: [],
	pageIndex: 0,
	pageSize: 10,
	quickFilters: [],
	sorting: [],
};

const createTableStore = ({ id, initialState }: CreateTableStoreProps) =>
	create<TableStoreType>()(
		persist(
			(set, get) => ({
				...defaultState,
				...initialState,
				getParams: () => {
					const params = {
						globalFilter: get().globalFilter,
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

export default createTableStore;
