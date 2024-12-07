import React, { useState } from 'react'
import { EditorProvider, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const extensions = [StarterKit]

const Tiptap = () => {
  // usestate qui servira à récupérer le contenu de l'éditeur
  const [content, setContent] = useState('<p>Hello World!</p>')

  // fonction qui permet de detecter les changements dans l'éditeur et de le recup ensuite dans "content"
  const handleChange = ({ editor }) => {
    setContent(editor.getHTML())
  }

  return (
    <>
      <EditorProvider
        extensions={extensions}
        content={content}
        onUpdate={handleChange}>
        <EditorContent style={{ height: 120 }} />
        <FloatingMenu>This is the floating menu</FloatingMenu>
        <BubbleMenu>This is the bubble menu</BubbleMenu>
      </EditorProvider>

      <div>
        <h3>Editor Content:</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </>
  )
}

export default Tiptap
