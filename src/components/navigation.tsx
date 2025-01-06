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
  "/notification": {
    label: "Thông báo",
    icon: <Icon icon="solar:bell-bold" />,
    activeIcon: <Icon icon="solar:bell-bold" />
  },
  "/account": {
    label: "Tài khoản",
    icon: <Icon icon="icon-park-solid:people" />,
    activeIcon: <Icon icon="icon-park-solid:people" />
  },
  "/setting": {
    label: "Cài đặt",
    icon: <Icon icon="lsicon:setting-filled" />,
    activeIcon: <Icon icon="lsicon:setting-filled" />
  },
};

export type TabKeys = keyof typeof tabs;

export const NO_BOTTOM_NAVIGATION_PAGES = ["/test"];

export const Navigation: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const noBottomNav = useMemo(() => {
    return NO_BOTTOM_NAVIGATION_PAGES.includes(location.pathname);
  }, [location]);

    if (noBottomNav) {
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