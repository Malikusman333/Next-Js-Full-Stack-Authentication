export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800">
      <h1>Profile</h1>
      <hr />
      <p>
        Profile Page <span className="bg-amber-600">{id}</span>
      </p>
    </div>
  );
}
