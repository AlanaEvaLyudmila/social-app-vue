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
<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  font-family: Arial, sans-serif;
  background:#f5f7fa;
}

#app{
  max-width:900px;
  margin:0 auto;
  padding:30px;
}

.nav{
  display:flex;
  gap:20px;
  margin-bottom:30px;
  padding:15px 20px;
  background:white;
  border-radius:12px;
  box-shadow:0 4px 12px rgba(0,0,0,0.08);
}

.nav a{
  text-decoration:none;
  color:#555;
  font-weight:600;
  transition:0.2s;
}

.nav a:hover{
  color:#3b82f6;
}
</style>