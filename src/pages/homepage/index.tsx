import { HeaderApp } from "components/header";
import React from "react";
import { Page } from "zmp-ui";

const HomePage: React.FunctionComponent = () => {

  return (
    <Page className="relative flex-1 flex flex-col bg-white pb-[66px]">
      <HeaderApp />

    </Page>
  );
};

export default HomePage;
