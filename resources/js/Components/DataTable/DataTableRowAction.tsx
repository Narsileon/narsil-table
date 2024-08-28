import { ChevronDown } from "lucide-react";
import { Row } from "@tanstack/react-table";
import Button, { ButtonProps } from "@narsil-ui/Components/Button/Button";
import Checkbox from "@narsil-ui/Components/Checkbox/Checkbox";

export interface DataTableRowActionProps extends Partial<ButtonProps> {
	row: Row<any>;
}

const DataTableRowAction = ({ row, ...props }: DataTableRowActionProps) => {
	return row.getCanExpand() ? (
		<Button
			size='icon'
			variant='ghost'
			onClick={(event) => {
				event.stopPropagation();

				row.toggleExpanded();
			}}
			{...props}
		>
			<ChevronDown />
		</Button>
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
