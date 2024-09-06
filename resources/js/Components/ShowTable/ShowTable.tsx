import { cn } from "@narsil-ui/Components";
import { ColumnDef } from "@tanstack/react-table";
import { get } from "lodash";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import ShowRow from "@narsil-tables/Components/ShowTable/ShowRow";
import Table, { TableProps } from "@narsil-ui/Components/Table/Table";
import TableBody from "@narsil-ui/Components/Table/TableBody";
import TableHead from "@narsil-ui/Components/Table/TableHead";
import TableHeader from "@narsil-ui/Components/Table/TableHeader";
import TableRow from "@narsil-ui/Components/Table/TableRow";

export interface ShowTableProps extends TableProps {
	columns: (ColumnDef<any, any> & {
		accessorKey: string;
	})[];
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
				{columns ? (
					columns.map((column, index) => {
						return (
							<ShowRow
								attribute={column.header as string}
								formatString={column?.meta?.formatString}
								type={column?.meta?.type ?? "string"}
								value={get(data, column.accessorKey)}
								key={index}
							/>
						);
					})
				) : (
					<>
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
							return (
								<ShowRow
									attribute={attribute}
									type={"string"}
									value={value}
									key={index}
								/>
							);
						})}
						{created_at ? (
							<ShowRow
								attribute='created_at'
								formatString='LLLL'
								type='datetime-local'
								value={created_at}
							/>
						) : null}
						{updated_at ? (
							<ShowRow
								attribute='updated_at'
								formatString='LLLL'
								type='datetime-local'
								value={updated_at}
							/>
						) : null}
					</>
				)}
			</TableBody>
		</Table>
	);
});

export default ShowTable;
