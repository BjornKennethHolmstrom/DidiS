// src/frontend/data/categories.ts
import { Category, SubCategory } from '@/types/proposals'

export const categories: Category[] = [
  {
    id: 'infrastructure',
    name: 'Infrastruktur',
    description: 'Vägar, cykelvägar, kollektivtrafik och stadsplanering'
  },
  {
    id: 'environment',
    name: 'Miljö & Hållbarhet',
    description: 'Klimat, återvinning och miljöskydd'
  },
  {
    id: 'culture',
    name: 'Kultur & Fritid',
    description: 'Bibliotek, idrottsanläggningar och kulturaktiviteter'
  },
  {
    id: 'education',
    name: 'Utbildning',
    description: 'Skolor, förskolor och vuxenutbildning'
  },
  {
    id: 'health',
    name: 'Vård & Omsorg',
    description: 'Sjukvård, äldreomsorg och sociala tjänster'
  },
  {
    id: 'housing',
    name: 'Boende & Byggande',
    description: 'Bostäder, bygglov och stadsutveckling'
  },
  {
    id: 'democracy',
    name: 'Demokrati & Inflytande',
    description: 'Medborgardeltagande och transparens'
  },
  {
    id: 'safety',
    name: 'Trygghet & Säkerhet',
    description: 'Brottsförebyggande och säkerhetsarbete'
  }
]

export const subCategories: SubCategory[] = [
  // Infrastructure subcategories
  {
    id: 'roads',
    parentId: 'infrastructure',
    name: 'Vägar & Trafik',
    description: 'Underhåll och utveckling av vägnätet'
  },
  {
    id: 'cycling',
    parentId: 'infrastructure',
    name: 'Cykling',
    description: 'Cykelvägar och cykelfaciliteter'
  },
  {
    id: 'public-transport',
    parentId: 'infrastructure',
    name: 'Kollektivtrafik',
    description: 'Bussar, spårvagnar och pendeltåg'
  },
  // Environment subcategories
  {
    id: 'recycling',
    parentId: 'environment',
    name: 'Återvinning',
    description: 'Sophantering och återvinningsstationer'
  },
  {
    id: 'green-areas',
    parentId: 'environment',
    name: 'Grönområden',
    description: 'Parker och naturområden'
  }
  // ... add more subcategories as needed
]
