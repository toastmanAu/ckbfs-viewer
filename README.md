# ckbfs-viewer

Standalone viewer for files stored on-chain via the [CKBFS protocol](https://github.com/code-monad/ckbfs) on Nervos CKB.

No framework, no build step required. Drop `index.html` + `src/ckbfs-resolver.js` anywhere and it works.

## Features

- Paste a `ckbfs://0x<typeId>` URI or bare 32-byte TypeID
- Testnet / Mainnet toggle
- **Images** rendered inline
- **Text / JSON** shown in a code block
- **Everything else** gets a download button
- Metadata bar: filename, content type, size, checksum, witness index, tx explorer link
- Shareable URL: `?id=0x...&net=testnet`

## Usage

```bash
# Serve locally
npx serve . -p 5174
```

Then open: `http://localhost:5174`

## Shareable link format

```
https://wyltekindustries.com/ckbfs-viewer.html?id=0x<typeId>&net=testnet
```

## Protocol

CKBFS V2 — code_hash `0x31e6376287d223b8c0410d562fb422f04d1d617b2947596a14c3d2efb7218d3a`

Files are stored in **transaction witnesses** (prunable from full nodes, but always accessible via archive nodes). Only the small index cell (~225 CKB) is locked permanently.

## Import the resolver in your own project

```js
import { resolveCKBFS, parseIdentifier } from './src/ckbfs-resolver.js';

const { fileBytes, contentType, filename } = await resolveCKBFS(
  '0x061cc843e720a4274da71a1a2fec4802cd02f6d5ee7167e7429435878068abe0',
  'testnet',
  (msg) => console.log(msg),
);
```

## Structure

```
ckbfs-viewer/
├── index.html              # Standalone viewer (imports resolver as ES module)
├── src/
│   └── ckbfs-resolver.js   # Core resolution logic — no deps, browser + Node compatible
├── package.json
└── README.md
```
