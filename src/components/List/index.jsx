import React from "react";
import classNames from "classnames";
import Badge from "../Badge";

import removeSvg from "../../assets/img/remove.svg";

import "./List.scss";

const List = ({ items, isRemovable, onClick, onRemove }) => {
  console.log(items);
  const removeList = (item) => {
    if (window.confirm('Are you sure?')) {
      onRemove(item);
    }
  }

  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, { active: item.active })}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color} />}</i>
          <span>{item.name}</span>
          {isRemovable && (
            <img
              className="list__remove-icon"
              src={removeSvg}
              alt="remove icon"
              onClick={() => removeList(item)}
            ></img>
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;