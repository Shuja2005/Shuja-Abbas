# Lifestyle Grid Section

A pixel-perfect Shopify section that creates an interactive lifestyle product grid with clickable hotspots. This section displays a 2x3 grid of lifestyle images with customizable product hotspots that open detailed popups when clicked.

## Features

- **Responsive Design**: 3 columns on desktop, 2 columns on mobile
- **Interactive Hotspots**: Clickable "+" icons positioned anywhere on images
- **Product Popups**: Detailed product information in modal popups
- **Customizable**: Fully customizable through Shopify theme editor
- **Vanilla JavaScript**: No jQuery dependencies
- **Accessible**: Proper ARIA labels and keyboard navigation

## Files Created

1. `sections/lifestyle-grid.liquid` - Main section file
2. `assets/lifestyle-grid.js` - JavaScript functionality
3. `templates/page.lifestyle-demo.json` - Demo template
4. `LIFESTYLE_GRID_README.md` - This documentation

## Installation

1. Upload the files to your Shopify theme:
   - Copy `sections/lifestyle-grid.liquid` to your theme's `sections/` directory
   - Copy `assets/lifestyle-grid.js` to your theme's `assets/` directory

2. The section will automatically appear in your theme editor under "Add section" as "Lifestyle Grid"

## Usage

### Adding the Section

1. Go to your Shopify admin → Online Store → Themes
2. Click "Customize" on your active theme
3. Navigate to the page where you want to add the section
4. Click "Add section"
5. Select "Lifestyle Grid" from the list

### Configuring the Section

#### Section Settings

- **Section Title**: The main heading (default: "Tisso vison in the wild")
- **Title Alignment**: Left, center, or right alignment
- **Title Font Size**: Desktop and mobile font sizes
- **Title Font Weight**: Light, Regular, Medium, Semi Bold, or Bold
- **Title Color**: Color picker for the title
- **Background Color**: Section background color
- **Image Border Radius**: Rounded corners for images (0-20px)

#### Adding Lifestyle Items

1. Click "Add block" → "Lifestyle Item"
2. Configure each item:

**Image Settings:**
- **Image**: Upload the lifestyle photo

**Product Settings:**
- **Product**: Select a Shopify product (optional)

**Custom Link Settings (Alternative to Product):**
- **Custom Link**: URL for custom content
- **Custom Title**: Title for the popup
- **Custom Description**: Description text
- **Custom Image**: Image for the popup

**Hotspot Position:**
- **Hotspot X Position**: Horizontal position (0-100%)
- **Hotspot Y Position**: Vertical position (0-100%)

### Hotspot Positioning

The hotspot position is controlled by X and Y percentage values:
- **X Position**: 0% = left edge, 100% = right edge
- **Y Position**: 0% = top edge, 100% = bottom edge

For example:
- `X: 50%, Y: 50%` = Center of the image
- `X: 25%, Y: 75%` = Bottom left quadrant
- `X: 75%, Y: 25%` = Top right quadrant

## Demo Template

A demo template is included at `templates/page.lifestyle-demo.json`. To use it:

1. Create a new page in your Shopify admin
2. Set the template to "page.lifestyle-demo"
3. The page will display the lifestyle grid with sample content

## Customization

### CSS Customization

The section uses CSS custom properties and can be easily customized. Key classes:

- `.lifestyle-grid` - Main section container
- `.lifestyle-grid__items` - Grid container
- `.lifestyle-grid__item` - Individual image container
- `.lifestyle-grid__hotspot` - Clickable hotspot button
- `.lifestyle-grid__popup` - Modal popup
- `.lifestyle-grid__overlay` - Background overlay

### JavaScript Customization

The JavaScript is modular and can be extended. Key methods:

- `openPopup(hotspot)` - Opens the popup with hotspot data
- `closePopup()` - Closes the popup
- `updatePopupContent(content)` - Updates popup content

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance

- Images are lazy-loaded for better performance
- JavaScript is deferred to prevent blocking
- Minimal DOM manipulation for smooth animations

## Accessibility

- Proper ARIA labels on interactive elements
- Keyboard navigation support (Escape to close)
- Screen reader friendly
- Focus management for popups

## Troubleshooting

### Hotspots Not Working
- Ensure JavaScript is loading properly
- Check browser console for errors
- Verify hotspot positions are within 0-100% range

### Images Not Displaying
- Check image uploads in theme editor
- Verify image URLs are accessible
- Check for placeholder images

### Popup Not Opening
- Ensure product or custom link is configured
- Check for JavaScript errors in console
- Verify popup HTML structure

## Support

For issues or questions:
1. Check the browser console for JavaScript errors
2. Verify all files are uploaded correctly
3. Test with different browsers
4. Check Shopify theme documentation

## License

This section is provided as-is for use in Shopify themes. Modify as needed for your specific requirements.
