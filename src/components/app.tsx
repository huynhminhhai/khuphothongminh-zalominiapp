import React from "react";
import { Route, Routes } from "react-router-dom";
import { App, ZMPRouter, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import { Navigation } from "./navigation";
import ScrollToTop from "./scroll-top";
import { NewsDetailPage, NewsPage } from "pages/news";
import { ResidentAddPage, ResidentCraftPage, ResidentEditPage, ResidentMemberPage, ResidentPage } from "pages/resident";
import { HomePage } from "pages/homepage";
import { MeetingDetailPage, MeetingPage } from "pages/meeting";
import { FeedbackAddPage, FeedbackDetailPage, FeedbackHistoryPage, FeedbackPage } from "pages/feedback";
import { SurveyDetailPage, SurveyPage } from "pages/survey";
import { FeedbackAnswerPage, FeedbackManagementPage, ManagementPage, MeetingAddtPage, MeetingManagementPage, MeetingUpdatePage, NewsAddPage, NewsManagementPage, NewsUpdatePage, ResidentCraftManagementPage, ResidentialManagementPage, ResidentManagementPage, ResidentProfileAddPage, ResidentProfileUpdatePage, SurveyAddPage, SurveyChartsPage, SurveyManagementPage, SurveyUpdatePage, TaskAddPage, TaskManagementPage, TaskUpdatePage, TeamAddPage, TeamManagementPage, TeamTermPage, TeamUpdatePage, TransactionsAddPage, TransactionsManagementPage } from "pages/management";
import { TeamDetailPage, TeamPage } from "pages/team";
import { ProfileResidentPage } from "pages/profile";
import { TaskDetailPage, TaskPage } from "pages/task";

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
              <Route path="/resident-craft" element={<ResidentCraftPage></ResidentCraftPage>}></Route>
              <Route path="/resident-member" element={<ResidentMemberPage></ResidentMemberPage>}></Route>
              <Route path="/resident-add" element={<ResidentAddPage></ResidentAddPage>}></Route>
              <Route path="/resident-edit" element={<ResidentEditPage></ResidentEditPage>}></Route>

              {/* NEWS */}
              <Route path="/news" element={<NewsPage></NewsPage>}></Route>
              <Route path="/news-detail" element={<NewsDetailPage></NewsDetailPage>}></Route>

              {/* MEETING */}
              <Route path="/meeting" element={<MeetingPage></MeetingPage>}></Route>
              <Route path="/meeting-detail" element={<MeetingDetailPage></MeetingDetailPage>}></Route>

              {/* FEEDBACK */}
              <Route path="/feedback" element={<FeedbackPage></FeedbackPage>}></Route>
              <Route path="/feedback-detail" element={<FeedbackDetailPage></FeedbackDetailPage>}></Route>
              <Route path="/feedback-add" element={<FeedbackAddPage></FeedbackAddPage>}></Route>
              <Route path="/feedback-history" element={<FeedbackHistoryPage></FeedbackHistoryPage>}></Route>
              
              {/* SURVEY */}
              <Route path="/survey" element={<SurveyPage></SurveyPage>}></Route>
              <Route path="/survey-detail" element={<SurveyDetailPage></SurveyDetailPage>}></Route>

              {/* TEAM */}
              <Route path="/team" element={<TeamPage></TeamPage>}></Route>
              <Route path="/team-detail" element={<TeamDetailPage></TeamDetailPage>}></Route>

              {/* TASK */}
              <Route path="/task" element={<TaskPage></TaskPage>}></Route>
              <Route path="/task-detail" element={<TaskDetailPage></TaskDetailPage>}></Route>

              {/* MANAGEMENT */}
              <Route path="/management" element={<ManagementPage></ManagementPage>}></Route>

              {/* MANAGEMENT SURVEY */}
              <Route path="/survey-management" element={<SurveyManagementPage></SurveyManagementPage>}></Route>
              <Route path="/survey-add" element={<SurveyAddPage></SurveyAddPage>}></Route>
              <Route path="/survey-update" element={<SurveyUpdatePage></SurveyUpdatePage>}></Route>
              <Route path="/survey-charts" element={<SurveyChartsPage></SurveyChartsPage>}></Route>

              {/* MANAGEMENT NEWS */}
              <Route path="/news-management" element={<NewsManagementPage></NewsManagementPage>}></Route>
              <Route path="/news-add" element={<NewsAddPage></NewsAddPage>}></Route>
              <Route path="/news-update" element={<NewsUpdatePage></NewsUpdatePage>}></Route>

              {/* MANAGEMENT FEEDBACK */}
              <Route path="/feedback-management" element={<FeedbackManagementPage></FeedbackManagementPage>}></Route>
              <Route path="/feedback-answer" element={<FeedbackAnswerPage></FeedbackAnswerPage>}></Route>

              {/* MANAGEMENT MEETING */}
              <Route path="/meeting-management" element={<MeetingManagementPage></MeetingManagementPage>}></Route>
              <Route path="/meeting-add" element={<MeetingAddtPage></MeetingAddtPage>}></Route>
              <Route path="/meeting-update" element={<MeetingUpdatePage></MeetingUpdatePage>}></Route>

              {/* MANAGEMENT RESIDENT */}
              <Route path="/resident-management" element={<ResidentManagementPage></ResidentManagementPage>}></Route>
              <Route path="/resident-craft-management" element={<ResidentCraftManagementPage></ResidentCraftManagementPage>}></Route>
              <Route path="/resident-profile-add" element={<ResidentProfileAddPage></ResidentProfileAddPage>}></Route>
              <Route path="/resident-profile-update" element={<ResidentProfileUpdatePage></ResidentProfileUpdatePage>}></Route>
              {/* PROFILE */}
              <Route path="/profile-resident" element={<ProfileResidentPage></ProfileResidentPage>}></Route>

              {/* MANAGEMENT TEAM */}
              <Route path="/team-management" element={<TeamManagementPage></TeamManagementPage>}></Route>
              <Route path="/team-add" element={<TeamAddPage></TeamAddPage>}></Route>
              <Route path="/team-update" element={<TeamUpdatePage></TeamUpdatePage>}></Route>
              <Route path="/team-term" element={<TeamTermPage></TeamTermPage>}></Route>
              <Route path="/residential-management" element={<ResidentialManagementPage></ResidentialManagementPage>}></Route>

              {/* MANAGEMENT TASK */}
              <Route path="/task-management" element={<TaskManagementPage></TaskManagementPage>}></Route>
              <Route path="/task-add" element={<TaskAddPage></TaskAddPage>}></Route>
              <Route path="/task-update" element={<TaskUpdatePage></TaskUpdatePage>}></Route>

              {/* MANAGEMENT TRANSACTIONS */}
              <Route path="/transactions-management" element={<TransactionsManagementPage></TransactionsManagementPage>}></Route>
              <Route path="/transactions-add" element={<TransactionsAddPage></TransactionsAddPage>}></Route>

            </Routes>
            <Navigation />
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};
export default MyApp;
