import React, { useEffect, memo, useMemo, useState } from "react";
import { setGlobalStore, IGlobalState, ITaskGroup, ITask, IStatus } from "../../store/index";
import Loading from "./Loading";

export interface IMilestone {
  id: number;
  title: string;
  status: string;
}

const initialMilestones: IMilestone[] = [
  { id: 1, title: "Milestone 1", status: "Completed" },
  { id: 2, title: "Milestone 2", status: "In Progress" },
  { id: 3, title: "Milestone 3", status: "Not Started" },
  { id: 4, title: "Milestone 4", status: "Error" },
];

const getStatusClass = (status: string) => {
  const statusClasses: { [key: string]: string } = {
    "Completed": "bg-green-600",
    "In Progress": "border-4 border-t-4 border-t-transparent border-blue-600 animate-spin",
    "In Progress (with Errors)": "border-4 border-t-4 border-t-transparent border-orange-600 animate-spin",
    "Not Started": "bg-gray-300",
    "Error": "bg-red-600",
    "Skipped": "bg-gray-600"
  };
  return statusClasses[status] || "bg-gray-300";
};

const getMilestones = (service: string | undefined, status: IStatus = {}): IMilestone[] => {
  if (!service || !status[service]?.length) {
    return initialMilestones;
  }

  return status[service]?.map((x: ITaskGroup, idx: number) => {
    const taskStatuses = x.tasks.map((xs: ITask) => xs.statusString);

    // "in-progress" "completed" "pending" "failed" "skipped"
    let status = "Not Started";
    const isPending = taskStatuses.every((x) => x === "pending");
    const isProgress = taskStatuses.includes("in-progress") && !taskStatuses.includes("failed");
    const isProgressWithErrors = taskStatuses.includes("in-progress") && taskStatuses.includes("failed");
    const isErrorAll = taskStatuses.every((x) => x === "failed");
    const isSucceeded = taskStatuses.every((x) => ["completed", "skipped"].includes(x));
    const isSkipped = taskStatuses.every((x) => x === "skipped");

    if (isPending) {
      status = "Not Started";
    } else if (isProgress) {
      status = "In Progress";
    } else if (isProgressWithErrors) {
      status = "In Progress (with Errors)";
    } else if (isErrorAll) {
      status = "Error";
    } else if (isSkipped) {
      status = "Skipped";
    } else if (isSucceeded) {
      status = "Completed";
    }

    return {
      id: idx,
      title: x.milestone,
      status,
    };
  }) || initialMilestones;
};

const MilestonesSidebar: React.FC = memo(() => {
  const { service, status, selectedMenu, setMenu } = setGlobalStore((state) => ({
    service: state.service,
    status: state.status,
    selectedMenu: state.selectedMenu,
    setMenu: state.setMenu
  })) as Partial<IGlobalState>;

  const milestones = useMemo(() => getMilestones(service, status), [service, status]);

  const enableMenu = false;

  useEffect(() => {
    console.log(`service: ${service}`);
    console.log(`status ${JSON.stringify(status)}`);
    if(enableMenu) {
      setMenu({
        type: 'task-group',
        value: milestones[0]?.title ?? ''
      });
    }
  }, [service, status, milestones]);

  const milestoneItems = useMemo(() => {
    if (!milestones || milestones.length === 0) {
      return <Loading />;
    }
    return (
      <ul className="grid grid-cols-1 divide-y">
        {milestones.map((milestone) => (
          <li key={milestone.id} className="hover:bg-gray-100 cursor-pointer">
            <div className={`flex items-center space-x-2 ${selectedMenu.value === milestone.title ? 'bg-gray-200': ''} m-2`}>
              <span className={`w-4 h-4 rounded-full ${getStatusClass(milestone.status)}`}></span>
              <div>
                <h3 className="text-lg">{milestone.title}</h3>
                <p className="text-sm italic text-gray-400">Status: {milestone.status}</p>
              </div>
            </div>
            {/* <ul>
              <li className="p-2 hover:bg-gray-600 cursor-pointer">
                <div className="flex items-center space-x-2">
                  <div className="text-base">{status[service]}</div>
                  <div className="text-sm italic text-gray-400">{status}</div>
                </div>
              </li>
            </ul> */}
          </li>
        ))}
      </ul>
    );
  }, [milestones]);

  return (
    <div className="grid grid-cols-1 divide-y">
      <h2 className="text-xl font-bold mb-4">Milestones</h2>
      {milestoneItems}
    </div>
  );
});

export default MilestonesSidebar;
