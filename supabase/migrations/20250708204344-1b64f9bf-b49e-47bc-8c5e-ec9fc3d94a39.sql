-- Enterprise-level complete database schema for NutiFit
-- This migration creates a comprehensive, scalable database architecture

-- ==========================================
-- 1. USER MANAGEMENT & PROFILES
-- ==========================================

-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('customer', 'admin', 'cook', 'delivery_driver', 'owner', 'support');

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  date_of_birth DATE,
  avatar_url TEXT,
  dietary_preferences TEXT[],
  allergens TEXT[],
  fitness_goals TEXT[],
  activity_level TEXT CHECK (activity_level IN ('sedentary', 'light', 'moderate', 'active', 'very_active')),
  weight_kg DECIMAL(5,2),
  height_cm INTEGER,
  target_weight_kg DECIMAL(5,2),
  email_notifications BOOLEAN DEFAULT true,
  sms_notifications BOOLEAN DEFAULT false,
  marketing_consent BOOLEAN DEFAULT false,
  privacy_consent BOOLEAN DEFAULT true,
  terms_accepted_at TIMESTAMP WITH TIME ZONE,
  last_login_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'deleted')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  assigned_by UUID REFERENCES auth.users(id),
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  active BOOLEAN NOT NULL DEFAULT true,
  UNIQUE(user_id, role)
);

-- ==========================================
-- 2. LOCATION & ADDRESS MANAGEMENT
-- ==========================================

-- Create regions table
CREATE TABLE public.regions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  country_code TEXT NOT NULL DEFAULT 'FR',
  timezone TEXT NOT NULL DEFAULT 'Europe/Paris',
  delivery_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  minimum_order DECIMAL(10,2) NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create addresses table
CREATE TABLE public.addresses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  label TEXT NOT NULL, -- 'home', 'work', 'other'
  street_address TEXT NOT NULL,
  street_address_2 TEXT,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  region_id UUID REFERENCES public.regions(id),
  country TEXT NOT NULL DEFAULT 'France',
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  delivery_instructions TEXT,
  is_default BOOLEAN NOT NULL DEFAULT false,
  verified BOOLEAN NOT NULL DEFAULT false,
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ==========================================
-- 3. ENHANCED MEAL & RECIPE MANAGEMENT
-- ==========================================

