import LineV from "../svgs/line-v";
import cn from "classnames";

const Container = ({ children, classNames }) => {
  return (
    <div className={cn("container", classNames)}>
      <LineV sides={{ top: "0", left: "1.25rem" }} />
      {children}
      <LineV sides={{ top: "0", right: "1.25rem" }} />
    </div>
  );
};

export default Container;
