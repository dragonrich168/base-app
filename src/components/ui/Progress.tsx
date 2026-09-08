interface ProgressProps {
  value: number;
}

export function Progress({ value }: ProgressProps) {
  const width = Math.max(0, Math.min(100, value));
  return (
    <div className="progress" role="progressbar" aria-valuenow={width} aria-valuemin={0} aria-valuemax={100}>
      <span style={{ width: `${width}%` }} />
    </div>
  );
}
