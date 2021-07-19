import React from "react";
import TodoForm from "../../components/TodoForm";

function ListPage(props) {
  const handleTodoFromSubmit = (values) => {
    console.log("Value submit: ", values);
  };
  return (
    <div>
      <TodoForm onSubmit={handleTodoFromSubmit} />
    </div>
  );
}

export default ListPage;
