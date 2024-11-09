// app/example/page.tsx
'use client'
import { MainLayout } from '@/components/layout/main-layout'
import { RichTextEditor } from '@/components/ui/rich-text-editor'

import { useState } from 'react'

export default function ExamplePage() {
  const [content, setContent] = useState('<p>Initial content</p>')

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Editor Example</h1>
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Write something..."
          />
        </div>
      </div>
    </MainLayout>
  )
}
