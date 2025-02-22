<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Клієнти</h2>
      <button
        @click="openNewClientModal"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Додати клієнта
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="client in clients"
        :key="client.id"
        class="bg-white p-4 rounded-lg shadow"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-semibold">
              {{ client.firstName }} {{ client.lastName }}
            </h3>
            <p class="text-gray-600">{{ client.phone }}</p>
          </div>
          <span
            :class="[
              'px-2 py-1 rounded-full text-sm',
              client.category === 'vip' ? 'bg-gold-100 text-gold-800' : 'bg-gray-100'
            ]"
          >
            {{ client.category === 'vip' ? 'VIP' : 'Звичайний' }}
          </span>
        </div>
        
        <div class="mt-4 flex justify-end space-x-2">
          <button
            @click="editClient(client)"
            class="text-blue-500 hover:text-blue-700"
          >
            Редагувати
          </button>
          <button
            @click="deleteClient(client.id)"
            class="text-red-500 hover:text-red-700"
          >
            Видалити
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Client } from '@/types';

const clients = ref<Client[]>([]);

const fetchClients = async () => {
  try {
    const response = await fetch('/api/clients');
    clients.value = await response.json();
  } catch (error) {
    console.error('Помилка при завантаженні клієнтів:', error);
  }
};

const openNewClientModal = () => {
  // TODO: Реалізувати відкриття модального вікна
};

const editClient = (client: Client) => {
  // TODO: Реалізувати редагування клієнта
};

const deleteClient = async (id: string) => {
  if (!confirm('Ви впевнені, що хочете видалити цього клієнта?')) return;
  
  try {
    await fetch(`/api/clients/${id}`, { method: 'DELETE' });
    await fetchClients();
  } catch (error) {
    console.error('Помилка при видаленні клієнта:', error);
  }
};

onMounted(() => {
  fetchClients();
});
</script> 