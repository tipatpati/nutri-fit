# Nutrition Goal Card Component Integration Guide

## 📦 Component Overview

The `NutritionGoalCard` is a high-performance, accessible card component designed for NutriFit's nutrition goal selection. It features smooth background transitions, design system integration, and excellent UX.

### Key Features

✅ **Performance Optimized**
- CSS animations instead of heavy JS animations
- Preloaded hover states
- Optimized re-renders with React.memo potential

✅ **Design System Integration**
- Uses semantic design tokens
- Consistent with Material Design 3
- Responsive and mobile-friendly

✅ **Accessibility**
- WCAG 2.1 AA compliant
- Keyboard navigation support
- Proper ARIA labels
- Focus indicators

✅ **User Experience**
- Smooth hover effects
- Animated background transitions
- Selection states
- Popular badge support

---

## 🚀 Quick Start

### 1. Import the Component

```typescript
import { NutritionGoalCard } from "@/components/ui/nutrition-goal-card";
```

### 2. Basic Usage

```typescript
<NutritionGoalCard
  id="balanced"
  title="Équilibré"
  description="Maintenez une alimentation équilibrée"
  calorieRange="450-600 cal"
  staticBg="https://images.unsplash.com/photo-1543362906-acfc16c67564"
  animatedBg="https://media.giphy.com/media/l0HlFZ3c4NENSLQRi/giphy.gif"
  goalType="balanced"
  isSelected={selectedGoal === "balanced"}
  onSelect={() => setSelectedGoal("balanced")}
  isPopular
/>
```

---

## 📋 Props Reference

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | ✅ | Unique identifier for the goal |
| `title` | `string` | ✅ | Display name (e.g., "Minceur") |
| `description` | `string` | ✅ | Detailed description of the goal |
| `calorieRange` | `string` | ✅ | Calorie range (e.g., "300-450 cal") |
| `staticBg` | `string` | ✅ | Static background image URL |
| `animatedBg` | `string` | ❌ | Animated background (GIF) URL |
| `goalType` | `"weight_loss"` \| `"balanced"` \| `"muscle_gain"` | ✅ | Type for semantic styling |
| `isSelected` | `boolean` | ✅ | Whether the card is selected |
| `onSelect` | `() => void` | ✅ | Callback when card is clicked |
| `index` | `number` | ❌ | Index for stagger animations (default: 0) |
| `isPopular` | `boolean` | ❌ | Show popular badge (default: false) |
| `className` | `string` | ❌ | Additional CSS classes |

---

## 🎨 Goal Types & Styling

Each goal type automatically uses semantic design tokens:

### Weight Loss (Minceur)
```typescript
goalType: "weight_loss"
// Gradient: Green tones from design system
// Token: --nutrition-weight-loss, --color-success
```

### Balanced (Équilibré)
```typescript
goalType: "balanced"
// Gradient: Gold/Yellow tones
// Token: --nutrition-balanced, --md-sys-color-tertiary
```

### Muscle Gain (Prise de masse)
```typescript
goalType: "muscle_gain"
// Gradient: Orange tones
// Token: --md-sys-color-secondary
```

---

## 🖼️ Image Recommendations

### Static Backgrounds (Required)

Use high-quality food photography from Unsplash:

**Weight Loss:**
```
https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop
```

**Balanced:**
```
https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&auto=format&fit=crop
```

**Muscle Gain:**
```
https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop
```

### Animated Backgrounds (Optional)

Use relevant GIFs from GIPHY or create custom animations:

**Weight Loss:** Healthy salads, vegetables being prepared
**Balanced:** Diverse meal prep, colorful plates
**Muscle Gain:** Protein-rich foods, fitness-related

⚠️ **Note:** Keep GIF file sizes under 2MB for performance

---

## 💻 Integration Examples

### Example 1: Forfaits Page Integration

