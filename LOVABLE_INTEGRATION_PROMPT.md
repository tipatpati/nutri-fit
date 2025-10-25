# Lovable Integration Prompt: NutritionGoalCard Component

## Objective
Integrate the new `NutritionGoalCard` component into the Forfaits page (`src/pages/Forfaits.tsx`) to replace the existing fitness goal cards with enhanced animated cards that have better UX, accessibility, and design system integration.

## What You Need to Do

### 1. Update the Forfaits.tsx File

**Location**: `src/pages/Forfaits.tsx`

**Task**: Replace the existing fitness goal card rendering section with the new `NutritionGoalCard` component.

**Current Implementation to Replace**:
The section around lines 120-180 that renders the fitness goals grid with basic cards.

**New Implementation**:

```typescript
import { NutritionGoalCard } from "@/components/ui/nutrition-goal-card";
import { useState } from "react";

// Add this state at the top of the Forfaits component
const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

// Replace the existing fitness goals rendering with this:
const fitnessGoals = [
  {
    id: "weight_loss",
    title: "Perte de Poids",
    description: "Perdez du poids sainement avec nos repas équilibrés et contrôlés en calories",
    calorieRange: "1200-1500 kcal/jour",
    goalType: "weight_loss" as const,
    staticBg: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop",
    animatedBg: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop",
    isPopular: true,
  },
  {
    id: "balanced",
    title: "Équilibre Nutritionnel",
    description: "Maintenez un équilibre parfait entre protéines, glucides et lipides pour votre bien-être",
    calorieRange: "1600-2000 kcal/jour",
    goalType: "balanced" as const,
    staticBg: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop",
    animatedBg: "https://images.unsplash.com/photo-1547496502-affa22d38842?w=800&auto=format&fit=crop",
  },
  {
    id: "muscle_gain",
    title: "Prise de Masse",
    description: "Développez votre masse musculaire avec des repas riches en protéines et nutriments essentiels",
    calorieRange: "2200-2800 kcal/jour",
    goalType: "muscle_gain" as const,
    staticBg: "https://images.unsplash.com/photo-1532384816664-01b8b7238c8d?w=800&auto=format&fit=crop",
    animatedBg: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&auto=format&fit=crop",
  },
];

// In the JSX, replace the existing goals section with:
<section className="mb-md-12">
  <div className="text-center mb-md-8">
    <h2 className="text-md-display-small text-md-on-surface mb-md-4">
      Choisissez Votre Objectif Nutritionnel
    </h2>
    <p className="text-md-body-large text-md-on-surface-variant max-w-2xl mx-auto">
      Sélectionnez l'objectif qui correspond le mieux à vos besoins.
      Nos plans sont conçus par des nutritionnistes professionnels.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md-6 max-w-7xl mx-auto">
    {fitnessGoals.map((goal, index) => (
      <NutritionGoalCard
        key={goal.id}
        id={goal.id}
        title={goal.title}
        description={goal.description}
        calorieRange={goal.calorieRange}
        staticBg={goal.staticBg}
        animatedBg={goal.animatedBg}
        goalType={goal.goalType}
        isSelected={selectedGoal === goal.id}
        onSelect={() => setSelectedGoal(goal.id)}
        index={index}
        isPopular={goal.isPopular}
      />
    ))}
  </div>

  {selectedGoal && (
    <div className="mt-md-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-md-6 bg-md-surface-container rounded-md-3xl border border-md-outline-variant max-w-2xl mx-auto"
      >
        <p className="text-md-body-large text-md-on-surface mb-md-4">
          Excellent choix ! Objectif sélectionné : <strong>{fitnessGoals.find(g => g.id === selectedGoal)?.title}</strong>
        </p>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            // Navigate to order page or next step
            console.log("Proceeding with goal:", selectedGoal);
          }}
        >
          Continuer avec cet objectif
        </Button>
      </motion.div>
    </div>
  )}
</section>
```

### 2. Verify Required Dependencies