-- Create nutrition profiles table
CREATE TABLE public.nutrition_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  calories_per_100g INTEGER,
  protein_per_100g DECIMAL(5,2),
  carbs_per_100g DECIMAL(5,2),
  fat_per_100g DECIMAL(5,2),
  fiber_per_100g DECIMAL(5,2),
  sugar_per_100g DECIMAL(5,2),
  sodium_mg_per_100g DECIMAL(8,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Update ingredients table with enhanced nutrition
ALTER TABLE public.ingredients ADD COLUMN nutrition_profile_id UUID REFERENCES public.nutrition_profiles(id);
ALTER TABLE public.ingredients ADD COLUMN supplier_info JSONB;
ALTER TABLE public.ingredients ADD COLUMN cost_per_unit DECIMAL(10,4);
ALTER TABLE public.ingredients ADD COLUMN unit_of_measurement TEXT DEFAULT 'g';
ALTER TABLE public.ingredients ADD COLUMN minimum_stock INTEGER DEFAULT 0;
ALTER TABLE public.ingredients ADD COLUMN current_stock INTEGER DEFAULT 0;
ALTER TABLE public.ingredients ADD COLUMN reorder_point INTEGER DEFAULT 10;

-- Enhanced meal ingredients with precise measurements
ALTER TABLE public.meal_ingredients ADD COLUMN weight_grams DECIMAL(8,2);
ALTER TABLE public.meal_ingredients ADD COLUMN cost_per_serving DECIMAL(10,4);
ALTER TABLE public.meal_ingredients ADD COLUMN cooking_method TEXT;
ALTER TABLE public.meal_ingredients ADD COLUMN cooking_time_minutes INTEGER;

-- Create meal variants table (different sizes, spice levels, etc.)
CREATE TABLE public.meal_variants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  meal_id UUID NOT NULL REFERENCES public.meals(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- 'Regular', 'Large', 'Extra Large'
  size_multiplier DECIMAL(3,2) NOT NULL DEFAULT 1.0,
  price_multiplier DECIMAL(3,2) NOT NULL DEFAULT 1.0,
  calories_adjustment INTEGER DEFAULT 0,
  available BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ==========================================
-- 4. SUBSCRIPTION & PLAN MANAGEMENT
-- ==========================================

-- Create subscription plans table
CREATE TABLE public.subscription_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  meals_per_week INTEGER NOT NULL,
  price_per_week DECIMAL(10,2) NOT NULL,
  price_per_meal DECIMAL(10,2) NOT NULL,
  delivery_frequency TEXT NOT NULL CHECK (delivery_frequency IN ('weekly', 'bi-weekly', 'monthly')),
  minimum_commitment_weeks INTEGER DEFAULT 1,
  discount_percentage DECIMAL(5,2) DEFAULT 0,
  features JSONB, -- JSON array of features
  target_category TEXT[], -- ['weight_loss', 'muscle_gain', 'balanced']
  active BOOLEAN NOT NULL DEFAULT true,
  promoted BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user subscriptions table
CREATE TABLE public.user_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.subscription_plans(id),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled', 'expired', 'pending')),
  start_date DATE NOT NULL,
  next_delivery_date DATE,
  end_date DATE,
  pause_until_date DATE,
  cancellation_reason TEXT,
  cancellation_date TIMESTAMP WITH TIME ZONE,
  auto_renew BOOLEAN NOT NULL DEFAULT true,
  special_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ==========================================
-- 5. ORDER MANAGEMENT
-- ==========================================

-- Create order status enum
CREATE TYPE public.order_status AS ENUM (
  'draft', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 
  'delivered', 'cancelled', 'refunded', 'failed'
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  subscription_id UUID REFERENCES public.user_subscriptions(id),
  status order_status NOT NULL DEFAULT 'draft',
  order_type TEXT NOT NULL DEFAULT 'subscription' CHECK (order_type IN ('subscription', 'one_time', 'gift')),
  
  -- Pricing
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  delivery_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  discount_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  
  -- Delivery information
  delivery_address_id UUID REFERENCES public.addresses(id),
  delivery_date DATE,
  delivery_time_slot TEXT,
  delivery_instructions TEXT,
  estimated_delivery_time TIMESTAMP WITH TIME ZONE,
  actual_delivery_time TIMESTAMP WITH TIME ZONE,
  
  -- Order tracking
  prepared_at TIMESTAMP WITH TIME ZONE,
  dispatched_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  
  -- Additional info
  special_instructions TEXT,
  gift_message TEXT,
  promotional_code TEXT,
  payment_intent_id TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  meal_id UUID NOT NULL REFERENCES public.meals(id),
  meal_variant_id UUID REFERENCES public.meal_variants(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  special_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ==========================================
-- 6. DELIVERY MANAGEMENT
-- ==========================================

-- Create delivery zones table
CREATE TABLE public.delivery_zones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  region_id UUID NOT NULL REFERENCES public.regions(id),
  polygon_coordinates JSONB, -- GeoJSON polygon
  delivery_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  estimated_delivery_time_minutes INTEGER NOT NULL DEFAULT 60,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create delivery slots table
CREATE TABLE public.delivery_slots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  zone_id UUID NOT NULL REFERENCES public.delivery_zones(id),
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0 = Sunday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  max_orders INTEGER NOT NULL DEFAULT 50,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create delivery routes table
CREATE TABLE public.delivery_routes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID REFERENCES auth.users(id),
  zone_id UUID NOT NULL REFERENCES public.delivery_zones(id),
  delivery_date DATE NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed', 'cancelled')),
  total_orders INTEGER DEFAULT 0,
  total_distance_km DECIMAL(8,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create delivery assignments table
CREATE TABLE public.delivery_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  route_id UUID NOT NULL REFERENCES public.delivery_routes(id),
  order_id UUID NOT NULL REFERENCES public.orders(id),
  sequence_number INTEGER NOT NULL,
  estimated_arrival TIMESTAMP WITH TIME ZONE,
  actual_arrival TIMESTAMP WITH TIME ZONE,
  delivery_status TEXT NOT NULL DEFAULT 'pending' CHECK (delivery_status IN ('pending', 'en_route', 'delivered', 'failed', 'rescheduled')),
  delivery_notes TEXT,
  customer_signature_url TEXT,
  photo_proof_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ==========================================
-- 7. PAYMENT MANAGEMENT
-- ==========================================

-- Create payment methods table
CREATE TABLE public.payment_methods (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_payment_method_id TEXT UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('card', 'bank_account', 'digital_wallet')),
  brand TEXT, -- 'visa', 'mastercard', etc.
  last_four TEXT,
  exp_month INTEGER,
  exp_year INTEGER,
  is_default BOOLEAN NOT NULL DEFAULT false,
  billing_address JSONB,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create payment transactions table
CREATE TABLE public.payment_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  payment_method_id UUID REFERENCES public.payment_methods(id),
  stripe_payment_intent_id TEXT UNIQUE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'succeeded', 'failed', 'cancelled', 'refunded')),
  payment_type TEXT NOT NULL CHECK (payment_type IN ('payment', 'refund', 'partial_refund')),
  failure_reason TEXT,
  refund_reason TEXT,
  fees DECIMAL(10,2) DEFAULT 0,
  net_amount DECIMAL(10,2),
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ==========================================
-- 8. INVENTORY MANAGEMENT
-- ==========================================

-- Create suppliers table
CREATE TABLE public.suppliers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  contact_email TEXT,
  contact_phone TEXT,
  address JSONB,
  payment_terms TEXT,
  quality_rating DECIMAL(3,2) CHECK (quality_rating BETWEEN 0 AND 5),
  reliability_rating DECIMAL(3,2) CHECK (reliability_rating BETWEEN 0 AND 5),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create inventory transactions table
CREATE TABLE public.inventory_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ingredient_id UUID NOT NULL REFERENCES public.ingredients(id),
  supplier_id UUID REFERENCES public.suppliers(id),
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('purchase', 'usage', 'waste', 'adjustment', 'return')),
  quantity_change DECIMAL(10,3) NOT NULL, -- positive for incoming, negative for outgoing
  unit_cost DECIMAL(10,4),
  total_cost DECIMAL(10,2),
  reference_number TEXT, -- PO number, recipe batch, etc.
  expiry_date DATE,
  notes TEXT,
  processed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ==========================================
-- 9. PRODUCTION MANAGEMENT
-- ==========================================

-- Create production batches table
CREATE TABLE public.production_batches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  meal_id UUID NOT NULL REFERENCES public.meals(id),
  batch_number TEXT NOT NULL UNIQUE,
  planned_quantity INTEGER NOT NULL,
  actual_quantity INTEGER,
  production_date DATE NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  assigned_cook_id UUID REFERENCES auth.users(id),
  status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed', 'cancelled')),
  quality_score DECIMAL(3,2) CHECK (quality_score BETWEEN 0 AND 5),
  total_cost DECIMAL(10,2),
  waste_quantity INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ==========================================
-- 10. CUSTOMER SUPPORT
-- ==========================================

-- Create support ticket categories
CREATE TABLE public.support_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  priority_level INTEGER NOT NULL DEFAULT 3 CHECK (priority_level BETWEEN 1 AND 5),
  auto_response_template TEXT,
  escalation_threshold_hours INTEGER DEFAULT 24,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create support tickets table
CREATE TABLE public.support_tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_number TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  category_id UUID REFERENCES public.support_categories(id),
  order_id UUID REFERENCES public.orders(id),
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'waiting_customer', 'resolved', 'closed')),
  assigned_to UUID REFERENCES auth.users(id),
  resolution TEXT,
  satisfaction_rating DECIMAL(3,2) CHECK (satisfaction_rating BETWEEN 0 AND 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  closed_at TIMESTAMP WITH TIME ZONE
);

