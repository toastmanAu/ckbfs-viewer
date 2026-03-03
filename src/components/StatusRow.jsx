export function StatusRow({ status }) {
  if (!status) return null;
  return (
    <div className={`status-row ${status.type}`}>
      {status.type === 'loading' && <div className="spinner" />}
      {status.type === 'error' && <span>⚠</span>}
      <span>{status.msg}</span>
    </div>
  );
}
