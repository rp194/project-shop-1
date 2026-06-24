# Project Shop 1

## Goal
Build a bilingual (FA/EN), mobile-first, high-performance e-commerce and catalog platform with:
- Full catalog + shopping flow
- Strong SEO + marketplace visibility (Google, Torob, Basalam)
- Admin-friendly operations for non-technical staff
- Iran-ready integrations (payment, SMS, eNAMAD readiness)
- Extensible, API-first architecture without vendor lock-in

## Recommended Stack
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
- **Backend/API:** Next.js API routes (or NestJS if strict service separation is needed)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Admin:** Custom Next.js admin (preferred) or headless CMS for content-heavy use cases
- **Search:** Meilisearch (default) / Elasticsearch
- **Cache:** Redis
- **Storage:** S3-compatible object storage + CDN
- **Images:** WebP conversion pipeline
- **Deployment:** Docker + GitHub Actions CI/CD + VPS/cloud + CDN/WAF

## Delivery Plan

### Phase 0 — Discovery & Architecture (Week 1)
1. Finalize business flows:
   - Catalog-only inquiry vs add-to-cart purchase
   - Pricing visibility rules
   - Inventory states: In Stock / Out of Stock / Available for Order
2. Define bilingual content model:
   - FA-first content with EN fallback
3. Prepare SEO taxonomy:
   - Category, brand, attribute pages
   - Filterable landing pages with clean URL strategy
4. Security/compliance planning:
   - eNAMAD-required pages and policies

**Deliverables**
- Technical architecture document
- ERD/data model
- Integration spec (SMS, payment, live chat)
- SEO URL strategy

### Phase 1 — Core Platform Foundation
1. Project and environment setup:
   - Monorepo-ready structure (`apps/web`)
   - Environments and secrets strategy (`apps/web/.env.example`)
   - CI/CD baseline (`.github/workflows/ci.yml`)
2. UI foundation:
   - Mobile-first responsive shell in `apps/web/src/components`
   - Reusable base UI component(s)
3. Auth and account:
   - SMS OTP login/registration starter flow (mock OTP)
   - Role-based access starter model (Admin / Operator / Customer)
4. Bilingual readiness:
   - FA/EN locale support and fallback behavior

**Deliverables**
- Running base platform (FA/EN-ready)
- Auth + account basics
- Reusable UI/component library

## Phase 1 Quick Start
1. `cd /home/runner/work/project-shop-1/project-shop-1/apps/web`
2. `cp .env.example .env.local`
3. `npm install`
4. `npm run dev`
5. Open `http://localhost:3000`

Use OTP code from `OTP_MOCK_CODE` (default `123456`) for the starter login flow.

## Non-Functional Requirements
- SEO-first rendering (SSR/SSG/ISR where appropriate)
- Performance-first frontend and image optimization
- Structured metadata and schema support
- Extensible APIs for future mobile app clients
