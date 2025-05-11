import { useGetInsuranceListNormal } from "apiRequest/insurance"
import { PrimaryButton } from "components/button"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { InsuranceItem } from "components/insurance"
import UserInfoSkeleton from "components/skeleton/info/UserInfoSkeleton"
import React, { useEffect, useState } from "react"
import { useStoreApp } from "store/store"
import { Box, Page, useNavigate } from "zmp-ui"

const InsurancePage: React.FC = () => {
    
    const { account } = useStoreApp()
    const navigate = useNavigate()

    const [param, setParam] = useState<any>({
        page: 1,
        pageSize: 10,
        keyword: '',
        DanCuId: account?.thongTinDanCu?.danCuId || 0,
        LoaiBaoHiemId: 1,
        MaSo: '',
    })

    useEffect(() => {
        if (account?.thongTinDanCu?.danCuId) {
            setParam(prev => ({
                ...prev,
                DanCuId: account.thongTinDanCu.danCuId
            }));
        }
    }, [account?.thongTinDanCu?.danCuId]);

    const { data: insuranceList, isLoading: insuranceLoading } = useGetInsuranceListNormal(param);

    if (insuranceLoading) return <UserInfoSkeleton />
    if (!account?.thongTinDanCu?.danCuId) return (
        <Box px={4}>
            <EmptyData
                title="Chưa có thông tin dân cư để cập nhật thẻ BHYT"
                desc="Vui lòng liên hệ với ban quản trị khu phố/ấp để đăng ký thông tin cư dân"
            />
        </Box>
    )

    return (
        <Page className="relative flex-1 flex flex-col !bg-[#f4f5f6] pb-[0px]">
            <Box>
                <HeaderSub title="Bảo hiểm y tế" onBackClick={() => navigate('/')} />
                <Box p={4}>
                    {
                        insuranceList?.data?.length > 0 ? (
                            insuranceList.data.map((item: any, index: number) => {
                                
                                return (
                                    <div key={index}>
                                        <InsuranceItem data={item} />
                                    </div>
                                )
                        })
                        ) : (
                            <EmptyData title="Chưa có thẻ BHYT" />
                        )
                    }
                </Box>
                <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-2">
                    <Box py={3} flex alignItems="center" justifyContent="center" className="w-full">
                        <PrimaryButton fullWidth label="Thêm thẻ BHYT" handleClick={() => navigate('/insurance-add')} />
                    </Box>
                </div>
            </Box>
        </Page>
    )
}

export default InsurancePage
