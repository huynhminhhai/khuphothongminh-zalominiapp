import { Icon } from "@iconify/react";
import React, { FC, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { BottomNavigation } from "zmp-ui";
import { MenuItem } from "constants/types";
import { useStoreApp } from "store/store";

const tabs: Record<string, MenuItem & { requiresLogin?: boolean; requiredRole?: string }> = {
  "/": {
    label: "Trang chủ",
    icon: <div className="relative"><Icon icon="line-md:home-simple-twotone" /></div>,
    activeIcon: <Icon icon="line-md:home-simple-twotone" />,
  },
  // "/notification": {
  //   label: "Thông báo",
  //   icon: (
  //     <div className="relative">
  //       <Icon icon="radix-icons:dot-filled" className="absolute top-[-10px] right-[-10px]" color="#c46574" />
  //       <Icon icon="line-md:bell-filled-loop" />
  //     </div>
  //   ),
  //   activeIcon: <Icon icon="line-md:bell-filled-loop" />,
  //   requiresLogin: true, // Yêu cầu đăng nhập
  // },
  "/management": {
    label: "Quản lý",
    icon: <div className="relative"><Icon icon="line-md:folder-zip-twotone" /></div>,
    activeIcon: <Icon icon="line-md:folder-zip-twotone" />,
  },
  "/account": {
    label: "Tài khoản",
    icon: <div className="relative"><Icon icon="line-md:person-twotone" /></div>,
    activeIcon: <Icon icon="line-md:person-twotone" />,
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

  const isAdmin = account?.vaiTros.some((r) => r.tenVaiTro === "Administrators");

  const isRegisteredWithAnotherRole =
    account?.vaiTros.some((r) => r.tenVaiTro === "Registered Users") &&
    (account?.vaiTros.length ?? 0) > 1;

  const visibleTabs = Object.keys(tabs).filter((path: TabKeys) => {

    if (path === "/" || path === "/account") {
      return true;
    }

    // Nếu không đăng nhập → không hiện gì cả
    if (!account) return false;

    // Là admin → luôn thấy hết
    if (isAdmin) return true;

    // Chỉ hiển thị nếu có "Registered Users" và ít nhất 1 vai trò khác
    return isRegisteredWithAnotherRole;
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