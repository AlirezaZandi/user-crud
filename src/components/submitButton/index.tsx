"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  loadingText?: string;
};

export function SubmitButton(props: Props) {
  const { pending } = useFormStatus();

  return (
    <button {...props} disabled={pending} type='submit'>
      {pending ? props.loadingText : props.children}
    </button>
  );
}
