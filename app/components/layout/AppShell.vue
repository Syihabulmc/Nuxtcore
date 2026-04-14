<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <div class="grid min-h-screen lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside class="hidden border-r border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 lg:block">
        <slot name="sidebar" />
      </aside>

      <div class="flex min-h-screen flex-col">
        <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
          <slot name="header" />
        </header>

        <main class="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
