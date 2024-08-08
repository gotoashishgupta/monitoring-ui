import React, { useEffect, memo, useMemo, useState } from "react";
import { setGlobalStore, IGlobalState, ITaskGroup, ITask, IStatus, IFlattenedTask } from "#wf-local/store/index";
import LogItem, { Log } from './LogItem';
import {getFlattenedTasks} from '#wf-local/common/tasks'

interface IApplicationLogs {
  id: string;
  logs: Log[];
}

const LogsContainer: React.FC = memo(() => {
  const { service, status } = setGlobalStore((state) => ({
    service: state.service,
    status: state.status,
  })) as Partial<IGlobalState>;
  const [selectedApp, setSelectedApp] = useState<string>('');

  const flattenedTasks = useMemo(() => getFlattenedTasks(service, status), [service, status]);

  useEffect(() => {
    console.log(`Flattened Tasks: ${JSON.stringify(flattenedTasks)}`);
    if(flattenedTasks.length) {
      const firstTask = flattenedTasks.length && flattenedTasks[0];
      firstTask && firstTask?.task && setSelectedApp(firstTask.task);

    }
  }, [flattenedTasks, setSelectedApp]);

  const selectedTask = flattenedTasks.find(task => task.task === selectedApp);

  return (
    <div>
      <div className="mb-4 space-x-2">
        {flattenedTasks.map((task, idx) => (
          <button
            key={task.task}
            className={`px-4 py-2 rounded mb-2 ${selectedApp === task.task ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedApp(task.task)}
          >
            {task.task}
          </button>
        ))}
      </div>
      <div className="overflow-auto h-[calc(100vh-16rem)] p-4 rounded-lg shadow-md bg-black text-white">
        {
          selectedTask && (
            <pre className="whitespace-pre-wrap font-mono text-sm">
                {selectedTask.output || 'NA'}
            </pre>
          )
        }
      </div>
    </div>
  );
});

export default LogsContainer;
