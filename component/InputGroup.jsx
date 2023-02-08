/** @format */

import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import styles from "../styles/Form.module.css";

function InputGroup({ feilds, title, isEditing, handleChange, customer }) {
  return (
    <div className={styles.inputGroup}>
      <div className={styles.inputGroupLabel}>{title}</div>
      {feilds.map((feild, index) => {
        if (feild.type === "select")
          return (
            <FloatingLabel
              controlId={feild.name}
              label={feild.placeholder}
              className={(feild.class && feild.class) + " mb-2"}
              key={index}
            >
              <Form.Select
                disabled={!isEditing}
                placeholder={feild.placeholder}
                value={customer?.[feild.name]}
                onChange={handleChange}
                required
                name={feild.name}
              >
                {feild.opt.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          );
        else
          return (
            <FloatingLabel
              controlId={feild.name}
              label={feild.placeholder}
              className={(feild.class && feild.class) + " mb-2"}
              key={index}
            >
              <Form.Control
                name={feild.name}
                readOnly={!isEditing}
                placeholder={feild.placeholder}
                type="text"
                value={customer?.[feild.name]}
                onChange={handleChange}
                required
                // maxLength={
                //   feild.name === "bookDay" || feild.name === "bookMonth" ? 2 : 4
                // }
              />
            </FloatingLabel>
          );
      })}
    </div>
  );
}

export default InputGroup;
