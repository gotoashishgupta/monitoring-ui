import React from 'react';
import classNames from 'classnames';

export interface Log {
  id: string;
  message: string;
  status: 'Completed' | 'Error' | 'Not Started' | 'In Progress';
  timestamp: string;
}

interface LogItemProps {
  log: Log;
}

const LogItem: React.FC<LogItemProps> = ({ log }) => {
  const logClass = classNames({
    'text-green-600': log.status === 'Completed',
    'text-red-600': log.status === 'Error',
    'text-gray-300': log.status === 'Not Started',
    'text-blue-600': log.status === 'In Progress',
  });

  return (
      <p className={logClass}>{log.timestamp} - {log.message}</p>
  );
};

export default LogItem;
