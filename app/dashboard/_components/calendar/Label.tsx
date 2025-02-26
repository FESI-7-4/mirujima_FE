export default function Label({ color, label }: { color: string; label: string }) {
  return (
    <li className="flex items-center gap-1 text-small text-gray400 desktop:text-sm/4">
      <span className={`inline-block h-4 w-4 rounded-full ${color}`} />
      {label}
    </li>
  );
}
