<template>
  <div class="qr-preview card">
    <h2>Aperçu</h2>
    
    <!-- Layout A4 -->
    <PrintLayout
      ref="printLayoutRef"
      :qrCodeUrl="qrCodeUrl"
      :title="formattedTitle"
      :description="description"
    />

    <!-- Actions -->
    <div class="actions">
      <button @click="handleDownload" class="btn-download" :disabled="isExporting">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        {{ isExporting ? 'Export...' : 'Télécharger PNG' }}
      </button>
      
      <button @click="handlePrint" class="secondary">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 6 2 18 2 18 9"/>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
          <rect x="6" y="14" width="12" height="8"/>
        </svg>
        Imprimer
      </button>
    </div>
    
    <p v-if="exportError" class="error-message">{{ exportError }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PrintLayout from '../components/PrintLayout.vue'
import { usePrintLayout } from '../composables/usePrintLayout.js'

const props = defineProps({
  qrCodeUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
})

// Formater le titre avec "Code:" devant
const formattedTitle = computed(() => {
  return props.title ? `Code: ${props.title}` : ''
})

const printLayoutRef = ref(null)
const { isExporting, exportError, exportToPNG, printLayout } = usePrintLayout()

const handleDownload = async () => {
  if (printLayoutRef.value?.$el) {
    await exportToPNG(printLayoutRef.value.$el, 'qr-code')
  }
}

const handlePrint = () => {
  printLayout()
}
</script>

<style scoped>
.qr-preview h2 {
  margin-top: 0;
  margin-bottom: var(--space-6);
}

.actions {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-6);
  flex-wrap: wrap;
}

.actions button {
  flex: 1;
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
}

.btn-download {
  background-color: var(--color-primary);
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: var(--space-3);
  text-align: center;
}

@media (max-width: 768px) {
  .actions {
    flex-direction: column;
  }
  
  .actions button {
    width: 100%;
  }
}

/* Styles d'impression */
@media print {
  .qr-preview {
    box-shadow: none;
    border: none;
    padding: 0;
  }
  
  .qr-preview h2,
  .actions,
  .error-message {
    display: none;
  }
}
</style>