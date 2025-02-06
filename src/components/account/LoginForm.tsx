import React, { useState } from "react"
import { Box, Button, useNavigate, useSnackbar } from "zmp-ui"
import { FormDataLogin, schemaLogin } from "./type"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { FormInputField } from "components/form"
import { Icon } from "@iconify/react"
import { useLoginWithZalo } from "services/loginWithZalo"

const defaultValues: FormDataLogin = {
    username: '',
    password: ''
}

const LoginForm: React.FC = () => {

    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const { loginWithZalo } = useLoginWithZalo()

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormDataLogin>(defaultValues)
    const [isHide, setIsHide] = useState<boolean>(true)

    const { handleSubmit, reset, control, formState: { errors } } = useForm<FormDataLogin>({
        resolver: yupResolver(schemaLogin),
        defaultValues
    });

    const onSubmit: SubmitHandler<FormDataLogin> = (data) => {
        setFormData(data)

        if (data) {
            fetchApi()
        }
    };

    const fetchApi = () => {
        setLoading(true);
        try {
            console.log('call api login with: ', { ...formData });
            
            openSnackbar({
                icon: true,
                text: "Đăng nhập thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
            reset(defaultValues);
            navigate('/profile');
        } catch (error) {
            console.error('Error:', error);
            openSnackbar({
                icon: true,
                text: "Có lỗi xảy ra, vui lòng thử lại sau.",
                type: 'error',
                action: { text: "Đóng", close: true },
                duration: 5000,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box p={4} className="login-form">
            <Box>
                <div className="grid grid-cols-12 gap-x-3">
                    <div className="col-span-12 relative">
                        <Icon icon='mdi:user' fontSize={20} color="#731611" className="absolute left-[10px] z-10 top-[47%] translate-y-[-50%]"/>
                        <FormInputField
                            name="username"
                            label=""
                            placeholder="Số điện thoại"
                            control={control}
                            error={errors.username?.message}
                        />
                    </div>
                    <div className="col-span-12 relative">
                        <Icon icon='mdi:password' fontSize={20} color="#731611" className="absolute left-[10px] z-10 top-[47%] translate-y-[-50%]"/>
                        <FormInputField
                            name="password"
                            type={isHide ? 'password' : 'text'}
                            label=""
                            placeholder="Mật khẩu"
                            control={control}
                            error={errors.password?.message}
                        />
                        <div className="absolute right-[10px] z-10 top-[47%] translate-y-[-50%]" onClick={() => setIsHide(!isHide)}>
                            
                            {
                                isHide ? <Icon fontSize={20} color="#731611" icon='mdi:eye-off'/> : <Icon fontSize={20} color="#731611" icon='mdi:eye'/>
                            }
                        </div>
                    </div>
                    <div className="col-span-12 relative mt-[60px]">
                        <Button fullWidth onClick={handleSubmit(onSubmit)}>
                            {loading ? "Đang xử lý..." : "Đăng nhập"}
                        </Button>
                        <div className="mt-3 font-medium">Bạn không có tài khoản? <span onClick={() => loginWithZalo()} className="font-semibold text-[#731611]">Đăng nhập với zalo</span></div>
                    </div>
                </div>
            </Box>
        </Box>
    )
}

export default LoginForm