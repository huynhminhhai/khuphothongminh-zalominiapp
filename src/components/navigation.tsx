import { Icon } from "@iconify/react";
import React, { FC, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { BottomNavigation } from "zmp-ui";
import { MenuItem } from "constants/types";
import { useStoreApp } from "store/store";

const tabs: Record<string, MenuItem> = {
  "/": {
    label: "Trang chủ",
    icon: <Icon icon="fa6-solid:house" />,
    activeIcon: <Icon icon="fa6-solid:house" />
  },
  "/notification": {
    label: "Thông báo",
    icon: <div className="relative"> <Icon icon='radix-icons:dot-filled' className="absolute top-[-10px] right-[-10px]" color="#ff4045" /> <Icon icon="solar:bell-bold" /></div>,
    activeIcon: <Icon icon="solar:bell-bold" />
  },
  "/management": {
    label: "Quản lý",
    icon: <Icon icon="eos-icons:cluster-management" />,
    activeIcon: <Icon icon="eos-icons:cluster-management" />
  },
  "/account": {
    label: "Tài khoản",
    icon: <Icon icon="icon-park-solid:people" />,
    activeIcon: <Icon icon="icon-park-solid:people" />
  },
};

export type TabKeys = keyof typeof tabs;

export const HAS_BOTTOM_NAVIGATION_PAGES = ["/", "/management", "/account", "/notification"];

export const Navigation: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { account } = useStoreApp();

  const filteredTabs = useMemo(() => {
    if (account && account.role === 'admin') {
      return tabs;
    }

    const { "/management": _, ...restTabs } = tabs;
    return restTabs;
  }, [account]);

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
        className="z-10 box-shadow-3"
      >
        {Object.keys(filteredTabs).map((path: TabKeys) => (
          <BottomNavigation.Item
            key={path}
            label={filteredTabs[path].label}
            icon={filteredTabs[path].icon}
            activeIcon={filteredTabs[path].activeIcon}
            onClick={() => navigate(path)}
          />
        ))}
      </BottomNavigation >
    </>
  );
};