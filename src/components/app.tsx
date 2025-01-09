import React from "react";
import { Route, Routes } from "react-router-dom";
import { App, ZMPRouter, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import { Navigation } from "./navigation";
import ScrollToTop from "./scroll-top";
import { NewsDetailPage, NewsPage } from "pages/news";
import { ResidentAddPage, ResidentEditPage, ResidentMemberPage, ResidentPage } from "pages/resident";
import { HomePage } from "pages/homepage";
import { MeetingPage } from "pages/meeting";

const MyApp = () => {
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage></HomePage>}></Route>
              
              {/* RESIDENT */}
              <Route path="/resident" element={<ResidentPage></ResidentPage>}></Route>
              <Route path="/resident-member" element={<ResidentMemberPage></ResidentMemberPage>}></Route>
              <Route path="/resident-add" element={<ResidentAddPage></ResidentAddPage>}></Route>
              <Route path="/resident-edit" element={<ResidentEditPage></ResidentEditPage>}></Route>

              {/* NEWS */}
              <Route path="/news" element={<NewsPage></NewsPage>}></Route>
              <Route path="/news-detail" element={<NewsDetailPage></NewsDetailPage>}></Route>

              {/* MEETING */}
              <Route path="/meeting" element={<MeetingPage></MeetingPage>}></Route>
              
            </Routes>
            <Navigation />
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};
export default MyApp;
