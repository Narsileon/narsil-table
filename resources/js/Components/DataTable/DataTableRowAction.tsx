import { Row } from "@tanstack/react-table";
import Checkbox from "@narsil-ui/Components/Checkbox/Checkbox";
import DataTableRowExtandButton from "./Buttons/DataTableRowExtandButton";
import type { ButtonProps } from "@narsil-ui/Components/Button/Button";

export interface DataTableRowActionProps extends Partial<ButtonProps> {
	row: Row<any>;
}

const DataTableRowAction = ({ row, ...props }: DataTableRowActionProps) => {
	return row.getCanExpand() ? (
		<DataTableRowExtandButton row={row} />
	) : (
		<div className='flex items-center pl-2'>
			<Checkbox
				checked={row.getIsSelected()}
				{...props}
			/>
		</div>
	);
};

export default DataTableRowAction;
