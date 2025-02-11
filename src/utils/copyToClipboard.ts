export const copyToClipboard = async (text: string, onSuccess?: () => void, onError?: () => void) => {
    try {
        const tempInput = document.createElement("textarea");
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);

        if (onSuccess) onSuccess();
    } catch (error) {
        console.error('Lỗi khi sao chép:', error);
        if (onError) onError();
    }
};