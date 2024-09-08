import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import FormRenderer from "@narsil-forms/Components/Form/FormRenderer";
import ResourceFormSidebar from "@narsil-tables/Components/ResourceForm.tsx/ResourceFormSidebar";
import Tabs from "@narsil-ui/Components/Tabs/Tabs";
import TabsContent from "@narsil-ui/Components/Tabs/TabsContent";
import TabsList from "@narsil-ui/Components/Tabs/TabsList";
import TabsTrigger from "@narsil-ui/Components/Tabs/TabsTrigger";
import type { FormResource } from "@narsil-forms/Types";
import useScreenStore from "@narsil-ui/Stores/screenStore";

interface ResourceFormProps {
	footer: React.ReactNode;
	resource: FormResource<any>;
}

const ResourceForm = ({ footer, resource }: ResourceFormProps) => {
	const { trans } = useTranslationsStore();

	const { isTablet } = useScreenStore();

	return (
		<Tabs defaultValue='main'>
			<TabsList className='w-full'>
				<TabsTrigger
					className='w-full'
					value='main'
				>
					{trans("Main")}
				</TabsTrigger>
				{isTablet ? (
					<TabsTrigger
						className='w-full'
						value='sidebar'
					>
						{trans("Sidebar")}
					</TabsTrigger>
				) : null}
			</TabsList>
			<TabsContent value='main'>
				<FormRenderer
					footer={footer}
					nodes={resource.form.nodes}
					options={resource.form.options}
				/>
				{!isTablet ? <ResourceFormSidebar data={resource.data} /> : null}
			</TabsContent>
			{isTablet ? (
				<TabsContent value='sidebar'>
					<ResourceFormSidebar data={resource.data} />
				</TabsContent>
			) : null}
		</Tabs>
	);
};

export default ResourceForm;
