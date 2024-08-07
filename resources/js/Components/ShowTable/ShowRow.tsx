import { isArray, isBoolean, isEmpty, isNil, isNumber, isObject } from "lodash";
import { TableCell, TableRow } from "@narsil-ui/Components";
import { TableCellRenderer } from "@narsil-table/Components";
import { useTranslationsStore } from "@narsil-ui/Stores/translationStore";
import * as React from "react";

const ShowRow = React.forwardRef<HTMLTableRowElement, ShowRowProps>(
	({ attribute, format, label, type, value, ...props }, ref) => {
		const { trans } = useTranslationsStore();

		if (isNil(value)) {
			return null;
		}

		if (!label) {
			label = trans(`validation.attributes.${attribute}`);
		}

		if (!isNumber(value)) {
			if (isBoolean(value)) {
				value = trans(`filters.${value.toString()}`);
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
					className='truncate px-2 py-1'
					title={label}
				>
					{label}
				</TableCell>
				<TableCell className='px-2 py-1'>
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
							format={format}
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
