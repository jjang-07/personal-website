# Jun Jang — personal site

Plain HTML/CSS/JS. No build step.

## Run locally
```bash
python3 -m http.server 4173
```
Then open http://localhost:4173.

## Edit content
- **Projects, email, links:** `data.js`. Add a project by copying an object in `PROJECTS`; its detail page is `project.html?p=<slug>`.
- **Screenshots:** replace `assets/maclock.svg` / `assets/nanobite.svg` (or point `image` at a new file).
  `device: "laptop"` wants a 16:10 image; `device: "phone"` wants 390:844.
- **Resume:** replace `resume.pdf`.
- **Portrait:** replace `assets/portrait.png`.

## Deploy
- **Vercel:** import the folder/repo, framework preset "Other", no build command.
- **GitHub Pages:** push to a repo, Settings → Pages → deploy from branch (root).
