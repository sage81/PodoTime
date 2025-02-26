<template>
  <div class="clients-filter">
    <div class="search-box">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Пошук за ім'ям або телефоном..."
        @input="handleSearch"
      />
    </div>
    <div class="filters">
      <select v-model="selectedCategory" @change="handleFilter">
        <option value="">Всі категорії</option>
        <option value="regular">Звичайний</option>
        <option value="vip">VIP</option>
      </select>
      <select v-model="sortBy" @change="handleSort">
        <option value="name">За ім'ям</option>
        <option value="date">За датою</option>
      </select>
      <button @click="handleExport" class="export-btn">
        Експорт CSV
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useClientsStore } from '@/stores/clients'
import { exportToCSV } from '@/utils/export'

const store = useClientsStore()
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('name')

const handleSearch = () => {
  store.filterAndSortClients(searchQuery.value, selectedCategory.value, sortBy.value)
}

const handleFilter = () => {
  store.filterAndSortClients(searchQuery.value, selectedCategory.value, sortBy.value)
}

const handleSort = () => {
  store.filterAndSortClients(searchQuery.value, selectedCategory.value, sortBy.value)
}

const handleExport = () => {
  exportToCSV(store.filteredClients)
}
</script>

<style scoped>
.clients-filter {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.search-box {
  flex: 1;
}

.filters {
  display: flex;
  gap: 10px;
}

select {
  min-width: 120px;
}

.search-box input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.category-filter select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  min-width: 150px;
}

input:focus, select:focus {
  outline: none;
  border-color: var(--primary-color);
}

.export-btn {
  padding: 10px;
  background: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: opacity 0.2s;
}

.export-btn:hover {
  opacity: 0.9;
}
</style> 