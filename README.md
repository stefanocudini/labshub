
# Labs

Hub to organizing a set of NPM packages by keywords
Using interactive tags filter and search tool

## Usage
Copy or linking projects directories inside root path
```bash
cp -r /var/www/my-npm-projects/* ./
```

Edit [labs.json](https://github.com/stefanocudini/labs/blob/master/labs.json) adding details about npm packages inside the root directory.
```javascript
{
  "pages": {
    "index.tmpl.html": "index.html",
    "maps.tmpl.html": "maps/index.html"
  },
  "pageOut": "index.html",
  "pageTmpl": "index.tmpl.html",
  "packagesIgnore": [
    "**/node_modules/**",
    "hidden-project"
  ],
  "packages": {
    "package-dir-name": {
      "name": "package name override package.json name",
      "keywords": ["bootstrap","jquery","css3"],
      "rank": 2
    },
    ...
```

### generate index.html
```bash
npm i
grunt
```
