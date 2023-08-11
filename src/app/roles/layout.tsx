import { PropsWithChildren } from "react";
import { ROLES } from "@/routes";
import Link from "next/link";

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex justify-between prose max-w-none">
        <h2>Roles</h2>
        <Link href={ROLES.create} className="btn btn-info">
          Add new Role +
        </Link>
      </div>
      {children}
    </div>
  );
}