-- Create support ticket messages
CREATE TABLE public.support_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID NOT NULL REFERENCES public.support_tickets(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id),
  message TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'system')),
  attachments JSONB,
  internal BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- ==========================================
-- 11. ANALYTICS & REPORTING
-- ==========================================

-- Create customer analytics table
CREATE TABLE public.customer_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  date DATE NOT NULL,
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  favorite_category TEXT,
  avg_order_value DECIMAL(10,2) DEFAULT 0,
  last_order_date DATE,
  churn_risk_score DECIMAL(3,2) CHECK (churn_risk_score BETWEEN 0 AND 1),
  lifetime_value DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- ==========================================
-- 12. PERFORMANCE INDEXES
-- ==========================================

-- User and profile indexes
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_status ON public.profiles(status);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role);

-- Address indexes
CREATE INDEX idx_addresses_user_id ON public.addresses(user_id);
CREATE INDEX idx_addresses_region_id ON public.addresses(region_id);
CREATE INDEX idx_addresses_postal_code ON public.addresses(postal_code);

-- Order indexes
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_order_number ON public.orders(order_number);
CREATE INDEX idx_orders_delivery_date ON public.orders(delivery_date);
CREATE INDEX idx_orders_created_at ON public.orders(created_at);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_meal_id ON public.order_items(meal_id);

