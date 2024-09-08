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
					<TooltipWrapper tooltip={trans("First page")}>
						<PaginationItem>
							<PaginationButton
								asChild={false}
								onClick={() => table.firstPage()}
								disabled={!table.getCanPreviousPage()}
							>
								<ChevronsLeft className='h-5 w-5' />
								<span className='sr-only'>{trans("First page")}</span>
							</PaginationButton>
						</PaginationItem>
					</TooltipWrapper>
					<TooltipWrapper tooltip={trans("Previous page")}>
						<PaginationItem>
							<PaginationButton
								asChild={false}
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
							>
								<ChevronLeft className='h-5 w-5' />
								<span className='sr-only'>{trans("Previous page")}</span>
							</PaginationButton>
						</PaginationItem>
					</TooltipWrapper>

					<TooltipWrapper tooltip={trans("Next page")}>
						<PaginationItem>
							<PaginationButton
								asChild={false}
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
							>
								<ChevronRight className='h-5 w-5' />
								<span className='sr-only'>{trans("Next page")}</span>
							</PaginationButton>
						</PaginationItem>
					</TooltipWrapper>
					<TooltipWrapper tooltip={trans("Last page")}>
						<PaginationItem>
							<PaginationButton
								asChild={false}
								onClick={() => table.lastPage()}
								disabled={!table.getCanNextPage()}
							>
								<ChevronsRight className='h-5 w-5' />
								<span className='sr-only'>{trans("Last page")}</span>
							</PaginationButton>
						</PaginationItem>
					</TooltipWrapper>
				</PaginationList>
			</Pagination>
		);
	}
);

export default DataTablePagination;
