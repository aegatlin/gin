#!/usr/bin/env node

import { argv } from 'node:process'
import { gin } from './src/gin'

const command = argv[2]
const commandVal = argv[3]

gin(command, commandVal)
