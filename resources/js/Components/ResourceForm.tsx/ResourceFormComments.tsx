import { cn } from "@narsil-ui/Components";
import { EllipsisVertical } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useDatetimeLocale } from "@narsil-ui/Components/Input/Datetime/datetimeUtils";
import { useForm } from "react-hook-form";
import { Link, usePage } from "@inertiajs/react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Avatar from "@narsil-ui/Components/Avatar/Avatar";
import AvatarFallback from "@narsil-ui/Components/Avatar/AvatarFallback";
import Button from "@narsil-ui/Components/Button/Button";
import DropdownMenu from "@narsil-ui/Components/DropdownMenu/DropdownMenu";
import DropdownMenuContent from "@narsil-ui/Components/DropdownMenu/DropdownMenuContent";
import DropdownMenuItem from "@narsil-ui/Components/DropdownMenu/DropdownMenuItem";
import DropdownMenuTrigger from "@narsil-ui/Components/DropdownMenu/DropdownMenuTrigger";
import Form from "@narsil-forms/Components/Form/Form";
import FormControl from "@narsil-forms/Components/Form/FormControl";
import FormDescription from "@narsil-forms/Components/Form/FormDescription";
import FormField from "@narsil-forms/Components/Form/FormField";
import FormItem from "@narsil-forms/Components/Form/FormItem";
import FormMessage from "@narsil-forms/Components/Form/FormMessage";
import FormProvider from "@narsil-forms/Components/Form/FormProvider";
import Fullscreen from "@narsil-ui/Components/Fullscreen/Fullscreen";
import FullscreenToggle from "@narsil-ui/Components/Fullscreen/FullscreenToggle";
import parse from "html-react-parser";
import Section from "@narsil-ui/Components/Section/Section";
import SectionContent from "@narsil-ui/Components/Section/SectionContent";
import SectionHeader from "@narsil-ui/Components/Section/SectionHeader";
import SectionTitle from "@narsil-ui/Components/Section/SectionTitle";
import TextBox from "@narsil-forms/Components/TextBox/TextBox";
import type { Collection, GlobalProps } from "@narsil-ui/Types";
import type { ModelCommentModel } from "@narsil-tables/Types";

interface ResourceFormCommentsProps {
	comments: Collection<ModelCommentModel> & {
		slug: string;
	};
	modelType: string;
	modelId: number;
}

const ResourceFormComments = ({ comments, modelId, modelType }: ResourceFormCommentsProps) => {
	const { trans } = useTranslationsStore();

	const shared = usePage<GlobalProps>().props.shared;

	const datetimeLocale = useDatetimeLocale(shared.localization.locale);

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
					<div className='group flex items-start gap-x-4'>
						<Avatar>
							<AvatarFallback className='text-primary bg-white'>
								{shared.auth.first_name.charAt(0)}
								{shared.auth.last_name.charAt(0)}
							</AvatarFallback>
						</Avatar>
						<FormProvider {...form}>
							<Form
								method='post'
								route={route("backend.resources.store", {
									slug: "model-comments",
								})}
								submitParameters={{
									onSuccess: () => {
										form.resetField("content");
									},
								}}
							>
								<FormField
									control={form.control}
									name={"content"}
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<TextBox
													className='rounded-none border-b border-l-0 border-r-0 border-t-0 p-0 pb-4'
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
					</div>
					{comments.data.map((comment) => {
						const isAuth = comment.author_id === shared.auth.id;

						return (
							<div
								className='flex items-start gap-x-4'
								key={comment.id}
							>
								<Avatar>
									<AvatarFallback className='text-primary bg-white'>
										{comment.author.first_name.charAt(0)}
										{comment.author.last_name.charAt(0)}
									</AvatarFallback>
								</Avatar>
								<div className='grow'>
									<div className='flex items-center gap-x-1'>
										<small>{comment.author.full_name}</small>
										<small className='text-muted-foreground'>
											{formatDistanceToNow(comment.updated_at, {
												addSuffix: true,
												locale: datetimeLocale,
											})}
										</small>
									</div>
									<div className='prose text-foreground max-w-none'>{parse(comment.content)}</div>
								</div>
								<DropdownMenu>
									<DropdownMenuTrigger asChild={true}>
										<Button
											className={cn({ "!opacity-0": !isAuth })}
											aria-label={trans("Menu")}
											disabled={!isAuth}
											size='icon'
											variant='ghost'
										>
											<EllipsisVertical className='h-6 w-6' />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuItem asChild={true}>
											<Link
												method='delete'
												data={{
													_back: true,
												}}
												href={route("backend.resources.destroy", {
													id: comment.id,
													slug: comments.slug,
												})}
											>
												{trans("Delete")}
											</Link>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						);
					})}
				</SectionContent>
			</Section>
		</Fullscreen>
	);
};

export default ResourceFormComments;
