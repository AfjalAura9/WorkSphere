import React from 'react';
import Header from '../other/Header';
import TaskListNumbers from '../other/TaskListNumbers';
import TaskList from '../TaskList/TaskList';

const EmployeeDashboard = (props) => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Header changeUser={props.changeUser} data={props.data}/>
      <TaskListNumbers data={props.data} />
      <TaskList data={props.data} />
    </div>
  );
};

export default EmployeeDashboard;
