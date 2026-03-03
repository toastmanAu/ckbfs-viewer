import { useEffect } from 'react';
import { useViewer } from './hooks/useViewer.js';
import { ViewerPanel } from './components/ViewerPanel.jsx';
import { StatusRow } from './components/StatusRow.jsx';

const EXAMPLE_ID = '0x061cc843e720a4274da71a1a2fec4802cd02f6d5ee7167e7429435878068abe0';

export default function App() {
  const { network, setNetwork, identifier, setIdentifier, status, result, blobUrl, load, clear } = useViewer();

  // URL param support: ?id=0x...&net=mainnet
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const id = p.get('id'), net = p.get('net');
    if (net === 'mainnet') setNetwork('mainnet');
    if (id) { setIdentifier(id); load(id); }
  }, []); // eslint-disable-line

  const onKey = (e) => { if (e.key === 'Enter') load(); };
  const useExample = () => { setNetwork('testnet'); setIdentifier(EXAMPLE_ID); load(EXAMPLE_ID); };

  return (
    <>
      <header>
        <div className="header-inner">
          <div className="logo">CKBFS <span>Viewer</span></div>
          <div className="network-toggle">
            {['testnet', 'mainnet'].map(n => (
              <button key={n} className={network === n ? 'active' : ''} onClick={() => setNetwork(n)}>{n}</button>
            ))}
          </div>
        </div>
      </header>

      <main>
        <div className="card">
          <div className="card-title">Resolve CKBFS File</div>
          <div className="field-row">
            <input
              className="input"
              placeholder="ckbfs://0x… or bare TypeID 0x…"
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              onKeyDown={onKey}
              spellCheck={false}
              autoComplete="off"
            />
            <button className="btn" onClick={() => load()} disabled={status?.type === 'loading'}>Load</button>
            <button className="btn btn-ghost" onClick={clear}>Clear</button>
          </div>
          <div className="example-hint">
            Try:{' '}
            <button onClick={useExample} title="Wyltek Founding Member JPEG (testnet)">
              {EXAMPLE_ID.slice(0, 20)}…
            </button>
          </div>
        </div>

        <StatusRow status={status} />
        <ViewerPanel result={result} blobUrl={blobUrl} network={network} />
      </main>

      <footer>
        <p>
          CKBFS protocol by{' '}
          <a href="https://github.com/code-monad/ckbfs" target="_blank" rel="noreferrer">code-monad</a>
          {' · '}
          <a href="https://github.com/toastmanAu/ckbfs-viewer" target="_blank" rel="noreferrer">Source</a>
          {' · '}
          <a href="https://wyltekindustries.com" target="_blank" rel="noreferrer">Wyltek Industries</a>
        </p>
      </footer>
    </>
  );
}
