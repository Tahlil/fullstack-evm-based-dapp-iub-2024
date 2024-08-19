import { ReactNode } from "react";

const Wrapper = ({ children }: { children: ReactNode }) => (
  <div className="max-w-100 mx-auto px-7">{children}</div>
);

export { Wrapper };
