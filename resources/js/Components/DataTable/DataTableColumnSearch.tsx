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
			case "json":
			case "object":
				return [
					{
						label: trans("Contains"),
						value: "like",
					},
					{
						label: trans("Does not contain"),
						value: "not like",
					},
				];
			case "boolean":
				return [
					{
						label: trans("True"),
						value: 1,
					},
					{
						label: trans("False"),
						value: 0,
					},
				];
			case "color":
			case "icon":
			case "string":
			case "text":
				return [
					{
						label: trans("Contains"),
						value: "like",
					},
					{
						label: trans("Does not contain"),
						value: "not like",
					},
					{
						label: trans("Starts with"),
						value: "start",
					},
					{
						label: trans("Ends with"),
						value: "end",
					},
				];
			case "date":
			case "datetime-local":
			case "time":
				return [
					{
						label: trans("Equal to"),
						value: "like",
					},
					{
						label: trans("Not equal to"),
						value: "not like",
					},
					{
						label: trans("Before"),
						value: "<",
					},
					{
						label: trans("Before or equal to"),
						value: "<=",
					},
					{
						label: trans("After or equal to"),
						value: ">=",
					},
					{
						label: trans("After"),
						value: ">",
					},
				];
			case "number":
				return [
					{
						label: trans("Equal to"),
						value: "like",
					},
					{
						label: trans("Not equal to"),
						value: "not like",
					},
					{
						label: trans("Less than"),
						value: "<",
					},
					{
						label: trans("Less than or equal to"),
						value: "<=",
					},
					{
						label: trans("Greater than or equal to"),
						value: ">=",
					},
					{
						label: trans("Greater than"),
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
							label: trans("And"),
							value: "&&",
						},
						{
							label: trans("Or"),
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
