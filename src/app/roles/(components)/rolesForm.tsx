import { client } from "@/client";
import { notFound, redirect } from "next/navigation";

import { ROLES } from "@/routes";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { createRole, getRoleById, updateRole } from "@/client/services/roles";
import { SubmitButton } from "@/components/submitButton";

type Props =
  | {
      isNew: true;
    }
  | {
      isNew: false;
      id: number;
    };

const RolesForm = async (props: Props) => {
  let role = undefined;

  if (!props.isNew) {
    role = await getRoleById(props.id);
    if (!role) {
      notFound();
    }
  }

  const defaultValue = {
    name: role?.name ?? "",
    description: role?.description ?? "",
  };

  async function roleAction(data: FormData) {
    "use server";

    const name = data.get("name")?.toString();

    if (!name) {
      throw new Error("Invalid input.");
    }

    if (props.isNew) {
      await createRole({
        name: name,
        description: data.get("description")?.toString() || null,
      });

      revalidatePath(ROLES.index);
      redirect(ROLES.index);
    } else {
      await updateRole(props.id, {
        name: name,
        description: data.get("description")?.toString() || null,
      });

      revalidatePath(ROLES.index);
      redirect(ROLES.index);
    }
  }

  return (
    <form className="flex flex-col gap-8" action={roleAction}>
      <input
        type="text"
        placeholder="Name"
        className="input input-bordered w-full max-w-xs"
        name="name"
        defaultValue={defaultValue.name}
      />

      <textarea
        className="textarea textarea-bordered"
        placeholder="Description"
        name="description"
        defaultValue={defaultValue.description}
      ></textarea>

      <SubmitButton className="btn" loadingText="Loading...">
        {props.isNew ? "Add Role" : "Edit Role"}
      </SubmitButton>

      <Link href={"/roles"} className="btn">
        get back
      </Link>
    </form>
  );
};

export { RolesForm };
