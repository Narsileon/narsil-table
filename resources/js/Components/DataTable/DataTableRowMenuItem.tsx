import { Link } from "@inertiajs/react";
import { useDataTableRowMenuContext } from "./DataTableRowMenu";
import AlertDialogTrigger from "@narsil-ui/Components/AlertDialog/AlertDialogTrigger";
import DropdownMenuItem, { DropdownMenuItemProps } from "@narsil-ui/Components/DropdownMenu/DropdownMenuItem";

export interface DataTableRowMenuItemProps
	extends DropdownMenuItemProps,
		Pick<import("@inertiajs/react").InertiaLinkProps, "href" | "method"> {
	alert?: boolean;
}

const DataTableRowMenuItem = ({ alert = false, children, href, method, ...props }: DataTableRowMenuItemProps) => {
	const { setHref, setMethod } = useDataTableRowMenuContext();

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
