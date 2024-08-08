import { AlertDialogTrigger, DropdownMenuItem } from "@narsil-ui/Components";
import { Link } from "@inertiajs/react";
import { useDataTableRowMenu } from "@narsil-table/Components";

const DataTableRowMenuItem = ({ alert = false, children, href, method, ...props }: DataTableRowMenuItemProps) => {
	const { setHref, setMethod } = useDataTableRowMenu();

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

export default DataTableRowMenuItem;
