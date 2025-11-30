import React from "react";
import { Label } from "./auth_input_label";
import { Input } from "./auth_input";
import { useState } from "react";
import { Trans } from "react-i18next";
import { Eye, EyeOff, Italic } from "lucide-react";
import { CustomButton } from "@/component/ui/Button";
import { motion } from "framer-motion";
import { useRegister } from "../hook/useRegister";
import { useTranslation } from "react-i18next";
import { usePasswordValidation } from "@/utils/validation/usePasswordValidation";

interface RegisterInputProps {
    contact: string;
    name?: string;
    type?: string;
}

const RegisterComponent: React.FC<RegisterInputProps> = ({contact}) => {
    const { t } = useTranslation();
    const [ password, setPassword ] = useState("")
    const [ name, setName ] = useState('')
    const [confirmPassword, setConfirmPassword] = useState("")
    const { isValid, passworderror } = usePasswordValidation(password, confirmPassword);
    const { registererror, handleRegister } = useRegister()
    const [show, setShow] = useState(false);
    const Italic: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return <i>{children}</i>;
        };
    const [keepLoggedIn, setKeepLoggedIn ] = useState(false);

    return (
        <div className="relative flex flex-col">
            <div className="relative">
                <Input
                id="contact"
                name="contact"
                type="text"
                placeholder={('')}
                value={contact}
                className="pointer-events-none"
                readOnly
                >
                </Input>
                <Label htmlFor="contact">{t("authpage:label.contact")}</Label>
            </div>
            <div className="relative mt-5">
                <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder={("")}
                className=""
                onChange={(e) => setName(e.target.value)}
            />
                <Label htmlFor="name">
                    <Trans
                    i18nKey={t('authpage:label.name')}
                    components={{ italic: <Italic /> }}
                    />
                </Label>
            </div>
            <div className="relative flex flex-row gap-2 mt-5">
                <div className="relative">
                    <Input
                    id="password"
                    name="password"
                    type={show ? "text" : "password"}
                    autoComplete="password"
                    placeholder=""
                    className= {`pr-5 ${passworderror === "passwordTooShort" ? "border-red-500" : "border-gray-300"}`}
                    onChange={(e) => setPassword(e.target.value)}
                    >
                    </Input>
                    <Label htmlFor="password">
                        {t('authpage:label.password')}
                    </Label>

                    <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className={`absolute right-3 top-3 text-gray-500 hover:text-gray-700` }
                    >
                    {show ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                <div className="relative">
                    <Input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    placeholder=""
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`${passworderror === "passwordsDoNotMatch" ? "border-red-500" : ""}`}
                    >
                    </Input>
                    <Label htmlFor="confirm_password">
                        {t('authpage:label.confirm_password')}
                    </Label>
                </div>
            </div>
            {passworderror &&
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm mt-1.5 text-red-600 ml-0.5"
                >
                    {passworderror === "passwordTooShort" ? t('authpage:password_length_error') :
                        passworderror === "passwordsDoNotMatch" ? t('authpage:password_match_error') : null
                    }
                </motion.p>
            }
            {!passworderror && password && confirmPassword &&
                <div className="relative">
                    <div className="flex items-center ps-4 mt-3 bg-neutral-primary-soft border border-primary rounded-xl shadow-xs">
                        <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" className="w-4 h-4 border 
                        border-default-medium 
                        rounded-xs 
                        focus:ring-2 
                        focus:ring-brand-soft"
                        checked={keepLoggedIn}
                        onChange={(e) => setKeepLoggedIn(e.target.checked)}></input>
                        <label htmlFor="bordered-checkbox-1" className="select-none w-full py-3 ms-2 text-sm font-medium text-heading">{t('authpage:remember_me_checkbox')}</label>
                    </div>
                    <CustomButton 
                    className="mt-2 w-full"
                    type="button"
                    onClick={() => {handleRegister(contact, password, keepLoggedIn, name);}}>
                        {t('authpage:sign_up_btn')}
                    </CustomButton>
                </div>
            }
            {registererror && <p>{registererror}</p>}
        </div>
    );
};
export { RegisterComponent }