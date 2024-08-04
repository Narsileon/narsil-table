type ActionOption = SelectOption & Pick<import("@inertiajs/react").InertiaLinkProps, "method">;

type DataTableRowMenuProviderState = {};

type DataTableRowMenuProviderAction = {
	setHref: (href: import("@inertiajs/react").InertiaLinkProps["href"]) => void;
	setMethod: (href: import("@inertiajs/react").InertiaLinkProps["method"]) => void;
};

type DataTableRowMenuProviderType = DataTableRowMenuProviderAction & DataTableRowMenuProviderState;

interface DataTableRowMenuProps {
	actions?: ActionOption[];
	children?: React.ReactNode;
	row: import("@tanstack/react-table").Row<any>;
}
