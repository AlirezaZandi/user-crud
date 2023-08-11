import { UsersForm } from "../(components)/usersForm";

type Props = {
  params: {
    id: number;
  };
};

const Page = ({ params }: Props) => {
  return <UsersForm isNew={false} id={+params.id} />;
};

export default Page;
