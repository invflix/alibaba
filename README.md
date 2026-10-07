# Al-Batin Advanced Contracting website

Next.js 16 (App Router) + Tailwind CSS v4 rebuild of [albatinindus.com](https://albatinindus.com). All 74 pages are statically generated.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Where things live

| What | Where |
| --- | --- |
| Company details, nav, clients, certificates, projects | `src/lib/site.ts` |
| Products and categories | `src/data/products.ts` |
| Services copy | `src/data/services.ts` |
| Heavy equipment copy | `src/data/equipment.ts` |
| Images (optimised, cropped) | `public/images/` |
| PDFs (profile, brochure, ISO certificates) | `public/docs/` |
| Design tokens (colours, radius, motion) | `src/app/globals.css` |

To add a product, add a line to `products` in `src/data/products.ts` and drop a square JPG at
`public/images/products/<slug>.jpg`. Its page, sitemap entry and category listing are generated automatically.
Pass `null` as the image to show the "Photo coming soon" placeholder.

## Contact form email

The enquiry form posts to a server action (`src/app/contact/actions.ts`). To deliver enquiries by email, set these
environment variables (see `.env.example`), using a [Resend](https://resend.com) account with a verified sending domain:

```
RESEND_API_KEY=...
CONTACT_FROM_EMAIL="Al-Batin Website <website@albatinindus.com>"
CONTACT_TO_EMAIL=info@albatinindus.com
```

Without them the form still validates, then opens the visitor's email app with the enquiry pre-filled to
info@albatinindus.com.

## SEO

URLs match the old WordPress site (trailing slashes, same slugs). Old `/service/...` links and the old profile PDF
path redirect permanently (`next.config.ts`). Sitemap: `/sitemap.xml`; robots: `/robots.txt`. Structured data:
LocalBusiness (every page), BreadcrumbList (inner pages), Product (product pages).

# alibaba
