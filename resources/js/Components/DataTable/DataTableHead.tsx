import { cn } from "@narsil-ui/Components";
import { CSS } from "@dnd-kit/utilities";
import { flexRender } from "@tanstack/react-table";
import { Header } from "@tanstack/react-table";
import { useDataTableContext } from "./DataTableProvider";
import { useSortable } from "@dnd-kit/sortable";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Button from "@narsil-ui/Components/Button/Button";
import Checkbox from "@narsil-ui/Components/Checkbox/Checkbox";
import DataTableColumnSearch from "./DataTableColumnSearch";
import DataTableMoveColumnButton from "./Buttons/DataTableMoveColumnButton";
import DataTableSortButton from "./Buttons/DataTableSortButton";
import Popover from "@narsil-ui/Components/Popover/Popover";
import PopoverContent from "@narsil-ui/Components/Popover/PopoverContent";
import PopoverTrigger from "@narsil-ui/Components/Popover/PopoverTrigger";
import TableHead from "@narsil-ui/Components/Table/TableHead";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import useScreenStore from "@narsil-ui/Stores/screenStore";

export interface DataTableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
	header: Header<any, any>;
}

const DataTableHead = ({ header, ...props }: DataTableHeadProps) => {
	const { trans } = useTranslationsStore();

	const { isMobile } = useScreenStore();
	const { table } = useDataTableContext();

	const { attributes, isDragging, listeners, setNodeRef, transform } = useSortable({
		id: header.column.id,
	});

	const isMenu = header.column.id === "_menu";
	const isSelect = header.column.id === "_select";

	const style: React.CSSProperties = {
		maxWidth: isMenu || isSelect ? "3rem" : header.column.getSize(),
		opacity: isDragging ? 0.8 : 1,
		position: isMenu ? "sticky" : "relative",
		right: 0,
		transform: CSS.Translate.toString(transform),
		transition: "width transform 0.2s ease-in-out",
		width: isMenu || isSelect ? "3rem" : header.column.getSize(),
		zIndex: isDragging ? 1 : 0,
	};

	const sort = header.column.getIsSorted();

	return (
		<TableHead
			ref={setNodeRef}
			className={cn("group whitespace-nowrap px-0", { "bg-background rounded-md": isMenu })}
			aria-sort={sort === "asc" ? "ascending" : sort === "desc" ? "descending" : "none"}
			style={style}
			{...props}
		>
			{isSelect ? (
				<div className='flex items-center justify-center'>
					<Checkbox
						checked={table.getIsAllRowsSelected()}
						onCheckedChange={() => table.toggleAllRowsSelected()}
					/>
				</div>
			) : !isMenu ? (
				<>
					<div className='flex items-center justify-between pl-1 pr-2'>
						<DataTableMoveColumnButton
							attributes={attributes}
							listeners={listeners}
						/>
						<Popover>
							<TooltipWrapper tooltip={flexRender(header.column.columnDef.header, header.getContext())}>
								<PopoverTrigger
									disabled={!header.column.getCanFilter()}
									asChild={true}
								>
									{!header.isPlaceholder && header.column.id !== "_menu" ? (
										<Button
											className={cn("block grow truncate px-2 text-left", {
												"text-primary":
													(header.column.getFilterValue() as any)?.firstFilter ||
													(header.column.getFilterValue() as any)?.secondFilter ||
													header.column.getIsGrouped(),
											})}
											variant='ghost'
										>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</Button>
									) : null}
								</PopoverTrigger>
							</TooltipWrapper>
							{header.column.getCanFilter() ? (
								<PopoverContent align='start'>
									<DataTableColumnSearch header={header} />
								</PopoverContent>
							) : null}
						</Popover>
						{!isMobile && header.column.getCanSort() ? (
							<DataTableSortButton
								className='w-6 min-w-6'
								iconClassName='w-4 h-4'
								header={header}
							/>
						) : null}
					</div>

					{header.column.getCanResize() ? (
						<TooltipWrapper tooltip={trans("Resize column")}>
							<div
								className={cn(
									"bg-border absolute bottom-0 right-0 top-0 z-10 hidden w-1 cursor-col-resize group-hover:block",
									{
										"bg-primary pointer-events-none block": header.column.getIsResizing(),
									}
								)}
								onMouseDown={header.getResizeHandler()}
								onTouchStart={header.getResizeHandler()}
								style={{
									transform: header.column.getIsResizing()
										? `translateX(${1 * (table.getState().columnSizingInfo.deltaOffset ?? 0)}px)`
										: "",
								}}
							/>
						</TooltipWrapper>
					) : null}
				</>
			) : null}
		</TableHead>
	);
};

export default DataTableHead;
