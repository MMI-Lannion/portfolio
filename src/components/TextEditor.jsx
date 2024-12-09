import React, { useState } from 'react'
import { EditorProvider, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const extensions = [StarterKit]

const Tiptap = ({ placeholder, onChange, content }) => {
  const handleChange = ({ editor }) => {
    onChange?.(editor.getHTML())
  }

  return (
    <>
      <EditorProvider
        placeholder={placeholder}
        extensions={extensions}
        content={content}
        onUpdate={handleChange}>
        <EditorContent style={{ height: 300 }} />
      </EditorProvider>
    </>
  )
}

export default Tiptap
