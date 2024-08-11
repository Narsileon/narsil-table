import { create } from "zustand";

const defaultState: DataTableColumnStoreState = {
	firstFilter: "",
	firstOperator: "",
	operator: "",
	secondFilter: "",
	secondOperator: "",
};

const createDataTableColumnStore = ({ initialState }: CreateDataTableColumnStoreProps) =>
	create<DataTableColumnStoreType>()((set, get) => ({
		...defaultState,
		...initialState,
		clear: () => set(defaultState),
		getValue: () => {
			return {
				firstFilter: get().firstFilter,
				firstOperator: get().firstOperator,
				operator: get().operator,
				secondFilter: get().secondFilter,
				secondOperator: get().secondOperator,
			};
		},
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
