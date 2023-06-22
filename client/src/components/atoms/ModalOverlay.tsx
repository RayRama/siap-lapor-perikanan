import React from "react";

export default function ModalOverlay({ setter }: any) {
  return (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
      onClick={() => {
        setter((oldVal: boolean) => !oldVal);
      }}
    />
  );
}
