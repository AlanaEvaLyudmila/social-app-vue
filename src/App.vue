<template>
  <div>
    <nav>
      <RouterLink to="/">📱 Лента</RouterLink>
      <RouterLink to="/profile">👤 Профиль</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: Arial, sans-serif; background: #f5f5f5; }
nav { background: white; padding: 15px; display: flex; gap: 20px; justify-content: center; }
nav a { text-decoration: none; color: #333; padding: 8px 16px; border-radius: 5px; }
nav a:hover { background: #f0f0f0; }
.router-link-active { background: #667eea; color: white; }
</style>