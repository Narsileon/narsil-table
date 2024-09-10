import { useForm } from "react-hook-form";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@narsil-forms/Components/Form/Form";
import FormControl from "@narsil-forms/Components/Form/FormControl";
import FormDescription from "@narsil-forms/Components/Form/FormDescription";
import FormField from "@narsil-forms/Components/Form/FormField";
import FormItem from "@narsil-forms/Components/Form/FormItem";
import FormMessage from "@narsil-forms/Components/Form/FormMessage";
import FormProvider from "@narsil-forms/Components/Form/FormProvider";
import Fullscreen from "@narsil-ui/Components/Fullscreen/Fullscreen";
import FullscreenToggle from "@narsil-ui/Components/Fullscreen/FullscreenToggle";
import Section from "@narsil-ui/Components/Section/Section";
import SectionContent from "@narsil-ui/Components/Section/SectionContent";
import SectionHeader from "@narsil-ui/Components/Section/SectionHeader";
import SectionTitle from "@narsil-ui/Components/Section/SectionTitle";
import TextBox from "@narsil-forms/Components/TextBox/TextBox";
import type { Collection } from "@narsil-ui/Types";
import type { ModelCommentModel } from "@narsil-tables/Types";

interface ResourceFormCommentsProps {
	comments: Collection<ModelCommentModel>;
	modelType: string;
	modelId: number;
}

const ResourceFormComments = ({ comments, modelId, modelType }: ResourceFormCommentsProps) => {
	const { trans } = useTranslationsStore();

	const formSchema = z.object({
		_back: z.boolean(),
		content: z.string().min(1),
		model_id: z.number(),
		model_type: z.string(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			_back: true,
			content: "",
			model_id: modelId,
			model_type: modelType,
		},
	});

	return (
		<Fullscreen>
			<Section className='flex min-h-full w-full flex-col overflow-hidden p-0'>
				<SectionHeader>
					<SectionTitle>{trans("Comments") + trans(":")}</SectionTitle>
					<FullscreenToggle />
				</SectionHeader>

				<SectionContent>
					<FormProvider {...form}>
						<Form
							method='post'
							route={route("backend.resources.store", {
								slug: "model-comments",
							})}
						>
							<FormField
								control={form.control}
								name={"content"}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<TextBox
												{...field}
												placeholder={trans("Enter a comment...")}
											/>
										</FormControl>
										<FormDescription />
										<FormMessage />
									</FormItem>
								)}
							/>
						</Form>
					</FormProvider>
					{comments.data.map((comment) => (
						<>*</>
					))}
				</SectionContent>
			</Section>
		</Fullscreen>
	);
};

export default ResourceFormComments;
