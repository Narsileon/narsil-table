import { cn } from "@narsil-ui/Components";
import { get, isNil } from "lodash";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import ScrollArea from "@narsil-ui/Components/ScrollArea/ScrollArea";
import ShowRow from "@narsil-tables/Components/ShowTable/ShowRow";
import Table from "@narsil-ui/Components/Table/Table";
import TableBody from "@narsil-ui/Components/Table/TableBody";
import TableHead from "@narsil-ui/Components/Table/TableHead";
import TableHeader from "@narsil-ui/Components/Table/TableHeader";
import TableRow from "@narsil-ui/Components/Table/TableRow";
import type { Column } from "@narsil-tables/Types";
import type { TableProps } from "@narsil-ui/Components/Table/Table";

export interface ShowTableProps extends TableProps {
	columns: Column[];
	data: { [key: string]: any };
	header?: boolean;
	nullable?: boolean;
}

const ShowTable = React.forwardRef<HTMLTableElement, ShowTableProps>(
	({ className, columns, data, header = true, nullable = true, ...props }, ref) => {
		const { trans } = useTranslationsStore();

		const { id = null, active = null, created_at = null, updated_at = null, ...attributes } = data;

		return (
			<ScrollArea
				className='w-full rounded-md border'
				orientation='horizontal'
			>
				<Table
					ref={ref}
					className={cn("w-full min-w-full", className)}
					{...props}
				>
					{header ? (
						<TableHeader>
							<TableRow>
								<TableHead>{trans("Attribut")}</TableHead>
								<TableHead>{trans("Value")}</TableHead>
							</TableRow>
						</TableHeader>
					) : null}
					<TableBody>
						{columns ? (
							columns.map((column, index) => {
								const value = get(data, column.accessorKey);

								return !(!nullable && isNil(value)) ? (
									<ShowRow
										attribute={column.header as string}
										formatString={column?.meta?.formatString}
										nullable={true}
										type={column?.meta?.type ?? "string"}
										value={value}
										key={index}
									/>
								) : null;
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
			</ScrollArea>
		);
	}
);

export default ShowTable;
