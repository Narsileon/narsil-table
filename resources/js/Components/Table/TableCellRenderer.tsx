import { Check, X } from "lucide-react";
import { isArray, isBoolean, isObject } from "lodash";
import { cn } from "@narsil-ui/Components";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import moment from "moment/min/moment-with-locales";
import parse from "html-react-parser";
import ScrollArea from "@narsil-ui/Components/ScrollArea/ScrollArea";

export type TableCellType =
	| "array"
	| "boolean"
	| "color"
	| "date"
	| "datetime-local"
	| "float"
	| "icon"
	| "integer"
	| "image"
	| "json"
	| "number"
	| "object"
	| "string"
	| "text"
	| "time";

export interface TableCellRendererProps {
	className?: string;
	defaultValue?: any[] | boolean | number | object | string | React.ReactNode;
	format?: string;
	type: TableCellType;
	value: any[] | boolean | number | object | string;
}

const TableCellRenderer = ({ className, defaultValue, format, type, value }: TableCellRendererProps) => {
	const { locale } = useTranslationsStore();

	if (isArray(value)) {
		return <span>{JSON.stringify(value)}</span>;
	}

	if (isBoolean(value)) {
		return value ? <Check className='text-constructive h-5 w-5' /> : <X className='text-destructive h-5 w-5' />;
	}

	if (isObject(value)) {
		return <span>{JSON.stringify(value)}</span>;
	}

	switch (type) {
		case "date":
			return (
				<span>
					{moment(value)
						.locale(locale)
						.format(format ?? "L")}
				</span>
			);
		case "datetime-local":
			return (
				<span>
					{moment(value)
						.locale(locale)
						.format(format ?? "L LTS")}
				</span>
			);
		case "text":
			return (
				<ScrollArea>
					<div className={cn("prose text-foreground max-w-none", className)}>{parse(`${value ?? ""}`)}</div>
				</ScrollArea>
			);
		case "time":
			return (
				<span>
					{moment(value, ["h:m:s"])
						.locale(locale)
						.format(format ?? "LTS")}
				</span>
			);
		default:
			return <span>{(defaultValue as string) ?? value}</span>;
	}
};

export default TableCellRenderer;
