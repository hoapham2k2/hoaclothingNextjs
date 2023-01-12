import React from "react";

type Props = {
  children: React.ReactElement;
};

const UserLayout = (props: Props) => {
  return <div>{props.children}</div>;
};

export default UserLayout;
