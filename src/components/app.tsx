import React from "react";
import { Route, Routes } from "react-router-dom";
import { App, ZMPRouter, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import HomePage from "pages/homepage";
import { Navigation } from "./navigation";
import ResidentPage from "pages/resident";
import ResidentMemberPage from "pages/resident/resident-member";
import ResidentAddPage from "pages/resident/resident-add";
import ResidentEditPage from "pages/resident/resident-edit";

const MyApp = () => {
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <Routes>
              <Route path="/" element={<HomePage></HomePage>}></Route>
              
              {/* RESIDENT */}
              <Route path="/resident" element={<ResidentPage></ResidentPage>}></Route>
              <Route path="/resident-member" element={<ResidentMemberPage></ResidentMemberPage>}></Route>
              <Route path="/resident-add" element={<ResidentAddPage></ResidentAddPage>}></Route>
              <Route path="/resident-edit" element={<ResidentEditPage></ResidentEditPage>}></Route>
              
            </Routes>
            <Navigation />
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};
export default MyApp;
