type ActionOption = SelectOption & Pick<import("@inertiajs/react").InertiaLinkProps, "method">;

interface DataTableRowActionsProps {
	actions?: ActionOption[];
	children?: React.ReactNode;
	row: import("@tanstack/react-table").Row<any>;
}
