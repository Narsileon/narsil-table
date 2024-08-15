import PaginationResult, { PaginationResultProps } from "@narsil-ui/Components/Pagination/PaginationResult";
import * as React from "react";

export interface DataTablePaginationResultProps extends Partial<PaginationResultProps> {
	collection: Collection;
}

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
