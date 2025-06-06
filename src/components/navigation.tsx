import { Icon } from "@iconify/react";
import React, { FC, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { BottomNavigation } from "zmp-ui";
import { MenuItem } from "constants/types";
import { useStoreApp } from "store/store";
import http from "services/http";

const Navigation: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [notificationData, setNotificationData] = useState<any[]>([]);

  const { account, accessToken, isTrigger, setIsTrigger } = useStoreApp();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const query = `?page=1&pageSize=9999&ApId=${account?.apId}&MaXa=${account?.maXa}`;
        const res = await http.get<any>(`/thongbao/dagui${query}`);
        setNotificationData(res.data ?? []);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (account?.apId && account?.maXa) {
      fetchNotifications();
    }
  }, [account?.apId, account?.maXa, isTrigger]);

  const unreadCount = useMemo(() => {
    return notificationData?.filter((item) => {
      return !item.chiTietThongBao || item.chiTietThongBao.tinhTrangId === 7;
    }).length ?? 0;
  }, [notificationData]);

  const hasUnread = unreadCount > 0;

  const tabs: Record<string, MenuItem & { requiresLogin?: boolean; requiredRole?: string }> = {
    "/": {
      label: "Trang chủ",
      icon: <div className="relative"><Icon icon="ant-design:home-twotone" /></div>,
    },
    "/notification": {
      label: "Thông báo",
      icon:
        <div className="relative">
          {
            hasUnread && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-[4px] text-[10px] bg-red-500 text-white rounded-full flex items-center justify-center">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )
          }
          <Icon icon="ant-design:bell-twotone" />
        </div>,
    },
    "/management": {
      label: "Quản lý",
      icon: <div className="relative"><Icon icon="ic:twotone-folder-zip" /></div>,
    },
    "/account": {
      label: "Tài khoản",
      icon: <div className="relative"><Icon icon="ic:twotone-person" /></div>,
    },
  };

  const HAS_BOTTOM_NAVIGATION_PAGES = ["/", "/management", "/account", "/notification"];

  const hasBottomNav = useMemo(() => {
    return HAS_BOTTOM_NAVIGATION_PAGES.includes(location.pathname);
  }, [location]);

  if (!hasBottomNav) return null;

  const isAdmin = account?.vaiTros.some((r) => r.tenVaiTro === "Administrators");
  const isRegisteredWithAnotherRole =
    account?.vaiTros.some((r) => r.tenVaiTro === "Registered Users") &&
    (account?.vaiTros.length ?? 0) > 1;

  const visibleTabs = Object.keys(tabs).filter((path) => {
    if (path === "/") return true;
    if (path === "/account") return true;
    if (path === "/notification") return !!accessToken;
    if (!account) return false;
    if (isAdmin) return true;
    return isRegisteredWithAnotherRole;
  });

  return (
    <BottomNavigation id="footer" activeKey={location.pathname} className="z-10 box-shadow-3">
      {visibleTabs.map((path) => (
        <BottomNavigation.Item
          key={path}
          label={tabs[path].label}
          icon={tabs[path].icon}
          activeIcon={tabs[path].activeIcon}
          onClick={() => {
            setIsTrigger(!isTrigger);
            navigate(path)
          }}
        />
      ))}
    </BottomNavigation>
  );
};

export default Navigation;
