import { DataTableCollection, ModelCommentModel } from "@narsil-tables/Types";
import { Plus } from "lucide-react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import Button from "@narsil-ui/Components/Button/Button";
import DataTable from "@narsil-tables/Components/DataTable/DataTable";
import DataTablePagination from "@narsil-tables/Components/DataTable/DataTablePagination";
import DataTableProvider from "@narsil-tables/Components/DataTable/DataTableProvider";
import Fullscreen from "@narsil-ui/Components/Fullscreen/Fullscreen";
import FullscreenToggle from "@narsil-ui/Components/Fullscreen/FullscreenToggle";
import Section from "@narsil-ui/Components/Section/Section";
import SectionContent from "@narsil-ui/Components/Section/SectionContent";
import SectionFooter from "@narsil-ui/Components/Section/SectionFooter";
import SectionHeader from "@narsil-ui/Components/Section/SectionHeader";
import SectionTitle from "@narsil-ui/Components/Section/SectionTitle";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import useDataTable from "@narsil-tables/Components/DataTable/useDataTable";

interface ResourceFormCommentsProps {
	comments: DataTableCollection<ModelCommentModel>;
}

const ResourceFormComments = ({ comments }: ResourceFormCommentsProps) => {
	const { trans } = useTranslationsStore();

	const { table, tableStore } = useDataTable({
		id: "backend-form-comments",
		columns: comments.columns,
		data: comments.data,
		enableColumnFilters: false,
		enableExpanding: false,
		enableFilters: false,
		enableGlobalFilter: false,
		enableGrouping: false,
		enableMultiRowSelection: false,
		enableMultiSort: false,
		enableRowSelection: false,
		enableSorting: false,
		manualPagination: false,
		// menu: ({ row }) => <DataTableRowMenu row={row} />,
	});

	return (
		<Fullscreen>
			<DataTableProvider
				table={table}
				tableStore={tableStore}
			>
				<Section className='flex min-h-full w-full flex-col overflow-hidden'>
					<SectionHeader>
						<SectionTitle>{trans("Comments") + trans(":")}</SectionTitle>
						<div className='flex items-center gap-2'>
							<TooltipWrapper tooltip={trans("Create")}>
								<Button size='icon'>
									<Plus className='h-6 w-6' />
									<span className='sr-only'>{trans("Create")}</span>
								</Button>
							</TooltipWrapper>

							<FullscreenToggle />
						</div>
					</SectionHeader>

					<SectionContent>
						<DataTable />
					</SectionContent>

					<SectionFooter>
						<DataTablePagination />
					</SectionFooter>
				</Section>
			</DataTableProvider>
		</Fullscreen>
	);
};

export default ResourceFormComments;
