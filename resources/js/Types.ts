import type { Collection, CollectionMeta, Resource } from "@narsil-ui/Types";
import type { ColumnDef } from "@tanstack/react-table";
import type { UserModel } from "@narsil-auth/Types";

export type DataTableCollection<T = { [key: string]: any }> = Collection<T> & {
	comments: ModelCommentModel[];
	columns: ColumnDef<any, any>[];
	meta: DataTableCollectionMeta;
	slug: string;
	title: string;
};

export type DataTableCollectionMeta = CollectionMeta & {
	grouping_counts: Record<string, Record<any, number>>;
};

export type ModelCommentModel = {
	active: boolean;
	author_id: number;
	author: UserModel;
	content: string;
	created_at: string;
	id: number;
	model_id: number;
	model_type: string;
	updated_at: string;
};

export type ShowTableResource<T = { [key: string]: any }> = Resource<T> & {
	columns: ColumnDef<any, any>[];
	slug: string;
	title: string;
};
