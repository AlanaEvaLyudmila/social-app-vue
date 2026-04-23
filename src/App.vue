<template>
  <div class="app">
    <nav class="nav">
      <RouterLink to="/" class="nav-link">Лента</RouterLink>
      <RouterLink to="/stats" class="nav-link">Статистика</RouterLink>
      <RouterLink to="/profile" class="nav-link">Профиль</RouterLink>
    </nav>
    <RouterView/>
  </div>
</template>

<style scoped>
.nav {
  display: flex;
  margin-bottom: 20px;
  gap: 20px;
  background-color:#f5f5f5;
  border-bottom: 1px solid #e0e0e0;

}
.nav-link{
  text-decoration: none;
  color: black;
}
</style>