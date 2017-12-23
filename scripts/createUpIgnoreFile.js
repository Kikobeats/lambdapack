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
    'node_modules/*',
    'aws-sdk',
    'package-lock.json',
    'npm-debug.log',
    'yarn.lock',
    'yarn-error.log',
    '__mocks__',
    '__snapshots__',
    '__tests__',
    'readme*',
    'readme.md',
    'README.md',
    'CHANGELOG.md',
    'changelog*',
    'history.md',
    'CONTRIBUTING.md',
    'LICENSE',
    'LICENSE.md',
    '*.js.map',
    'examples',
    'test',
    'tests'
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
