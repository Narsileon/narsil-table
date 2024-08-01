import { Pagination } from "@narsil-ui/Components";
import * as React from "react";

const DataTablePagination = React.forwardRef<HTMLDivElement, DataTablePaginationProps>(
	({ collection, ...props }, ref) => {
		return (
			<Pagination
				ref={ref}
				currentPage={collection.meta.currentPage}
				lastPage={collection.meta.lastPage}
				links={collection.meta.links}
				simpleLinks={collection.links}
				{...props}
			/>
		);
	}
);

export default DataTablePagination;
