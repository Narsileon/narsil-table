import { cn } from "@narsil-ui/Components";
import { useDataTable } from "./DataTableProvider";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import { X } from "lucide-react";
import * as React from "react";
import Button from "@narsil-ui/Components/Button/Button";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";

interface DataTableSelectActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

const DataTableSelectActions = React.forwardRef<HTMLDivElement, DataTableSelectActionsProps>(
	({ className, ...props }, ref) => {
		const { table } = useDataTable();
		const { trans } = useTranslationsStore();

		return (
			<div
				ref={ref}
				className={cn("flex items-center gap-2", className)}
				{...props}
			>
				<TooltipWrapper tooltip={trans("Clear selection")}>
					<Button
						size='icon'
						onClick={() => table.resetRowSelection()}
					>
						<X />
					</Button>
				</TooltipWrapper>
			</div>
		);
	}
);

export default DataTableSelectActions;
