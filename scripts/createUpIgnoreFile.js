const fs = require('fs')
const path = require('path')
const getProductionDeps = require('./getProductionDeps')
const userConfig = require('./userConfig')

const config = {
  outputFile: path.resolve('.', '.upignore'),
  whitelist: [
    '.babelrc',
    'build',
    'babel-polyfill',
    'node_modules/.bin'
  ].concat(userConfig.whitelist),
  blacklist: [
    '__mocks__',
    '__snapshots__',
    '__tests__',
    '*.js.map',
    'aws-sdk',
    'CHANGELOG.md',
    'changelog*',
    'CONTRIBUTING.md',
    'examples',
    'history.md',
    'LICENSE.md',
    'LICENSE',
    'node_modules/*',
    'npm-debug.log',
    'package-lock.json',
    'readme.md',
    'README.md',
    'readme*',
    'test',
    'tests',
    'yarn-error.log',
    'yarn.lock',
    '_config.yml',
    '.appveyor.yml',
    '.coveralls.yml',
    '.documentup.json',
    '.DS_Store',
    '.editorconfig',
    '.eslintignore',
    '.eslintrc.js',
    '.eslintrc.json',
    '.eslintrc.yml',
    '.eslintrc',
    '.flowconfig',
    '.gitattributes',
    '.gitlab-ci.yml',
    '.htmllintrc',
    '.jshintrc',
    '.lint',
    '.npmignore',
    '.stylelintrc.js',
    '.stylelintrc.json',
    '.stylelintrc.yaml',
    '.stylelintrc.yml',
    '.stylelintrc',
    '.tern-project',
    '.travis.yml',
    '.yarn-integrity',
    '.yarn-metadata.json',
    '.yarnclean',
    '.yo-rc.json',
    'appveyor.yml',
    'AUTHORS',
    'CHANGES',
    'circle.yml',
    'CONTRIBUTORS',
    'eslint',
    'Gruntfile.js',
    'gulpfile.js',
    'Gulpfile.js',
    'htmllint.js',
    'jest.config.js',
    'karma.conf.js',
    'LICENSE.txt',
    'license',
    'LICENSE',
    'Makefile',
    'stylelint.config.js',
    'tsconfig.json'
  ].concat(userConfig.blacklist)
}

const removeBlacklistedDeps = dep => !config.blacklist.includes(dep)
const includeNamespaces = dep => dep.indexOf('/') >= 0 ? dep.split('/')[0] : dep

console.log('Reading production dependencies')
console.time('Done')

const productionDeps = getProductionDeps()
  .filter(removeBlacklistedDeps)
  .map(includeNamespaces)

console.timeEnd('Done')

const upignore = [].concat(
  config.blacklist,
  config.whitelist.map(file => `!${file}`),
  productionDeps.map(file => `!node_modules/${file}`)
).join('\n')

console.log(`Writing upignore file: ${config.outputFile}`)
console.time('Done')

fs.writeFileSync(config.outputFile, upignore, { flag: 'w' })

console.timeEnd('Done')
