type DataTableColumnStoreState = {
	firstFilter: any;
	firstOperator: any;
	operator: any;
	secondFilter: any;
	secondOperator: any;
};

type DataTableColumnStoreActions = {
	getValue: () => DataTableColumnStoreState;
	setFirstFilter: (firstFilter: any) => void;
	setFirstOperator: (firstOperator: any) => void;
	setOperator: (any) => void;
	setSecondFilter: (secondFilter: any) => void;
	setSecondOperator: (secondOperator: any) => void;
};

type DataTableColumnStoreType = DataTableColumnStoreState & DataTableColumnStoreActions;

interface CreateDataTableColumnStoreProps {
	initialState: Partial<DataTableColumnStoreState>;
}
