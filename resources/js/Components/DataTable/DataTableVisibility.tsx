import { isString, upperFirst } from "lodash";
import { useDataTableContext } from "./DataTableProvider";
import Checkbox from "@narsil-ui/Components/Checkbox/Checkbox";

export interface DataTableVisibilityProps {}

const DataTableVisiblity = ({}: DataTableVisibilityProps) => {
	const { table } = useDataTableContext();

	return (
		<div className='grid'>
			{table
				.getAllColumns()
				.filter((column) => column.getCanHide())
				.map((column) => {
					return (
						<div
							className='flex items-center gap-x-2'
							key={column.id}
						>
							<Checkbox
								id={column.id}
								checked={column.getIsVisible()}
								onCheckedChange={(value: unknown) => column.toggleVisibility(!!value)}
							/>
							<label htmlFor={column.id}>
								{isString(column.columnDef.header) ? column.columnDef.header : upperFirst(column.id)}
							</label>
						</div>
					);
				})}
		</div>
	);
};

export default DataTableVisiblity;
