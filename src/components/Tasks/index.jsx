import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import editSvg from "../../assets/img/edit.svg";

import AddTasksForm from "./AddTasksForm";
import Task from "./Task";

import "./Tasks.scss";

const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  onEditTask,
  withoutEmpty,
  onRemoveTask,
  onCompleteTask
}) => {
  const editTitle = () => {
    const newTitle = window.prompt("Название списка", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch("http://localhost:3001/lists/" + list.id, {
          name: newTitle
        })
        .catch(() => {
          alert("Не удалось обновить название");
        });
    }
  };

  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`}>
        <h2 className="tasks__title" style={{ color: list.color.hex }}>
          {list.name}
          <img onClick={editTitle} src={editSvg} alt="edit item" />
        </h2>
      </Link>
      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && (
          <h2>Задачи отсутствуют</h2>
        )}
        {list.tasks &&
          list.tasks.map(task => (
            <Task
              list={list}
              onRemove={onRemoveTask}
              onEdit={onEditTask}
              onComplete={onCompleteTask}
              key={task.id}
              {...task}
            />
          ))}
        <AddTasksForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
