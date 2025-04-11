import { openWebview, openMediaPicker, openChat, getUserInfo, getPhoneNumber, getAccessToken, openPermissionSetting, getStorage, setStorage, removeStorage, createShortcut } from "zmp-sdk/apis";

export const openUrlInWebview = async (link: string, style?: 'normal' | 'bottomSheet'): Promise<void> => {
    try {
        await openWebview({
            url: link, config: {
                style: style || 'normal',
                leftButton: 'back'
            }
        });
        return Promise.resolve();
    } catch (err) {
        console.log(err);
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

export const pickFile = async () => {
    try {
        const { data } = await openMediaPicker({
            type: "file",
            serverUploadUrl: "https://mini.zalo.me/documents/api/openMediaPicker/?lang=vi",
        });
        const result = JSON.parse(data);
        console.log(result);
    } catch (error) {
        // xử lý khi gọi api thất bại
        console.log(error);
    }
};

export type openChatScreenProps = {
    type?: 'user' | 'oa';
    idUser: any;
    message: string;
}

export const openChatScreen = async ({ type = 'user', idUser, message }: openChatScreenProps): Promise<void> => {
    try {
        await openChat({
            type: type,
            id: idUser,
            message: message,
        });

        return Promise.resolve();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getUser = async (): Promise<any> => {
    try {
        const { userInfo } = await getUserInfo({});

        return userInfo
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getPhoneNumberAccount = async (): Promise<any> => {
    try {
        const { token } = await getPhoneNumber({})

        return token
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAccessTokenAccount = async (): Promise<any> => {
    try {
        const accessToken = await getAccessToken({})

        return accessToken
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const openPermissionSettingApp = async () => {
    try {
        await openPermissionSetting({});
    } catch (error) {
        console.log(error);
        throw error
    }
};

export const createMiniAppShortcut = async () => {
    try {
        await createShortcut({
            params: {
                utm_source: "shortcut",
            },
        });
    } catch (error) {
        // xử lý khi gọi api thất bại
        console.log(error);
    }
};

export const setDataToStorage = async (data) => {
    try {
        const { errorKeys } = await setStorage({
            data,
        });

        // Kiểm tra nếu có lỗi trong quá trình lưu trữ
        if (errorKeys && errorKeys.length > 0) {
            console.error("Có lỗi xảy ra khi lưu trữ dữ liệu:", errorKeys);
            return;
        }

    } catch (error) {
        console.log(error);
    }
};

export const getDataFromStorage = async (keys: string[]) => {
    try {
        const data = await getStorage({ keys });

        // Kiểm tra nếu tất cả giá trị đều null hoặc undefined
        const isEmpty = keys.every((key) => !data[key]);
        if (isEmpty) {
            console.warn("Không có dữ liệu hợp lệ trong storage.");
            return null;
        }

        return data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ storage:", error);
        return null;
    }
};

export const removeDataFromStorage = async (keys: string[]) => {
    try {
        if (!keys.length) {
            console.warn("Danh sách keys cần xóa đang rỗng.");
            return;
        }

        await removeStorage({ keys });
        console.log(`Đã xóa thành công các key: ${keys.join(", ")}`);
    } catch (error) {
        console.error("Lỗi khi xóa dữ liệu khỏi storage:", error);
    }
};