import { Cell, flexRender } from "@tanstack/react-table";
import { cn } from "@narsil-ui/Components";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import * as React from "react";
import TableCell from "@narsil-ui/Components/Table/TableCell";
import TableCellRenderer from "@narsil-table/Components/Table/TableCellRenderer";

export interface DataTableCellProps {
	cell: Cell<any, any>;
	grouping?: Record<string, any>;
}

const DataTableCell = ({ cell, grouping }: DataTableCellProps) => {
	const { isDragging, setNodeRef, transform } = useSortable({
		id: cell.column.id,
	});

	const isMenu = cell.column.id === "_menu";
	const isSelect = cell.column.id === "_select";

	const style: React.CSSProperties = {
		maxWidth: isMenu || isSelect ? "49px" : cell.column.getSize(),
		opacity: isDragging ? 0.8 : 1,
		position: isMenu ? "sticky" : "relative",
		right: 0,
		transform: CSS.Translate.toString(transform),
		transition: "width transform 0.2s ease-in-out",
		width: isMenu || isSelect ? "49px" : cell.column.getSize(),
		zIndex: isDragging ? 1 : 0,
	};

	const { id, meta } = cell.column.columnDef;

	const value = cell.getValue();

	function getCount() {
		let values = grouping?.[id ?? ""];

		if (!values) {
			return 0;
		}

		if (meta?.type === "boolean") {
			return values[+value];
		} else {
			return values[value];
		}
	}

	let isGrouped: boolean = cell ? cell.row.getIsGrouped() && cell.column.getIsGrouped() : false;
	let count = cell ? getCount() : 0;

	if (cell && (cell.getIsPlaceholder() || cell.getIsAggregated())) {
		return null;
	}

	return (
		<TableCell
			ref={setNodeRef}
			className={cn("truncate", { "bg-background border-b px-1": isMenu })}
			style={style}
		>
			<TableCellRenderer
				className='h-10'
				defaultValue={flexRender(cell.column.columnDef.cell, cell.getContext())}
				type={meta?.type ?? "string"}
				value={cell.getValue()}
			/>
		</TableCell>
	);
};

export default DataTableCell;
