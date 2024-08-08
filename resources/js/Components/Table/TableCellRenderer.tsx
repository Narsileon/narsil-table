import { Check, X } from "lucide-react";
import { isArray, isBoolean, isObject } from "lodash";
import { cn, ScrollArea } from "@narsil-ui/Components";
import { useTranslationsStore } from "@narsil-ui/Stores/translationStore";
import moment from "moment/min/moment-with-locales";
import parse from "html-react-parser";

const TableCellRenderer = ({ className, defaultValue, format, type, value }: TableCellRendererProps) => {
	const { locale } = useTranslationsStore();

	if (isArray(value)) {
		return JSON.stringify(value);
	}

	if (isBoolean(value)) {
		return value ? <Check className='text-constructive h-5 w-5' /> : <X className='text-destructive h-5 w-5' />;
	}

	if (isObject(value)) {
		return JSON.stringify(value);
	}

	switch (type) {
		case "date":
			return moment(value)
				.locale(locale)
				.format(format ?? "L");
		case "datetime-local":
			return moment(value)
				.locale(locale)
				.format(format ?? "L LTS");
		case "text":
			return (
				<ScrollArea>
					<div className={cn("prose text-foreground max-w-none", className)}>{parse(value ?? "")}</div>
				</ScrollArea>
			);
		case "time":
			return moment(value, ["h:m:s"])
				.locale(locale)
				.format(format ?? "LTS");
		default:
			return defaultValue ?? value;
	}
};

export default TableCellRenderer;
