import { DataTableRowActionsItem } from "@narsil-table/Components";
import { InertiaLinkProps, Link } from "@inertiajs/react";
import { Menu } from "lucide-react";
import { RouteList } from "ziggy-js";
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
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@narsil-ui/Components";

const DataTableRowActionsContext = React.createContext<DataTableRowActionsProviderType>(
	{} as DataTableRowActionsProviderType
);

const DataTableRowActions = ({ actions, children, row }: DataTableRowActionsProps) => {
	const { trans } = useTranslationsStore();

	const [href, setHref] = React.useState<InertiaLinkProps["href"]>("");
	const [method, setMethod] = React.useState<InertiaLinkProps["method"]>("get");

	const currentRoute = route().current();

	if (!actions) {
		actions = [
			{
				options: [
					{
						label: trans("View"),
						value: route(currentRoute?.replace("index", "show") as keyof RouteList, row.original.id),
						method: "get",
					},
				],
			},
			{
				options: [
					{
						label: trans("Edit"),
						value: route(currentRoute?.replace("index", "edit") as keyof RouteList, row.original.id),
						method: "get",
					},
				],
			},
			{
				options: [
					{
						label: trans("Delete"),
						value: route(currentRoute?.replace("index", "destroy") as keyof RouteList, row.original.id),
						method: "delete",
					},
				],
			},
		];
	}

	return (
		<DataTableRowActionsContext.Provider
			value={{
				setHref: setHref,
				setMethod: setMethod,
			}}
		>
			<AlertDialog>
				<DropdownMenu>
					<DropdownMenuTrigger asChild={true}>
						<Button
							size='icon'
							variant='ghost'
						>
							<Menu />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						{actions?.map((action, index) =>
							action.options ? (
								<React.Fragment key={index}>
									{index > 0 ? <DropdownMenuSeparator /> : null}
									{action.options.map((subAction, subIndex) => (
										<DataTableRowActionsItem
											alert={subAction.method === "delete"}
											href={subAction.value as string}
											method={subAction.method ?? "get"}
											key={subIndex}
										>
											{subAction.label}
										</DataTableRowActionsItem>
									))}
								</React.Fragment>
							) : (
								<DataTableRowActionsItem
									alert={action.method === "delete"}
									href={action.value as string}
									method={action.method ?? "get"}
									key={index}
								>
									{action.label}
								</DataTableRowActionsItem>
							)
						)}
						{children}
					</DropdownMenuContent>
				</DropdownMenu>
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
		</DataTableRowActionsContext.Provider>
	);
};

export function useDataTableRowActions() {
	const context = React.useContext(DataTableRowActionsContext);

	if (!context) {
		throw new Error("useDataTable must be used within a <DataTableRowAction />");
	}

	return context;
}

export default DataTableRowActions;
