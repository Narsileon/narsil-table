import { Link } from "@inertiajs/react";
import { ShowTableResource } from "@narsil-tables/Types";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import AppPage from "@narsil-ui/Components/App/AppPage";
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

	const title = `${trans("common.product") + trans(":")} ${resource.data.id}`;

	return (
		<AppPage title={resource.title}>
			<Fullscreen>
				<Section>
					<SectionHeader>
						<SectionTitle>{resource.title}</SectionTitle>
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
							<Link href={route(`backend.${resource.slug}.edit`, resource.data.id)}>{trans("Edit")}</Link>
						</Button>
						<BackButton href={route(`backend.${resource.slug}.index`)} />
					</SectionFooter>
				</Section>
			</Fullscreen>
		</AppPage>
	);
};

export default Index;
