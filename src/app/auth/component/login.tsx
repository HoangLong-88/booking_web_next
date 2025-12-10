import React, { useState } from "react";
import { Trans } from "react-i18next";
import { Label } from "./auth_input_label";
import { Input } from "./auth_input";
import { Eye, EyeOff, Italic } from "lucide-react";
import { CustomButton } from "@/component/ui/Button";
import { motion } from "framer-motion";
import { useLogin } from "../hook/useLogin";
import { useTranslation } from "react-i18next";

interface LoginInputProps {
    contact: string;
}
const LoginComponent: React.FC<LoginInputProps> = ({contact}) => {
    const { t } = useTranslation();
    const { handleLogin, loading, loginerror } = useLogin();
    const [ password, setPassword ] = useState("");
    const [keepLoggedIn, setKeepLoggedIn ] = useState(false);
    const [show, setShow] = useState(false);
    return (
        <div className="relative flex flex-col">
            <div className="relative text-xl font-medium text-gray-700">
                <Trans
                i18nKey={t('authpage:contact_login_title')}
                values={{ contact }}
                components={{ bold: <strong /> }}
                className=""
                />
            </div>
            <div className="relative mt-5">
                <Input
                id="password"
                name="password"
                type={show ? "text" : "password"}
                placeholder={t("authpage:placeholder.password") || ""}
                className=""
                onChange={(e) => setPassword(e.target.value)}
                />
                <Label htmlFor="password">{t("authpage:label.password")}</Label>
                <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShow(!show)}
                >
                {show ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
            </div>
            <div className="flex items-center justify-between mt-4">
                <label className="flex items-center">
                <input
                    type="checkbox"
                    checked={keepLoggedIn}
                    onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                    className="mr-2"
                />
                <span className="text-sm">{t("authpage:remember_me_checkbox")}</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                {t("authpage:contact_login_forgot_password")}
                </a>
            </div>
            {loginerror && (
                <motion.p
                className="text-red-600 text-sm mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                >
                {loginerror}
                </motion.p>
            )}
            {password && 
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
            <CustomButton
                className="mt-6 w-full"
                onClick={() => handleLogin(contact, password, keepLoggedIn)}
                disabled={loading}
            >
                {loading ? t("authpage:loading") : t("authpage:login_btn")}
            </CustomButton>
            </motion.div>
            }
        </div>
    );
}
export { LoginComponent };