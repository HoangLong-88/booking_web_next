'use client';
import React from "react";

import { useAuthSwitchForm } from "@/utils/validation/useEmailPhoneSwitch";
import { useVerifyContact } from "./hook/useVerifyContact";
import { CustomOtpInput } from "./component/otp";

import { Google_Icon, Phone_Icon, Mail_Icon } from "@/component/ui/Icon";
import { CustomButton } from "@/component/ui/Button";
import { AuthContactField } from "@/app/auth/component/auth_contact_field";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trans } from 'react-i18next';
import { sendOtp } from "./service/otp";


function Login_Register_Page() {
  const [step, setStep] = useState<"check" | "otp" |  "register" | "login">("check");
    const {
    switchToPhone: isPhoneMode,
    setSwitchToPhone,
    email,
    setEmail,
    phone,
    setPhone,
    isValid,
  } = useAuthSwitchForm();
    const { checking, exists, handleContinue } = useVerifyContact({
    switchToPhone: isPhoneMode,
    email,
    phone,
  });
  const [otp, setOtp] = useState("");
  const [contact, setContact] = useState('');
  const onContinue = async () => {
    const result = await handleContinue();

      if (result === false) {
        await sendOtp(contact)
        setStep('otp');
      } else {
        setStep('login');
      }
    };
    const { t } = useTranslation();
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="bg-white text-gray-800 p-8 rounded shadow-xl/20 w-full max-w-md">
                <h2 className= {`${step === 'check' ? 'text-2xl' : 'text-xl'} font-bold mb-5 text-left`}>
                  {step === 'check' ? t("authpage:title") : t("authpage:otp_title")}
                  </h2>
                <h1 className= {`{'text-md'} mb-5 text-left`}>
                  {step === 'check' ? 
                  t("authpage:subtitle") : (
                  <Trans
                    i18nKey="authpage:otp_subtitle"
                    values={{ contact }}
                    components={{ bold: <strong /> }}
                  />)}
                  </h1>
                <form className="space-y-4">
                    <div className='relative'>
                    <AnimatePresence mode="wait">
                      {step === "check" && (
                        <motion.div
                          key="check"
                          initial={false}
                          animate={{}}
                          exit={{ x: -300, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 100 }}
                        >
                          <AuthContactField
                            type={isPhoneMode ? "phone" : "email"}
                            value={isPhoneMode ? phone : email}
                            onChange={isPhoneMode ? (e) => 
                              {setPhone(e.target.value); setContact(e.target.value)} 
                              : (e) => {setEmail(e.target.value); setContact(e.target.value)}}
                            isValid={isValid}
                            checking={checking}
                            exists={exists}
                            onContinue={onContinue}
                            onContactChange={(value) => setContact(value)}
                          />
                        </motion.div>
                      )}
                      {step === "otp" && (
                        <motion.div
                          key="otp"
                          initial={{ x: 300, opacity: 0}}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -300, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 120 }}
                        >
                          <CustomOtpInput
                            value={otp} onChange={setOtp}
                          />
                          <CustomButton>
                            
                          </CustomButton>
                        </motion.div>
                      )}

                      {step === "register" && (
                        <motion.div
                          key="register"
                          initial={{ x: 300, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -300, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 120 }}
                        >
                          {/* <RegisterComponent
                            email={email}
                            phone={phone}
                            onFinish={() => setStep("login")} // sau khi đăng ký xong → trượt sang login
                          /> */}
                        </motion.div>
                      )}

                      {step === "login" && (
                        <motion.div
                          key="login"
                          initial={{ x: 300, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -300, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 120 }}
                        >
                          {/* <LoginComponent /> */}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                  </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">
                        {t("authpage:continue_with")}
                        </span>
                    </div>
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-2 place-items-center">
                  <CustomButton 
                  variant={'outline'} 
                  size={'lg'}>
                    <Google_Icon />
                  </CustomButton>
                  <CustomButton
                    type="button"
                    onClick={() => setSwitchToPhone(!isPhoneMode)}
                    variant={'outline'}
                    size={'lg'}
                  >
                    {isPhoneMode ? <Mail_Icon /> : <Phone_Icon />}
                  </CustomButton>
                  </div>
            </div>
          </div>
    );  
}
export default Login_Register_Page; 