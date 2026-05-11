const ClientPageById = async ({ params }: { params: { id: string } }) => {
  const param = await params;
  return <div>ClientPageById: {param.id}</div>;
};

export default ClientPageById;
