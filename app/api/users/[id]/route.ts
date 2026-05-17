import { api } from "../route";

export async function DELETE(
  request: Request,
  context: { params: { id: string } },
) {
  try {
    const { id } = context.params;
    if (!id) throw new Error("id is not found");

    const response = await fetch(`${api}/${id}`, {
      method: "DELETE",
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
