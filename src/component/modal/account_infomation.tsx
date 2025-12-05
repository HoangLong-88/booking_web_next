"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/component/ui/Dialog";
import { CustomButton } from "@/component/ui/Button"
import { createPortal } from "react-dom";
import { Overlay } from "@/component/ui/Overlay";
import Image from "next/image";
import type { User } from "@/types/user"; 
import DragAndDropUpload from "@/component/ui/DragAndDropUpload";
import { useModal } from "@/utils/dom/useModal";
import { useFileUpload } from "@/hook/useFileUpload";
import { Popover, PopoverTrigger, PopoverContent } from "@/component/ui/Popover";
import { ChevronDown, ChevronUp, Pencil } from "lucide-react";
import { Stroke_Loader } from "../ui/Icon";
import { motion } from "framer-motion";

interface Props {
  user: User;
}

export default function AccountInformationModal({
  user,
}: Props) {
  const { isOpen, open, close, modalRef } = useModal(); 

  const { preview, handleUpload, fileName, loading, error, createPreview } = useFileUpload({
    user
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [openPopOver, setOpenPopOver] = useState(false);
  const onSubmit = async () => {
    if (!selectedFile) return;

    await handleUpload(selectedFile);
  };


  return (
    <>
      <div className="relative">
          <Image
              src={user.avatar_url ?? '/images/default-avatar.png'}
              alt="User Avatar"
              width={45}
              height={45}
              className="rounded-full h-full hover:opacity-70 ml-2"
              onClick={() => open()}
          ></Image>
      </div>
      {isOpen && createPortal(
      <>
        <Overlay onClick={() => close()}/> 
          <div
              className="inset-0 fixed z-50 flex items-center justify-center p-6 pointer-events-none"
              onClick={(e) => e.stopPropagation()}// prevent overlay close when clicking inside modal
              ref={modalRef}
            >
      
            <DialogContent className="max-w-md rounded-2xl p-6 bg-white pointer-events-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold" onClose={close}>
                  Account Information
                </DialogTitle>
              </DialogHeader>

              {/* Avatar Upload */}
              <DragAndDropUpload
                preview={preview}
                onUpload={(file) => {
                  setSelectedFile(file);
                  createPreview(file)}}
                accept="image/*"
                fileName={fileName}
              />

              {/* User Info */}
              <div className="mt-6 space-y-3">
                <Info label="User ID" value={user.id} />
                <Info label="Username" value={user.name} />
                <Info label="Email" value={user.email} />
                <Info label="Phone" value={user.phone} />
                <Info label="Role" value={user.role} />
              </div>

              <Popover open={openPopOver} onOpenChange={setOpenPopOver}>
                <PopoverTrigger asChild className="flex flex-row gap-1 items-center">
                  <button className="py-2 px-2 border border-0.5 text-[15px] rounded-xl">
                    More
                    {openPopOver ? <ChevronUp size={16}/> : <ChevronDown size={16}/> }
                  </button>
                </PopoverTrigger>
              </Popover>
                {openPopOver ? 
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1}}
                className="relative flex items-center justify-center gap-1">

                  <CustomButton variant={'outline'}>
                    Log out
                    </CustomButton>  

                  {!loading ? 
                  (<CustomButton type={'button'} variant={'default'} onClick={onSubmit}>
                    Update Profile
                  </CustomButton> ): (<Stroke_Loader />)}
                  {error ? <p className="text-sm text-red-500 mt-2">{error}</p> : null}
                </motion.div> :
                null
              }
            </DialogContent>
          </div>
        </>, document.body)
        }
    </>
  );
}

function Info({ label, value }: { label: string; value: string | null | undefined}) {
  return (
    <div className="flex justify-between pb-2">
      <span className="font-medium text-gray-700">{label}</span>
      <span className="text-gray-900">{value || "__"}</span>
    </div>
  );
}
