require('dotenv').config()
const program = '-- create-users-from-csv --'
const argv = require('yargs').argv
const fs = require('fs')
const csv = require('csv-parser')
const fetch = require('node-fetch')

let endpoint = process.env.CODER_ENDPOINT
let sessionToken = process.env.CODER_TOKEN
let outputBaseFolder = process.env.OUTPUT_FOLDER
