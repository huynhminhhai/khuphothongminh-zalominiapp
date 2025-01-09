import { openWebview } from "zmp-sdk/apis";

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