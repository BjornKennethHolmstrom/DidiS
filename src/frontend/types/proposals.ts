// src/frontend/types/proposals.ts

export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string; // For potential future use
}

export interface SubCategory extends Category {
  parentId: string;
}

