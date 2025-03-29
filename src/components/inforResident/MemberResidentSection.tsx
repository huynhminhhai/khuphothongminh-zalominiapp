import React from "react"
import { Box, useNavigate } from "zmp-ui"
import { PrimaryButton } from "components/button"
import { Icon } from "@iconify/react"
import { useGetFamilyMembers } from "apiRequest/resident"
import MemberListSkeleton from "components/skeleton/info/MemberListSkeleton"
import { EmptyData } from "components/data"
import { InforResidentItemSub } from "."

const MemberResidentSection: React.FC<{danCuId: number}> = ({danCuId}) => {

    const navigate = useNavigate()

    const { data: familyMembers, isLoading, error } = useGetFamilyMembers(danCuId);

    if (isLoading) return <MemberListSkeleton />;
    if (error) return <EmptyData title="Có lỗi khi lấy danh sách người dùng" />;
    if (familyMembers.length === 0) return <EmptyData title="Không có thành viên nào" />

    return (
        <Box pt={4}>
            <Box>
                {/* <InforResidentList />
                <Divider />
                <InforResidentCraftList /> */}
                <Box>
                    {
                        familyMembers && familyMembers.map((item: any) => (
                            <InforResidentItemSub key={item.danCuId} data={item} />
                        ))
                    }
                </Box>
                <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white box-shadow-2">
                    <Box py={3} flex alignItems="center" justifyContent="center" className="w-full">
                        <PrimaryButton fullWidth label="Thêm thành viên" handleClick={() => navigate('/resident-add')} iconLeft={<Icon fontSize={16} icon='material-symbols:add-rounded' />} />
                    </Box>
                </div>
            </Box>
        </Box>
    )
}

export default MemberResidentSection