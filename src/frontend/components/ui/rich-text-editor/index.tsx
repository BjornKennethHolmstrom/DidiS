// components/ui/rich-text-editor/index.tsx
'use client'

import { useRef, useEffect, useState } from 'react'
import { Toolbar } from './toolbar'
import { RichTextEditorProps } from './types'

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Börja skriva...',
  disabled = false,
  className = ''
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [activeStyles, setActiveStyles] = useState<string[]>([])

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value || ''
    }
  }, [])

  const handleAction = (action: string) => {
    if (!editorRef.current || disabled) return

    if (action === 'createLink') {
      const url = window.prompt('Ange URL:', 'https://')
      if (url) {
        document.execCommand(action, false, url)
      }
    } else {
      document.execCommand(action, false)
    }

    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
    updateActiveStyles()
  }

  const updateActiveStyles = () => {
    const styles = [
      'bold',
      'italic',
      'insertUnorderedList',
      'insertOrderedList',
      'justifyLeft',
      'justifyCenter',
      'justifyRight'
    ]

    const active = styles.filter(style => document.queryCommandState(style))
    setActiveStyles(active)
  }

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleSelectionChange = () => {
    updateActiveStyles()
  }

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange)
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange)
    }
  }, [])

  return (
    <div className={`border rounded-lg overflow-hidden ${className}`}>
      <Toolbar onAction={handleAction} activeStyles={activeStyles} />
      <div
        ref={editorRef}
        className={`p-4 min-h-[200px] focus:outline-none ${
          disabled ? 'bg-gray-50 cursor-not-allowed' : ''
        }`}
        contentEditable={!disabled}
        onInput={handleInput}
        data-placeholder={placeholder}
        onBlur={handleInput}
        onFocus={updateActiveStyles}
      />
    </div>
  )
}
