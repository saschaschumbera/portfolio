This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Debug Logging (Optional)

Client interaction logging is available for troubleshooting and writes to `logs/app-actions.log` via `GET/POST /api/client-log`.

Enable it only when needed:

```bash
# PowerShell
$env:NEXT_PUBLIC_ENABLE_ACTION_LOGGER="1"
npm run dev -- --hostname 0.0.0.0 --port 3001
```

Disable it by unsetting the variable or setting it to `0`.

### Security-related environment variables

- `LOG_VIEW_TOKEN`: Required in production to read logs via `GET /api/client-log`.
- `ALLOWED_DEV_ORIGINS`: Optional comma-separated list of origins allowed to access the dev server (e.g. `192.168.178.24,local-origin.dev`).

If `ALLOWED_DEV_ORIGINS` is not set, no additional dev origins are allowed.

## Mobile Regression Checklist

Before shipping UI changes, verify on iPhone Safari:

1. Page loads without hydration warnings in console.
2. Chat floating button is visible and tappable.
3. Chat opens above the page and is fully interactable.
4. Backdrop and close button both close the chat reliably.
5. Input can be focused and text can be sent.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
