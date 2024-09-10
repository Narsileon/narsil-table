import { ChevronDown } from "lucide-react";
import { cn } from "@narsil-ui/Components";
import { Row } from "@tanstack/react-table";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Button from "@narsil-ui/Components/Button/Button";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { ButtonProps } from "@narsil-ui/Components/Button/Button";

export interface DataTableRowExtandButton extends ButtonProps {
	row: Row<any>;
	iconClassName?: string;
}

const DataTableRowExtandButton = React.forwardRef<HTMLButtonElement, DataTableRowExtandButtonProps>(
	({ row, iconClassName, ...props }, ref) => {
		const { trans } = useTranslationsStore();

		const expandRowLabel = trans("Expand row");

		const isExpanded = row.getIsExpanded();

		return (
			<TooltipWrapper
				align='start'
				tooltip={expandRowLabel}
			>
				<Button
					ref={ref}
					className='h-8 min-h-8 w-8 min-w-8'
					aria-label={expandRowLabel}
					size='icon'
					variant='ghost'
					onClick={(event) => {
						event.stopPropagation();

						row.toggleExpanded();
					}}
					{...props}
				>
					<ChevronDown
						className={cn("h-4 w-4 transition duration-200", {
							"rotate-180": isExpanded,
						})}
					/>
				</Button>
			</TooltipWrapper>
		);
	}
);

export default DataTableRowExtandButton;
