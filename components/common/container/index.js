import cn from "classnames";

const Container = ({ children, classNames }) => {
  return <div className={cn("container", classNames)}>{children}</div>;
};

export default Container;
