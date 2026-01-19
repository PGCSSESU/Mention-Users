import { useState,type ReactNode } from "react";

interface HoverCardProps {
  trigger: ReactNode;
  content: ReactNode;
  openDelay?: number;
}

export function HoverCard({
  trigger,
  content,
  openDelay = 0,
}: HoverCardProps) {
  const [open, setOpen] = useState(false);
  let timer: any;

  const show = () => {
    timer = setTimeout(() => setOpen(true), openDelay);
  };

  const hide = () => {
    clearTimeout(timer);
    setOpen(false);
  };

  return (
    <span
      className="relative inline-block"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {trigger}
      {open && content}
    </span>
  );
}
