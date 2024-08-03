import { Check, X } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { flexRender } from "@tanstack/react-table";
import { isBoolean } from "lodash";
import { TableCell } from "@narsil-ui/Components";
import { useSortable } from "@dnd-kit/sortable";
import { useTranslationsStore } from "@narsil-ui/Stores/translationStore";
import * as React from "react";
import moment from "moment/min/moment-with-locales";

const DataTableCell = ({ cell, grouping }: DataTableCellProps) => {
	const { locale } = useTranslationsStore();

	const { isDragging, setNodeRef, transform } = useSortable({
		id: cell.column.id,
	});

	const style: React.CSSProperties = {
		opacity: isDragging ? 0.8 : 1,
		position: "relative",
		transform: CSS.Translate.toString(transform),
		transition: "width transform 0.2s ease-in-out",
		width: cell.column.getSize(),
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
			className='truncate'
			style={style}
		>
			{isBoolean(value) ? (
				value ? (
					<Check className='w-5 h-5 text-constructive' />
				) : (
					<X className='w-5 h-5 text-destructive' />
				)
			) : ["datetime", "datetime-local", "timestamp"].includes(meta?.type ?? "") ? (
				moment(value)
					.locale(locale)
					.format(cell?.column.columnDef.meta?.format ?? "L LTS")
			) : isGrouped ? (
				`${value} (${count})`
			) : (
				flexRender(cell.column.columnDef.cell, cell.getContext())
			)}
		</TableCell>
	);
};

export default DataTableCell;
