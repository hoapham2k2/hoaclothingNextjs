import React from "react";
import { AppShell } from "@mantine/core";
import { AdminNavBar } from "../components/Admin/Navbar";
("../components/Admin/Navbar");
import AdminHeader from "../components/Admin/Header";
type Props = {
  children: React.ReactElement;
};

const AdminLayout = (props: Props) => {
  return (
    <AppShell
      navbar={<AdminNavBar />}
      // header={<AdminHeader />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {props.children}
    </AppShell>
  );
};

export default AdminLayout;
