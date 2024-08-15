import { useDataTable } from "./DataTableProvider";
import * as React from "react";
import Pagination, { PaginationProps } from "@narsil-ui/Components/Pagination/Pagination";

export interface DataTablePaginationProps extends Partial<PaginationProps> {
	collection: Collection;
}

const DataTablePagination = React.forwardRef<HTMLDivElement, DataTablePaginationProps>(
	({ collection, ...props }, ref) => {
		const { tableStore } = useDataTable();

		React.useEffect(() => {
			tableStore.setPageIndex(collection.meta.current_page);
		}, [collection.meta.current_page]);

		return (
			<Pagination
				ref={ref}
				currentPage={collection.meta.current_page}
				data={tableStore.getParams()}
				lastPage={collection.meta.lastPage}
				links={collection.meta.links}
				simpleLinks={collection.links}
				{...props}
			/>
		);
	}
);

export default DataTablePagination;
