<template>
  <div class="app">
    <nav class="nav">
      <RouterLink to="/">Лента</RouterLink>
      <RouterLink to="/stats">Статистика</RouterLink>
      <router-link to="/profile">Профиль</router-link>
    </nav>
    <RouterView/>
  </div>
</template>

