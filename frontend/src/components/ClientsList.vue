<template>
  <div class="clients-list">
    <h2>Список клієнтів</h2>
    
    <ClientsFilter />
    
    <div v-if="store.loading">Завантаження...</div>
    <div v-else-if="store.error">{{ store.error }}</div>
    <div class="content">
      <TransitionGroup name="list" tag="div" class="list">
        <div 
          v-for="client in store.filteredClients" 
          :key="client.id" 
          class="client-item"
          @click="showDetails(client)"
        >
          <h3>{{ client.firstName }} {{ client.lastName }}</h3>
          <p>{{ client.phone }}</p>
          <p class="category" :class="client.category">{{ client.category }}</p>
          <div class="actions">
            <button @click.stop="editClient(client)" class="edit">
              Редагувати
            </button>
            <button @click.stop="deleteClient(client.id)" class="delete">
              Видалити
            </button>
          </div>
        </div>
      </TransitionGroup>

      <div v-if="selectedClient" class="details-panel">
        <ClientDetails 
          :client="selectedClient"
          @edit="editClient(selectedClient)"
          @close="selectedClient = null"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useClientsStore } from '@/stores/clients'
import type { Client } from '@/types'
import ClientsFilter from './ClientsFilter.vue'
import ClientDetails from './ClientDetails.vue'

const store = useClientsStore()
const emit = defineEmits(['edit'])
const selectedClient = ref<Client | null>(null)

const showDetails = (client: Client) => {
  selectedClient.value = client
}

const editClient = (client: Client) => {
  emit('edit', client)
}

const deleteClient = async (id: string) => {
  if (!confirm('Видалити клієнта?')) return
  try {
    await store.deleteClient(id)
  } catch (e) {
    console.error('Error deleting client:', e)
  }
}

onMounted(() => {
  store.fetchClients()
})

defineExpose({ fetchClients: store.fetchClients })
</script>

<style scoped>
.clients-list {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.client-item {
  padding: 15px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.client-item:last-child {
  border-bottom: none;
}

.client-item:hover {
  background-color: #f9f9f9;
}

.client-item h3 {
  margin: 0 0 10px 0;
  color: var(--secondary-color);
}

.client-item p {
  margin: 5px 0;
  color: #666;
}

.actions {
  margin-top: 10px;
}

button {
  margin-right: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.edit {
  background: var(--primary-color);
}

button.delete {
  background: var(--error-color);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.content {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
}

.list {
  min-width: 0;
}

.client-item {
  cursor: pointer;
}

.details-panel {
  position: sticky;
  top: 20px;
  width: 400px;
}

.category {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 14px;
}

.category.regular {
  background: #e3f2fd;
  color: #1976d2;
}

.category.vip {
  background: #fdf2e3;
  color: #ed6c02;
}

@media (max-width: 1200px) {
  .content {
    grid-template-columns: 1fr;
  }
  
  .details-panel {
    position: static;
    width: auto;
  }
}
</style> 