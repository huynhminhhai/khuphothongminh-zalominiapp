import images from "assets/images";
import { HeaderHome } from "components/header";
import { MeetingSection } from "components/meeting";
import { ServiceSection } from "components/services";
import { StatisticSection } from "components/statistics";
import React from "react";
import { Box, Page } from "zmp-ui";

const HomePage: React.FunctionComponent = () => {

  return (
    <Page className="relative flex-1 flex flex-col bg-white pb-[66px] home">
      <img src={images.shape1} alt="shape" className="absolute top-0 left-0 w-[460px] h-auto opacity-15 z-0" />
      <HeaderHome />
      <Box className="relative z-[1]">
        <StatisticSection />
        <div className="bg-white rounded-t-2xl pb-[66px]">
          <ServiceSection />
          <MeetingSection />
        </div>
      </Box>
    </Page>
  );
};

export default HomePage;
