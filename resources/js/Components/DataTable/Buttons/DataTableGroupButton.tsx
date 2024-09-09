import { Group, Ungroup } from "lucide-react";
import { Header } from "@tanstack/react-table";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Button from "@narsil-ui/Components/Button/Button";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { ButtonProps } from "@narsil-ui/Components/Button/Button";

export interface DataTableGroupButtonProps extends ButtonProps {
	header: Header<any, any>;
}

const DataTableGroupButton = React.forwardRef<HTMLButtonElement, DataTableGroupButtonProps>(
	({ header, ...props }, ref) => {
		const { trans } = useTranslationsStore();

		const groupLabel = trans("Enable grouping");
		const ungroupLabel = trans("Disable grouping");

		const isGrouped = header.column.getIsGrouped();

		return (
			<TooltipWrapper tooltip={isGrouped ? ungroupLabel : groupLabel}>
				<Button
					ref={ref}
					aria-label={isGrouped ? ungroupLabel : groupLabel}
					size='icon'
					variant='ghost'
					onClick={() => {
						if (isGrouped) {
							header.column.clearSorting();
						} else {
							header.column.toggleSorting(false);
						}

						header.column.toggleGrouping();
					}}
					{...props}
				>
					{isGrouped ? <Ungroup className='text-primary-highlight h-6 w-6' /> : <Group className='h-6 w-6' />}
				</Button>
			</TooltipWrapper>
		);
	}
);

export default DataTableGroupButton;