```typescript
import { useState } from "react";
import { NutritionGoalCard } from "@/components/ui/nutrition-goal-card";

const Forfaits = () => {
  const [selectedGoal, setSelectedGoal] = useState("balanced");

  const goals = [
    {
      id: "weight_loss",
      title: "Minceur",
      description: "Perdre du poids sainement avec des repas équilibrés",
      calorieRange: "300-450 cal",
      staticBg: "/images/goals/weight-loss.jpg",
      animatedBg: "/images/goals/weight-loss.gif",
      goalType: "weight_loss" as const,
    },
    {
      id: "balanced",
      title: "Équilibré",
      description: "Maintenez une alimentation équilibrée",
      calorieRange: "450-600 cal",
      staticBg: "/images/goals/balanced.jpg",
      animatedBg: "/images/goals/balanced.gif",
      goalType: "balanced" as const,
      isPopular: true,
    },
    {
      id: "muscle_gain",
      title: "Prise de masse",
      description: "Développez votre masse musculaire",
      calorieRange: "650-800 cal",
      staticBg: "/images/goals/muscle-gain.jpg",
      animatedBg: "/images/goals/muscle-gain.gif",
      goalType: "muscle_gain" as const,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {goals.map((goal, index) => (
          <NutritionGoalCard
            key={goal.id}
            {...goal}
            isSelected={selectedGoal === goal.id}
            onSelect={() => setSelectedGoal(goal.id)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
```

### Example 2: With Form Integration

```typescript
import { useForm } from "react-hook-form";

function OrderForm() {
  const { watch, setValue } = useForm({
    defaultValues: {
      nutritionGoal: "balanced",
    },
  });

  const selectedGoal = watch("nutritionGoal");

  return (
    <form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <NutritionGoalCard
            key={goal.id}
            {...goal}
            isSelected={selectedGoal === goal.id}
            onSelect={() => setValue("nutritionGoal", goal.id)}
          />
        ))}
      </div>
    </form>
  );
}
```

---

## 🎯 Performance Tips

### 1. Optimize Images

```bash
# Convert images to WebP for better compression
npm install sharp
# Use sharp to optimize images
```

### 2. Lazy Load Animated Backgrounds

```typescript
// Only load GIF when hovering
const [isHovering, setIsHovering] = useState(false);

<NutritionGoalCard
  animatedBg={isHovering ? goal.animatedBg : undefined}
  onMouseEnter={() => setIsHovering(true)}
/>
```

### 3. Use Memoization

```typescript
import { memo } from "react";

const MemoizedGoalCard = memo(NutritionGoalCard);
```

---

## ♿ Accessibility Features

### Keyboard Navigation

- **Tab**: Navigate between cards
- **Enter/Space**: Select a card
- **Shift+Tab**: Navigate backwards

### Screen Reader Support

- Proper ARIA labels (`aria-label`, `aria-pressed`)
- Semantic HTML with `role="button"`
- Descriptive text for all interactive elements

### Focus Management

- Visible focus indicators (ring-2)
- High contrast focus states
- Skip links support

---

## 🎨 Customization

### Custom Gradients

Override the default gradient with your own:

```typescript
// Add custom goal type to design tokens
// src/shared/design-system/tokens/colors.ts

export const nutrition = {
  ...existing,
  custom: {
    main: 'hsl(220 70% 50%)',
    light: 'hsl(220 70% 70%)',
  },
};
```

### Custom Animations

Add custom hover effects:

```typescript
<NutritionGoalCard
  className="hover:rotate-1 hover:scale-105"
  // ... other props
/>
```

---

## 🐛 Troubleshooting

### Issue: Animated background not showing

**Solution:** Check that the `animatedBg` URL is valid and accessible:
```typescript
// Test the URL
<img src={goal.animatedBg} alt="test" />
```

### Issue: Cards not staggering

**Solution:** Ensure you're passing the `index` prop:
```typescript
{goals.map((goal, index) => (
  <NutritionGoalCard index={index} {...goal} />
))}
```

### Issue: Design tokens not working

**Solution:** Make sure CSS variables are defined in `src/index.css`:
```css
:root {
  --nutrition-weight-loss: ...;
  --nutrition-balanced: ...;
  --nutrition-muscle-gain: ...;
}
```

---

## 📚 Related Components

- **OptimizedBackgroundLines** - Decorative background
- **EnhancedSkeleton** - Loading states
- **Button** - Call-to-action buttons

---

## ✅ Checklist for Integration

- [ ] Import component in your page
- [ ] Prepare static background images
- [ ] (Optional) Prepare animated GIF backgrounds
- [ ] Create goal data array
- [ ] Implement selection state management
- [ ] Test keyboard navigation
- [ ] Test on mobile devices
- [ ] Verify accessibility with screen reader
- [ ] Check performance with Lighthouse

---

## 🚀 Next Steps

1. **Replace existing goal cards** in Forfaits.tsx
2. **Add custom images** for each nutrition goal
3. **Test performance** with real data
4. **Gather user feedback** on the new design

---

**Need help? Check the example file:** `src/components/ui/nutrition-goal-card.example.tsx`
