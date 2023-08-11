import { ROLES } from "@/routes";
import Link from "next/link";

import { revalidatePath } from "next/cache";
import { deleteRole, getRoles } from "@/client/services/roles";
import { SubmitButton } from "@/components/submitButton";

const Page = async () => {
  const roles = await getRoles();

  const deleteAction = async (formData: FormData) => {
    "use server";
    const id = formData.get("id");
    if (!id) return;

    await deleteRole(+id);

    revalidatePath(ROLES.index);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.description}</td>

              <th className="flex gap-4">
                <form action={deleteAction}>
                  <input hidden name="id" value={role.id} />
                  <SubmitButton
                    className="btn btn-error btn-xs"
                    loadingText="Loading ..."
                  >
                    Delete
                  </SubmitButton>
                </form>
                <Link
                  href={ROLES.item(role.id)}
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
