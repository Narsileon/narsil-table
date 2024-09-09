import { format } from "date-fns";
import { GlobalProps } from "@narsil-ui/Types";
import { Link, usePage } from "@inertiajs/react";
import { useDatetimeLocale } from "@narsil-ui/Components/Input/Datetime/datetimeUtils";
import { useFormContext } from "react-hook-form";
import { useTranslationsStore } from "@narsil-localization/Stores/translationStore";
import AlertDialog from "@narsil-ui/Components/AlertDialog/AlertDialog";
import AlertDialogAction from "@narsil-ui/Components/AlertDialog/AlertDialogAction";
import AlertDialogCancel from "@narsil-ui/Components/AlertDialog/AlertDialogCancel";
import AlertDialogContent from "@narsil-ui/Components/AlertDialog/AlertDialogContent";
import AlertDialogDescription from "@narsil-ui/Components/AlertDialog/AlertDialogDescription";
import AlertDialogFooter from "@narsil-ui/Components/AlertDialog/AlertDialogFooter";
import AlertDialogHeader from "@narsil-ui/Components/AlertDialog/AlertDialogHeader";
import AlertDialogTitle from "@narsil-ui/Components/AlertDialog/AlertDialogTitle";
import AlertDialogTrigger from "@narsil-ui/Components/AlertDialog/AlertDialogTrigger";
import Button from "@narsil-ui/Components/Button/Button";
import Card from "@narsil-ui/Components/Card/Card";
import CardContent from "@narsil-ui/Components/Card/CardContent";
import CardFooter from "@narsil-ui/Components/Card/CardFooter";
import FormControl from "@narsil-forms/Components/Form/FormControl";
import FormField from "@narsil-forms/Components/Form/FormField";
import FormItem from "@narsil-forms/Components/Form/FormItem";
import FormLabel from "@narsil-forms/Components/Form/FormLabel";
import Separator from "@narsil-ui/Components/Separator/Separator";
import Switch from "@narsil-ui/Components/Switch/Switch";

interface ResourceFormSidebarProps {
	data: any;
	slug: string;
}

const ResourceFormSidebar = ({ data, slug }: ResourceFormSidebarProps) => {
	const { trans } = useTranslationsStore();

	const { locale } = usePage<GlobalProps>().props.shared.localization;

	const { control } = useFormContext();

	const datetimeLocale = useDatetimeLocale(locale);

	return (
		<Card className='h-fit'>
			<CardContent className='w-full lg:w-64'>
				<FormField
					control={control}
					name={"active"}
					render={({ field }) => {
						return (
							<FormItem orientation='horizontal'>
								<FormLabel htmlFor={"active"}>{trans("Active") + trans(":")}</FormLabel>
								<FormControl>
									<Switch
										{...field}
										id={"active"}
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
							</FormItem>
						);
					}}
				/>
				{data.created_at ? (
					<>
						<Separator />
						{data.created_at ? (
							<div className='flex gap-x-1 text-sm lg:flex-col'>
								<span className='whitespace-nowrap'>
									{trans("validation.attributes.created_at") + trans(":")}
								</span>
								<span>{format(data.created_at, "PPPpp", { locale: datetimeLocale })}</span>
							</div>
						) : null}
						{data.updated_at ? (
							<div className='flex gap-x-1 text-sm lg:flex-col'>
								<span className='whitespace-nowrap'>
									{trans("validation.attributes.updated_at") + trans(":")}
								</span>
								<span>{format(data.updated_at, "PPPpp", { locale: datetimeLocale })}</span>
							</div>
						) : null}
					</>
				) : null}
			</CardContent>
			{data ? (
				<CardFooter>
					<AlertDialog>
						<AlertDialogTrigger asChild={true}>
							<Button>{trans("Delete")}</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									{trans("Are you sure you want to perform this action?")}
								</AlertDialogTitle>
								<AlertDialogDescription>
									{trans("This action cannot be undone.")}
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>{trans("Cancel")}</AlertDialogCancel>
								<AlertDialogAction asChild={true}>
									<Link
										as='button'
										href={route("backend.resources.destroy", {
											id: data.id,
											slug: slug,
										})}
										method='delete'
									>
										{trans("Continue")}
									</Link>
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</CardFooter>
			) : null}
		</Card>
	);
};

export default ResourceFormSidebar;
