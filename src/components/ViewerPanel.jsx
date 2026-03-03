import { EXPLORER, formatSize } from '../lib/ckbfs-resolver.js';

export function ViewerPanel({ result, blobUrl, network }) {
  if (!result) return null;
  const { contentType, filename, checksum, witnessIdx, txHash, typeId, fileBytes } = result;
  const explorerUrl = `${EXPLORER[network]}/${txHash}`;

  const renderContent = () => {
    if (contentType.startsWith('image/')) {
      return (
        <div className="img-viewer">
          <img src={blobUrl} alt={filename} />
        </div>
      );
    }
    if (contentType.startsWith('text/') || contentType === 'application/json') {
      const text = new TextDecoder().decode(fileBytes);
      const display = contentType === 'application/json'
        ? JSON.stringify(JSON.parse(text), null, 2) : text;
      return <div className="text-viewer">{display}</div>;
    }
    return (
      <div className="download-box">
        <div className="file-icon">📄</div>
        <div className="file-name">{filename || 'ckbfs-file'}</div>
        <div style={{ color: 'var(--muted)', fontSize: '.85rem' }}>
          {contentType} · {formatSize(fileBytes.length)}
        </div>
        <a href={blobUrl} download={filename || 'ckbfs-file'} className="btn btn-dl"
          style={{ textDecoration: 'none', display: 'inline-block', marginTop: '.5rem' }}>
          ⬇ Download
        </a>
      </div>
    );
  };

  return (
    <div className="card">
      <div className="meta-bar">
        <span className="tag">{contentType}</span>
        <span className="meta-kv"><span>File </span><span>{filename || '(unnamed)'}</span></span>
        <span className="meta-kv"><span>Size </span><span>{formatSize(fileBytes.length)}</span></span>
        <span className="meta-kv"><span>Checksum </span><span>0x{checksum.toString(16).padStart(8, '0')}</span></span>
        <span className="meta-kv"><span>Witness </span><span>#{witnessIdx}</span></span>
        <a href={explorerUrl} target="_blank" rel="noreferrer"
          style={{ marginLeft: 'auto', fontSize: '.8rem' }}>
          View tx ↗
        </a>
      </div>

      {renderContent()}

      <div className="typeid-box">
        TypeID: <strong>{typeId}</strong>
      </div>
    </div>
  );
}
