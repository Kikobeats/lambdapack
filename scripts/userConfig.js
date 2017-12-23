'use strict'

const path = require('path')
const processPkg = require(path.resolve(process.cwd(), 'package.json'))

const lambapackConfig = processPkg.lambdapack || {}
const { whitelist = [], blacklist = [] } = lambapackConfig

module.exports = { whitelist, blacklist }