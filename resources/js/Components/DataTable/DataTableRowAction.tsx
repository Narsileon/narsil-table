import { ChevronDown } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import Button, { ButtonProps } from "@narsil-ui/Components/Button/Button";
import Checkbox from "@narsil-ui/Components/Checkbox/Checkbox";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";

export interface DataTableRowActionProps extends Partial<ButtonProps> {
	row: Row<any>;
}

const DataTableRowAction = ({ row, ...props }: DataTableRowActionProps) => {
	const { trans } = useTranslationsStore();

	const expandRowLabel = trans("Expand row");

	return row.getCanExpand() ? (
		<TooltipWrapper tooltip={expandRowLabel}>
			<Button
				aria-label={expandRowLabel}
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
		</TooltipWrapper>
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
