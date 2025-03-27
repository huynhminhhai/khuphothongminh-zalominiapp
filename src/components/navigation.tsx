import { Icon } from "@iconify/react";
import React, { FC, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { BottomNavigation } from "zmp-ui";
import { MenuItem } from "constants/types";
import { useStoreApp } from "store/store";

const tabs: Record<string, MenuItem & { requiresLogin?: boolean; requiredRole?: string }> = {
  "/": {
    label: "Trang chủ",
    icon: <Icon icon="line-md:home-simple-filled" />,
    activeIcon: <Icon icon="line-md:home-simple-filled" />,
  },
  "/notification": {
    label: "Thông báo",
    icon: (
      <div className="relative">
        <Icon icon="radix-icons:dot-filled" className="absolute top-[-10px] right-[-10px]" color="#ff4045" />
        <Icon icon="line-md:bell-filled-loop" />
      </div>
    ),
    activeIcon: <Icon icon="line-md:bell-filled-loop" />,
    requiresLogin: true, // Yêu cầu đăng nhập
  },
  "/management": {
    label: "Quản lý",
    icon: <Icon icon="line-md:folder-zip-filled" />,
    activeIcon: <Icon icon="line-md:folder-zip-filled" />,
    requiresLogin: true, // Yêu cầu đăng nhập
    requiredRole: "TRUONG_AP", // Chỉ hiển thị nếu là TRUONG_AP
  },
  "/account": {
    label: "Tài khoản",
    icon: <Icon icon="line-md:person-filled" />,
    activeIcon: <Icon icon="line-md:person-filled" />,
  },
};

export type TabKeys = keyof typeof tabs;

export const HAS_BOTTOM_NAVIGATION_PAGES = ["/", "/management", "/account", "/notification"];

export const Navigation: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { account } = useStoreApp();

  const hasBottomNav = useMemo(() => {
    return HAS_BOTTOM_NAVIGATION_PAGES.includes(location.pathname);
  }, [location]);

  if (!hasBottomNav) {
    return <></>;
  }

  const hasRole = (role: string) => {
    return account?.vaiTros.some((r) => r.tenVaiTro === role) || false;
  };

  // Lọc các tab hiển thị dựa trên đăng nhập và vai trò
  const visibleTabs = Object.keys(tabs).filter((path: TabKeys) => {
    const tab = tabs[path];

    // Không yêu cầu đăng nhập → hiển thị luôn
    if (!tab.requiresLogin) {
      return true;
    }

    // Yêu cầu đăng nhập nhưng chưa đăng nhập → ẩn
    if (!account) {
      return false;
    }

    // Có yêu cầu vai trò → kiểm tra vai trò
    if (tab.requiredRole) {
      return hasRole(tab.requiredRole);
    }

    // Chỉ yêu cầu đăng nhập, không cần vai trò → hiển thị nếu đã đăng nhập
    return true;
  });

  return (
    <>
      <BottomNavigation
        id="footer"
        activeKey={location.pathname}
        className="z-10 box-shadow-3"
      >
        {visibleTabs.map((path: TabKeys) => (
          <BottomNavigation.Item
            key={path}
            label={tabs[path].label}
            icon={tabs[path].icon}
            activeIcon={tabs[path].activeIcon}
            onClick={() => navigate(path)}
          />
        ))}
      </BottomNavigation >
    </>
  );
};