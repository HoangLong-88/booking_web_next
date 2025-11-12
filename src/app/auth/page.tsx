'use client';
import React from "react";

import { useAuthSwitchForm } from "@/utils/validation/useEmailPhoneSwitch";
import { useVerifyContact } from "./hook/useVerifyContact";

import { Google_Icon, Phone_Icon, Mail_Icon } from "@/component/ui/Icon";
import { CustomButton } from "@/component/ui/Button";
import { AuthContactField } from "@/component/auth/auth_contact_field";

function Login_Register_Page() {
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
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="bg-white text-gray-800 p-8 rounded shadow-xl/20 w-full max-w-md">
                <h2 className= "text-2xl font-bold mb-5 text-left">Sign in or create an account</h2>
                <h1 className= "text-md mb-5 text-left">You can sign in using your Sky account to access our services.</h1>
                <form className="space-y-4">
                    <div className='relative'>
                    <AuthContactField
                      type={isPhoneMode ? "phone" : "email"}
                      value={isPhoneMode ? phone : email}
                      onChange={isPhoneMode ? (e) => setPhone(e.target.value) : (e) => setEmail(e.target.value)}
                      isValid={isValid}
                      checking={checking}
                      exists={exists}
                      onContinue={handleContinue}
                    />
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                  </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">
                        Or continue with
                        </span>
                    </div>
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-2 place-items-center">
                  <CustomButton variant={'outline'} size={'lg'}>
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