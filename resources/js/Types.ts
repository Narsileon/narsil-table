type Collection = {
	data: { [key: string]: any };
	links: SimpleLinks;
	meta: Meta;
};

type Meta = {
	currentPage: number;
	from: number;
	grouping_from: number | null;
	grouping_to: number | null;
	grouping_total: number | null;
	lastPage: number;
	links: PaginationLink[];
	to: number;
	total: number;
};
