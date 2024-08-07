import { Check, X } from "lucide-react";
import { isArray, isBoolean, isObject } from "lodash";
import { useTranslationsStore } from "@narsil-ui/Stores/translationStore";
import moment from "moment/min/moment-with-locales";
import parse from "html-react-parser";

const TableCellRenderer = ({ defaultValue, format, type, value }: TableCellRendererProps) => {
	const { locale } = useTranslationsStore();

	if (isArray(value)) {
		return value[0] ?? null;
	}

	if (isBoolean(value)) {
		return value ? <Check className='text-constructive h-5 w-5' /> : <X className='text-destructive h-5 w-5' />;
	}

	if (isObject(value)) {
		return Object.entries(value)[0] ? (
			<div className='flex items-center gap-x-1'>
				<span className='font-medium'>{Object.keys(value)[0]}:</span>
				<span>{Object.values(value)[0]}</span>
			</div>
		) : null;
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
			return <div className='prose max-w-none'>{parse(value ?? "")}</div>;
		case "time":
			return moment(value, ["h:m:s"])
				.locale(locale)
				.format(format ?? "LTS");
		default:
			return defaultValue ?? value;
	}
};

export default TableCellRenderer;
