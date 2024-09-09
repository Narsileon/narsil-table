import { DataTableCollection, ModelCommentModel } from "@narsil-tables/Types";
import { Plus } from "lucide-react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Button from "@narsil-ui/Components/Button/Button";
import Fullscreen from "@narsil-ui/Components/Fullscreen/Fullscreen";
import FullscreenToggle from "@narsil-ui/Components/Fullscreen/FullscreenToggle";
import Section from "@narsil-ui/Components/Section/Section";
import SectionContent from "@narsil-ui/Components/Section/SectionContent";
import SectionHeader from "@narsil-ui/Components/Section/SectionHeader";
import SectionTitle from "@narsil-ui/Components/Section/SectionTitle";
import TextBox from "@narsil-forms/Components/TextBox/TextBox";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";

interface ResourceFormCommentsProps {
	comments: DataTableCollection<ModelCommentModel>;
}

const ResourceFormComments = ({ comments }: ResourceFormCommentsProps) => {
	const { trans } = useTranslationsStore();

	const [comment, setComment] = React.useState<string>("");

	return (
		<Fullscreen>
			<Section className='flex min-h-full w-full flex-col overflow-hidden p-0'>
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
					<TextBox
						placeholder={trans("Enter a comment...")}
						value={comment}
						onChange={(value) => setComment(value)}
					/>
				</SectionContent>
			</Section>
		</Fullscreen>
	);
};

export default ResourceFormComments;
