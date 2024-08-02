import { Link } from "@inertiajs/react";
import { MoreHorizontal } from "lucide-react";
import * as React from "react";

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@narsil-ui/Components";

const DataTableRowActions = ({ actions }: DataTableRowActionsProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild={true}>
				<Button
					variant='ghost'
					className='h-8 w-8 p-0'
				>
					<span className='sr-only'>Open menu</span>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				{actions?.map((action, index) =>
					action.options ? (
						<React.Fragment key={index}>
							{index > 0 ? <DropdownMenuSeparator /> : null}
							{action.options.map((subAction, subIndex) => (
								<DropdownMenuItem key={subIndex}>
									<Link href={subAction.value as string}>{subAction.label}</Link>
								</DropdownMenuItem>
							))}
						</React.Fragment>
					) : (
						<DropdownMenuItem key={index}>
							<Link href={action.value as string}>{action.label}</Link>
						</DropdownMenuItem>
					)
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DataTableRowActions;
