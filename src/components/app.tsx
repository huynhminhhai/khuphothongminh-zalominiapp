import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { App, ZMPRouter, SnackbarProvider, useNavigate } from "zmp-ui";
import { RecoilRoot } from "recoil";
import { Navigation } from "./navigation";
import ScrollToTop from "./scroll-top";
import { NewsDetailPage, NewsPage } from "pages/news";
import { ResidentAddPage, ResidentCraftPage, ResidentEditPage, ResidentMemberPage, ResidentPage } from "pages/resident";
import { HomePage } from "pages/homepage";
import { MeetingDetailPage, MeetingPage } from "pages/meeting";
import { FeedbackAddPage, FeedbackDetailPage, FeedbackHistoryPage, FeedbackPage, FeedbackUpdatePage } from "pages/feedback";
import { SurveyDetailPage, SurveyPage } from "pages/survey";
import { FeedbackAnswerPage, FeedbackManagementPage, HouseholdDetailListPage, HouseholdHoNgheoUpdatePage, HouseholdManagementPage, HouseHoldOverviewPage, InsuranceManagementAddPage, InsuranceManagementPage, InvoiceManagementPage, ManagementPage, MeetingAddtPage, MeetingManagementPage, MeetingUpdatePage, NewsAddPage, NewsManagementPage, NewsUpdatePage, ReportFinanceCreatePage, ReportFinanceManagementPage, ReportFinanceUpdatePage, ResidentCraftManagementPage, ResidentialManagementPage, ResidentManagementPage, ResidentOverviewPage, ResidentProfileAddPage, ResidentProfileUpdatePage, SurveyAddPage, SurveyChartsPage, SurveyManagementPage, SurveyMemberPage, SurveyUpdatePage, TaskAddPage, TaskManagementPage, TaskUpdatePage, TeamAddPage, TeamManagementPage, TeamTermPage, TeamUpdatePage, TransactionsAddPage, TransactionsDetailAddPage, TransactionsDetailManagementPage, TransactionsDetailUpdatePage, TransactionsManagementPage, TransactionsUpdatePage } from "pages/management";
import { TeamDetailPage, TeamPage } from "pages/team";
import { ProfileResidentPage } from "pages/profile";
import { MyTaskDetailPage, TaskDetailPage, TaskPage } from "pages/task";
import { TransactionDetailPage, TransactionsPage } from "pages/transactions";
import { ReportFinanceChartPage, ReportFinanceDetailPage } from "pages/report-finnace";
import { AccountPage, ChangePasswordPage, LoginPage, ProfileAccountPage, RegisterApPage, WelcomePage } from "pages/account";
import { LoadingFullScreen } from "./loading";
import { useStoreApp } from "store/store";
import { NotificationPage } from "pages/notification";
import { ResidentMapPage } from "pages/maps";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getDataFromStorage } from "services/zalo";
import ForbiddenPage from "pages/403";
import { InvoiceDetailPage, InvoicePage } from "pages/invoice";
import { InsuranceAddPage, InsuranceAUpdatePage, InsurancePage } from "pages/insurance";
import { IsComingSoonModal, LoginModal, RegisterApModal } from "./modal";
import { useRefreshToken } from "apiRequest/auth";


