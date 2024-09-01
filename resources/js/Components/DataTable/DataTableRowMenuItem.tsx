import { InertiaLinkProps, Link } from "@inertiajs/react";
import { useDataTableRowMenuContext } from "./DataTableRowMenu";
import AlertDialogTrigger from "@narsil-ui/Components/AlertDialog/AlertDialogTrigger";
import DropdownMenuItem, { DropdownMenuItemProps } from "@narsil-ui/Components/DropdownMenu/DropdownMenuItem";

export interface DataTableRowMenuItemProps extends DropdownMenuItemProps, Pick<InertiaLinkProps, "href" | "method"> {
	alert?: boolean;
}

const DataTableRowMenuItem = ({
	alert = false,
	children,
	href,
	method,
	onClick,
	...props
}: DataTableRowMenuItemProps) => {
	const { setHref, setMethod } = useDataTableRowMenuContext();

	return alert ? (
		<AlertDialogTrigger asChild={true}>
			<DropdownMenuItem
				onClick={(event) => {
					event.stopPropagation();

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
			onClick={onClick}
			{...props}
		>
			<Link
				as='button'
				href={href}
				method={method}
			>
				{children}
			</Link>
		</DropdownMenuItem>
	);
};

export default DataTableRowMenuItem;
