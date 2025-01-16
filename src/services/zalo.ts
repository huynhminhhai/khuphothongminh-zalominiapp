import { openWebview, openMediaPicker } from "zmp-sdk/apis";

export const openUrlInWebview = async (link: string): Promise<void> => {
    try {
        await openWebview({ url: link , config: {
            style: 'normal',
            leftButton: 'back'
        }});
        return Promise.resolve();
    } catch (err) {
        throw err;
    }
};

export const pickMedia = async () => {
    try {
        const { data } = await openMediaPicker({
            type: "photo",
            serverUploadUrl: "https://<your-domain-api>/upload/media",
        });
        const result = JSON.parse(data);
        console.log(result);
    } catch (error) {
        // xử lý khi gọi api thất bại
        console.log(error);
    }
};