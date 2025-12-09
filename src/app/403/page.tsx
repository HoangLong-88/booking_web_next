'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CustomButton } from "@/component/ui/Button";
import { Popover, PopoverTrigger } from "@/component/ui/Popover";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ForbiddenPage() {
  const [openPopOver, setOpenPopOver] = useState(false);
  const { t } = useTranslation();
  return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6">
      <div className="max-w-3xl w-full flex items-center gap-10">

        <div className="flex-shrink-0">
          <div className="p-6 bg-red-100 dark:bg-red-900/40 rounded-2xl shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 text-red-600 dark:text-red-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 3h.01m9.938-3a9.938 9.938 0 11-19.876 0 9.938 9.938 0 0119.876 0z"
              />
            </svg>
          </div>
        </div>


        <div>
          <h1 className="flex items-center gap-3 mb-4">
            <span className="text-7xl font-extrabold text-gray-900 dark:text-gray-100 leading-none">
                403
            </span>

            <span className="text-3xl font-light text-gray-500 dark:text-gray-400 pb-1">
                |
            </span>

            <span className="text-4xl font-semibold text-gray-900 dark:text-gray-100 leading-none">
                {t('403page:title')}
            </span>
            </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 max-w-md">
            {t('403page:description')}
          </p>
              <Popover open={openPopOver} onOpenChange={setOpenPopOver}>
                <PopoverTrigger asChild className="flex flex-row gap-1 items-center mb-4">
                  <button className="py-2 px-2 border border-0.5 text-[15px] rounded-xl">
                    {t('403page:more_btn')}
                    {openPopOver ? <ChevronUp size={16}/> : <ChevronDown size={16}/> }
                  </button>
                </PopoverTrigger>
              </Popover>
                {openPopOver ? 
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1}}
                transition={{ duration: 0.2 }}
                className="relative flex items-start justify-start gap-1">

                  <CustomButton variant={'outline'} onClick={() => {
                    window.location.href = '/';
                    }}>
                    {t('403page:back_home_btn')}
                    </CustomButton> 
                  <CustomButton type={'button'} variant={'default'} onClick={() => {
                    window.location.href = '/auth';
                  }}>
                    {t('403page:login_page_btn')}
                  </CustomButton>
                </motion.div> :
                null
              }
        </div>

      </div>
    </div>
  );
}
