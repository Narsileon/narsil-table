import { DataTableCollection } from "@narsil-tables/Types";
import { useDataTableContext } from "./DataTableProvider";
import * as React from "react";
import Pagination, { PaginationProps } from "@narsil-ui/Components/Pagination/Pagination";

export interface DataTablePaginationProps extends Partial<PaginationProps> {
	collection: DataTableCollection;
}

const DataTablePagination = React.forwardRef<HTMLDivElement, DataTablePaginationProps>(
	({ collection, ...props }, ref) => {
		const { table, tableStore } = useDataTableContext();

		React.useEffect(() => {
			tableStore.setPageIndex(collection.meta.current_page);
		}, [collection.meta.current_page]);

		return (
			<Pagination
				currentPage={collection.meta.current_page}
				data={tableStore.getParams()}
				from={collection.meta.from}
				lastPage={collection.meta.last_page}
				links={collection.meta.links.slice(1, collection.meta.links.length - 1)}
				onPageSizeChange={(value) => table.setPageSize(Number(value))}
				pageSize={table.getState().pagination.pageSize}
				ref={ref}
				simpleLinks={collection.links}
				to={collection.meta.to}
				total={collection.meta.total}
				{...props}
			/>
		);
	}
);

export default DataTablePagination;
