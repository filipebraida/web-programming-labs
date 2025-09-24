import { cva } from 'class-variance-authority'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { edgeIconify, addCollection } from 'edge-iconify'
import { icons as heroIcons } from '@iconify-json/heroicons'

addCollection(heroIcons)

import edge from 'edge.js'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

edge.global('cva', cva)
edge.global('cn', cn)

edge.use(edgeIconify)
