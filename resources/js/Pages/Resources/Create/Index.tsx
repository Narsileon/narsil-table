import { cn } from "@narsil-ui/Components";
import { kebabCase } from "lodash";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import AppPage from "@narsil-ui/Components/App/AppPage";
import BackButton from "@narsil-ui/Components/Button/BackButton";
import Button from "@narsil-ui/Components/Button/Button";
import Fullscreen from "@narsil-ui/Components/Fullscreen/Fullscreen";
import FullscreenToggle from "@narsil-ui/Components/Fullscreen/FullscreenToggle";
import Section from "@narsil-ui/Components/Section/Section";
import SectionContent from "@narsil-ui/Components/Section/SectionContent";
import SectionHeader from "@narsil-ui/Components/Section/SectionHeader";
import SectionTitle from "@narsil-ui/Components/Section/SectionTitle";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { FormResource } from "@narsil-tables/Types";
import useForm from "@narsil-forms/Components/Form/useForm";
import FormProvider from "@narsil-forms/Components/Form/FormProvider";
import Form from "@narsil-forms/Components/Form/Form";
import FormRenderer from "@narsil-forms/Components/Form/FormRenderer";

interface Props {
	resource: FormResource<any>;
}

const Index = ({ resource, ...props }: Props) => {
	const { trans } = useTranslationsStore();

	const { meta } = resource;

	const title = trans(`models.${meta.model}`) + trans(":");

	const form = useForm({
		form: meta.form,
		data: {
			active: true,
		},
	});

	const backRoute = route("backend.resource.index", kebabCase(meta.table));

	const footer = (
		<>
			<Button type='submit'>{trans("common.create")}</Button>
			<BackButton href={backRoute} />
		</>
	);

	const active = form.watch("active");

	return (
		<AppPage title={resource.title}>
			<FormProvider {...form}>
				<Form route={route("backend.resource.store", resource.slug)}>
					<Fullscreen>
						<Section>
							<SectionHeader>
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
								<SectionTitle>{title}</SectionTitle>
								<FullscreenToggle />
							</SectionHeader>
							<SectionContent>
								<FormRenderer
									footer={footer}
									nodes={meta.form.nodes}
									options={meta.form.options}
								/>
							</SectionContent>
						</Section>
					</Fullscreen>
				</Form>
			</FormProvider>
		</AppPage>
	);
};

export default Index;
