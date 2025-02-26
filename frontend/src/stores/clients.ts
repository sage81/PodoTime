import { defineStore } from 'pinia'
import type { Client, NewClient } from '@/types'

export const useClientsStore = defineStore('clients', {
  state: () => ({
    clients: [] as Client[],
    filteredClients: [] as Client[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    filterAndSortClients(search: string, category: string, sortBy: string) {
      let filtered = this.clients.filter(client => {
        const matchesSearch = search === '' || 
          client.firstName.toLowerCase().includes(search.toLowerCase()) ||
          client.lastName.toLowerCase().includes(search.toLowerCase()) ||
          client.phone.includes(search)
        
        const matchesCategory = category === '' || client.category === category
        
        return matchesSearch && matchesCategory
      })

      // Сортування
      filtered.sort((a, b) => {
        if (sortBy === 'name') {
          return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
        } else if (sortBy === 'date') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }
        return 0
      })

      this.filteredClients = filtered
    },

    async fetchClients() {
      this.loading = true
      this.error = null
      try {
        const response = await fetch('https://podotime-production.up.railway.app/clients')
        this.clients = await response.json()
        this.filteredClients = this.clients
      } catch (e) {
        this.error = 'Помилка завантаження клієнтів'
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    async createClient(client: NewClient) {
      try {
        const response = await fetch('https://podotime-production.up.railway.app/clients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(client)
        })
        const newClient = await response.json()
        this.clients.push(newClient)
        this.filteredClients = [...this.clients]
        return newClient
      } catch (e) {
        console.error('Error creating client:', e)
        throw e
      }
    },

    async updateClient(id: string, client: Partial<Client>) {
      try {
        const response = await fetch(`https://podotime-production.up.railway.app/clients/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(client)
        })
        const updatedClient = await response.json()
        const index = this.clients.findIndex(c => c.id === id)
        if (index !== -1) {
          this.clients[index] = updatedClient
        }
        return updatedClient
      } catch (e) {
        console.error('Error updating client:', e)
        throw e
      }
    },

    async deleteClient(id: string) {
      try {
        await fetch(`https://podotime-production.up.railway.app/clients/${id}`, {
          method: 'DELETE'
        })
        this.clients = this.clients.filter(client => client.id !== id)
        this.filteredClients = [...this.clients]
      } catch (e) {
        console.error('Error deleting client:', e)
        throw e
      }
    }
  }
}) 