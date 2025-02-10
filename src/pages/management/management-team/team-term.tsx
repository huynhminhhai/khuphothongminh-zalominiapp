import { Icon } from "@iconify/react";
import images from "assets/images";
import { PrimaryButton } from "components/button";
import { HeaderSub } from "components/header-sub"
import { TermModalAdd } from "components/team";
import { TEAMDATA, TeamType, TERMDATA, TermType } from "constants/utinities";
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { Avatar, Box, Modal, Page, useNavigate, useSnackbar } from "zmp-ui"

const TeamTermPage: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [staffData, setStaffData] = useState<TeamType>()
    const [termData, setTermData] = useState<TermType[]>()
    const [modalAddForm, setModalAddForm] = useState<boolean>(false)
    const [termId, setTermId] = useState<number>(0)

    const navigate = useNavigate()
    const { openSnackbar } = useSnackbar();
    const [searchParams] = useSearchParams();

    const staffId = searchParams.get("id");

    const fetchStaffData = async () => {
        setLoading(true);
        try {

            const data = TEAMDATA.find(staff => staff.id === Number(staffId))

            setStaffData(data)

        } catch (error) {
            console.error("Failed to fetch resident data:", error);
            openSnackbar({
                text: "Không thể tải thông tin. Vui lòng thử lại sau.",
                type: "error",
                duration: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchTermData = async () => {
        setLoading(true);
        try {

            const data = TERMDATA.filter(term => term.staff_id === Number(staffId))

            setTermData(data)

        } catch (error) {
            console.error("Failed to fetch resident data:", error);
            openSnackbar({
                text: "Không thể tải thông tin. Vui lòng thử lại sau.",
                type: "error",
                duration: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTermData();
        fetchStaffData();
    }, [staffId]);

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Thông tin nhiệm kỳ" />
                <Box>
                    <Box>
                        {
                            staffData &&
                            <Box>
                                <div className="relative flex flex-col items-center justify-center py-[30px]">
                                    <img src={images.shape3} alt="shape3" className="bg-[#e9ca9433] absolute z-10 top-0 left-0 w-full h-full object-none" />
                                    <Avatar size={120} src={staffData.avatar ||
                                        'https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png'
                                    } className="relative z-20 border-[4px] border-white" />
                                    <div className="relative z-20 uppercase text-[18px] font-bold mt-3">{staffData.fullname}</div>
                                </div>
                            </Box>
                        }
                    </Box>
                    <Box pt={8} px={4}>
                        <div className="border-l-[1px] border-[#808080] flex flex-col gap-6">
                            {
                                termData &&
                                termData.map((term, index) => (
                                    <div key={index} className="p-4 ml-6 relative border-b-[1px] border-dashed">
                                        <div className="absolute left-[-38px] top-[50%] translate-y-[-50%]">
                                            <Icon color={term.isCurrent ? '#731611' : '#808080'} icon='stash:circle-dot' fontSize={27} />
                                        </div>
                                        <div className="flex">
                                            <Box className="border-r-[1px] flex-1">
                                                <h3 className="text-[18px] font-semibold mb-1" style={{color: term.isCurrent ? '#731611' : ''}}>{term.position}</h3>
                                                <h4 className="text-[14px] font-medium text-[#808080]">{term.start_date} - {term.end_date}</h4>
                                            </Box>
                                            <Box>
                                                <div className="flex items-center justify-center h-full pl-4">
                                                    <Icon className="text-[#808080]" icon='lucide:edit' fontSize={22} onClick={() => {
                                                        setTermId(term.id)
                                                        setModalAddForm(true)
                                                    }} />
                                                </div>
                                            </Box>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </Box>
                    <Box>
                        <div className="fixed bottom-0 left-0 flex justify-center w-[100%] bg-white">
                            <Box py={3} className="w-[100%]" flex alignItems="center" justifyContent="center">
                                <PrimaryButton fullWidth label={"Thêm nhiệm kỳ"} handleClick={() => {
                                    setTermId(0)
                                    setModalAddForm(true)
                                }} />
                            </Box>
                        </div>
                    </Box>
                </Box>
            </Box>

            <TermModalAdd
                visible={modalAddForm}
                onClose={() => setModalAddForm(false)}
                staffId={Number(staffId)}
                termId={termId}
            />
        </Page>
    )
}

export default TeamTermPage