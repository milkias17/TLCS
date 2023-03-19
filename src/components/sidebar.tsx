import { Children, FunctionComponent, ReactElement } from "react";

type SideBarProps = {
  children: ReactElement | Array<ReactElement>;
};

const SideBar: FunctionComponent<SideBarProps> = ({ children }) => {
  return (
    <>
      <div className="drawer-side rounded border-solid border-r-2 border-primary">
        <ul className="menu p-4 text-base-content gap-4">
          {Children.map(children, (child, index) => {
            return <li key={index}>{child}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default SideBar;
