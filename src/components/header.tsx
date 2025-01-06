import React, { FC } from "react";
import { Box, Header } from "zmp-ui";
import images from "assets/images";

export const HeaderHome: FC = () => {
  return (
    <Header
      className="app-header no-border pl-4 flex-none pb-[6px]"
      showBackIcon={false}
      title={
        (
          <Box flex alignItems="center" className="space-x-3">
            <div className="w-[60px] h-[60px] rounded-full border-[2px] border-[yellow] overflow-hidden">
                <img
                className="h-[100%] w-[100%] object-cover"
                src={images.avatar}
                />
            </div>
            <Box>
              <h4 className="text-[20px] font-semibold leading-[1] text-white uppercase">Huynh Minh Hai</h4>
            </Box>
          </Box>
        ) as unknown as string
      }
    />
  );
};