import { Settings } from "lucide-react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import Button from "@narsil-ui/Components/Button/Button";
import Card from "@narsil-ui/Components/Card/Card";
import CardContent from "@narsil-ui/Components/Card/CardContent";
import DataTableVisiblity from "./DataTableVisibility";
import Heading from "@narsil-ui/Components/Heading/Heading";
import Popover, { PopoverProps } from "@narsil-ui/Components/Popover/Popover";
import PopoverContent from "@narsil-ui/Components/Popover/PopoverContent";
import PopoverTrigger from "@narsil-ui/Components/Popover/PopoverTrigger";

export interface DataTableSettingsProps extends PopoverProps {}

const DataTableSettings = ({ ...props }: DataTableSettingsProps) => {
	const { trans } = useTranslationsStore();

	return (
		<Popover {...props}>
			<PopoverTrigger asChild={true}>
				<Button size='icon'>
					<Settings />
				</Button>
			</PopoverTrigger>
			<PopoverContent align='end'>
				<Card variant='inline'>
					<CardContent>
						<Heading
							level='h2'
							variant='h6'
						>
							{trans("Columns")}
						</Heading>
						<DataTableVisiblity />
					</CardContent>
				</Card>
			</PopoverContent>
		</Popover>
	);
};

export default DataTableSettings;
