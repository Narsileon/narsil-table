import { Ellipsis } from "lucide-react";
import { InertiaLinkProps, Link } from "@inertiajs/react";
import { RouteList } from "ziggy-js";
import { Row } from "@tanstack/react-table";
import { SelectOption } from "@narsil-ui/Types";
import { useDataTableContext } from "./DataTableProvider";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import AlertDialog from "@narsil-ui/Components/AlertDialog/AlertDialog";
import AlertDialogAction from "@narsil-ui/Components/AlertDialog/AlertDialogAction";
import AlertDialogCancel from "@narsil-ui/Components/AlertDialog/AlertDialogCancel";
import AlertDialogContent from "@narsil-ui/Components/AlertDialog/AlertDialogContent";
import AlertDialogDescription from "@narsil-ui/Components/AlertDialog/AlertDialogDescription";
import AlertDialogFooter from "@narsil-ui/Components/AlertDialog/AlertDialogFooter";
import AlertDialogHeader from "@narsil-ui/Components/AlertDialog/AlertDialogHeader";
import AlertDialogTitle from "@narsil-ui/Components/AlertDialog/AlertDialogTitle";
import Button from "@narsil-ui/Components/Button/Button";
import DataTableRowMenuItem from "./DataTableRowMenuItem";
import DropdownMenu from "@narsil-ui/Components/DropdownMenu/DropdownMenu";
import DropdownMenuContent from "@narsil-ui/Components/DropdownMenu/DropdownMenuContent";
import DropdownMenuSeparator from "@narsil-ui/Components/DropdownMenu/DropdownMenuSeparator";
import DropdownMenuTrigger from "@narsil-ui/Components/DropdownMenu/DropdownMenuTrigger";

export type ActionOption = SelectOption & Pick<InertiaLinkProps, "method">;

export type DataTableRowMenuProviderState = {};

export type DataTableRowMenuProviderAction = {
	setHref: (href: InertiaLinkProps["href"]) => void;
	setMethod: (href: InertiaLinkProps["method"]) => void;
};

export type DataTableRowMenuProviderType = DataTableRowMenuProviderAction & DataTableRowMenuProviderState;

const DataTableRowMenuContext = React.createContext<DataTableRowMenuProviderType>({} as DataTableRowMenuProviderType);

export interface DataTableRowMenuProps {
	actions?: ActionOption[];
	children?: React.ReactNode;
	row: Row<any>;
}

const DataTableRowMenu = ({ actions, children, row }: DataTableRowMenuProps) => {
	const { table } = useDataTableContext();
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
						href: route(currentRoute?.replace("index", "show") as keyof RouteList, row.original.id),
						method: "get",
					},
				],
			},
			{
				options: [
					{
						label: trans("Edit"),
						href: route(currentRoute?.replace("index", "edit") as keyof RouteList, row.original.id),
						method: "get",
					},
				],
			},
			{
				options: [
					{
						label: trans("Delete"),
						href: route(currentRoute?.replace("index", "destroy") as keyof RouteList, row.original.id),
						method: "delete",
					},
				],
			},
		];
	}

	return (
		<DataTableRowMenuContext.Provider
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
							<Ellipsis className='h-6 w-6' />
							<span className='sr-only'>{trans("Menu")}</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						{actions?.map((action, index) =>
							action.options ? (
								<React.Fragment key={index}>
									{index > 0 ? <DropdownMenuSeparator /> : null}
									{action.options.map((subAction, subIndex) => (
										<DataTableRowMenuItem
											alert={subAction.method === "delete"}
											href={subAction.href as string}
											method={subAction.method ?? "get"}
											onClick={subAction.onClick}
											key={subIndex}
										>
											{subAction.label}
										</DataTableRowMenuItem>
									))}
								</React.Fragment>
							) : (
								<DataTableRowMenuItem
									alert={action.method === "delete"}
									href={action.href as string}
									method={action.method ?? "get"}
									onClick={action.onClick}
									key={index}
								>
									{action.label}
								</DataTableRowMenuItem>
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
		</DataTableRowMenuContext.Provider>
	);
};

export function useDataTableRowMenuContext() {
	const context = React.useContext(DataTableRowMenuContext);

	if (!context) {
		throw new Error("useDataTableRowMenuContext must be used within a <DataTableRowMenu />");
	}

	return context;
}

export default DataTableRowMenu;
