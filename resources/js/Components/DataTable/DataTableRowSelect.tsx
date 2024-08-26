import { Row } from "@tanstack/react-table";
import Checkbox, { CheckboxProps } from "@narsil-ui/Components/Checkbox/Checkbox";

export interface DataTableRowSelectProps extends Partial<CheckboxProps> {
	row: Row<any>;
}

const DataTableRowSelect = ({ row, ...props }: DataTableRowSelectProps) => {
	return (
		<div className='flex items-center'>
			<Checkbox
				checked={row.getIsSelected()}
				{...props}
			/>
		</div>
	);
};

export default DataTableRowSelect;
