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
	iconClassName?: string;
}

const DataTableSortButton = React.forwardRef<HTMLButtonElement, DataTableSortButtonProps>(
	({ className, header, iconClassName, ...props }, ref) => {
		const { trans } = useTranslationsStore();

		const buttonLabel = trans("Sort");

		const sort = header.column.getIsSorted();

		return (
			<TooltipWrapper tooltip={buttonLabel}>
				<Button
					ref={ref}
					aria-label={buttonLabel}
					size='icon'
					variant='ghost'
					onClick={header.column.getToggleSortingHandler()}
					{...props}
				>
					{sort === "asc" ? (
						<ChevronUp className={cn("text-primary-highlight h-6 w-6", iconClassName)} />
					) : sort === "desc" ? (
						<ChevronDown className={cn("text-primary-highlight h-6 w-6", iconClassName)} />
					) : (
						<ChevronsUpDown className={cn("h-6 w-6", iconClassName)} />
					)}
				</Button>
			</TooltipWrapper>
		);
	}
);

export default DataTableSortButton;
