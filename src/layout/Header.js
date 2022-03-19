import bgLight from "../assets/images/bg-desktop-light.jpg";
import classes from "./Header.module.css";

export default function Header() {
  return (
    <>
      <header
        className={classes.header}
        style={{ backgroundImage: `url(${bgLight})` }}
      ></header>
    </>
  );
}
