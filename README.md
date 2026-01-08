# On-Chain Counter (CKB)

An **On-Chain Counter Decentralized Application (DApp)** built using **React.js** and **Nervos CKB blockchain**.  
The counter value is stored and updated **on-chain**, ensuring transparency and immutability.

---

##  Workflow (How the System Works)

1. User opens the DApp and connects a CKB wallet
2. Wallet signs a transaction request
3. Transaction updates the counter stored in a CKB cell
4. update Data On-chain
5. Blockchain validates the script rules
6. Frontend fetches updated on-chain value and refreshes UI

---

##  Blockchain Design

### On-Chain Storage
- Counter value stored inside a **CKB Cell**
- Cell data represents the current counter state

### Validation Logic
- Lock Script → controls who can modify the counter
- Type Script → enforces how the counter can be updated

### State Update
- Old cell consumed
- New cell created with updated counter value

---

##  Environment Configuration

Create a `.env` file in the project root:

```env
REACT_APP_CKB_NODE_URL=https://testnet.ckb.dev
REACT_APP_INDEXER_URL=https://testnet.ckb.dev/indexer
REACT_APP_NETWORK=testnet


---

##  Technology Stack

### Frontend
- React.js (Create React App)
- TypeScript
- CSS

### Blockchain
- Nervos CKB (CCC Docs)
- CKB Cells
- Lock & Type Scripts

### Tooling
- Node.js
- npm
- react-scripts
- Vercel / Netlify

---

##  Project Structure

onchain-counter/
├── public/
│ └── index.html
├── src/
│ ├── components/ # UI components
│ ├── hooks/ # Wallet & blockchain hooks
│ ├── utils/ # Helper functions
│ ├── App.js
│ └── index.js
├── .env
├── package.json
└── README.md

