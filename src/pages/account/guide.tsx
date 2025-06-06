import { Icon } from "@iconify/react";
import images from "assets/images";
import videos from "assets/videos";
import { HeaderSub } from "components/header-sub"
import React, { useState } from "react"
import { Box, Button, List, Page, Sheet, Text } from "zmp-ui"

const GuidePage: React.FC = () => {

    const [sheetVisible, setSheetVisible] = useState(false);
    const { Item } = List;

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Hướng dẫn sử dụng các chức năng" />
                <Box>
                    <Box>
                        <List className="bg-white rounded-lg">
                            <Item
                                onClick={() => {
                                    setSheetVisible(true);
                                }}
                                title="Chức năng Đăng nhập"
                                prefix={<img src={images.video} width={30} />}
                                suffix={<Icon fontSize={20} icon="formkit:right" />}
                            />
                        </List>
                    </Box>
                </Box>
            </Box>
            <Sheet
                visible={sheetVisible}
                onClose={() => setSheetVisible(false)}
                autoHeight
                mask
                handler
                swipeToClose
            >
                <Box p={2} className="custom-bottom-sheet" flex flexDirection="column">
                    <Box mb={4}>
                        <Text.Title className="text-center">
                            Chức năng Đăng nhập
                        </Text.Title>
                    </Box>
                    <Box mb={4} className="bottom-sheet-cover">
                        <img className="h-[450px] w-auto mx-auto box-shadow-2" src={videos.dangnhap} alt="dangnhap" />
                    </Box>
                    <Box px={4} flex flexDirection="row" mt={1}>
                        <Box style={{ flex: 1 }} pr={1}>
                            <Button
                                size="medium"
                                fullWidth
                                variant="secondary"
                                onClick={() => {
                                    setSheetVisible(false);
                                }}
                            >
                                Đóng
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Sheet>
        </Page>
    )
}

export default GuidePage