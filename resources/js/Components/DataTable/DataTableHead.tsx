import { ChevronDown, ChevronsUpDown, ChevronUp, GripVertical } from "lucide-react";
import { cn } from "@narsil-ui/Components";
import { CSS } from "@dnd-kit/utilities";
import { flexRender } from "@tanstack/react-table";
import { Header } from "@tanstack/react-table";
import { useDataTableContext } from "./DataTableProvider";
import { useSortable } from "@dnd-kit/sortable";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Button from "@narsil-ui/Components/Button/Button";
import DataTableColumnSearch from "./DataTableColumnSearch";
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

	const style: React.CSSProperties = {
		maxWidth: isMenu ? "68px" : header.column.getSize(),
		opacity: isDragging ? 0.8 : 1,
		position: "relative",
		transform: CSS.Translate.toString(transform),
		transition: "width transform 0.2s ease-in-out",
		whiteSpace: "nowrap",
		width: isMenu ? "56px" : header.column.getSize(),
		zIndex: isDragging ? 1 : 0,
	};

	return (
		<TableHead
			ref={setNodeRef}
			className='group relative px-0'
			style={style}
			{...props}
		>
			<div className='flex items-center justify-between pl-1 pr-2'>
				<Button
					className='w-6 min-w-6'
					size='icon'
					variant='ghost'
					{...attributes}
					{...listeners}
				>
					<GripVertical className='h-4 w-4' />
				</Button>
				<Popover>
					<TooltipWrapper tooltip={flexRender(header.column.columnDef.header, header.getContext())}>
						<PopoverTrigger asChild={true}>
							{!header.isPlaceholder && header.column.id !== "_menu" ? (
								<Button
									className={cn("block grow truncate px-2 text-left", {
										"text-primary":
											(header.column.getFilterValue() as any)?.firstFilter ||
											(header.column.getFilterValue() as any)?.secondFilter,
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
					<TooltipWrapper tooltip={trans("Sort")}>
						<Button
							className='w-6 min-w-6'
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
