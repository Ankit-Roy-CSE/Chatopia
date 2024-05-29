// import DesktopSidebar from "./DesktopSidebar";
// import MobileFooter from "./MobileFooter";

// import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";
import styles from "./Sidebar.module.css";

async function Sidebar({ children }: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <DesktopSidebar />
      <MobileFooter />
      <main>
        {children}
      </main>
    </div>
  )
}

export default Sidebar;