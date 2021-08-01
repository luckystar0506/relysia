import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./index.module.css";

const Title = ({ children, heading }) => {
  if (heading === "h1") {
    return <h1 className={cn(styles.title, styles.h1)}>{children}</h1>;
  }
  if (heading === "h2") {
    return <h2 className={cn(styles.title, styles.h2)}>{children}</h2>;
  }
  if (heading === "h3") {
    return <h3 className={cn(styles.title, styles.h3)}>{children}</h3>;
  }
  if (heading === "h4") {
    return <h4 className={cn(styles.title, styles.h4)}>{children}</h4>;
  }
  if (heading === "h5") {
    return <h5 className={cn(styles.title, styles.h5)}>{children}</h5>;
  }
};

Title.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default Title;
