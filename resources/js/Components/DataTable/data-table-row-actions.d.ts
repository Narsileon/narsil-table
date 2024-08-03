type ActionOption = SelectOption & Pick<import("@inertiajs/react").InertiaLinkProps, "method">;

type DataTableRowActionsProviderState = {};

type DataTableRowActionsProviderAction = {
	setHref: (href: import("@inertiajs/react").InertiaLinkProps["href"]) => void;
	setMethod: (href: import("@inertiajs/react").InertiaLinkProps["method"]) => void;
};

type DataTableRowActionsProviderType = DataTableRowActionsProviderAction & DataTableRowActionsProviderState;

interface DataTableRowActionsProps {
	actions?: ActionOption[];
	children?: React.ReactNode;
	row: import("@tanstack/react-table").Row<any>;
}
