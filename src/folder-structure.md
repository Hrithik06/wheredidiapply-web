# React TypeScript — Project Folder Structure

> **Co-location rule:** every `.test.tsx` / `.test.ts` lives next to the file it tests.  
> **Feature rule:** if code only serves one feature, it lives inside `features/<name>/` — not at the root level.

---

```
src/
│
├── assets/                          # Static files — svgs, images, fonts
│   └── react.svg
│
├── components/                      # Reusable, dumb UI only — zero business logic
│   └── ui/
│       ├── Button.tsx
│       ├── Button.test.tsx          # ✅ co-located
│       ├── Logo.tsx
│       ├── Logo.test.tsx            # ✅ co-located
│       ├── NavBar.tsx
│       └── NavBar.test.tsx          # ✅ co-located
│
├── features/                        # Self-contained modules
│   │                                # Rule: delete the folder, nothing else breaks
│   │
│   ├── auth/
│   │   ├── components/              # Auth-specific UI — NOT in /components
│   │   │   ├── LoginForm.tsx
│   │   │   └── LoginForm.test.tsx   # ✅ co-located
│   │   │
│   │   ├── hooks/                   # ⚠ Move here if hook is auth-specific (e.g. useAuth)
│   │   │   ├── useAuth.ts
│   │   │   └── useAuth.test.ts      # ✅ co-located
│   │   │
│   │   ├── services/                # ⚠ Move here if API call is auth-specific
│   │   │   ├── auth.service.ts
│   │   │   └── auth.service.test.ts # ✅ co-located
│   │   │
│   │   ├── store/                   # Auth slice or Zustand store
│   │   │   └── authSlice.ts
│   │   │
│   │   └── types.ts                 # Auth-specific types only
│   │
│   └── jobs/
│       ├── components/              # JobCard, JobList — NOT in /components (jobs-specific)
│       │   ├── JobCard.tsx
│       │   ├── JobCard.test.tsx     # ✅ co-located
│       │   ├── JobList.tsx
│       │   └── JobList.test.tsx     # ✅ co-located
│       │
│       ├── hooks/                   # ⚠ Move useJobs here from root /hooks
│       │   ├── useJobs.ts
│       │   └── useJobs.test.ts      # ✅ co-located
│       │
│       ├── services/                # ⚠ Move jobs API calls here from root /services
│       │   ├── jobs.service.ts
│       │   └── jobs.service.test.ts # ✅ co-located
│       │
│       ├── store/
│       │   └── jobsSlice.ts
│       │
│       └── types.ts
│
├── hooks/                           # GLOBAL hooks only
│   │                                # ⚠ If a hook serves one feature, move it into features/
│   ├── useDebounce.ts               # ✅ truly global — fine here
│   ├── useDebounce.test.ts          # ✅ co-located
│   ├── useLocalStorage.ts
│   └── useLocalStorage.test.ts      # ✅ co-located
│
├── pages/                           # Route-level components — thin, composition only
│   │                                # ⚠ No business logic here — delegate to feature components
│   ├── DashboardPage.tsx            # ← was DashboardV2.tsx — use git for versioning, not filenames
│   ├── DashboardPage.test.tsx       # ✅ co-located
│   ├── HomePage.tsx
│   ├── HomePage.test.tsx            # ✅ co-located
│   ├── LandingPage.tsx
│   ├── LandingPage.test.tsx         # ✅ co-located
│   ├── LoginPage.tsx
│   └── LoginPage.test.tsx           # ✅ co-located
│
├── services/                        # Global HTTP config only
│   └── http.ts                      # Axios instance, interceptors, base URL
│                                    # ⚠ Feature-specific calls → features/*/services/
│
├── store/                           # Global store root
│   └── index.ts                     # Imports + combines all feature slices
│
├── types/                           # Shared global TypeScript types
│   ├── api.types.ts
│   └── common.types.ts
│                                    # ⚠ Feature-specific types → features/*/types.ts
│
├── utils/                           # Pure helper functions — no lib/ duplication
│   ├── formatDate.ts
│   └── formatDate.test.ts           # ✅ co-located
│
├── App.tsx                          # Router setup, global providers
├── App.test.tsx                     # ✅ co-located
├── main.tsx                         # Entry point only — no logic here
├── index.css
└── vitest.setup.ts                  # Global test config — the ONE file that escapes co-location
                                     # MSW handlers, jest-dom matchers, global mocks go here
```

---

## Rules at a glance

| Question | Answer |
|---|---|
| Where does a hook go? | `features/<name>/hooks/` if feature-specific, root `/hooks/` if truly shared |
| Where do API calls go? | `features/<name>/services/` if feature-specific, root `/services/http.ts` for base config only |
| Where do types go? | `features/<name>/types.ts` if feature-specific, root `/types/` if shared across features |
| Where does a UI component go? | `features/<name>/components/` if tied to a feature, root `/components/ui/` if reusable anywhere |
| Where do tests go? | Right next to the file they test — always |
| What stays at `src/` root? | `App.tsx`, `main.tsx`, `index.css`, `vitest.setup.ts` only |

## What changed from your original structure

| Before | After | Why |
|---|---|---|
| `routes/` | `pages/` | `routes/` implies router config, not page components |
| `DashboardV2.tsx` | `DashboardPage.tsx` | Version names in filenames = git is not being used |
| `neathunt-nh-mono.jsx` | deleted / converted | No `.jsx` in a `.tsx` codebase |
| `lib/` + `utils/` | `utils/` only | Two folders doing the same job — pick one |
| `test/` at root | co-located `.test.tsx` | Test lives next to the file it tests |
| Loose `First.tsx` in `src/` | moved or deleted | No orphan components at the root |
