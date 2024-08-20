import { cn } from "@narsil-ui/Components";
import { useDataTableContext } from "./DataTableProvider";
import * as React from "react";
import DataTableSettings from "./DataTableSettings";

interface DataTableUnselectActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

const DataTableUnselectActions = React.forwardRef<HTMLDivElement, DataTableUnselectActionsProps>(
	({ className, children, ...props }, ref) => {
		const { table } = useDataTableContext();

		return !table?.getIsSomeRowsSelected() ? (
			<div
				ref={ref}
				className={cn("flex items-center gap-2", className)}
				{...props}
			>
				{children}
				<DataTableSettings />
			</div>
		) : null;
	}
);

export default DataTableUnselectActions;