const AuthWrapper = ({ children }) => {
  const { setToken, setAccount, accessToken, fetchResidentTypes } = useStoreApp();
  const navigate = useNavigate();
  const refreshTokenMutation = useRefreshToken();

  const loadAuthData = async () => {

    try {
      const storedData = await getDataFromStorage(["account", "accessToken", "refreshToken", "hanSuDungToken"]);

      if (!storedData || !storedData.accessToken) {
        setToken({ accessToken: null, refreshToken: null, hanSuDungToken: null });
        setAccount(null);
        navigate("/");
        return;
      }

      const storedAccount = storedData.account ? JSON.parse(storedData.account) : null;
      const storedAccessToken = storedData.accessToken || null;
      const storedRefreshToken = storedData.refreshToken || null;
      const storedHanSuDungToken = storedData.hanSuDungToken || null;

      console.log('Thông tin account:', storedAccount);
      console.log('Hạn sử dụng token:', storedHanSuDungToken);

      if (storedHanSuDungToken) {
        const now = new Date();
        const expiry = new Date(storedHanSuDungToken);

        const timeDiff = expiry.getTime() - now.getTime();
        const minutesLeft = timeDiff / (1000 * 60);

        if (minutesLeft <= 0) {
          // Token đã hết hạn
          setToken({ accessToken: null, refreshToken: null, hanSuDungToken: null });
          setAccount(null);
          navigate("/");
          return;
        }

        if (minutesLeft <= 15) {
          refreshTokenMutation.mutate();
        }
      }

      fetchResidentTypes();

      setToken({
        accessToken: storedAccessToken,
        refreshToken: storedRefreshToken,
        hanSuDungToken: storedHanSuDungToken
      });
      setAccount(storedAccount);
    } catch (error) {
      console.error("Lỗi khi load dữ liệu từ storage:", error);
      setToken({ accessToken: null, refreshToken: null, hanSuDungToken: null });
      setAccount(null);
      navigate("/");
    }
  };

  useEffect(() => {
    loadAuthData();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const storedHanSuDungToken = await getDataFromStorage(["hanSuDungToken"]);
      if (!storedHanSuDungToken?.hanSuDungToken) return;

      const now = new Date();
      const expiry = new Date(storedHanSuDungToken.hanSuDungToken);

      const timeDiff = expiry.getTime() - now.getTime();
      const minutesLeft = timeDiff / (1000 * 60);

      if (minutesLeft <= 0) {
        // Hết hạn → logout
        setToken({ accessToken: null, refreshToken: null, hanSuDungToken: null });
        setAccount(null);
        navigate("/");
      } else if (minutesLeft <= 15 && !refreshTokenMutation.isPending) {
        // Gần hết hạn → tự động refresh
        refreshTokenMutation.mutate();
      }
    }, 60 * 1000); // Check mỗi phút

    return () => clearInterval(interval); // Clear khi unmount
  }, []);

  // If accessToken is null, we'll redirect to login; otherwise, render children
  return children;
};

