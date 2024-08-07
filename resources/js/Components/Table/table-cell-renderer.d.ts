type TableCellType =
	| "array"
	| "boolean"
	| "color"
	| "date"
	| "datetime-local"
	| "icon"
	| "image"
	| "number"
	| "object"
	| "string"
	| "time";

interface TableCellRendererProps {
	format?: string;
	type: TableCellType;
	value: array | boolean | number | object | string;
}
