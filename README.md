# ckbfs-viewer

Standalone React/Vite viewer for files stored on-chain via the [CKBFS protocol](https://github.com/code-monad/ckbfs) on Nervos CKB. Companion app to [ckb-dob-minter](https://github.com/toastmanAu/ckb-dob-minter).

## Features

- Paste a `ckbfs://0x<typeId>` URI or bare 32-byte TypeID
- Testnet / Mainnet toggle
- Images rendered inline, text in a code block, other files → download
- Metadata bar: filename, content type, size, checksum, tx explorer link
- URL params: `?id=0x...&net=testnet` for shareable links

## Dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
# → dist/
```

## Protocol

CKBFS V2 — code_hash `0x31e6376287d223b8c0410d562fb422f04d1d617b2947596a14c3d2efb7218d3a`

Files live in transaction witnesses. Only a small index cell (~225 CKB) is locked permanently.

## Stack

Same as ckb-dob-minter: React 18 + Vite. No wallet connection needed — read-only.
