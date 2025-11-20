"use client";

import React from "react";
import OtpInput from "react-otp-input";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const CustomOtpInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <OtpInput
      value={value}
      onChange={onChange}
      numInputs={6}
      shouldAutoFocus
      containerStyle="flex gap-2"
      renderInput={(props) => (
        <input
          {...props}
          type="tel"
          className="w-[42px] h-[50px] text-center text-xl border border-gray-300 rounded"
        />
      )}
    />
  );
};

export {CustomOtpInput};
