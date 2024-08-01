import { Link } from "@inertiajs/react";
import { MoreHorizontal } from "lucide-react";
import { useTranslationsStore } from "@narsil-ui/Stores/translationStore";

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@narsil-ui/Components";

const DataTableRowActions = ({
	createHref,
	deleteHref,
	duplicateHref,
	editHref,
	viewHref,
}: DataTableRowActionsProps) => {
	const { trans } = useTranslationsStore();

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
				{viewHref ? (
					<>
						<DropdownMenuItem>
							<Link href={viewHref}>{trans("View")}</Link>
						</DropdownMenuItem>
					</>
				) : null}

				<DropdownMenuSeparator />

				{createHref ? (
					<>
						<DropdownMenuItem>
							<Link href={createHref}>{trans("Create")}</Link>
						</DropdownMenuItem>
					</>
				) : null}
				{editHref ? (
					<>
						<DropdownMenuItem>
							<Link href={editHref}>{trans("Edit")}</Link>
						</DropdownMenuItem>
					</>
				) : null}
				{duplicateHref ? (
					<>
						<DropdownMenuItem>
							<Link href={duplicateHref}>{trans("Duplicate")}</Link>
						</DropdownMenuItem>
					</>
				) : null}

				<DropdownMenuSeparator />

				{deleteHref ? (
					<>
						<DropdownMenuItem>
							<Link href={deleteHref}>{trans("Delete")}</Link>
						</DropdownMenuItem>
					</>
				) : null}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DataTableRowActions;
