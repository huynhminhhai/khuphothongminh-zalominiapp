import { useGetInsuranceListNormal } from "apiRequest/insurance"
import { PrimaryButton } from "components/button"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { InsuranceItem } from "components/insurance"
import UserInfoSkeleton from "components/skeleton/info/UserInfoSkeleton"
import React, { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useStoreApp } from "store/store"
import { Box, Page, useNavigate } from "zmp-ui"

const InsurancePage: React.FC = () => {

    const { account } = useStoreApp()
    const navigate = useNavigate()

    const [searchParams] = useSearchParams();
    const danCuId = searchParams.get("danCuId");

    const [param, setParam] = useState<any>({
        page: 1,
        pageSize: 999,
        keyword: '',
        ApId: account?.apId,
        MaXa: account?.maXa,
        DanCuId: Number(danCuId),
        LoaiBaoHiemId: 1,
        MaSo: '',
    })

    const { data: insuranceList, isLoading: insuranceLoading } = useGetInsuranceListNormal(param);

    return (
        <Page className="relative flex-1 flex flex-col !bg-[#f4f5f6] pb-[72px]">
            <Box>
                <HeaderSub title="Bảo hiểm y tế" />
                <Box p={4}>
                    {insuranceLoading ? (
                        <UserInfoSkeleton />
                    )
                    : insuranceList?.data?.length > 0 ? (
                        insuranceList.data.map((item: any, index: number) => (
                            <div key={index}>
                                <InsuranceItem data={item} />
                            </div>
                        ))
                    ) : (
                        <EmptyData title="Chưa có thẻ BHYT" />
                    )}
                </Box>
            </Box>
        </Page>
    )
}

export default InsurancePage
