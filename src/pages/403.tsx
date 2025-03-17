import { Icon } from "@iconify/react";
import SecondaryButton from "components/button/SecondaryButton";
import React from "react";
import { useNavigate } from "zmp-ui";

const ForbiddenPage = () => {

    const navigate = useNavigate()

    return (
        <div className="h-[100vh] flex flex-col items-center justify-center">
            <img src="https://cdn3d.iconscout.com/3d/premium/thumb/403-forbidden-error-3d-icon-download-in-png-blend-fbx-gltf-file-formats--status-code-http-response-pack-seo-web-icons-5073043.png?f=webp" alt="403" />
            <h1 className="text-[16px] font-semibold mb-4">Bạn không có quyền truy cập trang này</h1>
            <SecondaryButton size="small" label="Về trang chủ" handleClick={() => navigate('/')} iconLeft={<Icon icon='pepicons-pop:down-left' />}/>
        </div>
    );
};

export default ForbiddenPage;