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
	sorting: any[];
	specialFilters: any[];
	pagination: {
		pageIndex: number;
		pageSize: number;
	};
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
	pagination: {
		pageIndex: 0,
		pageSize: 10,
	},
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
						pagination: get().pagination,
						sorting: get().sorting,
					};
					const filteredParams = omitBy(
						params,
						(value) => value === null || (Array.isArray(value) && value.length === 0)
					);
					return filteredParams;
				},
				setColumnFilters: (columnFilters) => set({ columnFilters }),
				setColumnOperators: (columnOperators) => set({ columnOperators }),
				setColumnOrder: (columnOrder) => set({ columnOrder }),
				setColumnSizing: (columnSizing) => set({ columnSizing }),
				setColumnVisibility: (columnVisibility) => set({ columnVisibility }),
				setExpanded: (expanded) => set({ expanded }),
				setGlobalFilter: (globalFilter) => set({ globalFilter }),
				setGrouping: (grouping) => set({ grouping }),
				setSorting: (sorting) => set({ sorting }),
				setSpecialFilters: (specialFilters) => set({ specialFilters }),
				setPagination: (pagination) => set({ pagination }),
			}),
			{
				name: `app:tables:${id}`,
				storage: createJSONStorage(() => localStorage),
			}
		)
	);

export default createTableStore;