const MyApp = () => {

  const { isLoadingFullScreen } = useStoreApp();
  const queryClient = new QueryClient()

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App>
          <SnackbarProvider>
            <ZMPRouter>
              <ScrollToTop />
              <RegisterApModal />
              <IsComingSoonModal />
              <LoginModal />
              <LoadingFullScreen isLoading={isLoadingFullScreen} />
              <Routes>

                <Route path="/welcome" element={<WelcomePage></WelcomePage>}></Route>
                <Route path="/403" element={<ForbiddenPage></ForbiddenPage>}></Route>

                <Route
                  path="/*"
                  element={
                    <AuthWrapper>
                      <Routes>

                        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
                        <Route path="/" element={<HomePage></HomePage>}></Route>

                        {/* RESIDENT */}
                        <Route path="/resident" element={<ResidentPage></ResidentPage>}></Route>
                        <Route path="/resident-craft" element={<ResidentCraftPage></ResidentCraftPage>}></Route>
                        <Route path="/resident-member" element={<ResidentMemberPage></ResidentMemberPage>}></Route>
                        <Route path="/resident-add" element={<ResidentAddPage></ResidentAddPage>}></Route>
                        <Route path="/resident-edit" element={<ResidentEditPage></ResidentEditPage>}></Route>

                        {/* INSURANCE */}
                        <Route path="/insurance" element={<InsurancePage></InsurancePage>}></Route>
                        <Route path="/insurance-add" element={<InsuranceAddPage></InsuranceAddPage>}></Route>
                        <Route path="/insurance-update" element={<InsuranceAUpdatePage></InsuranceAUpdatePage>}></Route>

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
                        <Route path="/feedback-update" element={<FeedbackUpdatePage></FeedbackUpdatePage>}></Route>
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
                        <Route path="/my-task-detail" element={<MyTaskDetailPage></MyTaskDetailPage>}></Route>

                        {/* TRANSACTIONS */}
                        <Route path="/transactions" element={<TransactionsPage></TransactionsPage>}></Route>
                        <Route path="/transactions-detail" element={<TransactionDetailPage></TransactionDetailPage>}></Route>

                        {/* REPORT FINANCE */}
                        <Route path="/report-finance-detail" element={<ReportFinanceDetailPage></ReportFinanceDetailPage>}></Route>
                        <Route path="/report-finance-chart" element={<ReportFinanceChartPage></ReportFinanceChartPage>}></Route>

                        {/* INVOICE */}
                        <Route path="/invoice" element={<InvoicePage></InvoicePage>}></Route>
                        <Route path="/invoice-detail" element={<InvoiceDetailPage></InvoiceDetailPage>}></Route>

                        {/* ACCOUNT */}
                        <Route path="/account" element={<AccountPage></AccountPage>}></Route>
                        <Route path="/profile-account" element={<ProfileAccountPage></ProfileAccountPage>}></Route>
                        <Route path="/change-password" element={<ChangePasswordPage></ChangePasswordPage>}></Route>
                        <Route path="/register-ap" element={<RegisterApPage></RegisterApPage>}></Route>

                        {/* NOTIFICATION */}
                        <Route path="/notification" element={<NotificationPage></NotificationPage>}></Route>

                        {/* MAP */}
                        <Route path="/maps" element={<ResidentMapPage></ResidentMapPage>}></Route>

                        {/* MANAGEMENT */}
                        <Route path="/management" element={<ManagementPage></ManagementPage>}></Route>

                        {/* MANAGEMENT SURVEY */}
                        <Route path="/survey-management" element={<SurveyManagementPage></SurveyManagementPage>}></Route>
                        <Route path="/survey-add" element={<SurveyAddPage></SurveyAddPage>}></Route>
                        <Route path="/survey-update" element={<SurveyUpdatePage></SurveyUpdatePage>}></Route>
                        <Route path="/survey-charts" element={<SurveyChartsPage></SurveyChartsPage>}></Route>
                        <Route path="/survey-member" element={<SurveyMemberPage></SurveyMemberPage>}></Route>

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

                        {/* MANAGEMENT HOUSEHOLD */}
                        <Route path="/household-management" element={<HouseholdManagementPage></HouseholdManagementPage>}></Route>
                        <Route path="/household-hongheo-update" element={<HouseholdHoNgheoUpdatePage></HouseholdHoNgheoUpdatePage>}></Route>
                        <Route path="/household-detail-list" element={<HouseholdDetailListPage></HouseholdDetailListPage>}></Route>

                        {/* PROFILE */}
                        <Route path="/profile-resident" element={<ProfileResidentPage></ProfileResidentPage>}></Route>

                        {/* INSURANCE */}
                        <Route path="/insurance-management" element={<InsuranceManagementPage></InsuranceManagementPage>}></Route>
                        <Route path="/insurance-management-add" element={<InsuranceManagementAddPage></InsuranceManagementAddPage>}></Route>

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
                        <Route path="/transactions-update" element={<TransactionsUpdatePage></TransactionsUpdatePage>}></Route>
                        <Route path="/transactions-detail-add" element={<TransactionsDetailAddPage></TransactionsDetailAddPage>}></Route>
                        <Route path="/transactions-detail-management" element={<TransactionsDetailManagementPage></TransactionsDetailManagementPage>}></Route>
                        <Route path="/transactions-detail-update" element={<TransactionsDetailUpdatePage></TransactionsDetailUpdatePage>}></Route>

                        {/* MANAGEMENT INVOICE */}
                        <Route path="/invoice-management" element={<InvoiceManagementPage></InvoiceManagementPage>}></Route>

                        {/* MANAGEMENT REPORT FINANCE*/}
                        <Route path="/report-finance-management" element={<ReportFinanceManagementPage></ReportFinanceManagementPage>}></Route>
                        <Route path="/report-finance-add" element={<ReportFinanceCreatePage></ReportFinanceCreatePage>}></Route>
                        <Route path="/report-finance-update" element={<ReportFinanceUpdatePage></ReportFinanceUpdatePage>}></Route>

                        {/* MANAGEMENT OVERVIEW */}
                        <Route path="/overview-household" element={<HouseHoldOverviewPage></HouseHoldOverviewPage>}></Route>
                        <Route path="/resident-household" element={<ResidentOverviewPage></ResidentOverviewPage>}></Route>

                      </Routes>
                      <Navigation />
                    </AuthWrapper>
                  }
                />
              </Routes>
            </ZMPRouter>
          </SnackbarProvider>
        </App>
      </QueryClientProvider>
    </RecoilRoot>
  );
};
export default MyApp;
