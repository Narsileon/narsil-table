type Collection = {
	data: { [key: string]: any };
	columns: import("@tanstack/react-table").ColumnDef<any, any>[];
	links: SimpleLinks;
	meta: Meta;
};

type Meta = {
	current_page: number;
	from: number;
	grouped_from: number | null;
	grouped_to: number | null;
	grouped_total: number | null;
	lastPage: number;
	links: PaginationLink[];
	to: number;
	total: number;
};
