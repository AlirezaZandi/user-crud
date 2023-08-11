import { notFound, redirect } from "next/navigation";

import { USERS } from "@/routes";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { getRoles } from "@/client/services/roles";
import { SubmitButton } from "@/components/submitButton";
import { createUser, getUserById, updateUser } from "@/client/services/users";

type Props =
  | {
      isNew: true;
    }
  | {
      isNew: false;
      id: number;
    };

const UsersForm = async (props: Props) => {
  let user = undefined;

  if (!props.isNew) {
    user = await getUserById(props.id);
    if (!user) {
      notFound();
    }
  }

  const roles = await getRoles();

  const defaultValue = {
    fullName: user?.fullName ?? "",
    username: user?.username ?? "",
    email: user?.email ?? "",
    password: user?.passwordHash ?? "",
    role: user?.roles?.[0].id ?? "",
  };

  async function userAction(data: FormData) {
    "use server";

    if (props.isNew) {
      await createUser({
        fullName: data.get("fullName")?.toString() || "",
        username: data.get("username")?.toString() || "",
        email: data.get("email")?.toString() || "",
        passwordHash: data.get("password")?.toString() || "",
        roles: data.get("role")?.toString()
          ? [+(data.get("role")?.toString() || "")]
          : [],
      });

      revalidatePath(USERS.index);
      redirect(USERS.index);
    } else {
      await updateUser(props.id, {
        fullName: data.get("fullName")?.toString() || "",
        username: data.get("username")?.toString() || "",
        email: data.get("email")?.toString() || "",
        passwordHash: data.get("password")?.toString() || "",
        roles: data.getAll("role").map((role) => +role),
      });

      revalidatePath(USERS.index);
      redirect(USERS.index);
    }
  }

  return (
    <form className="flex flex-col gap-8" action={userAction}>
      <input
        type="text"
        placeholder="Full name"
        className="input input-bordered w-full"
        name="fullName"
        defaultValue={defaultValue.fullName}
      />
      <input
        type="text"
        placeholder="Username"
        className="input input-bordered w-full"
        name="username"
        defaultValue={defaultValue.username}
      />
      <input
        type="text"
        placeholder="Email"
        className="input input-bordered w-full"
        name="email"
        defaultValue={defaultValue.email}
      />

      <input
        type="text"
        placeholder="Password"
        className="input input-bordered w-full"
        name="password"
        defaultValue={defaultValue.password}
      />

      <select
        className="select select-bordered w-full"
        name="role"
        defaultValue={defaultValue.role}
      >
        <option disabled selected value={""}>
          Role
        </option>
        {roles.map((role) => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
      </select>

      <SubmitButton className="btn" loadingText="Loading...">
        {props.isNew ? "Add User" : "Edit User"}
      </SubmitButton>

      <Link href={USERS.index} className="btn">
        get back
      </Link>
    </form>
  );
};

export { UsersForm };
