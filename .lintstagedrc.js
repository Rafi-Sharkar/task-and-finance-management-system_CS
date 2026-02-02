// const path = require("path");

// // Build ESLint command with relative paths
// const buildEslintCommand = (filenames) =>
//   `eslint --fix ${filenames
//     .map((f) => `"${path.relative(process.cwd(), f)}"`) // Add quotes around file paths with spaces
//     .join(" ")}`;

// // Build Prettier command with proper file handling
// const buildPrettierCommand = (filenames) =>
//   `prettier --write ${filenames
//     .map((f) => `"${f}"`) // Add quotes around file paths with spaces for Prettier as well
//     .join(" ")}`;

// module.exports = {
//   "*.{js,jsx,ts,tsx}": [buildEslintCommand, buildPrettierCommand],
//   "*.{json,css,scss,md}": [buildPrettierCommand],
// };
const path = require("path");

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames
    .map((f) => `"${path.relative(process.cwd(), f)}"`)
    .join(" ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
};
