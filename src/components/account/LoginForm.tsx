import React, { useState } from "react"
import { Box, Button } from "zmp-ui"
import { FormDataLogin, schemaLogin } from "./type"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { FormInputField } from "components/form"
import { Icon } from "@iconify/react"
import { useLoginWithZalo } from "services/loginWithZalo"
import { useLogin } from "apiRequest/auth"

const defaultValues: FormDataLogin = {
    username: 'demo',
    password: '123456'
}

const LoginForm: React.FC = () => {

    const { loginWithZalo } = useLoginWithZalo()

    const [loading, setLoading] = useState(false);
    const [isHide, setIsHide] = useState<boolean>(true)

    const { mutateAsync } = useLogin();

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataLogin>({
        resolver: yupResolver(schemaLogin),
        defaultValues
    });

    const onSubmit: SubmitHandler<FormDataLogin> = (data) => {
        if (data) {
            fetchApi(data)
        }
    };

    const fetchApi = async (data: FormDataLogin) => {
        setLoading(true);

        try {
            await mutateAsync({ username: data.username, password: data.password });
        } catch (error) {
            console.error("Error:", error);
        } finally {
            reset(defaultValues);
            setLoading(false);
        }

    }

    return (
        <Box p={4} className="login-form">
            <Box>
                <div className="grid grid-cols-12 gap-x-3">
                    <div className="col-span-12 relative">
                        <Icon icon='mdi:user' fontSize={20} color="var(--primary-color)" className="absolute left-[10px] z-10 top-[47%] translate-y-[-50%]" />
                        <FormInputField
                            name="username"
                            label=""
                            placeholder="Tên đăng nhập"
                            control={control}
                            error={errors.username?.message}
                        />
                    </div>
                    <div className="col-span-12 relative">
                        <Icon icon='mdi:password' fontSize={20} color="var(--primary-color)" className="absolute left-[10px] z-10 top-[47%] translate-y-[-50%]" />
                        <FormInputField
                            name="password"
                            type={isHide ? 'password' : 'text'}
                            label=""
                            placeholder="Mật khẩu"
                            control={control}
                            error={errors.password?.message}
                        />
                        <div className="absolute right-[10px] z-10 top-[47%] translate-y-[-50%]" onClick={() => setIsHide(prev => !prev)}>
                            <Icon
                                fontSize={20}
                                color="var(--primary-color)"
                                icon={isHide ? 'mdi:eye-off' : 'mdi:eye'}
                            />
                        </div>
                    </div>
                    <div className="col-span-12 relative mt-[60px]">
                        <Button disabled={loading} fullWidth onClick={handleSubmit(onSubmit)}>
                            {loading ? "Đang xử lý..." : "Đăng nhập"}
                        </Button>
                        <div className="mt-3 font-medium">Bạn không có tài khoản? <span onClick={() => loginWithZalo()} className="font-semibold text-[var(--primary-color)]">Đăng nhập với zalo</span></div>
                    </div>
                </div>
            </Box>
        </Box>
    )
}

export default LoginForm