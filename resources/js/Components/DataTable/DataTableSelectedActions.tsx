import { cn } from "@narsil-ui/Components";
import { useDataTableContext } from "./DataTableProvider";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import { X } from "lucide-react";
import * as React from "react";
import Button from "@narsil-ui/Components/Button/Button";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";

interface DataTableSelectActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

const DataTableSelectedActions = React.forwardRef<HTMLDivElement, DataTableSelectActionsProps>(
	({ className, children, ...props }, ref) => {
		const { table } = useDataTableContext();
		const { trans } = useTranslationsStore();

		return table.getIsAllRowsSelected() || table.getIsSomeRowsSelected() ? (
			<div
				ref={ref}
				className={cn("flex items-center gap-2", className)}
				{...props}
			>
				{children}
				<TooltipWrapper tooltip={trans("Clear selection")}>
					<Button
						size='icon'
						onClick={() => table.resetRowSelection()}
					>
						<X className='h-6 w-6' />
					</Button>
				</TooltipWrapper>
			</div>
		) : null;
	}
);

export default DataTableSelectedActions;
