import axios from "axios";
import Chat from "./_components/Chat";
import { agents } from "@/generated/prisma";

const Page = async ({ params }: { params: Promise<{ agent_id: string }> }) => {
  const { agent_id } = await params;

  const agent: { data: agents } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/agents/${agent_id}`
  );

  console.log("agent", agent.data);

  return <Chat agent={agent.data} />;
};

export default Page;
