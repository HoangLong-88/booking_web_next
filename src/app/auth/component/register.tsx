import React from "react";
import { Label } from "./auth_input_label";
import { Input } from "./auth_input";
import { useState } from "react";
import { Trans } from "react-i18next";
import { Eye, EyeOff, Italic } from "lucide-react";
import { CustomButton } from "@/component/ui/Button";
import { useTranslation } from "react-i18next";

interface RegisterInputProps {
    contact: string;
    name?: string;
    type?: string;
}

const RegisterComponent: React.FC<RegisterInputProps> = ({contact}) => {
    const { t } = useTranslation();
    const [show, setShow] = useState(false);
    const Italic: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return <i>{children}</i>;
        };


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
                    className="pr-5"
                    >
                    </Input>
                    <Label htmlFor="password">
                        {t('authpage:label.password')}
                    </Label>

                    <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
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
                    >
                    </Input>
                    <Label htmlFor="confirm_password">
                        {t('authpage:label.confirm_password')}
                    </Label>
                </div>
            </div>
        </div>
    );
};
export { RegisterComponent }