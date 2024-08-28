import { Collection, Resource } from "@narsil-ui/Types";
import { ColumnDef } from "@tanstack/react-table";

export type DataTableCollection<T = { [key: string]: any }> = Collection<T> & {
	columns: ColumnDef<any, any>[];
};

export type ShowTableResource<T = { [key: string]: any }> = Resource<T> & {
	columns: ColumnDef<any, any>[];
};
