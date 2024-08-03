import { AlertDialogTrigger, DropdownMenuItem } from "@narsil-ui/Components";
import { Link } from "@inertiajs/react";
import { useDataTableRowActions } from "@narsil-table/Components";
import * as React from "react";

const DataTableRowActionsItem = ({ alert = false, children, href, method, ...props }: DataTableRowActionsItemProps) => {
	const { setHref, setMethod } = useDataTableRowActions();

	return alert ? (
		<AlertDialogTrigger asChild>
			<DropdownMenuItem
				onClick={() => {
					setHref(href);
					setMethod(method);
				}}
				{...props}
			>
				{children}
			</DropdownMenuItem>
		</AlertDialogTrigger>
	) : (
		<DropdownMenuItem
			asChild={true}
			{...props}
		>
			<Link
				href={href}
				method={method}
			>
				{children}
			</Link>
		</DropdownMenuItem>
	);
};

export default DataTableRowActionsItem;
