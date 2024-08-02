import { omitBy } from "lodash";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
	columnFilters: any[];
	columnOperators: any[];
	columnOrder: string[];
	columnSizing: Record<string, number>;
	columnVisibility: Record<string, boolean>;
	expanded: Record<string, boolean>;
	globalFilter: string;
	grouping: any[];
	pageSize: number;
	sorting: any[];
	specialFilters: any[];
};

type Actions = {
	getParams: () => { [key: string]: any };
	setColumnFilters: (columnFilters: any[]) => void;
	setColumnOperators: (columnOperators: any[]) => void;
	setColumnOrder: (columnOrder: string[]) => void;
	setColumnSizing: (columnSizing: Record<string, number>) => void;
	setColumnVisibility: (columnVisibility: Record<string, boolean>) => void;
	setExpanded: (expanded: Record<string, boolean>) => void;
	setGlobalFilter: (globalFilter: string) => void;
	setGrouping: (grouping: any[]) => void;
	setSorting: (sorting: any[]) => void;
	setSpecialFilters: (specialFilters: any[]) => void;
	setPagination: (pagination: { pageIndex: number; pageSize: number }) => void;
};

const defaultState: State = {
	columnFilters: [],
	columnOperators: [],
	columnOrder: [],
	columnSizing: {},
	columnVisibility: {},
	expanded: {},
	globalFilter: "",
	grouping: [],
	pageSize: 10,
	sorting: [],
	specialFilters: [],
};

interface CreateTableStoreProps {
	id: string;
	initialState: Partial<State>;
}

const createTableStore = ({ id, initialState }: CreateTableStoreProps) =>
	create<State & Actions>()(
		persist(
			(set, get) => ({
				...defaultState,
				...initialState,
				getParams: () => {
					const params = {
						pageSize: get().pageSize,
						sorting: get().sorting,
					};
					const filteredParams = omitBy(
						params,
						(value) => value === null || (Array.isArray(value) && value.length === 0)
					);
					return filteredParams;
				},
				setColumnFilters: (columnFilters) => set({ columnFilters: columnFilters }),
				setColumnOperators: (columnOperators) => set({ columnOperators: columnOperators }),
				setColumnOrder: (columnOrder) => set({ columnOrder: columnOrder }),
				setColumnSizing: (columnSizing) => set({ columnSizing: columnSizing }),
				setColumnVisibility: (columnVisibility) => set({ columnVisibility: columnVisibility }),
				setExpanded: (expanded) => set({ expanded: expanded }),
				setGlobalFilter: (globalFilter) => set({ globalFilter: globalFilter }),
				setGrouping: (grouping) => set({ grouping: grouping }),
				setSorting: (sorting) => set({ sorting: sorting }),
				setSpecialFilters: (specialFilters) => set({ specialFilters: specialFilters }),
				setPagination: (pagination) => set({ pageSize: pagination.pageSize }),
			}),
			{
				name: `app:tables:${id}`,
				storage: createJSONStorage(() => localStorage),
			}
		)
	);

export default createTableStore;
