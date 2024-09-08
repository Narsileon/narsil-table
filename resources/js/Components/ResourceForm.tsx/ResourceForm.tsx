import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import FormRenderer from "@narsil-forms/Components/Form/FormRenderer";
import ResourceFormSidebar from "@narsil-tables/Components/ResourceForm.tsx/ResourceFormSidebar";
import Tabs from "@narsil-ui/Components/Tabs/Tabs";
import TabsContent from "@narsil-ui/Components/Tabs/TabsContent";
import TabsList from "@narsil-ui/Components/Tabs/TabsList";
import TabsTrigger from "@narsil-ui/Components/Tabs/TabsTrigger";
import type { FormResource } from "@narsil-forms/Types";
import type { ModelCommentModel } from "@narsil-tables/Types";
import useScreenStore from "@narsil-ui/Stores/screenStore";

interface ResourceFormProps {
	comments?: ModelCommentModel[] | null;
	footer: React.ReactNode;
	resource: FormResource<any>;
}

const ResourceForm = ({ comments = null, footer, resource }: ResourceFormProps) => {
	const { trans } = useTranslationsStore();

	const { isTablet } = useScreenStore();

	const [tab, setTab] = React.useState("main");

	React.useEffect(() => {
		if (!isTablet && tab === "sidebar") {
			setTab("main");
		}
	}, [isTablet]);

	return (
		<Tabs
			value={tab}
			onValueChange={setTab}
		>
			<TabsList className='w-full'>
				<TabsTrigger
					className='w-full'
					value='main'
				>
					{trans("Main")}
				</TabsTrigger>
				{comments !== null ? (
					<TabsTrigger
						className='w-full'
						value='comments'
					>
						{trans("Comments")}
					</TabsTrigger>
				) : null}
				{isTablet ? (
					<TabsTrigger
						className='w-full'
						value='sidebar'
					>
						{trans("Sidebar")}
					</TabsTrigger>
				) : null}
			</TabsList>
			<TabsContent
				className='flex-row gap-x-4'
				value='main'
			>
				<div className='grow'>
					<FormRenderer
						footer={footer}
						nodes={resource.form.nodes}
						options={resource.form.options}
					/>
				</div>
				{!isTablet ? <ResourceFormSidebar data={resource.data} /> : null}
			</TabsContent>
			{comments ? (
				<TabsContent
					className='flex-row gap-x-4'
					value='comments'
				></TabsContent>
			) : null}

			{isTablet ? (
				<TabsContent value='sidebar'>
					<ResourceFormSidebar data={resource.data} />
				</TabsContent>
			) : null}
		</Tabs>
	);
};

export default ResourceForm;
