import React from "react";
import UserSidebar from "./UserSidebar";
import UserNavbar from "./UserNavbar";

export default function UserLayout({ children }) {
  return (
    <div style={styles.container}>
      <UserSidebar />
      <div style={styles.main}>
        <UserNavbar />
        <div style={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#F3F4F6", // light gray background for content
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  content: {
    padding: "20px",
    flex: 1,
    overflowY: "auto",
  },
};
