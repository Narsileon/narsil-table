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
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";

export interface DataTableSettingsProps extends PopoverProps {}

const DataTableSettings = ({ ...props }: DataTableSettingsProps) => {
	const { trans } = useTranslationsStore();

	return (
		<Popover {...props}>
			<TooltipWrapper tooltip={trans("Settings")}>
				<PopoverTrigger asChild={true}>
					<Button size='icon'>
						<Settings className='h-6 w-6' />
						<span className='sr-only'>{trans("Settings")}</span>
					</Button>
				</PopoverTrigger>
			</TooltipWrapper>

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
