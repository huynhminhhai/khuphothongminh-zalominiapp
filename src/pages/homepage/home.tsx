import images from "assets/images";
import { Divider } from "components/divider";
import { HeaderHome } from "components/header";
import { MeetingSection } from "components/meeting";
import NewsSection from "components/news/NewsSection";
import { ServiceSection } from "components/services";
import { StatisticSection } from "components/statistics";
import { TaskSection } from "components/task";
import React from "react";
import { useStoreApp } from "store/store";
import { PermissionActions, permissionsList } from "utils/permission";
import { Box, Page } from "zmp-ui";

const HomePage: React.FunctionComponent = () => {

  const { account, hasPermission } = useStoreApp()

  return (
    <Page className="relative flex-1 flex flex-col bg-white pb-[66px] home">
      {/* <img src={images.shape2} alt="shape" className="absolute top-0 left-0 w-[460px] h-auto opacity-[0.04] z-0" /> */}
      <HeaderHome />
      <Box className="relative z-[1]">
        <StatisticSection />
        <div className="bg-white rounded-t-2xl pt-3 min-h-[60vh]">
          <ServiceSection />
          {
            account &&
            <>
              <Divider />
              {
                hasPermission(permissionsList.khuPhoCongViec, PermissionActions.XEM) &&
                <TaskSection />
              }
              <Divider />
              {
                hasPermission(permissionsList.khuPhoCongViecCuocHop, PermissionActions.XEM) &&
                <MeetingSection />
              }
            </>
          }
          {
            hasPermission(permissionsList.khuPhoTuyenTruyenPhanAnhTinTucSuKien, PermissionActions.XEM) &&
            <NewsSection />
          }
        </div>
      </Box>
    </Page>
  );
};

export default HomePage;
