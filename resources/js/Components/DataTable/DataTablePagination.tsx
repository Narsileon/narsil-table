import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { DataTableCollection } from "@narsil-tables/Types";
import { useDataTableContext } from "./DataTableProvider";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import CollectionPagination from "@narsil-ui/Components/Pagination/CollectionPagination";
import Pagination from "@narsil-ui/Components/Pagination/Pagination";
import PaginationButton from "@narsil-ui/Components/Pagination/PaginationButton";
import PaginationItem from "@narsil-ui/Components/Pagination/PaginationItem";
import PaginationList from "@narsil-ui/Components/Pagination/PaginationList";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { PaginationProps } from "@narsil-ui/Components/Pagination/Pagination";

export interface DataTablePaginationProps extends Partial<PaginationProps> {
	collection?: DataTableCollection | undefined;
}

const DataTablePagination = React.forwardRef<HTMLDivElement, DataTablePaginationProps>(
	({ collection, ...props }, ref) => {
		const { trans } = useTranslationsStore();

		const firstPageLabel = trans("First page");
		const lastPageLabel = trans("Last page");
		const nextPageLabel = trans("Next page");
		const previousPageLabel = trans("Previous page");

		const { table, tableStore } = useDataTableContext();

		React.useEffect(() => {
			if (collection) {
				tableStore.setPageIndex(collection.meta.current_page);
			}
		}, [collection?.meta.current_page]);

		return collection ? (
			<CollectionPagination
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
		) : (
			<Pagination>
				<PaginationList>
					<TooltipWrapper tooltip={firstPageLabel}>
						<PaginationItem>
							<PaginationButton
								asChild={false}
								aria-label={firstPageLabel}
								disabled={!table.getCanPreviousPage()}
								onClick={() => table.firstPage()}
							>
								<ChevronsLeft className='h-5 w-5' />
							</PaginationButton>
						</PaginationItem>
					</TooltipWrapper>
					<TooltipWrapper tooltip={previousPageLabel}>
						<PaginationItem>
							<PaginationButton
								asChild={false}
								aria-label={previousPageLabel}
								disabled={!table.getCanPreviousPage()}
								onClick={() => table.previousPage()}
							>
								<ChevronLeft className='h-5 w-5' />
							</PaginationButton>
						</PaginationItem>
					</TooltipWrapper>

					<TooltipWrapper tooltip={nextPageLabel}>
						<PaginationItem>
							<PaginationButton
								asChild={false}
								aria-label={nextPageLabel}
								disabled={!table.getCanNextPage()}
								onClick={() => table.nextPage()}
							>
								<ChevronRight className='h-5 w-5' />
							</PaginationButton>
						</PaginationItem>
					</TooltipWrapper>
					<TooltipWrapper tooltip={lastPageLabel}>
						<PaginationItem>
							<PaginationButton
								asChild={false}
								aria-label={lastPageLabel}
								disabled={!table.getCanNextPage()}
								onClick={() => table.lastPage()}
							>
								<ChevronsRight className='h-5 w-5' />
							</PaginationButton>
						</PaginationItem>
					</TooltipWrapper>
				</PaginationList>
			</Pagination>
		);
	}
);

export default DataTablePagination;
