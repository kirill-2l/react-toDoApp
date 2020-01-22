import React, { useState } from "react";
import axios from "axios";
import addSvg from "../../assets/img/add.svg";

const AddTasksForm = ({ list, onAddTask }) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleVisibleForm = () => {
    setVisibleForm(!visibleForm);
    setInputValue("");
  };

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false
    };
    axios.post("http://localhost:3001/tasks ", obj).then(({ data }) => {
      onAddTask(list.id, obj);
      toggleVisibleForm();
    });
  };

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div onClick={toggleVisibleForm} className="tasks__form-new">
          <img src={addSvg} alt="add task" />
          <span onClick={() => setVisibleForm(!visibleForm)}>Новая задача</span>
        </div>
      ) : (
        visibleForm && (
          <div className="tasks__form-block">
            <input
              value={inputValue}
              className="field"
              type="text"
              placeholder="Текст задачи"
              onChange={e => setInputValue(e.target.value)}
            />
            <button onClick={addTask} className="button">
              Добавить задача
            </button>
            <button onClick={toggleVisibleForm} className="button button--gray">
              Отмена
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default AddTasksForm;
