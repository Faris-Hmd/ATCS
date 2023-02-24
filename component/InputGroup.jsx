/** @format */

import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import styles from "../styles/Form.module.css";
const currentDate = new Date();
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
                value={
                  customer?.[feild.name] === null ? "" : customer?.[feild.name]
                }
                onChange={handleChange}
                required={feild.isRequired}
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
        else {
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
                type={feild.type}
                min={feild.type === "date" ? "2021-07-01" : 0}
                max={
                  feild.type === "date"
                    ? currentDate.toISOString().slice(0, 10)
                    : 100
                }
                value={
                  customer?.[feild.name] === null ? "" : customer?.[feild.name]
                }
                onChange={handleChange}
                required={feild.isRequired}
              />
            </FloatingLabel>
          );
        }
      })}
    </div>
  );
}

export default InputGroup;
