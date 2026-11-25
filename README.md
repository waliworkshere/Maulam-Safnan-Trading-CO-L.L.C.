# Maulam Safnan Trading & Co. L.L.C. — Website

Bilingual (English / العربية) website for **Maulam Safnan Trading & Co. L.L.C.** (معالم صفنان للتجارة والمقاولات ش.م.م), an Omani EPC contractor specializing in water infrastructure, civil construction and electromechanical engineering.

Domain: **maulamsafnan.com**

## Page sections
1. **Hero:** animated water-network background, company name, tagline "Engineering the Flow of Progress.", business areas and about text
2. **Chairman's message:** Zahran Khamis Al Barashdi, Chairman & CEO
3. **Our services:** 5 service areas with cover photos
4. **Why choose us:** 9 strengths in a horizontal sliding carousel (Lucide icons)
5. **Flagship projects:** 3 ongoing and 5 completed NWS projects, with All / Ongoing / Completed filters
6. **Certifications:** 9 certificates; click one to view it full size
7. **Contact:** phones, WhatsApp, emails, address, map, and a WhatsApp enquiry form

## Files
| File | What it is |
| --- | --- |
| `index.html` | Page layout |
| `assets/js/content.js` | **All text (English and Arabic), contact details, projects and certificates. Edit this file to change content.** |
| `assets/js/main.js` | Page behaviour (language switch, slider, filters, certificate viewer) |
| `assets/css/styles.css` | Design and layout |
| `assets/logo.svg`, `assets/logo-light.svg` | Logo (light version for dark backgrounds) |
| `assets/img/` | Service and project photos |
| `assets/certs/` | Certificate images (`*-thumb.jpg` are the small previews) |

## Common edits (all in `assets/js/content.js`)
- **Phone, WhatsApp, email, map:** the `contact` block at the top.
- **Any page text:** the `text.en` (English) and `text.ar` (Arabic) blocks.
- **Add a project:** copy one block in `projects`, change the details, and put its photo in `assets/img/`.
- **Add or renew a certificate:** save the image in `assets/certs/` and add or update the block in `certs`.

## Chairman's photo
Save the photo as `assets/img/chairman.jpg` (portrait, about 800×1000 px), then in `index.html` replace
`<img class="mono" src="assets/logo-light.svg" alt="">` with
`<img class="photo" src="assets/img/chairman.jpg" alt="Zahran Khamis Al Barashdi">`.

## Hosting
Static site, no build step: upload the files as they are to any static host.
