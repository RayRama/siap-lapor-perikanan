import React from "react";

export default function Input({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div>
      <label>{label}</label>
      <input type={type} placeholder={placeholder} />
    </div>
  );
}
