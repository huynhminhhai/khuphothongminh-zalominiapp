import images from "assets/images";
import { Divider } from "components/divider";
import { FeedbackSection } from "components/feedback";
import { HeaderHome } from "components/header";
import { MeetingSection } from "components/meeting";
import NewsSection from "components/news/NewsSection";
import { ServiceSection } from "components/services";
import { StatisticSection } from "components/statistics";
import { SurveySection } from "components/survey";
import { TaskSection } from "components/task";
import React from "react";
import { useStoreApp } from "store/store";
import { PermissionActions, permissionsList } from "utils/permission";
import { Box, Page } from "zmp-ui";

const HomePage: React.FunctionComponent = () => {

  const { account, hasPermission } = useStoreApp()

  return (
    <Page className="relative flex-1 flex flex-col bg-white pb-[66px] home">
      <img src={images.shape5} alt="shape" className="absolute top-[0%] right-[-5%] w-[150px] h-auto opacity-[1] z-0" />
      <img src={images.shape5} alt="shape" className="rotate-180 absolute top-[15%] left-[0%] w-[150px] h-auto opacity-[1] z-0" />
      <HeaderHome />
      <Box className="relative z-[1]">
        <StatisticSection />
        <div className="bg-white rounded-t-2xl pt-3 min-h-[60vh]">
          <ServiceSection />
          {
            account &&
            <>
              {
                hasPermission(permissionsList.khuPhoNhiemVuNhiemVuCuaToi, PermissionActions.XEM) &&
                account?.maXa &&
                <>
                  <Divider />
                  <TaskSection />
                </>
              }
              {
                hasPermission(permissionsList.khuPhoCongViecCuocHop, PermissionActions.XEM) &&
                <>
                  <Divider />
                  <MeetingSection />
                </>
              }

              {
                account?.maXa &&
                <>
                  <Divider />
                  <SurveySection />
                </>
              }
            </>
          }
          {
            <NewsSection />
          }
          {
            <>
              <Divider />
              <FeedbackSection />
            </>
          }
        </div>
      </Box>
    </Page>
  );
};

export default HomePage;
