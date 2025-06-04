import { HeaderSub } from "components/header-sub"
import React from "react"
import { Box, Page, useNavigate } from "zmp-ui"

const ChatBoxPage: React.FC = () => {

    const navigate = useNavigate()

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Trợ lý ảo giải đáp TTHC" onBackClick={() => navigate('/')} />
                <Box>
                    <iframe
                        allow="camera; microphone"
                        id="vnpt_ai_i_live_chat"
                        name="1748423256038"
                        style={
                            {
                                border: 'none',
                                backgroundColor: 'transparent',
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: '100%',
                                height: '100%',
                            }
                        }
                        src="https://livechat.vnpt.vn/bot_ver3/1b203220-18fe-11f0-aeec-0b2c67da27d1?botname=%5Bobject%20Object%5D&amp;botMetadata=%7B%7D&amp;username=undefined&amp;sendername=4daadd6b-bf2b-4a2c-8ef2-75ac1b960b4e&amp;isVoting=true&amp;isOnMic=undefined&amp;hiddenAudio=undefined&amp;isSupport=undefined&amp;isSuggestions=false&amp;isSaveHistory=true&amp;typeIcon=dynamic&amp;logoDynamic=https%3A%2F%2Fstorage-smartbot.vnpt.vn%2Fsmartbot-v2%2Fchatbot_images%2F12192024%2F7aaede01-4718-4d3a-8b8d-bd6800e462f7.gif&amp;greeting=&amp;isTyping=true&amp;timeTyping=3000&amp;autoOpen=false&amp;timeOpenUrl=2000&amp;scendpoint=livechat.vnpt.ai%3A443&amp;single_pdf=undefined&amp;time=1748423256026&amp;iconbot=https%3A%2F%2Fcdn.vnpt.me%2Fcss%2FLOGO_LONGAN.svg&amp;styles=%7B%22bg%22%3A%22%23fbf7f4%22%2C%22button%22%3A%7B%22bg%22%3A%22%239d1616%22%2C%22color%22%3A%22%23fff%22%7D%2C%22answer%22%3A%7B%22bg%22%3A%22%23ffffff%22%2C%22color%22%3A%22%23545454%22%2C%22fontSize%22%3A%2214px%22%7D%2C%22question%22%3A%7B%22bg%22%3A%22%239d1616%22%2C%22color%22%3A%22%23fff%22%2C%22fontSize%22%3A%2214px%22%7D%2C%22botIcon%22%3A%22https%3A%2F%2Fcdn.vnpt.me%2Fcss%2FLOGO_LONGAN.svg%22%7D&amp;colorIcon=%7B%22colorType%22%3A%22linear%22%2C%22colorVoteIcon%22%3A%22%23FCB017%22%2C%22colorExpand%22%3A%22%23FFFFFF%22%2C%22colorClose%22%3A%22%23FFFFFF%22%2C%22colorFrom%22%3A%22%239d1616%22%2C%22colorTo%22%3A%22%23df7575%22%2C%22colorSend%22%3A%22%239d1616%22%2C%22colorMic%22%3A%22%239d1616%22%7D&amp;placeholderInput=Anh%20ch%E1%BB%8B%20c%E1%BA%A7n%20h%E1%BB%97%20tr%E1%BB%A3%20g%C3%AC%20%E1%BA%A1%3F"
                        bis_size="{&quot;x&quot;:1147,&quot;y&quot;:185,&quot;w&quot;:367,&quot;h&quot;:533,&quot;abs_x&quot;:1147,&quot;abs_y&quot;:185}" bis_id="fr_qcjqh446iep0f0knpb0umr"
                        bis_depth="0"
                        bis_chainid="2"
                    ></iframe>
                </Box>
            </Box>
        </Page>
    )
}

export default ChatBoxPage