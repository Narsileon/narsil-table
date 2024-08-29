import { arrayMove } from "@dnd-kit/sortable";
import { createContext, useContext } from "react";
import { DataTableStoreType } from "@narsil-tables/Stores/dataTableStore";
import { debounce } from "lodash";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { router } from "@inertiajs/react";
import { Table } from "@tanstack/react-table";
import * as React from "react";

import {
	type DragEndEvent,
	closestCenter,
	DndContext,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";

export type DataTableProviderState = {
	table: Table<any>;
	tableStore: DataTableStoreType;
};

export type DataTableProviderAction = {};

export type DataTableProviderType = DataTableProviderState & DataTableProviderAction;

const DataTableContext = createContext<DataTableProviderType>({} as DataTableProviderType);

export interface DataTableProviderProps {
	children: React.ReactNode;
	table: Table<any>;
	tableStore: DataTableStoreType;
}

const DataTableProvider = ({ children, table, tableStore }: DataTableProviderProps) => {
	const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}));

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (active && over && active.id !== over.id) {
			table.setColumnOrder((columnOrder) => {
				const oldIndex = columnOrder.indexOf(active.id as string);
				const newIndex = columnOrder.indexOf(over.id as string);

				return arrayMove(columnOrder, oldIndex, newIndex);
			});
		}
	}

	const filter = React.useCallback(
		debounce((href, params) => {
			router.get(href, params, {
				preserveState: true,
			});
		}, 300),
		[]
	);

	React.useEffect(() => {
		const href = window.location.href.replace(location.search, "");

		filter(href, tableStore.getParams());

		return () => filter.cancel();
	}, [tableStore.filteredColumnFilters, tableStore.globalFilter, tableStore.pageSize, tableStore.sorting]);

	return (
		<DataTableContext.Provider
			value={{
				table: table,
				tableStore: tableStore,
			}}
		>
			<DndContext
				collisionDetection={closestCenter}
				modifiers={[restrictToHorizontalAxis]}
				onDragEnd={handleDragEnd}
				sensors={sensors}
			>
				{children}
			</DndContext>
		</DataTableContext.Provider>
	);
};

export function useDataTableContext() {
	const context = useContext(DataTableContext);

	if (!context) {
		throw new Error("useDataTableContext must be used within a <DataTableProvider />");
	}

	return context;
}

export default DataTableProvider;
