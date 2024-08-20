import { useDataTableContext } from "./DataTableProvider";
import * as React from "react";
import InputSearch, { InputSearchProps } from "@narsil-ui/Components/Input/InputSearch";

export interface DataTableSearchProps extends InputSearchProps {}

const DataTableSearch = React.forwardRef<HTMLDivElement, DataTableSearchProps>(({ ...props }, ref) => {
	const { tableStore } = useDataTableContext();

	return (
		<InputSearch
			ref={ref}
			value={tableStore.globalFilter}
			onChange={(event) => tableStore.setGlobalFilter(event.target.value)}
			{...props}
		/>
	);
});

export default DataTableSearch;
