"use server";

import axios from "axios";

export async function createAgent(payload: {
  name: string;
  description: string;
  permissions: string[];
  pcode: string;
  mode: string;
}) {
  const { name, description, permissions, pcode, mode } = payload;

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/agents`,
    {
      name,
      description,
      permissions,
      pcode,
      mode,
      userId: 1,
    }
  );

  const agent = response?.data;

  return agent;
}
