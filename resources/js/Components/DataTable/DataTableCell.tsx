import { Cell, flexRender } from "@tanstack/react-table";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import * as React from "react";
import TableCell from "@narsil-ui/Components/Table/TableCell";
import TableCellRenderer from "@narsil-tables/Components/Table/TableCellRenderer";
import { cn } from "@narsil-ui/Components";

export interface DataTableCellProps {
	cell: Cell<any, any>;
	groupingCounts?: Record<string, any>;
}

const DataTableCell = ({ cell, groupingCounts }: DataTableCellProps) => {
	const { isDragging, setNodeRef, transform } = useSortable({
		id: cell.column.id,
	});

	const isMenu = cell.column.id === "_menu";
	const isSelect = cell.column.id === "_select";

	const style: React.CSSProperties = {
		maxWidth: isMenu || isSelect ? "3rem" : cell.column.getSize(),
		opacity: isDragging ? 0.8 : 1,
		position: isMenu ? "sticky" : "relative",
		right: 0,
		transform: CSS.Translate.toString(transform),
		transition: "width transform 0.2s ease-in-out",
		width: isMenu || isSelect ? "3rem" : cell.column.getSize(),
		zIndex: isDragging ? 1 : 0,
	};

	const { meta } = cell.column.columnDef;

	const value = cell.getValue();

	if (cell && value !== undefined && (cell.getIsPlaceholder() || cell.getIsAggregated())) {
		return <TableCell />;
	}

	return (
		<TableCell
			ref={setNodeRef}
			className={cn(
				"[&:has([role=checkbox])]:pl-2",
				isMenu ? "bg-background rounded-md px-1" : isSelect ? "px-1" : "truncate"
			)}
			style={style}
		>
			<TableCellRenderer
				className='max-h-10'
				defaultValue={flexRender(cell.column.columnDef.cell, cell.getContext())}
				type={meta?.type ?? "string"}
				value={value}
			/>
			{cell.getIsGrouped() ? <span>{` (${groupingCounts?.[value]})`}</span> : null}
		</TableCell>
	);
};

export default DataTableCell;
