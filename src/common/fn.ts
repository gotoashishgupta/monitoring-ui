import * as R from 'ramda'

export const checkIfIdExists = (id, data) => data.nodes.some(node => node.id === id)

export const includes = R.includes

export const getTaskGroupStatusClass = (status: string) => {
  const statusClasses: Record<string, string> = {
    "Completed": "bg-green-600",
    "In Progress": "border-4 border-t-4 border-t-transparent border-blue-600 animate-spin",
    "In Progress (with Errors)": "border-4 border-t-4 border-t-transparent border-orange-600 animate-spin",
    "Not Started": "bg-gray-300",
    "Error": "bg-red-600",
    "Skipped": "bg-gray-600"
  };
  return statusClasses[status] || "bg-gray-300";
};
