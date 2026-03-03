import { useState, useCallback } from 'react';
import { parseIdentifier, resolveCKBFS } from '../lib/ckbfs-resolver.js';

export function useViewer() {
  const [network, setNetwork] = useState('testnet');
  const [identifier, setIdentifier] = useState('');
  const [status, setStatus] = useState(null); // null | { type: 'loading'|'error', msg }
  const [result, setResult] = useState(null);  // null | { fileBytes, contentType, filename, ... }
  const [blobUrl, setBlobUrl] = useState(null);

  const load = useCallback(async (id = identifier) => {
    const raw = id.trim();
    if (!raw) return;

    let typeId;
    try { typeId = parseIdentifier(raw); }
    catch (e) { setStatus({ type: 'error', msg: e.message }); return; }

    // Revoke old blob
    if (blobUrl) { URL.revokeObjectURL(blobUrl); setBlobUrl(null); }
    setResult(null);
    setStatus({ type: 'loading', msg: 'Resolving TypeID…' });

    try {
      const res = await resolveCKBFS(typeId, network, (msg) =>
        setStatus({ type: 'loading', msg })
      );
      const url = URL.createObjectURL(new Blob([res.fileBytes], { type: res.contentType }));
      setBlobUrl(url);
      setResult({ ...res, typeId });
      setStatus(null);
    } catch (e) {
      setStatus({ type: 'error', msg: e.message });
    }
  }, [identifier, network, blobUrl]);

  const clear = useCallback(() => {
    setIdentifier('');
    setResult(null);
    setStatus(null);
    if (blobUrl) { URL.revokeObjectURL(blobUrl); setBlobUrl(null); }
  }, [blobUrl]);

  return { network, setNetwork, identifier, setIdentifier, status, result, blobUrl, load, clear };
}
