import { create } from "zustand";

export type DataTableColumnStoreState = {
	firstFilter: any;
	firstOperator: any;
	operator: any;
	secondFilter: any;
	secondOperator: any;
};

export type DataTableColumnStoreActions = {
	getValue: () => DataTableColumnStoreState;
	setFirstFilter: (firstFilter: any) => void;
	setFirstOperator: (firstOperator: any) => void;
	setOperator: (operator: any) => void;
	setSecondFilter: (secondFilter: any) => void;
	setSecondOperator: (secondOperator: any) => void;
};

export type DataTableColumnStoreType = DataTableColumnStoreState & DataTableColumnStoreActions;

export interface CreateDataTableColumnStoreProps {
	initialState: Partial<DataTableColumnStoreState>;
}

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
