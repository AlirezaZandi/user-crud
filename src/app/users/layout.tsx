import { PropsWithChildren } from "react";
import {  USERS } from "@/routes";
import Link from "next/link";

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex justify-between prose max-w-none">
        <h2>Users</h2>
        <Link href={USERS.create} className="btn btn-info">
          Add new User +
        </Link>
      </div>
      {children}
    </div>
  );
}
