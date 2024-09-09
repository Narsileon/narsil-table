import { cn } from "@narsil-ui/Components";
import { GripVertical } from "lucide-react";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Button from "@narsil-ui/Components/Button/Button";
import TooltipWrapper from "@narsil-ui/Components/Tooltip/TooltipWrapper";
import type { ButtonProps } from "@narsil-ui/Components/Button/Button";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

export interface DataTableMoveColumnButtonProps extends ButtonProps {
	attributes: DraggableAttributes;
	listeners: SyntheticListenerMap | undefined;
}

const DataTableMoveColumnButton = React.forwardRef<HTMLButtonElement, DataTableMoveColumnButtonProps>(
	({ attributes, className, listeners, ...props }, ref) => {
		const { trans } = useTranslationsStore();

		const buttonLabel = trans("Move column");

		return (
			<TooltipWrapper tooltip={buttonLabel}>
				<Button
					ref={ref}
					className={cn("w-6 min-w-6", className)}
					aria-label={buttonLabel}
					size='icon'
					variant='ghost'
					{...props}
					{...attributes}
					{...listeners}
				>
					<GripVertical className='h-4 w-4' />
				</Button>
			</TooltipWrapper>
		);
	}
);

export default DataTableMoveColumnButton;
