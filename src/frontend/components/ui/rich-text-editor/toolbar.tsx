// components/ui/rich-text-editor/toolbar.tsx
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link
} from 'lucide-react'
import { ToolbarProps } from './types'
import { ToolbarButton } from './toolbar-button'

export function Toolbar({ onAction, activeStyles }: ToolbarProps) {
  const tools = [
    { action: 'bold', icon: <Bold className="h-4 w-4" />, label: 'Fet' },
    { action: 'italic', icon: <Italic className="h-4 w-4" />, label: 'Kursiv' },
    { action: 'insertUnorderedList', icon: <List className="h-4 w-4" />, label: 'Punktlista' },
    { action: 'insertOrderedList', icon: <ListOrdered className="h-4 w-4" />, label: 'Numrerad lista' },
    { action: 'justifyLeft', icon: <AlignLeft className="h-4 w-4" />, label: 'Vänsterjustera' },
    { action: 'justifyCenter', icon: <AlignCenter className="h-4 w-4" />, label: 'Centrera' },
    { action: 'justifyRight', icon: <AlignRight className="h-4 w-4" />, label: 'Högerjustera' },
    { action: 'createLink', icon: <Link className="h-4 w-4" />, label: 'Lägg till länk' },
  ]

  return (
    <div className="flex items-center gap-1 p-2 border-b">
      {tools.map((tool) => (
        <ToolbarButton
          key={tool.action}
          onClick={() => onAction(tool.action)}
          active={activeStyles.includes(tool.action)}
          icon={tool.icon}
          label={tool.label}
        />
      ))}
    </div>
  )
}

