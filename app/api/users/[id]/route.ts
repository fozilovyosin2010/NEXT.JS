import { api } from "../route";

export async function DELETE(
  request: Request,
  context: { params: { id: string } },
) {
  try {
    const { id } = await context.params;
    if (!id) {
      return Response.json({ error: "id not found" }, { status: 400 });
    }

    const response = await fetch(`${api}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return Response.json({ error: "Failed to delete" }, { status: 500 });
    }

    const data = await response.json();
    return Response.json(data, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
