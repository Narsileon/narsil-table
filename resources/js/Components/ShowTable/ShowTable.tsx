import { cn } from "@narsil-ui/Components";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import ShowRow from "@narsil-table/Components/ShowTable/ShowRow";
import Table, { TableProps } from "@narsil-ui/Components/Table/Table";
import TableBody from "@narsil-ui/Components/Table/TableBody";
import TableHead from "@narsil-ui/Components/Table/TableHead";
import TableHeader from "@narsil-ui/Components/Table/TableHeader";
import TableRow from "@narsil-ui/Components/Table/TableRow";

export interface ShowTableProps extends TableProps {
	columns?: import("@tanstack/react-table").ColumnDef<any, any>[];
	data: { [key: string]: any };
}

const ShowTable = React.forwardRef<HTMLTableElement, ShowTableProps>(({ className, columns, data, ...props }, ref) => {
	const { trans } = useTranslationsStore();

	const { id = null, active = null, created_at = null, updated_at = null, ...attributes } = data;

	return (
		<Table
			ref={ref}
			className={cn("w-full min-w-full", className)}
			{...props}
		>
			<TableHeader>
				<TableRow>
					<TableHead>{trans("Attribut")}</TableHead>
					<TableHead>{trans("Value")}</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{id ? (
					<ShowRow
						attribute='id'
						type='number'
						value={id}
					/>
				) : null}
				{active ? (
					<ShowRow
						attribute='active'
						type='boolean'
						value={active}
					/>
				) : null}

				{Object.entries(attributes)?.map(([attribute, value], index) => {
					const column = columns?.find((x) => x.id === attribute);

					return (
						<ShowRow
							attribute={attribute}
							format={column?.meta?.format}
							type={column?.meta?.type ?? "string"}
							value={value}
							key={index}
						/>
					);
				})}

				{created_at ? (
					<ShowRow
						attribute='created_at'
						format='LLLL'
						type='datetime-local'
						value={created_at}
					/>
				) : null}
				{updated_at ? (
					<ShowRow
						attribute='updated_at'
						format='LLLL'
						type='datetime-local'
						value={updated_at}
					/>
				) : null}
			</TableBody>
		</Table>
	);
});

export default ShowTable;
