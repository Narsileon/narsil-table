import { PaginationResult } from "@narsil-ui/Components";
import * as React from "react";

const DataTablePaginationResult = React.forwardRef<HTMLDivElement, DataTablePaginationResultProps>(
	({ collection, ...props }, ref) => {
		return (
			<PaginationResult
				ref={ref}
				from={collection.meta.grouped_from ?? collection.meta.from}
				to={collection.meta.grouped_to ?? collection.meta.to}
				total={collection.meta.grouped_total ?? collection.meta.total}
				{...props}
			/>
		);
	}
);

export default DataTablePaginationResult;
