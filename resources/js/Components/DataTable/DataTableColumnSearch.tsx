import { Combobox } from "@narsil-ui/Components";
import { Input } from "@narsil-forms/Components";
import { useTranslationsStore } from "@narsil-ui/Stores/translationStore";
import * as React from "react";
import createDataTableColumnStore from "@narsil-table/Stores/dataTableColumnStore";

const DataTableColumnSearch = ({ header }: DataTableColumnSearchProps) => {
	const { trans } = useTranslationsStore();

	const columnFilterValue = header.column.getFilterValue();

	console.log(columnFilterValue);

	const options = (() => {
		switch (header.column.columnDef.meta?.type) {
			case "array":
			case "object":
				return [
					{
						label: trans("filters.contains"),
						value: "like",
					},
					{
						label: trans("filters.contains_not"),
						value: "not like",
					},
				];
			case "boolean":
				return [
					{
						label: trans("filters.true"),
						value: 1,
					},
					{
						label: trans("filters.false"),
						value: 0,
					},
				];
			case "color":
			case "icon":
			case "string":
			case "text":
				return [
					{
						label: trans("filters.contains"),
						value: "like",
					},
					{
						label: trans("filters.contains_not"),
						value: "not like",
					},
					{
						label: trans("filters.start_with"),
						value: "start",
					},
					{
						label: trans("filters.end_with"),
						value: "end",
					},
				];
			case "date":
			case "datetime-local":
			case "time":
				return [
					{
						label: trans("filters.equal"),
						value: "like",
					},
					{
						label: trans("filters.equal_not"),
						value: "not like",
					},
					{
						label: trans("filters.before"),
						value: "<",
					},
					{
						label: trans("filters.before_or_equal"),
						value: "<=",
					},
					{
						label: trans("filters.after_or_equal"),
						value: ">=",
					},
					{
						label: trans("filters.after"),
						value: ">",
					},
				];
			case "number":
				return [
					{
						label: trans("filters.equal"),
						value: "like",
					},
					{
						label: trans("filters.equal_not"),
						value: "not like",
					},
					{
						label: trans("filters.less"),
						value: "<",
					},
					{
						label: trans("filters.less_or_equal"),
						value: "<=",
					},
					{
						label: trans("filters.greater_or_equal"),
						value: ">=",
					},
					{
						label: trans("filters.greater"),
						value: ">",
					},
				];
			default:
				return [];
		}
	})();

	const useColumnStore = React.useMemo(
		() =>
			createDataTableColumnStore({
				initialState: {},
			}),
		[]
	);

	const columnStore = useColumnStore((state) => state);

	return (
		<section className='space-y-2 font-normal'>
			<div className='flex items-center justify-between'>
				<h1 className='text-left font-semibold'>{trans("Filters")}</h1>
			</div>

			<hr />

			<div className='space-y-2'>
				(
				<Combobox
					value={columnStore.firstOperator}
					onChange={(value) => columnStore.setFirstOperator(value)}
					options={options}
				/>
				<Input
					value={columnStore.firstFilter}
					onChange={(event) => columnStore.setFirstFilter(event.target.value)}
				/>
				<hr />
				<Combobox
					value={columnStore.operator}
					onChange={(value) => columnStore.setOperator(value)}
					options={[
						{
							label: trans("filters.and"),
							value: "&&",
						},
						{
							label: trans("filters.or"),
							value: "||",
						},
					]}
				/>
				<hr />
				<Input
					value={columnStore.secondFilter}
					onChange={(event) => columnStore.setSecondFilter(event.target.value)}
				/>
				<Combobox
					value={columnStore.secondOperator}
					onChange={(value) => columnStore.setSecondOperator(value)}
					options={options}
				/>
				)
			</div>

			<hr />
		</section>
	);
};

export default DataTableColumnSearch;
