<template>
  <div class="clients">
    <h1>Клієнти</h1>
    <div class="clients-container">
      <div class="clients-list">
        <ClientsList @edit="handleEdit" ref="clientsList" />
      </div>
      <div class="client-form">
        <ClientForm 
          ref="clientForm"
          @created="handleCreated"
          @updated="handleUpdated"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ClientsList from '@/components/ClientsList.vue'
import ClientForm from '@/components/ClientForm.vue'
import type { Client } from '@/types'

const clientsList = ref<InstanceType<typeof ClientsList> | null>(null)
const clientForm = ref<{ editClient: (client: Client) => void } | null>(null)

const handleEdit = (client: Client) => {
  clientForm.value?.editClient(client)
}

const handleCreated = () => {
  clientsList.value?.fetchClients()
}

const handleUpdated = () => {
  clientsList.value?.fetchClients()
}
</script>

<style>
.clients {
  padding: 20px;
}

.clients-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .clients-container {
    grid-template-columns: 1fr;
  }
}
</style> 