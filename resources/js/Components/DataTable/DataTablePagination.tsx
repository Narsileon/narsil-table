import { useDataTable } from "./DataTableProvider";
import * as React from "react";
import Pagination, { PaginationProps } from "@narsil-ui/Components/Pagination/Pagination";

export interface DataTablePaginationProps extends Partial<PaginationProps> {
	collection: Collection;
}

const DataTablePagination = React.forwardRef<HTMLDivElement, DataTablePaginationProps>(
	({ collection, ...props }, ref) => {
		const { table, tableStore } = useDataTable();

		React.useEffect(() => {
			tableStore.setPageIndex(collection.meta.current_page);
		}, [collection.meta.current_page]);

		return (
			<Pagination
				currentPage={collection.meta.current_page}
				data={tableStore.getParams()}
				from={collection.meta.grouped_from ?? collection.meta.from}
				lastPage={collection.meta.lastPage}
				links={collection.meta.links}
				onPageSizeChange={(value) => table.setPageSize(Number(value))}
				pageSize={table.getState().pagination.pageSize}
				ref={ref}
				simpleLinks={collection.links}
				to={collection.meta.grouped_to ?? collection.meta.to}
				total={collection.meta.grouped_total ?? collection.meta.total}
				{...props}
			/>
		);
	}
);

export default DataTablePagination;
