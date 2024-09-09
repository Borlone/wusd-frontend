const path = require('path');

const buildEslintCommand = (filenames) => [
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`,

  `prettier --write ${filenames.join(' ')}`,
]

module.exports = {
  'src/**/*.{js,jsx,ts,tsx}': [buildEslintCommand],
};
