import { DataTableCollection } from "@narsil-tables/Types";
import { Link } from "@inertiajs/react";
import { Plus, Trash2 } from "lucide-react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import AppHead from "@narsil-ui/Components/App/AppHead";
import Button from "@narsil-ui/Components/Button/Button";
import DataTable from "@narsil-tables/Components/DataTable/DataTable";
import DataTablePagination from "@narsil-tables/Components/DataTable/DataTablePagination";
import DataTableProvider from "@narsil-tables/Components/DataTable/DataTableProvider";
import DataTableRowMenu from "@narsil-tables/Components/DataTable/DataTableRowMenu";
import DataTableSearch from "@narsil-tables/Components/DataTable/DataTableSearch";
import DataTableSelectedActions from "@narsil-tables/Components/DataTable/DataTableSelectedActions";
import DataTableUnselectedActions from "@narsil-tables/Components/DataTable/DataTableUnselectedActions";
import Fullscreen from "@narsil-ui/Components/Fullscreen/Fullscreen";
import FullscreenToggle from "@narsil-ui/Components/Fullscreen/FullscreenToggle";
import Section from "@narsil-ui/Components/Section/Section";
import SectionContent from "@narsil-ui/Components/Section/SectionContent";
import SectionFooter from "@narsil-ui/Components/Section/SectionFooter";
import SectionHeader from "@narsil-ui/Components/Section/SectionHeader";
import SectionTitle from "@narsil-ui/Components/Section/SectionTitle";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import useDataTable from "@narsil-tables/Components/DataTable/useDataTable";

interface Props {
	collection: DataTableCollection<any>;
}

const Index = ({ collection }: Props) => {
	const { trans } = useTranslationsStore();

	function getActions(id: number) {
		return [
			{
				options: [
					{
						label: trans("View"),
						href: route("backend.resources.show", {
							id: id,
							slug: collection.slug,
						}),
						method: "get",
					},
				],
			},
			{
				options: [
					{
						label: trans("Edit"),
						href: route("backend.resources.edit", {
							id: id,
							slug: collection.slug,
						}),
						method: "get",
					},
				],
			},
			{
				options: [
					{
						label: trans("Delete"),
						href: route("backend.resources.destroy", {
							id: id,
							slug: collection.slug,
						}),
						method: "delete",
					},
				],
			},
		];
	}

	const { table, tableStore } = useDataTable({
		id: `backend-${collection.slug}`,
		columns: collection.columns,
		data: collection.data,
		groupingCounts: collection.meta.grouping_counts,
		menu: ({ row }) => (
			<DataTableRowMenu
				actions={getActions(row.original.id)}
				row={row}
			/>
		),
	});

	return (
		<>
			<AppHead
				description={trans(collection.title)}
				title={trans(collection.title)}
			/>
			<Fullscreen>
				<DataTableProvider
					table={table}
					tableStore={tableStore}
				>
					<Section className='flex min-h-full w-full flex-col overflow-hidden'>
						<SectionHeader className='grid grid-cols-2 sm:grid-cols-3'>
							<SectionTitle className='truncate'>
								{trans(collection.title) +
									(table.getSelectedRowModel().rows.length > 0
										? ` (${table.getSelectedRowModel().rows.length})`
										: "")}
							</SectionTitle>
							<DataTableSearch
								id='search-desktop'
								className='order-3 col-span-2 w-full max-w-full place-self-center sm:order-2 sm:col-span-1 sm:flex'
							/>
							<div className='order-2 flex items-center gap-2 place-self-end sm:order-3'>
								<DataTableSelectedActions>
									<Button
										asChild={true}
										size='icon'
									>
										<Link
											data={{
												deleted: Object.keys(tableStore.rowSelection),
											}}
											href={route("backend.resources.delete", {
												slug: collection.slug,
											})}
											method='delete'
										>
											<Trash2 className='h-6 w-6' />
										</Link>
									</Button>
								</DataTableSelectedActions>
								<DataTableUnselectedActions>
									<TooltipWrapper tooltip={trans("create")}>
										<Button size='icon'>
											<Link
												href={route("backend.resources.create", {
													slug: collection.slug,
												})}
											>
												<Plus className='h-6 w-6' />
											</Link>
										</Button>
									</TooltipWrapper>
								</DataTableUnselectedActions>

								<FullscreenToggle />
							</div>
						</SectionHeader>

						<SectionContent>
							<DataTable />
						</SectionContent>

						<SectionFooter>
							<DataTablePagination collection={collection} />
						</SectionFooter>
					</Section>
				</DataTableProvider>
			</Fullscreen>
		</>
	);
};

export default Index;
