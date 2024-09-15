import { Header } from "@tanstack/react-table";
import { SelectOption } from "@narsil-ui/Types";
import { TableCellType } from "@narsil-tables/Components/Table/TableCellRenderer";
import { useDataTableContext } from "./DataTableProvider";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Button from "@narsil-ui/Components/Button/Button";
import Card from "@narsil-ui/Components/Card/Card";
import CardContent from "@narsil-ui/Components/Card/CardContent";
import CardFooter from "@narsil-ui/Components/Card/CardFooter";
import CardHeader from "@narsil-ui/Components/Card/CardHeader";
import CardTitle from "@narsil-ui/Components/Card/CardTitle";
import Combobox from "@narsil-ui/Components/Combobox/Combobox";
import createDataTableColumnStore from "@narsil-tables/Stores/dataTableColumnStore";
import DataTableGroupButton from "./Buttons/DataTableGroupButton";
import DataTableSortButton from "./Buttons/DataTableSortButton";
import Input from "@narsil-ui/Components/Input/Input";
import Separator from "@narsil-ui/Components/Separator/Separator";

export interface DataTableColumnSearchProps {
	header: Header<any, any>;
}

const DataTableColumnSearch = ({ header }: DataTableColumnSearchProps) => {
	const { trans } = useTranslationsStore();

	const { table, tableStore } = useDataTableContext();

	const { options, type } = (() => {
		let options: SelectOption[] = [];
		let type: TableCellType = header.column.columnDef.meta?.type ?? "text";

		switch (header.column.columnDef.meta?.type) {
			case "array":
			case "json":
			case "object":
				options = [
					{
						label: trans("Contains"),
						value: "like",
					},
					{
						label: trans("Does not contain"),
						value: "not like",
					},
				];
				type = "text";
				break;
			case "boolean":
				options = [
					{
						label: trans("True"),
						value: 1,
					},
					{
						label: trans("False"),
						value: 0,
					},
				];
				break;
			case "color":
			case "icon":
			case "string":
			case "text":
			case "trans":
				options = [
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
				type = "text";
				break;
			case "date":
			case "datetime-local":
			case "time":
				options = [
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
				break;
			case "float":
			case "number":
			case "integer":
				options = [
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
				type = "number";
				break;
			default:
				break;
		}

		return { options, type };
	})();

	const useColumnStore = React.useMemo(
		() =>
			createDataTableColumnStore({
				initialState: {
					firstFilter: "",
					firstOperator: "",
					operator: "&&",
					secondFilter: "",
					secondOperator: "",
					...(header.column.getFilterValue() ?? {}),
				},
			}),
		[]
	);

	const columnStore = useColumnStore((state) => state);

	React.useEffect(() => {
		header.column.setFilterValue(columnStore.getValue());
	}, [columnStore]);

	return (
		<Card variant='inline'>
			<CardHeader>
				<CardTitle variant='h5'>{trans("Filters")}</CardTitle>
				<div className='flex items-center gap-x-2'>
					{table.options.enableSorting && header.column.getCanSort() ? (
						<DataTableSortButton header={header} />
					) : null}
					{table.options.enableGrouping && header.column.getCanGroup() ? (
						<DataTableGroupButton header={header} />
					) : null}
				</div>
			</CardHeader>
			<CardContent className='gap-y-2'>
				<Combobox
					value={columnStore.firstOperator}
					onChange={(value) => columnStore.setFirstOperator(value)}
					options={options}
				/>
				{type !== "boolean" ? (
					<>
						<Input
							type={type}
							value={columnStore.firstFilter}
							onChange={(event) => columnStore.setFirstFilter(event.target.value)}
						/>
						<Separator />
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
						<Separator />
						<Combobox
							value={columnStore.secondOperator}
							onChange={(value) => columnStore.setSecondOperator(value)}
							options={options}
						/>
						<Input
							type={type}
							value={columnStore.secondFilter}
							onChange={(event) => columnStore.setSecondFilter(event.target.value)}
						/>
					</>
				) : null}
			</CardContent>
			<CardFooter>
				<Button
					className='w-full'
					onClick={() => {
						columnStore.setFirstFilter("");
						columnStore.setSecondFilter("");

						tableStore.unsetColumnFilter(header.column.id);
					}}
				>
					{trans("Clear filters")}
				</Button>
			</CardFooter>
		</Card>
	);
};

export default DataTableColumnSearch;
