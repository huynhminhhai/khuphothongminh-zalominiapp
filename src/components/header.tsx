import React, { FC } from "react";
import { Box, Header, useNavigate } from "zmp-ui";
import images from "assets/images";
import { useStoreApp } from "store/store";
import { maskPhoneNumber } from "utils/number";

export const HeaderHome: FC = () => {

  const navigate = useNavigate()
  const { account } = useStoreApp();

  return (
    <Header
      className="app-header no-border pl-4 flex-none pb-[6px]"
      showBackIcon={false}
      title={
        (
          <Box flex alignItems="center" className="space-x-3" onClick={() => navigate(`/account`)}>
            <div className="w-[54px] h-[54px] rounded-full border-[2px] border-[#e9ca9433] overflow-hidden bg-[#f0f0f0]">
              <img
                className="h-[100%] w-[100%] object-cover"
                src={account?.anhDaiDien || images.avatarDefault}
              />
            </div>
            <Box>
              <h4 className="text-[14px] font-semibold leading-[1] text-white uppercase mb-2">{account ? account.thongTinDanCu?.hoTen : 'Khách'}</h4>
              {/* <h5 className="text-[12px] font-medium leading-[1] tracking-widest text-white">{ account ? maskPhoneNumber(account.phoneNumber) : ''} ✦ Khu phố 9</h5> */}
              <h5 className="text-[12px] font-medium leading-[1] tracking-widest text-white">{ account ? `${maskPhoneNumber(account.thongTinDanCu?.dienThoai) || ''} ✦ ${account.thongTinDanCu?.tenAp || ''}` : ''}</h5>
            </Box>
          </Box>
        ) as unknown as string
      }
    />
  );
};