Make sure these imports are present at the top of `Forfaits.tsx`:

```typescript
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NutritionGoalCard } from "@/components/ui/nutrition-goal-card";
import { useState } from "react";
```

### 3. Design System Integration

The component already uses these design tokens from your Design System v2.0:
- `nutrition-weight-loss` - Vibrant orange gradient
- `nutrition-balanced` - Fresh green gradient
- `nutrition-muscle-gain` - Bold blue/purple gradient

These are defined in `src/shared/design-system/tokens/colors.ts` and integrate seamlessly with your Material Design 3 theme.

### 4. Accessibility Features Already Included

✅ Keyboard navigation (Tab, Enter, Space)
✅ ARIA labels and roles
✅ Focus visible states
✅ Screen reader support
✅ Reduced motion support

### 5. Performance Optimizations Already Included

✅ CSS animations (not JS-based)
✅ Lazy loading ready
✅ Optimized re-renders
✅ Smooth 60fps animations
✅ Responsive images with Unsplash auto-optimization

### 6. Optional: Custom Images

**Current**: Using placeholder Unsplash images
**Recommended**: Replace with your own nutrition-specific images

For best results:
- Use 800x600px images (landscape)
- Keep file sizes under 200KB
- Use WebP format when possible
- Consider using your Supabase Storage for hosting

Example:
```typescript
staticBg: "/images/nutrition/weight-loss-static.webp"
animatedBg: "/images/nutrition/weight-loss-animated.webp"
```

### 7. Testing Checklist

After integration, verify:

- [ ] Cards render with smooth animations on page load
- [ ] Selection state toggles correctly when clicking cards
- [ ] Keyboard navigation works (Tab to focus, Enter/Space to select)
- [ ] Popular badge appears on the first card
- [ ] Gradient overlays match the design system colors
- [ ] Shimmer effect is visible on hover
- [ ] Responsive layout works on mobile, tablet, and desktop
- [ ] Animations run at 60fps (check browser DevTools Performance tab)
- [ ] Selected goal confirmation appears below cards
- [ ] No console errors or warnings

### 8. Integration Points

The component integrates with your existing:
- **Design System v2.0**: Uses semantic color tokens
- **Material Design 3**: Follows MD3 elevation, spacing, and typography
- **Framer Motion**: Uses motion components for animations
- **shadcn/ui**: Compatible with your existing UI components
- **TypeScript**: Fully typed with proper interfaces

### 9. Next Steps After Integration

Once the cards are integrated:

1. **Connect to state management**: Link `selectedGoal` to your Zustand store or React Query
2. **Navigate on selection**: Update the "Continuer" button to navigate to the appropriate plan page
3. **Save user preference**: Store selected goal in Supabase user profile
4. **Analytics tracking**: Add event tracking for goal selection
5. **A/B testing**: Consider testing different image combinations

### 10. Troubleshooting

**If cards don't appear**:
- Check that `nutrition-goal-card.tsx` is in `src/components/ui/`
- Verify imports are correct
- Check browser console for errors

**If animations are choppy**:
- Ensure images are optimized (under 200KB)
- Check that `animated` prop is set to `true`
- Verify GPU acceleration is enabled in browser

**If selection doesn't work**:
- Verify `useState` is imported
- Check that `onSelect` callback is properly bound
- Ensure `isSelected` prop is correctly computed

## Reference Files

For complete implementation details, refer to:
- `src/components/ui/nutrition-goal-card.tsx` - Component source
- `src/components/ui/nutrition-goal-card.example.tsx` - Usage example
- `NUTRITION_GOAL_CARD_INTEGRATION.md` - Complete integration guide

## Summary

You're integrating a production-ready, accessible, and performant nutrition goal selection component that:
- Follows NutriFit's Design System v2.0
- Provides beautiful animations and micro-interactions
- Supports full keyboard navigation
- Works seamlessly with existing code
- Enhances user experience with visual feedback

Just copy the code snippets above into Forfaits.tsx, verify imports, and test! The component is ready to use out of the box.
