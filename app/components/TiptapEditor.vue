<template>
  <div class="wysiwyg-editor">
    <div v-if="editor">
      <Icon name="ic:baseline-format-bold" size="32px"
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        bold
      </Icon>
      <Icon name="ic:baseline-format-italic" size="32px"
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        italic
      </Icon>
      <Icon name="ic:baseline-format-strikethrough" size="32px"
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        strike
      </Icon>
      <Icon name="mdi:code-tags" size="32px"
        @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
      >
        code
      </Icon>
    
      <Icon name="mdi:format-paragraph" size="32px"
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }"
      >
        paragraph
      </Icon>
      <Icon name="ci:heading-h1" size="32px"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        h1
      </Icon>
      <Icon name="ci:heading-h2" size="32px"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        h2
      </Icon>
      <Icon name="ci:heading-h3" size="32px"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        h3
      </Icon>
      <Icon name="ic:baseline-format-list-bulleted" size="32px"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        bullet list
      </Icon>      
      <Icon name="ic:round-format-list-numbered" size="32px"
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
      >
        ordered list
      </Icon>
      <Icon name="bx:code-block" size="32px"
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
      >
        code block
      </Icon>
      <Icon name="ic:round-format-quote" size="32px"
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }"
      >
        blockquote
      </Icon>
      <Icon name="ic:outline-horizontal-rule" size="32px"
      @click="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </Icon>
      <Icon name="ph:link-simple-horizontal-break-bold" size="32px"
      @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </Icon>
      <Icon name="ci:arrow-undo-up-left" size="32px"
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
      >
        undo
      </Icon>
      <Icon name="ci:arrow-undo-up-right" size="32px"
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
      >
        redo
      </Icon>
    </div>
    <TiptapEditorContent :editor="editor" />
  </div>
</template>

<style>
.wysiwyg-editor .iconify {
  cursor: pointer;
}
.tiptap {
  border: 1px solid rgb(209 213 219 / var(--tw-border-opacity, 1));
  border-radius: 5px;
  min-height: 100px;
  margin-top: 10px;
}
</style>

<script setup>

const modelValue = defineModel(); //handles v-model

const editor = useEditor({
  extensions: [TiptapStarterKit],
  onUpdate({ editor }) {
    modelValue.value = editor.getHTML() // update v-model on changes
  },
});

// Sync external changes to the editor
watch( () => modelValue.value,
  (newValue) => {
    if (editor && newValue !== editor.value.getHTML()) {
      editor.value.commands.setContent(newValue);
    }
  }
);

onBeforeUnmount(() => {
  unref(editor).destroy();
});
</script>
