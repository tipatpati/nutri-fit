/**
 * Design System Showcase Component
 * Demonstrates proper usage of the NutriFit design system
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ShoppingCart, User } from "lucide-react";

export const DesignSystemShowcase = () => {
  return (
    <div className="min-h-screen md-surface p-md-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-md-8">
          <h1 className="md-display-medium mb-md-2">Design System Showcase</h1>
          <p className="md-body-large text-md-surface-on-variant">
            Examples of properly implemented Material Design 3 components
          </p>
        </header>

        {/* Colors Section */}
        <section className="mb-md-8">
          <h2 className="md-headline-large mb-md-4">Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md-4">
            {/* Primary */}
            <Card className="md-elevation-1">
              <CardContent className="p-md-4">
                <div className="md-primary rounded-lg p-md-4 mb-md-2">
                  <span className="md-label-large">Primary</span>
                </div>
                <div className="md-primary-container rounded-lg p-md-4">
                  <span className="md-label-large text-md-primary-on-container">
                    Primary Container
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Secondary */}
            <Card className="md-elevation-1">
              <CardContent className="p-md-4">
                <div className="md-secondary rounded-lg p-md-4 mb-md-2">
                  <span className="md-label-large">Secondary</span>
                </div>
                <div className="md-secondary-container rounded-lg p-md-4">
                  <span className="md-label-large text-md-secondary-on-container">
                    Secondary Container
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Tertiary */}
            <Card className="md-elevation-1">
              <CardContent className="p-md-4">
                <div className="md-tertiary rounded-lg p-md-4 mb-md-2">
                  <span className="md-label-large">Tertiary</span>
                </div>
                <div className="md-tertiary-container rounded-lg p-md-4">
                  <span className="md-label-large text-md-tertiary-on-container">
                    Tertiary Container
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="mb-md-8">
          <h2 className="md-headline-large mb-md-4">Buttons</h2>
          <Card className="md-elevation-1">
            <CardContent className="p-md-4">
              <div className="flex flex-wrap gap-md-3">
                <Button variant="filled">Filled Button</Button>
                <Button variant="outlined">Outlined Button</Button>
                <Button variant="text">Text Button</Button>
                <Button variant="filled-tonal">Tonal Button</Button>
                <Button variant="elevated">Elevated Button</Button>
                <Button variant="filled" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Typography Section */}
        <section className="mb-md-8">
          <h2 className="md-headline-large mb-md-4">Typography</h2>
          <Card className="md-elevation-1">
            <CardContent className="p-md-4 space-y-md-3">
              <div>
                <p className="md-display-small">Display Small</p>
                <p className="md-label-small text-md-surface-on-variant">
                  36px / Font Normal
                </p>
              </div>
              <div>
                <p className="md-headline-medium">Headline Medium</p>
                <p className="md-label-small text-md-surface-on-variant">
                  28px / Font Normal
                </p>
              </div>
              <div>
                <p className="md-title-large">Title Large</p>
                <p className="md-label-small text-md-surface-on-variant">
                  22px / Font Medium
                </p>
              </div>
              <div>
                <p className="md-body-large">
                  Body Large - This is the main body text used throughout the
                  application for readable content.
                </p>
                <p className="md-label-small text-md-surface-on-variant">
                  16px / Font Normal
                </p>
              </div>
              <div>
                <p className="md-label-large">Label Large</p>
                <p className="md-label-small text-md-surface-on-variant">
                  14px / Font Medium
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Spacing Section */}
        <section className="mb-md-8">
          <h2 className="md-headline-large mb-md-4">Spacing (8dp Grid)</h2>
          <Card className="md-elevation-1">
            <CardContent className="p-md-4 space-y-md-3">
              {[1, 2, 3, 4, 6, 8].map((unit) => (
                <div key={unit} className="flex items-center gap-md-3">
                  <div
                    className="bg-md-primary h-md-4"
                    style={{ width: `${unit * 8}px` }}
                  />
                  <span className="md-label-medium">
                    md-{unit} ({unit * 8}px)
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Elevation Section */}
        <section className="mb-md-8">
          <h2 className="md-headline-large mb-md-4">Elevation</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-md-4">
            {[0, 1, 2, 3, 4, 5].map((level) => (
              <Card
                key={level}
                className={`md-elevation-${level} bg-md-surface-container`}
              >
                <CardContent className="p-md-4">
                  <p className="md-label-large text-center">Level {level}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Animations Section */}
        <section className="mb-md-8">
          <h2 className="md-headline-large mb-md-4">Animations</h2>
          <Card className="md-elevation-1">
            <CardContent className="p-md-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md-4">
                <Button
                  variant="outlined"
                  className="animate-fade-in w-full"
                >
                  Fade In
                </Button>
                <Button
                  variant="outlined"
                  className="animate-fade-up w-full"
                >
                  Fade Up
                </Button>
                <Button
                  variant="outlined"
                  className="animate-scale-in w-full"
                >
                  Scale In
                </Button>
                <Button
                  variant="outlined"
                  className="animate-bounce-in w-full"
                >
                  Bounce In
                </Button>
                <Button
                  variant="outlined"
                  className="hover-scale w-full"
                >
                  Hover Scale
                </Button>
                <Button
                  variant="outlined"
                  className="hover-lift w-full"
                >
                  Hover Lift
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Interactive Elements */}
        <section className="mb-md-8">
          <h2 className="md-headline-large mb-md-4">Interactive Elements</h2>
          <Card className="md-elevation-1">
            <CardContent className="p-md-4 space-y-md-4">
              {/* State Layer Example */}
              <div>
                <p className="md-title-medium mb-md-2">State Layer</p>
                <button className="md-state-layer px-md-4 py-md-2 rounded-lg text-md-primary md-label-large">
                  Hover for state layer effect
                </button>
              </div>

              {/* Ripple Example */}
              <div>
                <p className="md-title-medium mb-md-2">Ripple Effect</p>
                <button className="md-ripple bg-md-primary text-md-primary-on-primary px-md-4 py-md-2 rounded-lg md-label-large">
                  Click for ripple effect
                </button>
              </div>

              {/* Story Link Example */}
              <div>
                <p className="md-title-medium mb-md-2">Animated Link</p>
                <a href="#" className="story-link md-label-large text-md-primary">
                  Hover for underline animation
                </a>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Card Examples */}
        <section className="mb-md-8">
          <h2 className="md-headline-large mb-md-4">Card Layouts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md-4">
            {/* Product Card */}
            <Card className="md-elevation-1 hover-lift rounded-xl overflow-hidden">
              <div className="h-48 bg-md-primary-container" />
              <CardContent className="p-md-4">
                <h3 className="md-title-large mb-md-2">Meal Name</h3>
                <p className="md-body-medium text-md-surface-on-variant mb-md-3">
                  Delicious and nutritious meal description goes here.
                </p>
                <div className="flex items-center justify-between">
                  <span className="md-title-medium text-md-primary">€12.99</span>
                  <Button variant="filled" size="icon">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Profile Card */}
            <Card className="md-elevation-1 hover-lift rounded-xl">
              <CardContent className="p-md-4">
                <div className="flex items-center gap-md-3 mb-md-4">
                  <div className="h-12 w-12 rounded-full bg-md-secondary-container flex items-center justify-center">
                    <User className="h-6 w-6 text-md-secondary-on-container" />
                  </div>
                  <div>
                    <p className="md-title-medium">John Doe</p>
                    <p className="md-body-small text-md-surface-on-variant">
                      Premium Member
                    </p>
                  </div>
                </div>
                <Button variant="outlined" className="w-full">
                  View Profile
                </Button>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="md-elevation-1 hover-lift rounded-xl md-tertiary-container">
              <CardContent className="p-md-4">
                <div className="text-center">
                  <p className="md-display-medium text-md-tertiary-on-container mb-md-1">
                    2.4K
                  </p>
                  <p className="md-label-large text-md-tertiary-on-container">
                    Active Users
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};
