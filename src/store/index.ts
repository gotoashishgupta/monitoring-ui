import { create } from "zustand";

export interface ITask {
	errorMessage: null | string;
	object: null | string;
	input?: string | "";
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

export type IStatus = Record<string, ITaskGroup[]>;

export interface IMenu {
	type: "task-group" | "task";
	value: string;
}
export interface IGlobalState {
	status: IStatus;
	service: string;
	auth: boolean;
	setAuth: (s: boolean) => void;
	setService: (s: string) => void;
	setStatus: (status: IStatus) => void; // Change the type to IStatus
}

export interface IFlattenedTask extends ITask {
	milestone: string;
}

export const useGlobalStore = create<IGlobalState>((set) => ({
	auth: false,
	status: {} as IStatus,
	service: "compliance-restrictions",
	setService: (service: string) => set(() => ({ service })),
	setStatus: (status: IStatus) => set(() => ({ status })),
	setAuth: (auth: boolean) => set(() => ({ auth })),
}));
