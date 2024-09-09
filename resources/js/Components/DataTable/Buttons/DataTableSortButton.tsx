import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { cn } from "@narsil-ui/Components";
import { Header } from "@tanstack/react-table";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Button from "@narsil-ui/Components/Button/Button";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { ButtonProps } from "@narsil-ui/Components/Button/Button";

export interface DataTableSortButtonProps extends ButtonProps {
	header: Header<any, any>;
}

const DataTableSortButton = React.forwardRef<HTMLButtonElement, DataTableSortButtonProps>(
	({ className, header, ...props }, ref) => {
		const { trans } = useTranslationsStore();

		const sort = header.column.getIsSorted();

		const buttonLabel = trans("Sort");

		return (
			<TooltipWrapper tooltip={buttonLabel}>
				<Button
					ref={ref}
					className={cn("w-6 min-w-6", className)}
					aria-label={buttonLabel}
					size='icon'
					variant='ghost'
					onClick={header.column.getToggleSortingHandler()}
					{...props}
				>
					{sort === "asc" ? (
						<ChevronUp className='h-4 w-4' />
					) : sort === "desc" ? (
						<ChevronDown className='h-4 w-4' />
					) : (
						<ChevronsUpDown className='h-4 w-4' />
					)}
				</Button>
			</TooltipWrapper>
		);
	}
);

export default DataTableSortButton;
