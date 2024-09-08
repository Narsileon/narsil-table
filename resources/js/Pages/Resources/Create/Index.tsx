import { GlobalProps } from "@narsil-ui/Types";
import { Save } from "lucide-react";
import { usePage } from "@inertiajs/react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import AppHead from "@narsil-ui/Components/App/AppHead";
import BackButton from "@narsil-ui/Components/Button/BackButton";
import Button from "@narsil-ui/Components/Button/Button";
import Form from "@narsil-forms/Components/Form/Form";
import FormProvider from "@narsil-forms/Components/Form/FormProvider";
import FormRenderer from "@narsil-forms/Components/Form/FormRenderer";
import Fullscreen from "@narsil-ui/Components/Fullscreen/Fullscreen";
import FullscreenToggle from "@narsil-ui/Components/Fullscreen/FullscreenToggle";
import LanguageDropdown from "@narsil-localization/Components/Language/LanguageDropdown";
import LanguageProvider from "@narsil-localization/Components/Language/LanguageProvider";
import ResourceFormSidebar from "@narsil-tables/Components/ResourceForm.tsx/ResourceFormSidebar";
import Section from "@narsil-ui/Components/Section/Section";
import SectionContent from "@narsil-ui/Components/Section/SectionContent";
import SectionHeader from "@narsil-ui/Components/Section/SectionHeader";
import SectionTitle from "@narsil-ui/Components/Section/SectionTitle";
import Tabs from "@narsil-ui/Components/Tabs/Tabs";
import TabsContent from "@narsil-ui/Components/Tabs/TabsContent";
import TabsList from "@narsil-ui/Components/Tabs/TabsList";
import TabsTrigger from "@narsil-ui/Components/Tabs/TabsTrigger";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { FormResource } from "@narsil-forms/Types";
import type { LanguageModel } from "@narsil-localization/Types";
import useForm from "@narsil-forms/Components/Form/useForm";

interface Props {
	resource: FormResource<any>;
}

const Index = ({ resource }: Props) => {
	const { trans } = useTranslationsStore();

	const { languages, locale } = usePage<GlobalProps>().props.shared.localization;

	const form = useForm({
		form: resource.form,
		languages: languages,
		data: {
			active: true,
		},
	});

	const backRoute = route("backend.resources.index", {
		slug: resource.slug,
	});

	const footer = (
		<>
			<Button type='submit'>{trans("Create")}</Button>
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
				<LanguageProvider initialLanguage={languages.find((x) => x.locale === locale) as LanguageModel}>
					<FormProvider {...form}>
						<Form
							route={route("backend.resources.store", {
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
										{resource.data.translations ? <LanguageDropdown languages={languages} /> : null}
										<TooltipWrapper tooltip={trans("Create")}>
											<Button size={"icon"}>
												<Save className='h-6 w-6' />
											</Button>
										</TooltipWrapper>
										<FullscreenToggle />
									</div>
								</SectionHeader>
								<SectionContent>
									<Tabs defaultValue='main'>
										<TabsList>
											<TabsTrigger value='main'>{trans("Main")}</TabsTrigger>
											<TabsTrigger value='sidebar'>{trans("Sidebar")}</TabsTrigger>
										</TabsList>
										<TabsContent value='main'>
											<FormRenderer
												footer={footer}
												nodes={resource.form.nodes}
												options={resource.form.options}
											/>
										</TabsContent>
										<TabsContent value='sidebar'>
											<ResourceFormSidebar data={resource.data} />
										</TabsContent>
									</Tabs>
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
