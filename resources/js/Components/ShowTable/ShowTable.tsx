import { ShowRow } from "@narsil-table/Components";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@narsil-ui/Components";
import { useTranslationsStore } from "@narsil-ui/Stores/translationStore";
import * as React from "react";

const ShowTable = React.forwardRef<HTMLTableElement, ShowTableProps>(({ columns, data, ...props }, ref) => {
	const { trans } = useTranslationsStore();

	const { id = null, active = null, created_at = null, updated_at = null, ...attributes } = data;

	return (
		<Table
			ref={ref}
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
					const column = columns.find((x) => x.id === attribute);

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
