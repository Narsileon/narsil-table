import { DataTableRowActionsItem } from "@narsil-table/Components";
import { Menu } from "lucide-react";
import { RouteList } from "ziggy-js";
import { useTranslationsStore } from "@narsil-ui/Stores/translationStore";
import * as React from "react";

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@narsil-ui/Components";

const DataTableRowActions = ({ actions, children, row }: DataTableRowActionsProps) => {
	const { trans } = useTranslationsStore();

	const currentRoute = route().current();

	if (!actions) {
		actions = [
			{
				options: [
					{
						label: trans("view"),
						value: route(currentRoute?.replace("index", "show") as keyof RouteList, row.original.id),
						method: "get",
					},
				],
			},
			{
				options: [
					{
						label: trans("edit"),
						value: route(currentRoute?.replace("index", "edit") as keyof RouteList, row.original.id),
						method: "get",
					},
				],
			},
			{
				options: [
					{
						label: trans("delete"),
						value: route(currentRoute?.replace("index", "destroy") as keyof RouteList, row.original.id),
						method: "delete",
					},
				],
			},
		];
	}

	return (
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
									alert={action.method === "delete"}
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
	);
};

export default DataTableRowActions;
