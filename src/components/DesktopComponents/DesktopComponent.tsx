import { ReactNode } from "react";

function DesktopComponent({ children }: { children: ReactNode }) {
  return <div className="hidden md:block">{children}</div>;
}

export default DesktopComponent;
