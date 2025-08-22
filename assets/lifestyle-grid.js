/**
 * Lifestyle Grid Component
 * Handles interactive hotspots and popup functionality for lifestyle product grids
 */
class LifestyleGrid {
  constructor(container) {
    this.container = container;
    this.popup = container.querySelector('[data-popup]');
    this.overlay = container.querySelector('[data-overlay]');
    this.hotspots = container.querySelectorAll('[data-hotspot-id]');
    this.closeButton = container.querySelector('[data-popup-close]');
    this.colorSwatchesContainer = container.querySelector('[data-popup-color-swatches]');
    this.sizeSelect = container.querySelector('.lifestyle-grid__popup__size-select');
    this.customSelect = container.querySelector('[data-custom-select]');
    this.addToCartButton = container.querySelector('[data-popup-add-to-cart]');
    this.currentProduct = null;
    
    this.init();
  }

  init() {
    console.log('Initializing LifestyleGrid...', {
      container: this.container,
      popup: this.popup,
      hotspots: this.hotspots.length,
      colorSwatchesContainer: this.colorSwatchesContainer
    });
    this.bindEvents();
  }

  bindEvents() {
    // Hotspot click events
    this.hotspots.forEach(hotspot => {
      hotspot.addEventListener('click', (e) => {
        e.preventDefault();
        this.openPopup(hotspot);
      });
    });

    // Close popup events
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => {
        this.closePopup();
      });
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', () => {
        this.closePopup();
      });
    }

    // Color swatch events will be bound dynamically when popup opens

    // Custom dropdown events
    this.bindCustomDropdownEvents();

    // Add to cart event
    if (this.addToCartButton) {
      this.addToCartButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.addToCart();
      });
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.popup && this.popup.classList.contains('active')) {
        this.closePopup();
      }
    });
  }

  selectColor(selectedSwatch) {
    // Remove selected class from all swatches
    const allSwatches = this.colorSwatchesContainer?.querySelectorAll('.lifestyle-grid__popup__color-swatch');
    allSwatches?.forEach(swatch => {
      swatch.classList.remove('selected');
    });
    
    // Add selected class to clicked swatch
    selectedSwatch.classList.add('selected');
  }

  bindCustomDropdownEvents() {
    if (!this.customSelect) return;

    const display = this.customSelect.querySelector('.lifestyle-grid__popup__size-select-display');
    const options = this.customSelect.querySelectorAll('.lifestyle-grid__popup__size-option');

    // Toggle dropdown on display click
    display?.addEventListener('click', () => {
      this.customSelect.classList.toggle('active');
    });

    // Handle option selection
    options.forEach(option => {
      option.addEventListener('click', () => {
        const value = option.getAttribute('data-value');
        const text = option.textContent;
        
        // Update display text
        if (display) {
          display.textContent = text;
        }
        
        // Update hidden select value
        if (this.sizeSelect) {
          this.sizeSelect.value = value;
        }
        
        // Update selected state
        options.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        
        // Close dropdown
        this.customSelect.classList.remove('active');
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.customSelect?.contains(e.target)) {
        this.customSelect?.classList.remove('active');
      }
    });
  }

  addToCart() {
    const selectedColorElement = this.popup?.querySelector('.lifestyle-grid__popup__color-swatch.selected');
    const selectedColor = selectedColorElement?.getAttribute('data-color');
    const selectedSize = this.sizeSelect?.value;
    
    if (!selectedSize || selectedSize === '') {
      // You can replace this with a custom notification or validation message
      console.log('Please select a size');
      return;
    }
    
    // Here you would typically integrate with Shopify's cart API
    console.log('Adding to cart:', {
      product: this.currentProduct,
      color: selectedColor,
      size: selectedSize
    });
    
    // For demo purposes, log the action instead of showing alert
    console.log(`Added to cart: ${this.currentProduct?.title || 'Product'} - Color: ${selectedColor}, Size: ${selectedSize.toUpperCase()}`);
    
    // You can add your custom cart integration here
    // Example: Shopify cart API call, custom notification, etc.
    
    // Close the popup after adding to cart
    this.closePopup();
  }

  openPopup(hotspot) {
    console.log('Opening popup...', { hotspot, popup: this.popup });
    if (!this.popup) {
      console.error('Popup element not found!');
      return;
    }

    const productId = hotspot.dataset.productId;
    const customLink = hotspot.dataset.customLink;

    // Store current product for add to cart
    this.currentProduct = {
      id: productId,
      title: hotspot.dataset.productTitle,
      price: hotspot.dataset.productPrice,
      url: hotspot.dataset.productUrl,
      image: hotspot.dataset.productImage,
      description: hotspot.dataset.productDescription
    };

    if (productId && productId !== '') {
      // Product popup
      this.updatePopupContent({
        title: hotspot.dataset.productTitle || 'Product',
        price: hotspot.dataset.productPrice || '',
        description: hotspot.dataset.productDescription || '',
        image: hotspot.dataset.productImage || '',
        imageAlt: hotspot.dataset.productTitle || 'Product image'
      });
    } else if (customLink && customLink !== '') {
      // Custom link popup
      this.updatePopupContent({
        title: hotspot.dataset.customTitle || 'Product',
        price: '',
        description: hotspot.dataset.customDescription || '',
        image: hotspot.dataset.customImage || '',
        imageAlt: hotspot.dataset.customTitle || 'Product image'
      });
    }

    // Reset form
    if (this.sizeSelect) {
      this.sizeSelect.value = '';
    }
    
    // Generate color swatches based on product data
    this.generateColorSwatches(hotspot);

    // Show popup and overlay
    if (this.overlay) this.overlay.classList.add('active');
    this.popup.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  generateColorSwatches(hotspot) {
    if (!this.colorSwatchesContainer) return;
    
    // Clear existing swatches
    this.colorSwatchesContainer.innerHTML = '';
    
    // Get color combination from hotspot data
    const colorCombination = hotspot.dataset.colorCombination || 'blue_black';
    const defaultColor = hotspot.dataset.defaultColor || 'first';
    
         // Define color combinations
     const colorCombinations = {
       'white_black': ['White', 'Black'],
       'blue_black': ['Blue', 'Black'],
       'red_grey': ['Red', 'Grey'],
       'grey_black': ['Grey', 'Black'],
       'navy_black': ['Navy', 'Black'],
       'brown_black': ['Brown', 'Black'],
       'green_black': ['Green', 'Black'],
       'pink_black': ['Pink', 'Black'],
       'orange_black': ['Orange', 'Black'],
       'purple_black': ['Purple', 'Black']
     };
    
    // Get colors for this combination
    const colors = colorCombinations[colorCombination] || ['Blue', 'Black'];
    
    // Generate swatch buttons
    colors.forEach((color, index) => {
      const swatch = document.createElement('button');
      const isSelected = (defaultColor === 'first' && index === 0) || (defaultColor === 'second' && index === 1);
      swatch.className = `lifestyle-grid__popup__color-swatch${isSelected ? ' selected' : ''}`;
      swatch.setAttribute('data-color', color.toLowerCase());
      swatch.textContent = color;
      
      // Add click event
      swatch.addEventListener('click', () => {
        this.selectColor(swatch);
      });
      
      this.colorSwatchesContainer.appendChild(swatch);
    });
  }

  updatePopupContent(content) {
    const titleEl = this.popup.querySelector('[data-popup-title]');
    const priceEl = this.popup.querySelector('[data-popup-price]');
    const descriptionEl = this.popup.querySelector('[data-popup-description]');
    const imageEl = this.popup.querySelector('[data-popup-image]');

    if (titleEl) titleEl.textContent = content.title;
    if (priceEl) priceEl.textContent = content.price;
    if (descriptionEl) descriptionEl.textContent = content.description;
    if (imageEl) {
      imageEl.src = content.image;
      imageEl.alt = content.imageAlt;
    }
  }

  closePopup() {
    if (this.overlay) this.overlay.classList.remove('active');
    if (this.popup) this.popup.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = '';
  }
}

// Initialize all lifestyle grids on the page
document.addEventListener('DOMContentLoaded', () => {
  const lifestyleGrids = document.querySelectorAll('[data-section-type="lifestyle-grid"]');
  lifestyleGrids.forEach(grid => {
    new LifestyleGrid(grid);
  });
});

// Handle Shopify section rendering
if (typeof Shopify !== 'undefined' && Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    if (event.target.dataset.sectionType === 'lifestyle-grid') {
      new LifestyleGrid(event.target);
    }
  });
}
