# ALVChain Backend (Web2 Service)

Backend API for ALVChain, implemented with NestJS and TypeScript. This service provides user, profile, asset category, liability, and user-asset mapping modules, with PostgreSQL and Redis integration.

## Authors

1. Rifat Al Mamun Rudro(https://www.aiub.edu/faculty-list/faculty-profile?q=mamun.rudro#mamun.rudro@aiub.edu)
2. Md. Hamid Uddin (https://www.aiub.edu/faculty-list/faculty-profile?q=hamid.uddin#hamid.uddin@aiub.edu)

## Tech Stack

- NestJS (TypeScript)
- PostgreSQL (TypeORM)
- Redis (cache/queue)
- Docker + Docker Compose

## Repository Structure

- `alv-chain-web2/`: backend API source code
- `blockhain/`: Solidity contracts and blockchain-related artifacts

## Prerequisites

- Node.js 20+
- pnpm 8+
- Docker Desktop (or Docker Engine + Compose)

## Local Development (Without Docker)

1. Copy the environment template:

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm run start:dev
```

The API runs on `http://localhost:5000` by default.

## Docker Setup

The repository includes a self-contained Docker Compose setup with:

- `app`: NestJS backend
- `postgres`: PostgreSQL database
- `redis`: Redis cache/queue

Run:

```bash
docker compose up --build
```

Run in background:

```bash
docker compose up --build -d
```

Stop and clean up:

```bash
docker compose down
```

## Useful Commands

```bash
pnpm run build
pnpm run lint
pnpm run migration:run
pnpm run migration:rollback
pnpm run seeder:run
```

## Smart Contracts (ERC-721)

ERC-721 Solidity contracts are included in the repository under:

- `blockhain/contracts/ALVAssetNFT.sol`
- `blockhain/contracts/ALVIdentityBadge.sol`

## 9. Data Availability Statement

All artifacts required to reproduce this submission are provided in this repository:

- Backend implementation and configuration: `alv-chain-web2/`
- Dockerized execution environment: `alv-chain-web2/Dockerfile` and `alv-chain-web2/docker-compose.yml`
- Solidity smart contracts (including ERC-721): `blockhain/contracts/`

No external private codebase is required to run or inspect the submitted implementation.
