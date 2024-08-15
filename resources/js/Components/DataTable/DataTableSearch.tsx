import { cn } from "@narsil-ui/Components";
import { Search } from "lucide-react";
import { useDataTable } from "./DataTableProvider";
import { useTranslationsStore } from "@narsil-ui/Stores/translationStore";
import * as React from "react";
import Input from "@narsil-ui/Components/Input/Input";

export interface DataTableSearchProps extends React.HTMLAttributes<HTMLDivElement> {}

const DataTableSearch = React.forwardRef<HTMLDivElement, DataTableSearchProps>(({ className, ...props }, ref) => {
	const { trans } = useTranslationsStore();

	const { tableStore } = useDataTable();

	return (
		<div
			ref={ref}
			className={cn("relative w-96", className)}
			{...props}
		>
			<Search className='botton-1.5 z-1 absolute left-1.5 top-1.5' />

			<Input
				className='w-full px-9'
				placeholder={trans("Search...")}
				value={tableStore.globalFilter}
				onChange={(event) => tableStore.setGlobalFilter(event.target.value)}
			/>
		</div>
	);
});

export default DataTableSearch;
