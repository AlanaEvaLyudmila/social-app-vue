<template>
  <div class="app">
    <nav class="nav" style="font-size: larger; display: flex; gap: 8px;">
      <RouterLink to="/">Лента</RouterLink>
      <RouterLink to="/stats">Статистика</RouterLink>
      <RouterLink to="/profile">Профиль</RouterLink>
    </nav>
    <RouterView/>
  </div>
</template>
