import { create } from "zustand";

const defaultState: DataTableColumnStoreState = {
	firstFilter: null,
	firstOperator: null,
	operator: null,
	secondFilter: null,
	secondOperator: null,
};

const createDataTableColumnStore = ({ initialState }: CreateDataTableColumnStoreProps) =>
	create<DataTableColumnStoreType>()((set, get) => ({
		...defaultState,
		...initialState,
		clear: () => set(defaultState),
		setFirstFilter: (firstFilter) =>
			set({
				firstFilter: firstFilter,
			}),
		setFirstOperator: (firstOperator) =>
			set({
				firstOperator: firstOperator,
			}),
		setOperator: (operator) =>
			set({
				operator: operator,
			}),
		setSecondFilter: (secondFilter) =>
			set({
				secondFilter: secondFilter,
			}),
		setSecondOperator: (secondOperator) =>
			set({
				secondOperator: secondOperator,
			}),
	}));

export default createDataTableColumnStore;
