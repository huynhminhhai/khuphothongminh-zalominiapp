import { Icon } from "@iconify/react";
import React, { FC, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { BottomNavigation } from "zmp-ui";
import { MenuItem } from "constants/types";
import { useStoreApp } from "store/store";
import { useRole } from "store/authSlice";

const tabs: Record<string, MenuItem> = {
  "/": {
    label: "Trang chủ",
    icon: <Icon icon="line-md:home-simple-filled" />,
    activeIcon: <Icon icon="line-md:home-simple-filled" />
  },
  "/notification": {
    label: "Thông báo",
    icon: <div className="relative"> <Icon icon='radix-icons:dot-filled' className="absolute top-[-10px] right-[-10px]" color="#ff4045" /> <Icon icon="line-md:bell-filled-loop" /></div>,
    activeIcon: <Icon icon="line-md:bell-filled-loop" />
  },
  "/management": {
    label: "Quản lý",
    icon: <Icon icon="line-md:folder-zip-filled" />,
    activeIcon: <Icon icon="line-md:folder-zip-filled" />
  },
  "/account": {
    label: "Tài khoản",
    icon: <Icon icon="line-md:person-filled" />,
    activeIcon: <Icon icon="line-md:person-filled" />
  },
};

export type TabKeys = keyof typeof tabs;

export const HAS_BOTTOM_NAVIGATION_PAGES = ["/", "/management", "/account", "/notification"];

export const Navigation: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { account } = useStoreApp();
  const role = useRole();

  const filteredTabs = useMemo(() => {
    if (role === "admin") {
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