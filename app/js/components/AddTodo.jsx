import React, { StatelessComponent } from "react"; // eslint-disable-line no-unused-vars
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addTodo } from "../actions";

/** @type { StatelessComponent<{dispatch}> } */
const AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input
        ref={node => {
          input = node;
        }}
      />
      <button
        onClick={() => {
          dispatch(addTodo(input.value));
          input.value = "";
        }}
      >
        Add Todo
      </button>
    </div>
  );
};
export default connect()(AddTodo);

AddTodo.propTypes = {
  dispatch: PropTypes.func
};
