interface AvatarProps {
  name: string;
  color?: string;
}

export function Avatar({ name, color = "#5b8cff" }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span className="avatar" style={{ background: color }}>
      {initials || "B"}
    </span>
  );
}
