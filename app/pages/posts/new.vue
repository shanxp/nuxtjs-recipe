<script setup lang="ts">
import { ref } from 'vue';
import * as z from 'zod';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content cannot be empty'),
})

const form = ref({
  title: "",
  content: "",
  ckcontent: "",
});

const result = ref("");
const status = ref("");

const submitForm = async () => {
  result.value = "Please wait...";
  try {
    const response = await $fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: form.value,
    });

    console.log(response); // You can remove this line if you don't need it

    result.value = response.message;

    if (response.status === 200) {
      status.value = "success";
    } else {
      console.log(response); // Log for debugging, can be removed
      status.value = "error";
    }
  } catch (error) {
    console.log(error); // Log for debugging, can be removed
    status.value = "error";
    result.value = "Something went wrong!";
  } finally {
    // Reset form after submission
    form.value.title = "";
    form.value.content = "";
    form.value.ckcontent = "";

    // Clear result and status after 5 seconds
    setTimeout(() => {
      result.value = "";
      status.value = "";
    }, 5000);
  }
};

</script>

<template>
  <section class="container py-20">   
    <form @submit.prevent="submitForm" class="bg-white p-8 rounded-lg shadow-md w-[700px] space-y-6">
    <h2 class="text-2xl font-bold text-gray-800">New post</h2>

    <!-- Title Field -->
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
      <input v-model="form.title" type="text" id="title" name="title" required
             class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
    </div>

    <!-- Message Field -->
    <div class="editor-area">
      <label for="content" class="block text-sm font-medium text-gray-700 mb-1">TipTap Editor</label>
      <TiptapEditor v-model="form.content" />
    </div>
    <!-- Message Field -->
    <div class="editor-area">
      <label for="ckcontent" class="block text-sm font-medium text-gray-700 mb-1">CKEditor</label>
      <ClientOnly>
        <CkEditor v-model="form.ckcontent" />
        <div v-html="form.ckcontent" class="preview" />
      </ClientOnly>
    </div>

    <!-- Submit Button -->
    <button type="submit"
            class="w-full bg-apple-green text-white py-2 px-4 rounded-md hover:bg-apple-green transition duration-200">
      Send
    </button>
  </form>
  </section>
</template>

<style scoped>
.preview {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-top: 1rem;
}
</style>