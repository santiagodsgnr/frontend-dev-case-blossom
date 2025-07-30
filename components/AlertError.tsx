export default function AlertError({ error }: { error: Error }) {
  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
      role="alert"
    >
      <span className="font-medium text-lg">
        <b>Error:</b> {error.message}
      </span>
    </div>
  );
}
