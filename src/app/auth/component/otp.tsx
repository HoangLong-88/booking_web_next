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
      containerStyle={{display: 'flex', gap: "0.5rem"}}
      inputStyle={{
        width: '3.5rem',
        height: '50px',
        textAlign: 'center',
        fontSize: '1.25rem',
        border: '1px solid #565656',
        borderRadius: '0.375rem',
      }}
      renderInput={(props) => (
        <input
          {...props}
          type="tel"
        />
      )}
    />
  );
};

export {CustomOtpInput};
