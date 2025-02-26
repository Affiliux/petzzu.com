'use client'

import { Bold, Italic, List, ListOrdered, Strikethrough } from 'lucide-react'
import { type Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { Separator } from '@/components/ui/separator'
import { Toggle } from '@/components/ui/toggle'

const RichTextEditor = ({
  placeholder,
  value,
  onChange,
  step3,
}: {
  placeholder: string
  value: string
  onChange: (value: string) => void
  step3?: boolean
}) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: `min-h-[150px] ${step3 ? '2xl:min-h-[282px]' : ''} max-h-[150px] w-full rounded-md rounded-br-none rounded-bl-none border border-input bg-transparent px-3 py-2 border-b-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto`,
      },
    },
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-4',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-4',
          },
        },
      }),
    ],
    content: value, // Set the initial content with the provided value
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()) // Call the onChange callback with the updated HTML content
    },
  })

  return (
    <>
      <EditorContent placeholder={placeholder} editor={editor} />
      {editor ? <RichTextEditorToolbar editor={editor} /> : null}
    </>
  )
}

const RichTextEditorToolbar = ({ editor }: { editor: Editor }) => {
  return (
    <div className='border border-input bg-transparent rounded-br-md rounded-bl-md p-1 flex flex-row items-center gap-1'>
      <Toggle
        size='sm'
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className='h-4 w-4' />
      </Toggle>
      <Separator orientation='vertical' className='w-[1px] h-8' />
    </div>
  )
}

export default RichTextEditor
