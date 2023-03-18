import { FunctionComponent, ReactElement } from "react";

type SideBarProps = {
  children: ReactElement | Array<ReactElement>;
};

const SidebarContent: FunctionComponent<SideBarProps> = ({ children }) => {
  return (
    <>
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center">
        {children}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
    </>
  );
};

export default SidebarContent;
