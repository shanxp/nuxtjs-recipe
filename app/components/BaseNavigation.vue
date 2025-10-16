<template>
    <header class="py-4 border-b">
    <nav class="flex container items-center">
      <NuxtLink href="/" class="flex gap-1 items-center">
        <NuxtImg width="56px" densities="x2" src="/icon-green.png" alt="" />
        <span class="text-3xl font-bold">Nuxtcipes</span>
      </NuxtLink>
      <ul class="flex gap-6 ml-auto text-xl font-bold capitalize">
        <li>
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about">About Us</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/posts">Posts</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts"></script>
