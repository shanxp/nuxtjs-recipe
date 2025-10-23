<template>
  <div>
    <div ref="editor"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue']);

const editor = ref(null);
let editorInstance = null;

onMounted(async () => {
  try {
    editorInstance = await ClassicEditor.create(editor.value);
    editorInstance.setData(props.modelValue);

    editorInstance.model.document.on('change:data', () => {
      emit('update:modelValue', editorInstance.getData())
    })
  } catch (error) {
    console.error('CKEditor initialization failed:', error)
  }
});

// Clean up
onBeforeUnmount(() => {
  if (editorInstance) {
    editorInstance.destroy()
    editorInstance = null;
  }
})

// Watch for external changes to modelValue (e.g., reset)
watch(() => props.modelValue, (newValue) => {
  if (editorInstance && editorInstance.getData() !== newValue) {
    editorInstance.setData(newValue);
  }
})
</script>
