import { PaginationSelect } from "@narsil-ui/Components";
import { useDataTable } from "@narsil-table/Components";
import * as React from "react";

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
