import { cn } from "@narsil-ui/Components";
import { GlobalProps } from "@narsil-ui/Types";
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
import Section from "@narsil-ui/Components/Section/Section";
import SectionContent from "@narsil-ui/Components/Section/SectionContent";
import SectionHeader from "@narsil-ui/Components/Section/SectionHeader";
import SectionTitle from "@narsil-ui/Components/Section/SectionTitle";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { FormResource } from "@narsil-forms/Types";
import useForm from "@narsil-forms/Components/Form/useForm";

interface Props {
	resource: FormResource<any>;
}

const Index = ({ resource }: Props) => {
	const { locale, trans } = useTranslationsStore();

	const { languages } = usePage<GlobalProps>().props.shared.localization;

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
			<Button type='submit'>{trans("common.create")}</Button>
			<BackButton href={backRoute} />
		</>
	);

	const active = form.watch("active");

	return (
		<>
			<AppHead
				description={resource.form.title}
				title={resource.form.title}
			/>
			<Fullscreen>
				<LanguageProvider initialLocale={locale}>
					<FormProvider {...form}>
						<Form
							route={route("backend.resources.store", {
								slug: resource.slug,
							})}
						>
							<Section>
								<SectionHeader>
									<div className='flex items-center gap-x-2'>
										<TooltipWrapper tooltip={trans("common.active")}>
											<Button
												size='sm'
												type='button'
												variant='ghost'
												onClick={() => {
													form.setValue("active", !active);
												}}
											>
												<span
													className={cn(
														"h-3 w-3 rounded-full",
														active ? "bg-green-500" : "bg-red-500"
													)}
												/>
											</Button>
										</TooltipWrapper>
										<SectionTitle>{resource.form.title + trans(":")}</SectionTitle>
									</div>
									<div className='flex items-center gap-x-2'>
										{resource.data.translations ? <LanguageDropdown languages={languages} /> : null}
										<FullscreenToggle />
									</div>
								</SectionHeader>
								<SectionContent>
									<FormRenderer
										footer={footer}
										nodes={resource.form.nodes}
										options={resource.form.options}
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
