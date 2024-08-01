import { Button, Popover, PopoverContent, PopoverTrigger, TableHead, TooltipWrapper } from "@narsil-ui/Components";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { flexRender } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { useTranslationsStore } from "@narsil-ui/Stores/translationStore";
import * as React from "react";

const DataTableHead = ({ columnOrder, header, setColumnOrder, ...props }: DataTableHeadProps) => {
	const { attributes, isDragging, listeners, setNodeRef, transform } = useSortable({
		id: header.column.id,
	});

	const style: React.CSSProperties = {
		opacity: isDragging ? 0.8 : 1,
		position: "relative",
		transform: CSS.Translate.toString(transform),
		transition: "width transform 0.2s ease-in-out",
		whiteSpace: "nowrap",
		width: header.column.getSize(),
		zIndex: isDragging ? 1 : 0,
	};

	const { trans } = useTranslationsStore();

	const reorderColumn = (draggedColumnId: string, targetColumnId: string) => {
		columnOrder.splice(
			columnOrder.indexOf(targetColumnId),
			0,
			columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
		);

		return [...columnOrder];
	};

	return (
		<TableHead
			ref={setNodeRef}
			className='relative overflow-hidden pl-1 pr-1.5'
			style={style}
			{...props}
		>
			<div
				{...attributes}
				{...listeners}
				className='flex items-center justify-between'
			>
				<Popover>
					<PopoverTrigger
						className='grow'
						asChild={true}
					>
						<Button variant='ghost'>
							{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
						</Button>
					</PopoverTrigger>
					<PopoverContent align='start'></PopoverContent>
				</Popover>

				{header.column.getCanSort() ? (
					<TooltipWrapper tooltip={trans("verbs.sort")}>
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

			<TooltipWrapper tooltip={trans("verbs.resize")}>
				<div
					className='absolute top-0 right-0 bottom-0 bg-border w-0.5 cursor-col-resize z-10'
					onMouseDown={header.getResizeHandler()}
					onTouchStart={header.getResizeHandler()}
				/>
			</TooltipWrapper>
		</TableHead>
	);
};

export default DataTableHead;
