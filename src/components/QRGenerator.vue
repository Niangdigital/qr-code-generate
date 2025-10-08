<template>
  <div class="qr-generator">
    <div class="layout-grid">
      <!-- Formulaire -->
      <div class="form-section">
        <h2>Remplissez les Informations</h2>
        
        <div class="form-group">
          <label for="qr-data">Veuiller mettre le contenu du QR Code *</label>
          <input
            id="qr-data"
            v-model="formData.qrData"
            type="text"
            placeholder="URL ou texte à encoder"
            required
          />
          <span v-if="error" class="error">{{ error }}</span>
        </div>

        <div class="form-group">
          <label for="title">Ajoutez un code *</label>
          <input
            id="title"
            v-model="formData.title"
            type="text"
            placeholder="Ex: artwork-1"
            maxlength="100"
            @blur="validateArtworkFormat"
            @input="formatArtworkCode"
          />
          <span v-if="titleError" class="error">{{ titleError }}</span>
          <span v-else class="hint">Format requis: artwork-Nombre (ex: artwork-1, artwork-123)</span>
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="formData.description"
            rows="3"
            placeholder="Ajoutez une description..."
            maxlength="500"
          ></textarea>
          <span class="char-count">{{ formData.description.length }}/500</span>
        </div>
      </div>

      <!-- Aperçu -->
      <div class="preview-section">
        <QRPreview 
          v-if="qrCodeUrl && isValidArtworkFormat"
          :qrCodeUrl="qrCodeUrl"
          :title="formData.title"
          :description="formData.description"
        />
        <div v-else class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
          <p>Remplissez le formulaire pour générer votre QR code</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, ref, computed } from 'vue'
import QRPreview from '../components/QRPreview.vue'
import { useQRCode } from '../composables/useQRCode.js'

const { qrCodeUrl, isGenerating, error, generateQRCode } = useQRCode()

const formData = reactive({
  qrData: '',
  title: '',
  description: ''
})

const titleError = ref('')

// Expression régulière pour valider le format artwork-Nombre
const artworkRegex = /^artwork-\d+$/

// Vérifie si le format est valide
const isValidArtworkFormat = computed(() => {
  return artworkRegex.test(formData.title)
})

// Valide le format au blur
const validateArtworkFormat = () => {
  if (!formData.title.trim()) {
    titleError.value = 'Le code est requis'
    return false
  }
  
  if (!isValidArtworkFormat.value) {
    titleError.value = 'Format invalide. Utilisez: Artwork-Nombre (ex: Artwork-1)'
    return false
  }
  
  titleError.value = ''
  return true
}

// Aide à la saisie du format
const formatArtworkCode = (event) => {
  titleError.value = ''
  
  const value = event.target.value
  
  // Si l'utilisateur tape juste un nombre, on ajoute automatiquement "artwork-"
  if (/^\d+$/.test(value)) {
    formData.title = `artwork-${value}`
  }
}

// Génération automatique quand qrData change et que le format est valide
watch(() => formData.qrData, async (newValue) => {
  if (newValue.trim() && isValidArtworkFormat.value) {
    await generateQRCode(newValue)
  }
}, { immediate: false })

// Regénère le QR code quand le titre change et est valide
watch(() => formData.title, async () => {
  if (formData.qrData.trim() && isValidArtworkFormat.value) {
    await generateQRCode(formData.qrData)
  }
})
</script>

<style scoped>
.qr-generator {
  width: 100%;
  padding: 1.5rem;
}

.layout-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  max-width: 1200px;
  margin: 0 auto;
}

@media (min-width: 968px) {
  .layout-grid {
    grid-template-columns: 400px 1fr;
  }
}

/* Section formulaire */
.form-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-section h2 {
  margin: 0 0 1.5rem 0;
  font-size: 2rem;
  font-weight: 600;
  color: #1a1a1a;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group:last-of-type {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.9375rem;
  transition: all 0.2s;
  background: #fafafa;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group input.invalid {
  border-color: #dc2626;
}

.form-group textarea {
  resize: none;
  min-height: 70px;
}

.char-count {
  display: block;
  text-align: right;
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 0.375rem;
}

.error {
  display: block;
  color: #dc2626;
  font-size: 0.8125rem;
  margin-top: 0.375rem;
  font-weight: 500;
}

.hint {
  display: block;
  color: #6b7280;
  font-size: 0.8125rem;
  margin-top: 0.375rem;
  font-style: italic;
}

/* Section preview */
.preview-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

.empty-state svg {
  color: #d1d5db;
  margin-bottom: 1rem;
}

.empty-state p {
  color: #6b7280;
  font-size: 0.9375rem;
  margin: 0;
}

@media (max-width: 967px) {
  .qr-generator {
    padding: 1rem;
  }
  
  .layout-grid {
    gap: 1.5rem;
  }
  
  .form-section {
    padding: 1.5rem;
  }
  
  .preview-section {
    min-height: 400px;
  }
}

@media (max-width: 640px) {
  .form-section {
    padding: 1.25rem;
  }
  
  .preview-section {
    min-height: 350px;
  }
}
</style>