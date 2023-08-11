import { ROLES, USERS } from "@/routes";
import Link from "next/link";
import { PropsWithChildren } from "react";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <main className="p-4">{children}</main>
      </div>
      <aside className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          <li>
            <Link href={USERS.index}>Users</Link>
          </li>
          <li>
            <Link href={ROLES.index}>Roles</Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export { DashboardLayout };
