# Setup
1. Make sure you have newish versions of node and npm installed.
2. Run `npm install` in this directory.

# Building
```
npm run build
```

# Testing
```
npm run -s test
```

# Running
```
npm run dev
```

The page should automatically update if you change the source JS/CSS files.
You only need to restart the dev server if you change project configuration
files.

# Project Structure
- JavaScript (js, jsx) files go in `src/js`
- Tests go in `src/js/tests`
- React components go in `src/js/components`
- (S)CSS goes in `src/style`

The main entry point is `app.js`, which just renders the `AppBody` component to
build the page.

# Candy
These fancy things are supported
- ES2017 (JavaScript for cool kids) via Babel
- JSX (HTML for cool kids)
- [Sass](http://sass-lang.com/guide) (CSS for cool kids). But since it's a
  superset of CSS you can also just stick with that if you prefer.
- ESLint
