<template>
  <div v-if="client" class="client-details">
    <div class="header">
      <h3>{{ client.firstName }} {{ client.lastName }}</h3>
      <div class="badges">
        <span class="badge" :class="client.category">{{ client.category }}</span>
      </div>
    </div>

    <div class="info-grid">
      <div class="info-item">
        <label>Телефон</label>
        <p>{{ client.phone }}</p>
      </div>
      
      <div class="info-item">
        <label>Email</label>
        <p>{{ client.email || '—' }}</p>
      </div>

      <div class="info-item">
        <label>Створено</label>
        <p>{{ formatDate(client.createdAt) }}</p>
      </div>

      <div class="info-item">
        <label>Оновлено</label>
        <p>{{ formatDate(client.updatedAt) }}</p>
      </div>
    </div>

    <div class="notes" v-if="client.notes">
      <label>Нотатки</label>
      <p>{{ client.notes }}</p>
    </div>

    <div class="actions">
      <button @click="$emit('edit')" class="edit">Редагувати</button>
      <button @click="$emit('close')" class="secondary">Закрити</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Client } from '@/types'

const props = defineProps<{
  client: Client | null
}>()

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

defineEmits(['edit', 'close'])
</script>

<style scoped>
.client-details {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h3 {
  margin: 0;
  color: var(--secondary-color);
}

.badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}

.badge.regular {
  background: #e3f2fd;
  color: #1976d2;
}

.badge.vip {
  background: #fdf2e3;
  color: #ed6c02;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.info-item label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.info-item p {
  margin: 0;
  font-size: 16px;
  color: var(--secondary-color);
}

.notes {
  margin-bottom: 20px;
}

.notes label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.notes p {
  margin: 0;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
}

.actions {
  display: flex;
  gap: 10px;
}

button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: opacity 0.2s;
}

button:hover {
  opacity: 0.9;
}

button.edit {
  background: var(--primary-color);
  color: white;
}

button.secondary {
  background: var(--secondary-color);
  color: white;
}
</style> 