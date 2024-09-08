import { Link } from "@inertiajs/react";
import { ShowTableResource } from "@narsil-tables/Types";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import AppHead from "@narsil-ui/Components/App/AppHead";
import BackButton from "@narsil-ui/Components/Button/BackButton";
import Button from "@narsil-ui/Components/Button/Button";
import Fullscreen from "@narsil-ui/Components/Fullscreen/Fullscreen";
import FullscreenToggle from "@narsil-ui/Components/Fullscreen/FullscreenToggle";
import Section from "@narsil-ui/Components/Section/Section";
import SectionContent from "@narsil-ui/Components/Section/SectionContent";
import SectionFooter from "@narsil-ui/Components/Section/SectionFooter";
import SectionHeader from "@narsil-ui/Components/Section/SectionHeader";
import SectionTitle from "@narsil-ui/Components/Section/SectionTitle";
import ShowTable from "@narsil-tables/Components/ShowTable/ShowTable";

interface Props {
	resource: ShowTableResource<any>;
}

const Index = ({ resource }: Props) => {
	const { trans } = useTranslationsStore();

	return (
		<>
			<AppHead
				description={resource.title}
				title={resource.title}
			/>
			<Fullscreen>
				<Section>
					<SectionHeader>
						<div className='flex items-center gap-x-2'>
							<BackButton
								asIcon={true}
								href={route("backend.resources.index", {
									slug: resource.slug,
								})}
							/>
							<SectionTitle>{`${resource.title + trans(":")} ${resource.data.id}`}</SectionTitle>
						</div>
						<FullscreenToggle />
					</SectionHeader>
					<SectionContent>
						<ShowTable
							columns={resource.columns}
							data={resource.data}
						/>
					</SectionContent>
					<SectionFooter>
						<Button asChild={true}>
							<Link
								href={route("backend.resources.edit", {
									id: resource.data.id,
									slug: resource.slug,
								})}
							>
								{trans("Edit")}
							</Link>
						</Button>
						<BackButton
							href={route("backend.resources.index", {
								slug: resource.slug,
							})}
						/>
					</SectionFooter>
				</Section>
			</Fullscreen>
		</>
	);
};

export default Index;
