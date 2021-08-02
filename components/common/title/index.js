import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./index.module.css";

const Title = ({ children, heading, classNames }) => {
  if (heading === "h1") {
    return (
      <h1 className={cn(styles.base, styles.h1, classNames)}>{children}</h1>
    );
  }
  if (heading === "h2") {
    return (
      <h2 className={cn(styles.base, styles.h2, classNames)}>{children}</h2>
    );
  }
  if (heading === "h3") {
    return (
      <h3 className={cn(styles.base, styles.h3, classNames)}>{children}</h3>
    );
  }
  if (heading === "h4") {
    return (
      <h4 className={cn(styles.base, styles.h4, classNames)}>{children}</h4>
    );
  }
  if (heading === "h5") {
    return (
      <h5 className={cn(styles.base, styles.h5, classNames)}>{children}</h5>
    );
  }
};

Title.propTypes = {
  heading: PropTypes.string.isRequired,
  classNames: PropTypes.string,
};

export default Title;
