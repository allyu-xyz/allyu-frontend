import { ReactNode } from "react";
export default function Button({
  onClick,
  disabled,
  children,
}: {
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
