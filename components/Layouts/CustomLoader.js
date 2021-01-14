import React from "react";
import defaultColors from "../../static/variables/colors";

function CustomLoader(props) {
  return (
    <div className="btnloader">
      <div
        className="spinner"
        style={{
          backgroundColor: defaultColors.theme_backgroundColor_1,

          width: props.width ? props.width : 30,
          height: props.height ? props.height : 30,
        }}
      ></div>
    </div>
  );
}

export default CustomLoader;
