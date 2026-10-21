# Night in the Fort

A Fortnite item shop browser: the current rotation, new items, cosmetics search, a cart and a wishlist. Data comes from [fortnite-api.com](https://fortnite-api.com).

**Demo:** https://raregodb.github.io/night-in-the-fort/

## Features

- The shop is split into the same sections as in the game, and each offer has its own page with its V-Bucks price
- New items: cosmetics, jam tracks, instruments, cars
- Search by name with rarity and type filters
- A cart that shows the total, and a wishlist, both saved in localStorage
- Light and dark themes

## Stack

React 19, Vite, Tailwind CSS 4, shadcn/ui, React Router, Lucide

## Getting started

```bash
npm install
npm run dev
```

Create a `.env` file:

```env
VITE_PUBLIC_FORTNITE_URL=https://fortnite-api.com/v2/
```
