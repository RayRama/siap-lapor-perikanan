import React from "react";

export default function Input({
  label,
  type,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange?: any;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-[300px] border-[#C5CDD4] border-2 rounded-md p-2 bg-[#ECE4E4] placeholder:text-gray"
        required
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
