import { USERS } from "@/routes";
import Link from "next/link";

import { revalidatePath } from "next/cache";

import { SubmitButton } from "@/components/submitButton";
import { deleteUser, getUsers } from "@/client/services/users";

const Page = async () => {
  const users = await getUsers();

  const deleteAction = async (formData: FormData) => {
    "use server";
    const id = formData.get("id");
    if (!id) return;

    await deleteUser(+id);

    revalidatePath(USERS.index);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.fullName}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                {user.roles.map((role) => (
                  <span
                    key={role.id}
                    className="badge badge-primary badge-outline"
                  >
                    {role.name}
                  </span>
                ))}
              </td>

              <th className="flex gap-4">
                <form action={deleteAction}>
                  <input hidden name="id" value={user.id} />
                  <SubmitButton
                    className="btn btn-error btn-xs"
                    loadingText="Loading ..."
                  >
                    Delete
                  </SubmitButton>
                </form>
                <Link
                  href={USERS.item(user.id)}
                  className="btn btn-info btn-xs"
                >
                  Edit
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
