import { UseFormReturn } from "react-hook-form";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import * as React from "react";
import Badge from "@narsil-ui/Components/Badge/Badge";
import Card from "@narsil-ui/Components/Card/Card";
import CardContent from "@narsil-ui/Components/Card/CardContent";
import Form from "@narsil-forms/Components/Form/Form";
import FormProvider from "@narsil-forms/Components/Form/FormProvider";
import FormRenderer from "@narsil-forms/Components/Form/FormRenderer";
import ResourceFormComments from "./ResourceFormComments";
import ResourceFormSidebar from "@narsil-tables/Components/ResourceForm.tsx/ResourceFormSidebar";
import Tabs from "@narsil-ui/Components/Tabs/Tabs";
import TabsContent from "@narsil-ui/Components/Tabs/TabsContent";
import TabsList from "@narsil-ui/Components/Tabs/TabsList";
import TabsTrigger from "@narsil-ui/Components/Tabs/TabsTrigger";
import type { DataTableCollection, ModelCommentModel } from "@narsil-tables/Types";
import type { FormResource } from "@narsil-forms/Types";
import useScreenStore from "@narsil-ui/Stores/screenStore";

interface ResourceFormProps {
	comments?: DataTableCollection<ModelCommentModel> | null;
	footer: React.ReactNode;
	form: UseFormReturn<any>;
	method: "patch" | "post";
	resource: FormResource<any>;
	route: string;
}

const ResourceForm = ({ comments = null, footer, form, method, resource, route }: ResourceFormProps) => {
	const { trans } = useTranslationsStore();

	const { isTablet } = useScreenStore();

	const [tab, setTab] = React.useState("main");

	React.useEffect(() => {
		if (!isTablet && tab === "sidebar") {
			setTab("main");
		}
	}, [isTablet]);

	const tabs = resource.form.nodes.filter((x) => x.node_type === "tab");

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
				{tabs?.slice(1).map((tab) => (
					<TabsTrigger
						className='w-full'
						value={tab.identifier}
						key={tab.identifier}
					>
						{tab.label}
					</TabsTrigger>
				))}
				{comments !== null ? (
					<TabsTrigger
						className='w-full gap-x-2'
						value='comments'
					>
						{trans("Comments")}
						<Badge>{comments.data.length}</Badge>
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
			<FormProvider {...form}>
				<Form
					method={method}
					route={route}
				>
					<TabsContent
						className='flex-row gap-x-4'
						value='main'
					>
						<div className='grow space-y-4'>
							<FormRenderer
								footer={footer}
								nodes={resource.form.nodes}
								options={resource.form.options}
								parentNode={tabs ? tabs[0] : undefined}
							/>
						</div>
						{!isTablet ? (
							<ResourceFormSidebar
								data={resource.data}
								slug={resource.slug}
							/>
						) : null}
					</TabsContent>
					{tabs?.slice(1).map((tab) => (
						<TabsContent
							className='flex-row gap-x-4'
							value={tab.identifier}
							key={tab.identifier}
						>
							<FormRenderer
								footer={footer}
								nodes={resource.form.nodes}
								options={resource.form.options}
								parentNode={tab}
							/>
						</TabsContent>
					))}
				</Form>
			</FormProvider>
			{comments ? (
				<TabsContent
					className='flex-row gap-x-4'
					value='comments'
				>
					<Card className='w-full p-2'>
						<CardContent className='w-full'>
							<ResourceFormComments
								comments={comments}
								modelId={resource.data.id}
								modelType={resource.model}
							/>
						</CardContent>
					</Card>
				</TabsContent>
			) : null}

			{isTablet ? (
				<TabsContent value='sidebar'>
					<ResourceFormSidebar
						data={resource.data}
						slug={resource.slug}
					/>
				</TabsContent>
			) : null}
		</Tabs>
	);
};

export default ResourceForm;
