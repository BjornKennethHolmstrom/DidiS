// src/frontend/components/proposals/category-selector.tsx
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Category, SubCategory } from '@/types/proposals'
import { cn } from '@/lib/utils'

interface CategorySelectorProps {
  categories: Category[]
  subCategories: SubCategory[]
  selectedCategory?: string
  selectedSubCategory?: string
  onCategoryChange: (categoryId: string) => void
  onSubCategoryChange: (subCategoryId: string) => void
}

export function CategorySelector({
  categories,
  subCategories,
  selectedCategory,
  selectedSubCategory,
  onCategoryChange,
  onSubCategoryChange
}: CategorySelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const relevantSubCategories = subCategories.filter(
    sub => sub.parentId === selectedCategory
  )

  return (
    <div className="space-y-4">
      {/* Main categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => {
              onCategoryChange(category.id)
              setIsExpanded(true)
            }}
            className={cn(
              'p-4 rounded-lg border text-left transition-colors hover:bg-muted/50',
              selectedCategory === category.id 
                ? 'border-primary bg-primary/5' 
                : 'border-border'
            )}
          >
            <h3 className="font-medium mb-1">{category.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {category.description}
            </p>
          </button>
        ))}
      </div>

      {/* Subcategories */}
      {selectedCategory && relevantSubCategories.length > 0 && isExpanded && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {relevantSubCategories.map(subCategory => (
                <button
                  key={subCategory.id}
                  onClick={() => onSubCategoryChange(subCategory.id)}
                  className={cn(
                    'p-3 rounded-md text-left transition-colors hover:bg-muted/50',
                    selectedSubCategory === subCategory.id 
                      ? 'bg-primary/5' 
                      : ''
                  )}
                >
                  <h4 className="font-medium mb-1">{subCategory.name}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {subCategory.description}
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
