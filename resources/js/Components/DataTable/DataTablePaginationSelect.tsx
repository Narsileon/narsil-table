import { useDataTable } from "./DataTableProvider";
import PaginationSelect, { PaginationSelectProps } from "@narsil-ui/Components/Pagination/PaginationSelect";
import * as React from "react";

export interface DataTablePaginationSelectProps extends Partial<PaginationSelectProps> {}

const DataTablePaginationSelect = React.forwardRef<HTMLDivElement, DataTablePaginationSelectProps>(
	({ ...props }, ref) => {
		const { table } = useDataTable();

		return (
			<PaginationSelect
				ref={ref}
				value={table.getState().pagination.pageSize}
				onValueChange={(value) => table.setPageSize(Number(value))}
				{...props}
			/>
		);
	}
);

export default DataTablePaginationSelect;
