import React from "react";
import { Header } from "@mantine/core";
import { ThemeToggle } from "../../ThemeToggle";
type Props = {};

const AdminHeader = (props: Props) => {
  return (
    <Header height={60} p="xs">
      AdminHeader
      <ThemeToggle />
    </Header>
  );
};

export default AdminHeader;
