// components/ui/rich-text-editor/types.ts
export interface ToolbarButtonProps {
  onClick: () => void
  active?: boolean
  icon: React.ReactNode
  label: string
}

export interface ToolbarProps {
  onAction: (action: string) => void
  activeStyles: string[]
}

export interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}
