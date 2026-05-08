# AP CSA Tutorial Web App

Open `index.html` to browse the detailed tutorial set interactively.

## Files

- `index.html`: app shell
- `styles.css`: responsive interface styling
- `app.js`: navigation, rendering, search, progress, and notes
- `tutorial-data.js`: generated tutorial data
- `build-data.js`: rebuilds `tutorial-data.js` from `../Detailed_Tutorials/*.md`

## Rebuild Data

Run this from the repository root after editing the detailed tutorial Markdown files:

```bash
node Generated_Materials/Tutorial_Web_App/build-data.js
```
