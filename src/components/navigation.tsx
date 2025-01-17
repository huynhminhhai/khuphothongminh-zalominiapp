import { Icon } from "@iconify/react";
import React, { FC, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { BottomNavigation } from "zmp-ui";
import { MenuItem } from "constants/types";

const tabs: Record<string, MenuItem> = {
  "/": {
    label: "Trang chủ",
    icon: <Icon icon="fa6-solid:house" />,
    activeIcon: <Icon icon="fa6-solid:house" />
  },
  // "/notification": {
  //   label: "Thông báo",
  //   icon: <Icon icon="solar:bell-bold" />,
  //   activeIcon: <Icon icon="solar:bell-bold" />
  // },
  // "/account": {
  //   label: "Tài khoản",
  //   icon: <Icon icon="icon-park-solid:people" />,
  //   activeIcon: <Icon icon="icon-park-solid:people" />
  // },
  "/management": {
    label: "Quản lý",
    icon: <Icon icon="eos-icons:cluster-management" />,
    activeIcon: <Icon icon="eos-icons:cluster-management" />
  },
};

export type TabKeys = keyof typeof tabs;

export const HAS_BOTTOM_NAVIGATION_PAGES = ["/", "/management"];

export const Navigation: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hasBottomNav = useMemo(() => {
    return HAS_BOTTOM_NAVIGATION_PAGES.includes(location.pathname);
  }, [location]);

    if (!hasBottomNav) {
      return <></>;
    }

  return (
    <>
      <BottomNavigation
        id="footer"
        activeKey={location.pathname}
        className="z-10"
      >
        {Object.keys(tabs).map((path: TabKeys) => (
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