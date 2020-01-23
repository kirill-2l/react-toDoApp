import React, { useState } from "react";
import axios from "axios";
import addSvg from "../../assets/img/add.svg";

const AddTasksForm = ({ list, onAddTask }) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(null);

  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm);
    setInputValue("");
  };

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false
    };
    setIsLoading(true);
    axios
      .post("http://localhost:3001/tasks ", obj)
      .then(({ data }) => {
        onAddTask(list.id, obj);
        toggleFormVisible();
      })
      .catch(() => {
        alert("ошибка при добавлении задачи");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div onClick={toggleFormVisible} className="tasks__form-new">
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
            <button disabled={isLoading} onClick={addTask} className="button">
              {isLoading ? "Добавление..." : "Добавить задача"}
            </button>
            <button onClick={toggleFormVisible} className="button button--gray">
              Отмена
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default AddTasksForm;
