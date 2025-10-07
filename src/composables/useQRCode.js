import { ref } from 'vue'
import QRCode from 'qrcode'

export function useQRCode() {
  const qrCodeUrl = ref('')
  const isGenerating = ref(false)
  const error = ref('')

  const generateQRCode = async (data, options = {}) => {
    if (!data || !data.trim()) {
      error.value = 'Le contenu ne peut pas être vide'
      return false
    }

    isGenerating.value = true
    error.value = ''

    try {
      const defaultOptions = {
        width: 400,
        margin: 2,
        color: {
          dark: '#2c5530',
          light: '#ffffff'
        },
        errorCorrectionLevel: 'M'
      }

      qrCodeUrl.value = await QRCode.toDataURL(data, {
        ...defaultOptions,
        ...options
      })

      return true
    } catch (err) {
      error.value = 'Erreur lors de la génération du QR code'
      console.error('QR Generation Error:', err)
      return false
    } finally {
      isGenerating.value = false
    }
  }

  const reset = () => {
    qrCodeUrl.value = ''
    error.value = ''
    isGenerating.value = false
  }

  return {
    qrCodeUrl,
    isGenerating,
    error,
    generateQRCode,
    reset
  }
}