import { Collection, CollectionMeta, Resource } from "@narsil-ui/Types";
import { ColumnDef } from "@tanstack/react-table";

export type DataTableCollection<T = { [key: string]: any }> = Collection<T> & {
	columns: ColumnDef<any, any>[];
	meta: DataTableCollectionMeta;
	slug: string;
	title: string;
};

export type DataTableCollectionMeta = CollectionMeta & {
	grouping_counts: Record<string, Record<any, number>>;
};

export type ShowTableResource<T = { [key: string]: any }> = Resource<T> & {
	columns: ColumnDef<any, any>[];
	slug: string;
	title: string;
};

export type FormResource<T = { [key: string]: any }> = Resource<T> & {
	slug: string;
	title: string;
};
