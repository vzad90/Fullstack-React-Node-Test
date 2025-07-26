# Styling Guide

This document outlines the styling system and design patterns used in the Task Manager application.

## Design System

### Color Palette

The app uses a consistent color palette defined in CSS custom properties:

- **Primary**: Blue (#3b82f6) - Used for main actions, links, and primary UI elements
- **Secondary**: Gray (#64748b) - Used for secondary text and subtle elements
- **Success**: Green (#10b981) - Used for success states and positive actions
- **Danger**: Red (#ef4444) - Used for destructive actions and error states
- **Warning**: Yellow (#f59e0b) - Used for warning states and cautionary elements
- **Background**: Light gray (#f8fafc) - Main background color
- **Surface**: White (#ffffff) - Card and component backgrounds

### Typography

- **Font Family**: Inter (with system font fallbacks)
- **Font Smoothing**: Enabled for crisp text rendering
- **Line Height**: 1.6 for optimal readability

### Spacing

The app uses Tailwind CSS spacing scale:
- `space-y-1` to `space-y-8` for vertical spacing
- `px-4`, `py-2`, etc. for padding
- `gap-2`, `gap-4`, etc. for flex/grid gaps

### Shadows

Three shadow levels are available:
- **Small**: Subtle elevation for cards and buttons
- **Medium**: Standard elevation for main components
- **Large**: High elevation for modals and overlays

## Component Library

### UI Components

#### Button
```tsx
import { Button } from '../components/ui';

<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>
```

**Variants**: `primary`, `secondary`, `danger`, `success`, `warning`
**Sizes**: `sm`, `md`, `lg`

#### Input
```tsx
import { Input } from '../components/ui';

<Input 
  label="Email Address"
  placeholder="Enter your email"
  error="Invalid email"
  helperText="We'll never share your email"
/>
```

#### Card
```tsx
import { Card } from '../components/ui';

<Card padding="md" shadow="lg">
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>
```

**Padding**: `sm`, `md`, `lg`
**Shadow**: `sm`, `md`, `lg`

#### LoadingSpinner
```tsx
import { LoadingSpinner } from '../components/ui';

<LoadingSpinner size="md" />
```

**Sizes**: `sm`, `md`, `lg`

### Layout Components

#### Navigation
```tsx
import Navigation from '../components/Navigation';

<Navigation 
  onLogout={handleLogout}
  currentPage="home"
/>
```

## Page Layouts

### Authentication Pages (Login/Register)
- Full-screen gradient backgrounds
- Centered card layout
- Consistent form styling
- Social login options

### Main Application
- Navigation header
- Content area with proper spacing
- Responsive grid layouts
- Modal overlays for editing

## Responsive Design

The app is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach
- All components are designed mobile-first
- Progressive enhancement for larger screens
- Touch-friendly button sizes (minimum 44px)

## Animation & Transitions

### Duration
- **Fast**: 150ms for hover states
- **Standard**: 200ms for most transitions
- **Slow**: 300ms for complex animations

### Easing
- **Standard**: `ease-in-out` for most transitions
- **Bounce**: For attention-grabbing elements

## Accessibility

### Focus Management
- Visible focus indicators on all interactive elements
- Logical tab order
- Keyboard navigation support

### Color Contrast
- All text meets WCAG AA standards
- High contrast mode support through CSS custom properties

### Screen Reader Support
- Proper ARIA labels
- Semantic HTML structure
- Descriptive alt text for images

## Best Practices

### Component Styling
1. Use Tailwind CSS classes for styling
2. Leverage the component library for consistency
3. Follow the established color palette
4. Maintain proper spacing ratios

### Form Design
1. Clear labels and placeholders
2. Helpful error messages
3. Success states for completed actions
4. Loading states for async operations

### Interactive Elements
1. Hover and focus states for all clickable elements
2. Disabled states for unavailable actions
3. Loading states for async operations
4. Clear visual feedback for user actions

## File Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── index.ts
│   └── Navigation.tsx
├── features/
│   └── [feature]/
│       └── components/
│           └── [Component].tsx
└── index.css (global styles)
```

## Customization

### Adding New Colors
1. Add to CSS custom properties in `index.css`
2. Update Tailwind config if needed
3. Document in this guide

### Creating New Components
1. Follow the established patterns
2. Include TypeScript interfaces
3. Add to the UI component library
4. Update this documentation

### Theme Variations
The design system supports easy theming through CSS custom properties. To create a new theme:
1. Override the custom properties
2. Update component variants if needed
3. Test across all components 