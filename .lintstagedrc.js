const { ESLint } = require('eslint');

const eslintCli = new ESLint();

const removeIgnoredFiles = async (files) => {
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslintCli.isPathIgnored(file)
    })
  )
  const filteredFiles = files.filter((_, i) => !isIgnored[i])
  return filteredFiles.join(' ')
}

module.exports = {
  '**/*.{ts,tsx,js,jsx}': async (files) => {
    const filesToLint = await removeIgnoredFiles(files);
    return [`eslint --max-warnings=0 ${filesToLint}`];
  },
};