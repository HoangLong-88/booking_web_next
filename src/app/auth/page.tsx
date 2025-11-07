'use client';
import React from "react";
import Link from "next/link";

import { useAuthSwitchForm } from "@/utils/validation/useEmailPhoneSwitch";
import { Google_Icon, Phone_Icon, Mail_Icon } from "@/component/ui/Icon";
import { Input } from "@/component/auth/auth_input";
import { Label } from "@/component/auth/auth_input_label";
import { CustomButton } from "@/component/ui/Button";
import { AuthContactField } from "@/component/auth/auth_contact_field";
import {
  Card,
  CardTitle,
} from '@/component/ui/Card';

function Login_Register_Page() {
    const {
    switchToPhone,
    setSwitchToPhone,
    email,
    setEmail,
    phone,
    setPhone,
    isValid,
  } = useAuthSwitchForm();
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="bg-white text-gray-800 p-8 rounded shadow-xl/20 w-full max-w-md">
                <h2 className= "text-2xl font-bold mb-5 text-left">Sign in or create an account</h2>
                <h1 className= "text-md mb-5 text-left">You can sign in using your Sky account to access our services.</h1>
                <form className="space-y-4">
                    <div className='relative'>
                    <AuthContactField
                      type={switchToPhone ? "phone" : "email"}
                      value={switchToPhone ? phone : email}
                      onChange={switchToPhone ? (e) => setPhone(e.target.value) : (e) => setEmail(e.target.value)}
                      isValid={isValid}
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
                    onClick={() => setSwitchToPhone(!switchToPhone)}
                    variant={'outline'}
                    size={'lg'}
                  >
                    {switchToPhone ? <Mail_Icon /> : <Phone_Icon />}
                  </CustomButton>
                  </div>
            </div>
          </div>
    );  
}
export default Login_Register_Page; 