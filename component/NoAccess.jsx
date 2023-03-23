import React from "react";
import { BiBlock } from "react-icons/bi";

function NoAccess() {
  return (
    <div className="full">
      <BiBlock size={"50px"} />
      لا تملك صلاحية الوصول
    </div>
  );
}

export default NoAccess;
