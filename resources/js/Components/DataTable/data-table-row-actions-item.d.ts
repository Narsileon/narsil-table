interface DataTableRowActionsItemProps
	extends DropdownMenuItemProps,
		Pick<import("@inertiajs/react").InertiaLinkProps, "href" | "method"> {
	alert?: boolean;
}
