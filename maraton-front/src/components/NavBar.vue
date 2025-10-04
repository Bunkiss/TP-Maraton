<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">🏃 Maratón</router-link>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/atletas">Atletas</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/ciudades">Ciudades</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

