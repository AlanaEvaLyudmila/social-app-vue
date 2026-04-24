<template>
  <div class="app">
    <nav class="nav">
      <RouterLink to="/">Лента</RouterLink>
      <RouterLink to="/stats">Статистика</RouterLink>
      <RouterLink to="/profile">Профиль</RouterLink>
    </nav>
    <RouterView/> 
  </div>
</template>
