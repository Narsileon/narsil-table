import { useFormContext } from "react-hook-form";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import Card from "@narsil-ui/Components/Card/Card";
import FormControl from "@narsil-forms/Components/Form/FormControl";
import FormField from "@narsil-forms/Components/Form/FormField";
import FormItem from "@narsil-forms/Components/Form/FormItem";
import FormLabel from "@narsil-forms/Components/Form/FormLabel";
import Separator from "@narsil-ui/Components/Separator/Separator";
import Switch from "@narsil-ui/Components/Switch/Switch";

const ResourceFormSidebar = ({ data }) => {
	const { trans } = useTranslationsStore();

	const { control } = useFormContext();

	return (
		<Card>
			<FormField
				control={control}
				name={"active"}
				render={({ field }) => (
					<FormItem orientation='horizontal'>
						<FormLabel htmlFor={"active"}>{trans("Active") + trans(":")}</FormLabel>
						<FormControl>
							<Switch
								{...field}
								id={"active"}
							/>
						</FormControl>
					</FormItem>
				)}
			/>
			<Separator />
			{`${trans("validation.attributes.created_at") + trans(":")} ${data.created_at}`}
			{`${trans("validation.attributes.updated_at") + trans(":")} ${data.updated_at}`}
		</Card>
	);
};

export default ResourceFormSidebar;
