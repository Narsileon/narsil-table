import { Check, X } from "lucide-react";
import { cn } from "@narsil-ui/Components";
import { format } from "date-fns";
import { isArray, isBoolean, isObject } from "lodash";
import { useDatetimeLocale } from "@narsil-ui/Components/Input/Datetime/datetimeUtils";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
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
	formatString?: string;
	type: TableCellType;
	value: any[] | boolean | number | object | string;
}

const TableCellRenderer = ({ className, defaultValue, formatString, type, value }: TableCellRendererProps) => {
	if (isArray(value)) {
		return <span>{JSON.stringify(value)}</span>;
	}

	if (isBoolean(value)) {
		return value ? <Check className='text-constructive h-5 w-5' /> : <X className='text-destructive h-5 w-5' />;
	}

	if (isObject(value)) {
		return <span>{JSON.stringify(value)}</span>;
	}

	const { locale } = useTranslationsStore();

	const datetimeLocale = useDatetimeLocale(locale);

	switch (type) {
		case "date":
			return <span>{format(value, "P", { locale: datetimeLocale })}</span>;
		case "datetime-local":
			return <span>{format(value, "Pp", { locale: datetimeLocale })}</span>;
		case "text":
			return (
				<ScrollArea>
					<div className={cn("prose text-foreground max-w-none", className)}>{parse(`${value ?? ""}`)}</div>
				</ScrollArea>
			);
		case "time":
			return <span>{format(value, "p", { locale: datetimeLocale })}</span>;
		default:
			return <span>{(defaultValue as string) ?? value}</span>;
	}
};

export default TableCellRenderer;
