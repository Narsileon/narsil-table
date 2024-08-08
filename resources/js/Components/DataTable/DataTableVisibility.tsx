import { Checkbox } from "@narsil-ui/Components";
import { isString, upperFirst } from "lodash";
import { useDataTable } from "@narsil-table/Components";

const DataTableVisiblity = ({}: DataTableVisibilityProps) => {
	const { table } = useDataTable();

	return (
		<>
			{table
				.getAllColumns()
				.filter((column) => column.getCanHide())
				.map((column) => {
					return (
						<Checkbox
							checked={column.getIsVisible()}
							onCheckedChange={(value: unknown) => column.toggleVisibility(!!value)}
							key={column.id}
						>
							{isString(column.columnDef.header) ? column.columnDef.header : upperFirst(column.id)}
						</Checkbox>
					);
				})}
		</>
	);
};

export default DataTableVisiblity;
