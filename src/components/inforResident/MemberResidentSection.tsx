import React from "react"
import { Box, useNavigate } from "zmp-ui"
import { PrimaryButton } from "components/button"
import { Icon } from "@iconify/react"
import { useGetFamilyMembers } from "apiRequest/resident"
import MemberListSkeleton from "components/skeleton/info/MemberListSkeleton"
import { EmptyData } from "components/data"
import { InforResidentItemSub } from "."

const MemberResidentSection: React.FC<{danCuId: number, isForUser?: boolean}> = ({danCuId, isForUser = true}) => {

    const navigate = useNavigate()

    const { data: familyMembers, isLoading, error } = useGetFamilyMembers(danCuId);

    if (isLoading) return <MemberListSkeleton />;
    if (error) return <EmptyData title="Có lỗi khi lấy danh sách người dùng" />;
    if (!familyMembers || familyMembers.length <= 0) return <EmptyData title="Không có thành viên nào" />

    return (
        <Box pt={4}>
            <Box>
                <Box>
                    {
                        familyMembers.map((item: any) => (
                            <InforResidentItemSub key={item.danCuId} data={item} isForUser={isForUser} />
                        ))
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default MemberResidentSection