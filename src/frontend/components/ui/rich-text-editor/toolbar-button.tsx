// components/ui/rich-text-editor/toolbar-button.tsx
import { ToolbarButtonProps } from './types'

export function ToolbarButton({ onClick, active, icon, label }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-100 ${
        active ? 'bg-gray-100 text-blue-600' : 'text-gray-600'
      }`}
      title={label}
      aria-label={label}
    >
      {icon}
    </button>
  )
}
