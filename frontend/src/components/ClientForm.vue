<template>
  <div class="client-form">
    <h2>{{ isEditing ? 'Редагувати клієнта' : 'Новий клієнт' }}</h2>
    
    <div v-if="message" :class="['message', message.type]">
      {{ message.text }}
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="firstName">Ім'я</label>
        <input
          id="firstName"
          v-model="form.firstName"
          type="text"
          required
        />
      </div>

      <div class="form-group">
        <label for="lastName">Прізвище</label>
        <input
          id="lastName"
          v-model="form.lastName"
          type="text"
          required
        />
      </div>

      <div class="form-group">
        <label for="phone">Телефон</label>
        <input
          id="phone"
          v-model="form.phone"
          v-maska data-maska="+380#########"
          type="tel"
          placeholder="+380XXXXXXXXX"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
        />
      </div>

      <div class="form-group">
        <label for="category">Категорія</label>
        <select id="category" v-model="form.category" required>
          <option value="regular">Звичайний</option>
          <option value="vip">VIP</option>
        </select>
      </div>

      <div class="form-group">
        <label for="notes">Нотатки</label>
        <textarea
          id="notes"
          v-model="form.notes"
          rows="3"
        ></textarea>
      </div>

      <div class="form-actions">
        <button type="submit">{{ isEditing ? 'Оновити' : 'Створити' }}</button>
        <button type="button" @click="resetForm" class="secondary">Скасувати</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useClientsStore } from '@/stores/clients'
import type { NewClient, Client } from '@/types'
import { vMaska } from 'maska'

const store = useClientsStore()
const emit = defineEmits(['created', 'updated'])

const isEditing = ref(false)
const editingId = ref<string | null>(null)

const form = reactive<NewClient>({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  category: 'regular',
  notes: ''
})

const message = ref<{ text: string; type: 'success' | 'error' } | null>(null)

const resetForm = () => {
  isEditing.value = false
  editingId.value = null
  Object.assign(form, {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    category: 'regular',
    notes: ''
  })
}

const showMessage = (text: string, type: 'success' | 'error') => {
  message.value = { text, type }
  setTimeout(() => {
    message.value = null
  }, 3000)
}

const validateForm = () => {
  const errors: string[] = []
  
  if (form.firstName.length < 2) {
    errors.push("Ім'я має бути не менше 2 символів")
  }
  
  if (form.lastName.length < 2) {
    errors.push('Прізвище має бути не менше 2 символів')
  }
  
  if (!/^\+380\d{9}$/.test(form.phone)) {
    errors.push('Телефон має бути у форматі +380XXXXXXXXX')
  }
  
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.push('Невірний формат email')
  }
  
  return errors
}

const handleSubmit = async () => {
  const errors = validateForm()
  if (errors.length > 0) {
    showMessage(errors[0], 'error')
    return
  }

  try {
    if (isEditing.value && editingId.value) {
      const updatedClient = await store.updateClient(editingId.value, form)
      emit('updated', updatedClient)
      showMessage('Клієнта оновлено', 'success')
    } else {
      const newClient = await store.createClient(form)
      emit('created', newClient)
      showMessage('Клієнта створено', 'success')
    }
    resetForm()
  } catch (e) {
    console.error('Error saving client:', e)
    showMessage('Помилка збереження', 'error')
  }
}

const editClient = (client: Client) => {
  isEditing.value = true
  editingId.value = client.id
  Object.assign(form, {
    firstName: client.firstName,
    lastName: client.lastName,
    phone: client.phone,
    email: client.email || '',
    category: client.category,
    notes: client.notes || ''
  })
}

defineExpose({ editClient })
</script>

<style scoped>
.client-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--secondary-color);
}

input, select, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

button {
  flex: 1;
  padding: 12px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
}

button:hover {
  opacity: 0.9;
}

button[type="submit"] {
  background: var(--primary-color);
  color: white;
}

button.secondary {
  background: var(--secondary-color);
  color: white;
}

.message {
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
}

.message.success {
  background: #e3f2e6;
  color: #2c7a39;
}

.message.error {
  background: #fde7e9;
  color: #b71c1c;
}
</style> 