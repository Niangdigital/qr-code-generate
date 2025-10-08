<template>
  <div class="print-layout">
    <div class="a4-container">
      <!-- En-tête décoratif -->
      
      
      <!-- Contenu principal -->
      <div class="content-wrapper">
        <!-- Titre -->
        <h1 v-if="title" class="print-title">{{ title }}</h1>
        
        <!-- QR Code -->
        <div class="qr-container">
          <img :src="qrCodeUrl" alt="QR Code" class="qr-image" />
        </div>
        
        <!-- Description -->
        <p v-if="description" class="print-description">{{ description }}</p>
        
        <!-- Instructions -->
        <div class="instructions">
          <p>Scannez ce QR code avec votre smartphone</p>
        </div>
      </div>
      
      <!-- Pied de page -->
      <div class="footer">
        <p>Musée des Civilisations Noires</p>
      </div>
    </div>
  </div>
</template>

<script setup>
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
</script>

<style scoped>
/* Styles pour l'affichage écran */
.print-layout {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: var(--space-4);
}

/* Container A4 pour l'affichage écran */
.a4-container {
  width: 100%;
  max-width: 600px;
  background: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius);
  padding: var(--space-4);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  height: fit-content;
  max-height: calc(100vh - 120px);
}

.header-decoration {
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  border-radius: 2px;
  margin-bottom: var(--space-4);
  flex-shrink: 0;
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: var(--space-4);
  min-height: 0;
  overflow-y: auto;
  padding: var(--space-2) 0;
}

.print-title {
  font-size: 1.5rem;
  color: var(--color-primary-dark);
  margin: 0;
  font-weight: 700;
  max-width: 100%;
  word-wrap: break-word;
  flex-shrink: 0;
}

.qr-container {
  background: var(--color-white);
  padding: var(--space-3);
  border: 2px solid var(--color-gray-200);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  flex-shrink: 0;
}

.qr-image {
  display: block;
  width: 220px;
  height: 220px;
  max-width: 100%;
  color: black;
}

.print-description {
  font-size: 1rem;
  color: var(--color-gray-700);
  line-height: 1.5;
  max-width: 500px;
  margin: 0;
  white-space: pre-wrap;
  flex-shrink: 1;
  overflow-y: auto;
  max-height: 150px;
}

.instructions {
  margin-top: 0;
  padding: var(--space-2) var(--space-4);
  background: var(--color-beige);
  border-radius: var(--border-radius);
  border-left: 4px solid var(--color-secondary);
  flex-shrink: 0;
}

.instructions p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-gray-700);
  font-weight: 500;
}

.footer {
  margin-top: var(--space-4);
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-gray-200);
  text-align: center;
  flex-shrink: 0;
}

.footer p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-gray-500);
}

/* Responsive pour l'écran */
@media (max-width: 768px) {
  .a4-container {
    padding: var(--space-4);
    max-height: none;
  }
  
  .print-title {
    font-size: 1.25rem;
  }
  
  .qr-image {
    width: 180px;
    height: 180px;
    color: #000;
  }
  
  .print-description {
    font-size: 0.9375rem;
    max-height: 120px;
  }
  
  .content-wrapper {
    gap: var(--space-3);
  }
}

@media (max-width: 480px) {
  .a4-container {
    padding: var(--space-3);
  }
  
  .qr-image {
    width: 160px;
    height: 160px;
    color: #000;
  }
  
  .print-title {
    font-size: 1.125rem;
  }
  
  .instructions p {
    font-size: 0.8125rem;
  }
}

/* Styles d'impression - FORMAT A4 FIXE */
@media print {
  @page {
    size: A4;
    margin: 0;
  }
  
  body, html {
    margin: 0 !important;
    padding: 0 !important;
    width: 210mm;
    height: 297mm;
  }
  
  .print-layout {
    margin: 0 !important;
    padding: 0 !important;
    width: 210mm !important;
    height: 297mm !important;
    display: block !important;
    box-shadow: none !important;
    background: white !important;
  }
  
  .a4-container {
    width: 210mm !important;
    height: 297mm !important;
    min-height: 297mm !important;
    max-width: none !important;
    max-height: none !important;
    border: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    padding: 20mm !important;
    margin: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    page-break-after: always;
    break-after: page;
  }
  
  .content-wrapper {
    flex: 1 !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    text-align: center !important;
    gap: 8mm !important;
    min-height: 0 !important;
    overflow: visible !important;
    padding: 0 !important;
  }
  
  .print-title {
    font-size: 24pt !important;
    color: black !important;
    margin: 0 !important;
    max-width: 100% !important;
  }
  
  .qr-container {
    background: white !important;
    padding: 4mm !important;
    border: 1px solid #ccc !important;
    border-radius: 4mm !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
    color:#000;
  }
  
  .qr-image {
    width: 80mm !important;
    height: 80mm !important;
    max-width: none !important;
    color: #000 !important  ;
    
  }
  
  .print-description {
    font-size: 14pt !important;
    color: black !important;
    line-height: 1.4 !important;
    max-width: 160mm !important;
    margin: 0 !important;
    max-height: none !important;
    overflow: visible !important;
  }
  
  .instructions {
    margin-top: 0 !important;
    padding: 3mm 6mm !important;
    background: #f9f9f9 !important;
    border-radius: 2mm !important;
    border-left: 2mm solid #666 !important;
  }
  
  .instructions p {
    font-size: 12pt !important;
    color: black !important;
    margin: 0 !important;
  }
  
  .footer {
    margin-top: auto !important;
    padding-top: 4mm !important;
    border-top: 1px solid #ccc !important;
  }
  
  .footer p {
    font-size: 11pt !important;
    color: #666 !important;
  }
  
  .header-decoration {
    height: 2mm !important;
    background: linear-gradient(90deg, #333, #666) !important;
    print-color-adjust: exact !important;
    -webkit-print-color-adjust: exact !important;
  }
  
  /* Masquer les autres éléments de la page pendant l'impression */
  body * {
    visibility: hidden;
  }
  
  .print-layout,
  .print-layout * {
    visibility: visible;
  }
  
  .print-layout {
    position: absolute;
    left: 0;
    top: 0;
  }
}

/* Pour le téléchargement en PDF */
@media screen and (orientation: portrait) {
  .a4-container.print-format {
    width: 210mm;
    height: 297mm;
  }
}

@media screen and (orientation: landscape) {
  .a4-container.print-format {
    width: 297mm;
    height: 210mm;
  }
}
</style>