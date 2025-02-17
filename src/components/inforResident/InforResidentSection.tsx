import React from "react"
import { Box, Tabs } from "zmp-ui"
import InforResidentItemMain from "./InforResidentItemMain"
import MemberResidentSection from "./MemberResidentSection"

const InforResidentSection: React.FC = () => {
    return (
        <Box>
            <Box>
                <Tabs className="tab-resident">
                    <Tabs.Tab key="tab1" label="Thông tin cá nhân">
                        <InforResidentItemMain />
                    </Tabs.Tab>
                    <Tabs.Tab key="tab2" label="Thông tin gia đình">
                        <MemberResidentSection />
                    </Tabs.Tab>
                </Tabs>
            </Box>
        </Box>
    )
}

export default InforResidentSection