import { ref } from 'vue'
import html2canvas from 'html2canvas'

export function usePrintLayout() {
  const isExporting = ref(false)
  const exportError = ref('')

  const exportToPNG = async (element, filename = 'qr-code') => {
    if (!element) {
      exportError.value = 'Élément introuvable'
      return false
    }

    isExporting.value = true
    exportError.value = ''

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: false
      })

      const link = document.createElement('a')
      const timestamp = new Date().getTime()
      link.download = `${filename}-${timestamp}.png`
      link.href = canvas.toDataURL('image/png', 1.0)
      link.click()

      return true
    } catch (err) {
      exportError.value = 'Erreur lors de l\'export PNG'
      console.error('PNG Export Error:', err)
      return false
    } finally {
      isExporting.value = false
    }
  }

  const printLayout = () => {
    try {
      window.print()
      return true
    } catch (err) {
      exportError.value = 'Erreur lors de l\'impression'
      console.error('Print Error:', err)
      return false
    }
  }

  const getFormattedDate = () => {
    return new Date().toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return {
    isExporting,
    exportError,
    exportToPNG,
    printLayout,
    getFormattedDate
  }
}