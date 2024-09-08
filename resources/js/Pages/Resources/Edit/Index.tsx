import { GlobalProps } from "@narsil-ui/Types";
import { Save } from "lucide-react";
import { usePage } from "@inertiajs/react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import AppHead from "@narsil-ui/Components/App/AppHead";
import BackButton from "@narsil-ui/Components/Button/BackButton";
import Button from "@narsil-ui/Components/Button/Button";
import Form from "@narsil-forms/Components/Form/Form";
import FormProvider from "@narsil-forms/Components/Form/FormProvider";
import Fullscreen from "@narsil-ui/Components/Fullscreen/Fullscreen";
import FullscreenToggle from "@narsil-ui/Components/Fullscreen/FullscreenToggle";
import LanguageDropdown from "@narsil-localization/Components/Language/LanguageDropdown";
import LanguageProvider from "@narsil-localization/Components/Language/LanguageProvider";
import ResourceForm from "@narsil-tables/Components/ResourceForm.tsx/ResourceForm";
import Section from "@narsil-ui/Components/Section/Section";
import SectionContent from "@narsil-ui/Components/Section/SectionContent";
import SectionHeader from "@narsil-ui/Components/Section/SectionHeader";
import SectionTitle from "@narsil-ui/Components/Section/SectionTitle";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { DataTableCollection, ModelCommentModel } from "@narsil-tables/Types";
import type { FormResource } from "@narsil-forms/Types";
import useForm from "@narsil-forms/Components/Form/useForm";

interface Props {
	comments: DataTableCollection<ModelCommentModel>;
	resource: FormResource<any>;
}

const Index = ({ comments, resource }: Props) => {
	const { trans } = useTranslationsStore();

	const { languages } = usePage<GlobalProps>().props.shared.localization;

	const form = useForm({
		form: resource.form,
		languages: languages,
		data: resource.data,
	});

	const backRoute = route("backend.resources.index", {
		slug: resource.slug,
	});

	const footer = (
		<>
			<Button type='submit'>{trans("Update")}</Button>
			<BackButton href={backRoute} />
		</>
	);

	return (
		<>
			<AppHead
				description={resource.form.title}
				title={resource.form.title}
			/>
			<Fullscreen>
				<LanguageProvider>
					<FormProvider {...form}>
						<Form
							method='patch'
							route={route("backend.resources.update", {
								id: resource.data.id,
								slug: resource.slug,
							})}
						>
							<Section>
								<SectionHeader>
									<div className='flex items-center gap-x-2'>
										<BackButton
											asIcon={true}
											href={route("backend.resources.index", {
												slug: resource.slug,
											})}
											isDirty={form.formState.isDirty}
										/>
										<SectionTitle>{resource.form.title + trans(":")}</SectionTitle>
									</div>
									<div className='flex items-center gap-x-2'>
										{resource.form.nodes.some((x) => x.node_type === "trans") ? (
											<LanguageDropdown languages={languages} />
										) : null}
										<TooltipWrapper tooltip={trans("Update")}>
											<Button size={"icon"}>
												<Save className='h-6 w-6' />
											</Button>
										</TooltipWrapper>
										<FullscreenToggle />
									</div>
								</SectionHeader>
								<SectionContent>
									<ResourceForm
										comments={comments}
										footer={footer}
										resource={resource}
									/>
								</SectionContent>
							</Section>
						</Form>
					</FormProvider>
				</LanguageProvider>
			</Fullscreen>
		</>
	);
};

export default Index;
