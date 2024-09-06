import { isArray, isBoolean, isEmpty, isNil, isNumber, isObject, upperFirst } from "lodash";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import TableCell from "@narsil-ui/Components/Table/TableCell";
import TableCellRenderer, { TableCellRendererProps } from "@narsil-tables/Components/Table/TableCellRenderer";
import TableRow, { TableRowProps } from "@narsil-ui/Components/Table/TableRow";

export interface ShowRowProps extends TableRowProps, Omit<TableCellRendererProps, "defaultValue"> {
	attribute: string;
	label?: string;
	nullable?: boolean;
}

const ShowRow = React.forwardRef<HTMLTableRowElement, ShowRowProps>(
	({ attribute, formatString, label, nullable = false, type, value, ...props }, ref) => {
		const { trans } = useTranslationsStore();

		if (!nullable && isNil(value)) {
			return null;
		}

		if (!label) {
			const match = attribute.match(/^(.*)_(\d+)$/);

			if (match) {
				const baseAttribute = match[1];
				const number = match[2];
				label = `${trans(`validation.attributes.${baseAttribute}`)} - ${number}`;
			} else {
				label = trans(`validation.attributes.${attribute.replace("_id", "")}`);
			}
		}

		if (!isNumber(value)) {
			if (isBoolean(value)) {
				value = trans(upperFirst(value.toString()));
			} else if (isEmpty(value)) {
				return null;
			}
		}

		return (
			<TableRow
				ref={ref}
				{...props}
			>
				<TableCell
					className='truncate px-4 py-1'
					title={label}
				>
					{label}
				</TableCell>
				<TableCell className='px-4 py-1'>
					{isArray(value) ? (
						<ul>
							{value.map((item: unknown, index: number) => {
								label = item?.toString();

								return (
									<li
										className='truncate'
										title={label}
										key={index}
									>
										{label}
									</li>
								);
							})}
						</ul>
					) : isObject(value) ? (
						<ul>
							{Object.entries(value).map(([key, item], index) => {
								label = `${key + trans(":")} ${item?.toString()}`;

								return (
									<li
										className='truncate'
										title={label}
										key={index}
									>
										{label}
									</li>
								);
							})}
						</ul>
					) : (
						<TableCellRenderer
							formatString={formatString}
							type={type ?? "string"}
							value={value}
						/>
					)}
				</TableCell>
			</TableRow>
		);
	}
);

export default ShowRow;
