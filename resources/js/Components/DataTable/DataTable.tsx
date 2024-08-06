import { DataTableCell, DataTableHead } from "@narsil-table/Components";
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { ScrollArea, Table, TableBody, TableCell, TableHeader, TableRow } from "@narsil-ui/Components";
import { useDataTable } from "@narsil-table/Components";
import { useTranslationsStore } from "@narsil-ui/Stores/translationStore";
import * as React from "react";

const DataTable = React.forwardRef<HTMLDivElement, DataTableProps>(({ ...props }, ref) => {
	const { table } = useDataTable();
	const { trans } = useTranslationsStore();

	return (
		<ScrollArea
			ref={ref}
			orientation='horizontal'
			{...props}
		>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								<SortableContext
									items={table.getState().columnOrder}
									strategy={horizontalListSortingStrategy}
								>
									{headerGroup.headers.map((header) => {
										return (
											<DataTableHead
												header={header}
												key={header.id}
											/>
										);
									})}
								</SortableContext>
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									<SortableContext
										items={table.getState().columnOrder}
										strategy={horizontalListSortingStrategy}
									>
										{row.getVisibleCells().map((cell) => (
											<DataTableCell
												cell={cell}
												grouping={table.getState().grouping}
												key={cell.id}
											/>
										))}
									</SortableContext>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={table.getAllColumns().length}
									className='h-24 text-center'
								>
									{trans("No results.")}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
		</ScrollArea>
	);
});

export default DataTable;
