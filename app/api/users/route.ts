export const api = "https://667ab3c9bd627f0dcc90219a.mockapi.io/addTocart";
async function getData() {
  const data = await fetch(api);

  return data.json();
}

let users: any = await getData();

export function GET(request: Request) {
  return Response.json(users);
}
