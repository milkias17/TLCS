import { Children, FunctionComponent, ReactElement, ReactNode } from "react";

type SideBarProps = {
  children: ReactElement | Array<ReactElement>;
};

const SideBar: FunctionComponent<SideBarProps> = ({ children }) => {
  const childrenArray = Children.toArray(children);

  return (
    <>
      <div className="drawer-side rounded border-solid border-r-2 border-primary">
        <ul className="menu p-4 w-80 text-base-content gap-4">
          {Children.map(childrenArray, (child: ReactNode, index) => {
            return <li key={index}>{child}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default SideBar;
