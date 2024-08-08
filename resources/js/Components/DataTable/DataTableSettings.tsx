import { Button, Card, CardContent, Heading, Popover, PopoverContent, PopoverTrigger } from "@narsil-ui/Components";
import { DataTableVisiblity } from "@narsil-table/Components";
import { Settings } from "lucide-react";
import { useTranslationsStore } from "@narsil-ui/Stores/translationStore";

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
