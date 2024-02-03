import AppNav from "./AppNav";
import Logo from "./Logo";
import Footer from "./Footer";
import styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.counteinerBar}>
        <Logo />
        <AppNav />

        <Outlet />
        {/* za nested routes */}
      </div>

      <Footer />
    </div>
  );
}

export default Sidebar;
