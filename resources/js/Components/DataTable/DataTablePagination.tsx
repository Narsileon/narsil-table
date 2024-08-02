import { Pagination } from "@narsil-ui/Components";
import { useDataTable } from "@narsil-table/Components";
import * as React from "react";

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
