import { RolesForm } from "../(components)/rolesForm";

type Props = {
  params: {
    id: number;
  };
};

const Page = ({ params }: Props) => {
  return <RolesForm isNew={false} id={+params.id} />;
};

export default Page;
