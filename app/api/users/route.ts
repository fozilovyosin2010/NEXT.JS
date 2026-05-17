export const api = "https://667ab3c9bd627f0dcc90219a.mockapi.io/addTocart";

async function getData() {
  const data = await fetch(api);
  return data.json();
}

export async function GET(request: Request) {
  let users: any = await getData();
  return Response.json(users);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Make the handler robust: flatten { obj, status } if it exists, otherwise use body
    const dataToSend = body.obj ? { ...body.obj, status: body.status ?? false } : body;

    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      return Response.json({ error: "Failed to post to MockAPI" }, { status: response.status });
    }

    const data = await response.json();
    return Response.json(data, { status: 201 });
  } catch (error: any) {
    console.error("Failed to post:", error);
    return Response.json({ error: error.message || "Failed to post" }, { status: 500 });
  }
}
