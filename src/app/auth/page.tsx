import React from "react";
import Link from "next/link";

import { Google_Icon, Phone_Icon } from "@/component/ui/Icon";
import { Input } from "@/component/ui/auth/auth_input";
import { Label } from "@/component/ui/auth/auth_input_label";
import {
  Card,
  CardTitle,
} from '@/component/ui/Card';

function Login_Register_Page() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="bg-white text-gray-800 p-8 rounded shadow-md w-full max-w-md">
                <h2 className= "text-2xl font-bold mb-5 text-left">Sign in or create an account</h2>
                <h1 className= "text-md mb-5 text-left">You can sign in using your Sky account to access our services.</h1>
                <form className="space-y-4">
                    <div className='relative'>
                                    <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="chatgpt@mail.ln"
                                    />        
                                    <Label htmlFor="email">Email address</Label>
                    </div>
                </form>
                
                <div className="mt-6">
                    <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-gray-50 px-2 text-gray-500">
                        Or continue with
                        </span>
                    </div>
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-2 place-items-center">
                  <button
                    type="button"
                    className="inline-flex w-1/2 justify-center rounded-md border border-gray-300 bg-gray-50 px-4 py-4 text-sm font-medium text-gray-500 hover:bg-gray-100"
                  >
                    <Google_Icon />
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-1/2 justify-center rounded-md border border-gray-300 bg-gray-50 px-4 py-4 text-sm font-medium text-gray-500 hover:bg-gray-100"
                  >
                    <Phone_Icon />
                  </button>
                  </div>
            </div>
        </div>
    );  
}
export default Login_Register_Page; 