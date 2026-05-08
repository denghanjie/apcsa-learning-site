# Publishing Guide

The apps are static HTML/CSS/JavaScript, so they can be hosted by GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any normal static file server.

## Publish With GitHub Pages

This workspace now has a `docs/` folder prepared for GitHub Pages.

1. Create a GitHub repository.
2. Upload or commit the contents of this project.
3. In the repository settings, open **Pages**.
4. Set the source to the main branch and the `/docs` folder.
5. Save. GitHub will provide a public URL after the first deployment.

The public entry page will be:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
```

## Files Included in the Public Site

- `docs/index.html`
- `docs/Generated_Materials/QRCode.jpg`
- `docs/Generated_Materials/Web_App/`
- `docs/Generated_Materials/Tutorial_Web_App/`
- `docs/.nojekyll`

## Contact Info Integrated

Contact block is based on:

```text
https://denghanjie.github.io/ap-course-recommender/
```

Displayed contact:

- 心奇好
- Author
- WeChat QR image
- 小红书：crying_baby
- 小红书 QR image

## After Future Edits

If you update the tutorial Markdown, rebuild the tutorial app data:

```bash
node Generated_Materials/Tutorial_Web_App/build-data.js
```

Then refresh the public folder:

```bash
cp index.html docs/index.html
cp Generated_Materials/QRCode.jpg docs/Generated_Materials/QRCode.jpg
cp -R Generated_Materials/Web_App docs/Generated_Materials/Web_App
cp -R Generated_Materials/Tutorial_Web_App docs/Generated_Materials/Tutorial_Web_App
```
