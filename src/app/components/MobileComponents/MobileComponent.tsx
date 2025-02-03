import { ReactNode } from "react";

function MobileComponent({ children }: { children: ReactNode }) {
  return <div className="lg:hidden">{children}</div>;
}

export default MobileComponent;
