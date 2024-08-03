import { upperFirst } from "lodash";
import { useDataTable } from "@narsil-table/Components";
import { useTranslationsStore } from "@narsil-ui/Stores/translationStore";
import * as React from "react";

import {
	Button,
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@narsil-ui/Components";

const DataTableVisiblity = ({ ...props }: DataTableVisibilityProps) => {
	const { table } = useDataTable();
	const { trans } = useTranslationsStore();

	return (
		<DropdownMenu {...props}>
			<DropdownMenuTrigger asChild={true}>
				<Button
					variant='outline'
					className='ml-auto'
				>
					{trans("Columns")}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				{table
					.getAllColumns()
					.filter((column) => column.getCanHide())
					.map((column) => {
						return (
							<DropdownMenuCheckboxItem
								checked={column.getIsVisible()}
								onCheckedChange={(value: unknown) => column.toggleVisibility(!!value)}
								key={column.id}
							>
								{upperFirst(column.id)}
							</DropdownMenuCheckboxItem>
						);
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DataTableVisiblity;
