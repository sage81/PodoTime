import type { Client } from '@/types'

export const exportToCSV = (clients: Client[]) => {
  const headers = [
    'Ім\'я',
    'Прізвище',
    'Телефон',
    'Email',
    'Категорія',
    'Нотатки',
    'Створено',
    'Оновлено'
  ]

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('uk-UA')
  }

  const rows = clients.map(client => [
    client.firstName,
    client.lastName,
    client.phone,
    client.email || '',
    client.category,
    client.notes || '',
    formatDate(client.createdAt),
    formatDate(client.updatedAt)
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n')

  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `clients-${new Date().toISOString().split('T')[0]}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
} 