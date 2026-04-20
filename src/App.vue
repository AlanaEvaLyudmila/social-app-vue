<template>
  <div class="app">
    <nav class="nav">
      <RouterLink to="/">Лента</RouterLink><br>
      <RouterLink to="/stats">Статистика</RouterLink>
      <br>
      <RouterLink to="/profile">Профиль</RouterLink>
    </nav>
    <RouterView/>
  </div>
</template>
