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
	| "text"
	| "time";

interface TableCellRendererProps {
	className?: string;
	defaultValue?: array | boolean | number | object | string | React.ReactNode;
	format?: string;
	type: TableCellType;
	value: array | boolean | number | object | string;
}
