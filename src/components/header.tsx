import React, { FC } from "react";
import { Box, Header, Text } from "zmp-ui";
import appConfig from "../../app-config.json";
import images from "assets/images";

export const HeaderApp: FC = () => {
  return (
    <Header
      className="app-header no-border pl-4 flex-none pb-[6px]"
      showBackIcon={false}
      title={
        (
          <Box flex alignItems="center" className="space-x-2">
            <div className="w-[60px] h-[60px] rounded-full border-[1px] border-[yellow] overflow-hidden">
                <img
                className="h-[100%] w-[100%] object-cover"
                src={images.avatar}
                />

            </div>
            <Box>
              <h4 className="text-[18px] leading-[1] font-medium text-white">{appConfig.app.title}</h4>
            </Box>
          </Box>
        ) as unknown as string
      }
    />
  );
};