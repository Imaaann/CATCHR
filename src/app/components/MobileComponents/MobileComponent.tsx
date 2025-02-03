import { ReactNode } from "react";

function MobileComponent({ children }: { children: ReactNode }) {
  return <div className="md:hidden">{children}</div>;
}

export default MobileComponent;
