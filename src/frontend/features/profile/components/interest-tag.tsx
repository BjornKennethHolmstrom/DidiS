// features/profile/components/interest-tag.tsx
import { X } from 'lucide-react'

interface InterestTagProps {
  interest: string
  onRemove?: () => void
  isEditing?: boolean
}

export function InterestTag({ interest, onRemove, isEditing }: InterestTagProps) {
  return (
    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
      <span>{interest}</span>
      {isEditing && onRemove && (
        <button
          onClick={onRemove}
          className="ml-2 text-blue-600 hover:text-blue-800"
          aria-label={`Ta bort ${interest}`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}
