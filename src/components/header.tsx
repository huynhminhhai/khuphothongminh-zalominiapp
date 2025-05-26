import React, { FC } from "react";
import { Box, Header, useNavigate } from "zmp-ui";
import images from "assets/images";
import { useStoreApp } from "store/store";
import { formatPhoneNumber, maskPhoneNumber } from "utils/number";
import { getFullImageUrl } from "utils/file";

export const HeaderHome: FC = () => {

  const navigate = useNavigate()
  const { account } = useStoreApp();

  return (
    <Header
      className="app-header no-border pl-4 flex-none pb-[6px]"
      showBackIcon={false}
      title={
        (
          <Box>
            <Box flex alignItems="center" className="space-x-3" onClick={() => navigate(`/account`)}>
              <div className="w-[54px] h-[54px] rounded-full border-[2px] border-[#e3ecf9] overflow-hidden bg-[#f0f0f0]">
                <img
                  className="h-[100%] w-[100%] object-cover"
                  src={account?.anhDaiDien ? getFullImageUrl(account.anhDaiDien) : images.vnpt}
                />
              </div>
              <Box>
                <h4 className="text-[14px] font-semibold leading-[1] text-white uppercase mb-2">{account?.hoTen ? account.hoTen : 'Chưa cập nhật'}</h4>
                <h5 className="text-[12px] font-medium leading-[1] tracking-widest text-white">
                  {account && (
                    <>
                      {account?.dienThoai && maskPhoneNumber(account?.dienThoai)}
                      {" ✦ "}
                      {account?.tenAp || 'Chưa đăng ký thông tin khu phố/ấp'}
                    </>
                  )}
                </h5>
              </Box>
            </Box>
            <h5 className="mt-1 text-[11px] font-medium leading-[16px] tracking-widest text-white">
              Ứng dụng đang được phát triển, hoàn thiện
            </h5>

          </Box>
        ) as unknown as string
      }
    />
  );
};