import { IFlattenedTask, IStatus, ITask, ITaskGroup } from "../store/index";
export const getFlattenedTasks = (
	service: string | undefined,
	status: IStatus = {}
): IFlattenedTask[] | never[] => {
	if (!service || !status[service]?.length) {
		return [];
	}
	return flattenJson(status[service] ?? []);
};

export function flattenJson(input: ITaskGroup[]): IFlattenedTask[] {
	return input.reduce<IFlattenedTask[]>((acc, milestone) => {
		const { milestone: milestoneName, tasks } = milestone as ITaskGroup;
		const flattenedTasks = (tasks as ITask[]).map((task) => ({
			...task,
			milestone: milestoneName,
		}));
		return acc.concat(flattenedTasks);
	}, []);
}
