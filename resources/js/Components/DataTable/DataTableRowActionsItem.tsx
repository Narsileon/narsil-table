import { Link } from "@inertiajs/react";
import { useTranslationsStore } from "@narsil-ui/Stores/translationStore";
import * as React from "react";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	DropdownMenuItem,
} from "@narsil-ui/Components";

const DataTableRowActionsItem = ({ alert = false, children, href, method, ...props }: DataTableRowActionsItemProps) => {
	const { trans } = useTranslationsStore();

	return alert ? (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<DropdownMenuItem {...props}>{children}</DropdownMenuItem>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{trans("Are you sure you want to perform this action?")}</AlertDialogTitle>
					<AlertDialogDescription>{trans("This action cannot be undone.")}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>{trans("Cancel")}</AlertDialogCancel>
					<AlertDialogAction asChild={true}>
						<Link
							href={href}
							method={method}
						>
							{trans("Continue")}
						</Link>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
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