-- Subscription indexes
CREATE INDEX idx_user_subscriptions_user_id ON public.user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_status ON public.user_subscriptions(status);
CREATE INDEX idx_user_subscriptions_next_delivery ON public.user_subscriptions(next_delivery_date);

-- Delivery indexes
CREATE INDEX idx_delivery_routes_driver_id ON public.delivery_routes(driver_id);
CREATE INDEX idx_delivery_routes_date ON public.delivery_routes(delivery_date);
CREATE INDEX idx_delivery_assignments_route_id ON public.delivery_assignments(route_id);
CREATE INDEX idx_delivery_assignments_order_id ON public.delivery_assignments(order_id);

-- Payment indexes
CREATE INDEX idx_payment_methods_user_id ON public.payment_methods(user_id);
CREATE INDEX idx_payment_transactions_order_id ON public.payment_transactions(order_id);
CREATE INDEX idx_payment_transactions_user_id ON public.payment_transactions(user_id);
CREATE INDEX idx_payment_transactions_status ON public.payment_transactions(status);

-- Inventory indexes
CREATE INDEX idx_inventory_transactions_ingredient_id ON public.inventory_transactions(ingredient_id);
CREATE INDEX idx_inventory_transactions_type ON public.inventory_transactions(transaction_type);
CREATE INDEX idx_inventory_transactions_created_at ON public.inventory_transactions(created_at);

-- Support indexes
CREATE INDEX idx_support_tickets_user_id ON public.support_tickets(user_id);
CREATE INDEX idx_support_tickets_status ON public.support_tickets(status);
CREATE INDEX idx_support_tickets_assigned_to ON public.support_tickets(assigned_to);
CREATE INDEX idx_support_messages_ticket_id ON public.support_messages(ticket_id);

-- Analytics indexes
CREATE INDEX idx_customer_analytics_user_id ON public.customer_analytics(user_id);
CREATE INDEX idx_customer_analytics_date ON public.customer_analytics(date);

-- ==========================================
-- 13. ENABLE ROW LEVEL SECURITY
-- ==========================================

-- Enable RLS on all new tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.production_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_analytics ENABLE ROW LEVEL SECURITY;