import { create } from "zustand";

export interface ITask {
	errorMessage: null | string;
	object: null | string;
	output: string | "";
	statusCode: number;
	statusString: "skipped" | "pending" | "failed" | "completed" | "in-progress";
	success: boolean;
	task: string;
}

export interface ITaskGroup {
	milestone: string;
	tasks: ITask[];
}

export interface IStatus {
	[key: string]: ITaskGroup[]; // Assuming values are arrays of objects of any shape
}

export interface IMenu {
	type: "task-group" | "task";
	value: string;
}
export interface IGlobalState {
	status: IStatus;
	service: string;
	selectedMenu: IMenu;
	setMenu: (s: IMenu) => void;
	setService: (s: string) => void;
	setStatus: (status: IStatus) => void; // Change the type to IStatus
}

export interface IFlattenedTask extends ITask {
	milestone: string;
}

export const setGlobalStore = create<IGlobalState>((set) => ({
	status: {} as IStatus,
	service: "compliance-restrictions",
	selectedMenu: {} as IMenu,
	setMenu: (selectedMenu: IMenu) => set(() => ({ selectedMenu })),
	setService: (service: string) => set(() => ({ service })),
	setStatus: (status: IStatus) => set(() => ({ status })),
}));
