import { Collection, CollectionMeta, Resource } from "@narsil-ui/Types";
import { ColumnDef } from "@tanstack/react-table";

export type DataTableCollection<T = { [key: string]: any }> = Collection<T> & {
	columns: ColumnDef<any, any>[];
	meta: DataTableCollectionMeta;
};

export type DataTableCollectionMeta = CollectionMeta & {
	grouped_from: number | null;
	grouped_to: number | null;
	grouped_total: number | null;
};

export type ShowTableResource<T = { [key: string]: any }> = Resource<T> & {
	columns: ColumnDef<any, any>[];
};
