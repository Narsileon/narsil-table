import { Button, cn, Popover, PopoverContent, PopoverTrigger, TableHead, TooltipWrapper } from "@narsil-ui/Components";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { flexRender } from "@tanstack/react-table";
import { useDataTable } from "@narsil-table/Components";
import { useSortable } from "@dnd-kit/sortable";
import { useTranslationsStore } from "@narsil-ui/Stores/translationStore";
import * as React from "react";
import DataTableColumnSearch from "./DataTableColumnSearch";

const DataTableHead = ({ header, ...props }: DataTableHeadProps) => {
	const { table } = useDataTable();

	const { attributes, isDragging, listeners, setNodeRef, transform } = useSortable({
		id: header.column.id,
	});

	const isMenu = header.column.id === "_menu";

	const style: React.CSSProperties = {
		maxWidth: isMenu ? "56px" : header.column.getSize(),
		opacity: isDragging ? 0.8 : 1,
		position: "relative",
		transform: CSS.Translate.toString(transform),
		transition: "width transform 0.2s ease-in-out",
		whiteSpace: "nowrap",
		width: isMenu ? "56px" : header.column.getSize(),
		zIndex: isDragging ? 1 : 0,
	};

	const { trans } = useTranslationsStore();

	return (
		<TableHead
			ref={setNodeRef}
			className='group relative px-0'
			style={style}
			{...props}
		>
			<div className='flex items-center justify-between pr-2'>
				<Popover>
					<PopoverTrigger asChild={true}>
						{!header.isPlaceholder && header.column.id !== "_menu" ? (
							<TooltipWrapper tooltip={flexRender(header.column.columnDef.header, header.getContext())}>
								<Button
									className='block grow truncate text-left'
									variant='ghost'
									{...attributes}
									{...listeners}
								>
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.header, header.getContext())}
								</Button>
							</TooltipWrapper>
						) : null}
					</PopoverTrigger>
					{header.column.getCanFilter() ? (
						<PopoverContent align='start'>
							<DataTableColumnSearch header={header} />
						</PopoverContent>
					) : null}
				</Popover>

				{header.column.getCanSort() ? (
					<TooltipWrapper tooltip={trans("Sort")}>
						<Button
							size='icon'
							variant='ghost'
							onClick={header.column.getToggleSortingHandler()}
						>
							{header.column.getIsSorted() === "asc" ? (
								<ChevronUp className='h-4 w-4' />
							) : header.column.getIsSorted() === "desc" ? (
								<ChevronDown className='h-4 w-4' />
							) : (
								<ChevronsUpDown className='h-4 w-4' />
							)}
						</Button>
					</TooltipWrapper>
				) : null}
			</div>

			{!isMenu ? (
				<TooltipWrapper tooltip={trans("Resize")}>
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
		</TableHead>
	);
};

export default DataTableHead;
