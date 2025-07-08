-- ==========================================
-- COMPREHENSIVE ROW LEVEL SECURITY POLICIES
-- ==========================================

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.user_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
      AND active = true
      AND (expires_at IS NULL OR expires_at > now())
  )
$$;

-- Create function to check if user is admin/owner
CREATE OR REPLACE FUNCTION public.is_admin_or_owner(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT public.has_role(_user_id, 'admin') OR public.has_role(_user_id, 'owner')
$$;

-- ==========================================
-- PROFILES POLICIES
-- ==========================================

CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
USING (public.is_admin_or_owner(auth.uid()));

CREATE POLICY "Admins can update all profiles"
ON public.profiles FOR UPDATE
USING (public.is_admin_or_owner(auth.uid()));

-- ==========================================
-- USER ROLES POLICIES
-- ==========================================

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
USING (public.is_admin_or_owner(auth.uid()));

-- ==========================================
-- REGIONS POLICIES
-- ==========================================

CREATE POLICY "Regions are viewable by everyone"
ON public.regions FOR SELECT
USING (true);

CREATE POLICY "Only admins can manage regions"
ON public.regions FOR ALL
USING (public.is_admin_or_owner(auth.uid()));

-- ==========================================
-- ADDRESSES POLICIES
-- ==========================================

CREATE POLICY "Users can view their own addresses"
ON public.addresses FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own addresses"
ON public.addresses FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Delivery drivers can view addresses for their routes"
ON public.addresses FOR SELECT
USING (
  public.has_role(auth.uid(), 'delivery_driver') AND
  EXISTS (
    SELECT 1 FROM public.delivery_assignments da
    JOIN public.delivery_routes dr ON da.route_id = dr.id
    JOIN public.orders o ON da.order_id = o.id
    WHERE dr.driver_id = auth.uid()
    AND o.delivery_address_id = addresses.id
  )
);

-- ==========================================
-- NUTRITION PROFILES POLICIES
-- ==========================================

CREATE POLICY "Nutrition profiles are viewable by everyone"
ON public.nutrition_profiles FOR SELECT
USING (true);

CREATE POLICY "Only cooks and admins can manage nutrition profiles"
ON public.nutrition_profiles FOR ALL
USING (
  public.has_role(auth.uid(), 'cook') OR 
  public.is_admin_or_owner(auth.uid())
);

-- ==========================================
-- MEAL VARIANTS POLICIES
-- ==========================================

CREATE POLICY "Meal variants are viewable by everyone"
ON public.meal_variants FOR SELECT
USING (true);

CREATE POLICY "Only cooks and admins can manage meal variants"
ON public.meal_variants FOR ALL
USING (
  public.has_role(auth.uid(), 'cook') OR 
  public.is_admin_or_owner(auth.uid())
);

-- ==========================================
-- SUBSCRIPTION PLANS POLICIES
-- ==========================================

CREATE POLICY "Active subscription plans are viewable by everyone"
ON public.subscription_plans FOR SELECT
USING (active = true);

CREATE POLICY "Admins can view all subscription plans"
ON public.subscription_plans FOR SELECT
USING (public.is_admin_or_owner(auth.uid()));

CREATE POLICY "Only admins can manage subscription plans"
ON public.subscription_plans FOR ALL
USING (public.is_admin_or_owner(auth.uid()));

-- ==========================================
-- USER SUBSCRIPTIONS POLICIES
-- ==========================================

CREATE POLICY "Users can view their own subscriptions"
ON public.user_subscriptions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own subscriptions"
ON public.user_subscriptions FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all subscriptions"
ON public.user_subscriptions FOR SELECT
USING (public.is_admin_or_owner(auth.uid()));

CREATE POLICY "Admins can manage all subscriptions"
ON public.user_subscriptions FOR ALL
USING (public.is_admin_or_owner(auth.uid()));

-- ==========================================
-- ORDERS POLICIES
-- ==========================================

CREATE POLICY "Users can view their own orders"
ON public.orders FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
ON public.orders FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own draft orders"
ON public.orders FOR UPDATE
USING (auth.uid() = user_id AND status = 'draft');

CREATE POLICY "Cooks can view orders for preparation"
ON public.orders FOR SELECT
USING (
  public.has_role(auth.uid(), 'cook') AND
  status IN ('confirmed', 'preparing', 'ready')
);

CREATE POLICY "Cooks can update order status"
ON public.orders FOR UPDATE
USING (
  public.has_role(auth.uid(), 'cook') AND
  status IN ('confirmed', 'preparing', 'ready')
);

CREATE POLICY "Delivery drivers can view their assigned orders"
ON public.orders FOR SELECT
USING (
  public.has_role(auth.uid(), 'delivery_driver') AND
  EXISTS (
    SELECT 1 FROM public.delivery_assignments da
    JOIN public.delivery_routes dr ON da.route_id = dr.id
    WHERE dr.driver_id = auth.uid()
    AND da.order_id = orders.id
  )
);

CREATE POLICY "Admins can view all orders"
ON public.orders FOR SELECT
USING (public.is_admin_or_owner(auth.uid()));

CREATE POLICY "Admins can manage all orders"
ON public.orders FOR ALL
USING (public.is_admin_or_owner(auth.uid()));

-- ==========================================
-- ORDER ITEMS POLICIES
-- ==========================================

CREATE POLICY "Users can view items from their own orders"
ON public.order_items FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);

CREATE POLICY "Users can manage items in their own draft orders"
ON public.order_items FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
    AND orders.status = 'draft'
  )
);

CREATE POLICY "Staff can view all order items"
ON public.order_items FOR SELECT
USING (
  public.has_role(auth.uid(), 'cook') OR
  public.has_role(auth.uid(), 'delivery_driver') OR
  public.is_admin_or_owner(auth.uid())
);

-- ==========================================
-- DELIVERY ZONES & SLOTS POLICIES
-- ==========================================

CREATE POLICY "Delivery zones are viewable by everyone"
ON public.delivery_zones FOR SELECT
USING (active = true);

CREATE POLICY "Delivery slots are viewable by everyone"
ON public.delivery_slots FOR SELECT
USING (active = true);

CREATE POLICY "Only admins can manage delivery zones"
ON public.delivery_zones FOR ALL
USING (public.is_admin_or_owner(auth.uid()));

CREATE POLICY "Only admins can manage delivery slots"
ON public.delivery_slots FOR ALL
USING (public.is_admin_or_owner(auth.uid()));

-- ==========================================
-- DELIVERY ROUTES & ASSIGNMENTS POLICIES
-- ==========================================

CREATE POLICY "Drivers can view their own routes"
ON public.delivery_routes FOR SELECT
USING (auth.uid() = driver_id);

CREATE POLICY "Drivers can update their own routes"
ON public.delivery_routes FOR UPDATE
USING (auth.uid() = driver_id);

CREATE POLICY "Admins can view all routes"
ON public.delivery_routes FOR SELECT
USING (public.is_admin_or_owner(auth.uid()));

CREATE POLICY "Admins can manage all routes"
ON public.delivery_routes FOR ALL
USING (public.is_admin_or_owner(auth.uid()));

CREATE POLICY "Drivers can view their assignments"
ON public.delivery_assignments FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.delivery_routes
    WHERE delivery_routes.id = delivery_assignments.route_id
    AND delivery_routes.driver_id = auth.uid()
  )
);

CREATE POLICY "Drivers can update their assignments"
ON public.delivery_assignments FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.delivery_routes
    WHERE delivery_routes.id = delivery_assignments.route_id
    AND delivery_routes.driver_id = auth.uid()
  )
);

-- ==========================================
-- PAYMENT METHODS POLICIES
-- ==========================================

CREATE POLICY "Users can view their own payment methods"
ON public.payment_methods FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own payment methods"
ON public.payment_methods FOR ALL
USING (auth.uid() = user_id);

-- ==========================================
-- PAYMENT TRANSACTIONS POLICIES
-- ==========================================

CREATE POLICY "Users can view their own transactions"
ON public.payment_transactions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own transactions"
ON public.payment_transactions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all transactions"
ON public.payment_transactions FOR SELECT
USING (public.is_admin_or_owner(auth.uid()));

-- ==========================================
-- SUPPLIERS POLICIES
-- ==========================================

CREATE POLICY "Only staff can view suppliers"
ON public.suppliers FOR SELECT
USING (
  public.has_role(auth.uid(), 'cook') OR
  public.is_admin_or_owner(auth.uid())
);

CREATE POLICY "Only admins can manage suppliers"
ON public.suppliers FOR ALL
USING (public.is_admin_or_owner(auth.uid()));

-- ==========================================
-- INVENTORY TRANSACTIONS POLICIES
-- ==========================================

CREATE POLICY "Only staff can view inventory transactions"
ON public.inventory_transactions FOR SELECT
USING (
  public.has_role(auth.uid(), 'cook') OR
  public.is_admin_or_owner(auth.uid())
);

CREATE POLICY "Cooks can create inventory transactions"
ON public.inventory_transactions FOR INSERT
WITH CHECK (
  public.has_role(auth.uid(), 'cook') OR
  public.is_admin_or_owner(auth.uid())
);

CREATE POLICY "Only admins can update/delete inventory transactions"
ON public.inventory_transactions FOR UPDATE
USING (public.is_admin_or_owner(auth.uid()));

CREATE POLICY "Only admins can delete inventory transactions"
ON public.inventory_transactions FOR DELETE
USING (public.is_admin_or_owner(auth.uid()));

-- ==========================================
-- PRODUCTION BATCHES POLICIES
-- ==========================================

CREATE POLICY "Cooks can view all production batches"
ON public.production_batches FOR SELECT
USING (
  public.has_role(auth.uid(), 'cook') OR
  public.is_admin_or_owner(auth.uid())
);

CREATE POLICY "Assigned cooks can manage their batches"
ON public.production_batches FOR ALL
USING (
  auth.uid() = assigned_cook_id OR
  public.is_admin_or_owner(auth.uid())
);

-- ==========================================
-- SUPPORT CATEGORIES POLICIES
-- ==========================================

CREATE POLICY "Support categories are viewable by everyone"
ON public.support_categories FOR SELECT
USING (active = true);

CREATE POLICY "Only admins can manage support categories"
ON public.support_categories FOR ALL
USING (public.is_admin_or_owner(auth.uid()));

-- ==========================================
-- SUPPORT TICKETS POLICIES
-- ==========================================

CREATE POLICY "Users can view their own tickets"
ON public.support_tickets FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tickets"
ON public.support_tickets FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own open tickets"
ON public.support_tickets FOR UPDATE
USING (auth.uid() = user_id AND status IN ('open', 'waiting_customer'));

CREATE POLICY "Support staff can view assigned tickets"
ON public.support_tickets FOR SELECT
USING (
  public.has_role(auth.uid(), 'support') AND
  (assigned_to = auth.uid() OR assigned_to IS NULL)
);

CREATE POLICY "Support staff can manage assigned tickets"
ON public.support_tickets FOR UPDATE
USING (
  public.has_role(auth.uid(), 'support') AND
  assigned_to = auth.uid()
);

CREATE POLICY "Admins can view all tickets"
ON public.support_tickets FOR SELECT
USING (public.is_admin_or_owner(auth.uid()));

CREATE POLICY "Admins can manage all tickets"
ON public.support_tickets FOR ALL
USING (public.is_admin_or_owner(auth.uid()));

-- ==========================================
-- SUPPORT MESSAGES POLICIES
-- ==========================================

CREATE POLICY "Users can view messages from their tickets"
ON public.support_messages FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.support_tickets
    WHERE support_tickets.id = support_messages.ticket_id
    AND (support_tickets.user_id = auth.uid() OR support_tickets.assigned_to = auth.uid())
  ) AND internal = false
);

CREATE POLICY "Users can send messages to their tickets"
ON public.support_messages FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.support_tickets
    WHERE support_tickets.id = support_messages.ticket_id
    AND support_tickets.user_id = auth.uid()
  ) AND auth.uid() = sender_id AND internal = false
);

CREATE POLICY "Support staff can view all messages in assigned tickets"
ON public.support_messages FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.support_tickets
    WHERE support_tickets.id = support_messages.ticket_id
    AND support_tickets.assigned_to = auth.uid()
  ) AND public.has_role(auth.uid(), 'support')
);

CREATE POLICY "Support staff can send messages to assigned tickets"
ON public.support_messages FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.support_tickets
    WHERE support_tickets.id = support_messages.ticket_id
    AND support_tickets.assigned_to = auth.uid()
  ) AND auth.uid() = sender_id AND public.has_role(auth.uid(), 'support')
);

-- ==========================================
-- CUSTOMER ANALYTICS POLICIES
-- ==========================================

CREATE POLICY "Users can view their own analytics"
ON public.customer_analytics FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can view all analytics"
ON public.customer_analytics FOR SELECT
USING (public.is_admin_or_owner(auth.uid()));

CREATE POLICY "Only admins can manage analytics"
ON public.customer_analytics FOR ALL
USING (public.is_admin_or_owner(auth.uid()));

-- ==========================================
-- TRIGGERS FOR AUTOMATIC DATA UPDATES
-- ==========================================

-- Create trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for addresses updated_at
CREATE TRIGGER update_addresses_updated_at
BEFORE UPDATE ON public.addresses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for subscription plans updated_at
CREATE TRIGGER update_subscription_plans_updated_at
BEFORE UPDATE ON public.subscription_plans
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for user subscriptions updated_at
CREATE TRIGGER update_user_subscriptions_updated_at
BEFORE UPDATE ON public.user_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for orders updated_at
CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for payment methods updated_at
CREATE TRIGGER update_payment_methods_updated_at
BEFORE UPDATE ON public.payment_methods
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for suppliers updated_at
CREATE TRIGGER update_suppliers_updated_at
BEFORE UPDATE ON public.suppliers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for production batches updated_at
CREATE TRIGGER update_production_batches_updated_at
BEFORE UPDATE ON public.production_batches
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for support tickets updated_at
CREATE TRIGGER update_support_tickets_updated_at
BEFORE UPDATE ON public.support_tickets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ==========================================
-- DEFAULT DATA INSERTION
-- ==========================================

-- Insert default regions
INSERT INTO public.regions (name, code, delivery_fee, minimum_order) VALUES
('Paris', 'PAR', 4.99, 25.00),
('Lyon', 'LYN', 4.99, 25.00),
('Marseille', 'MAR', 4.99, 25.00),
('Toulouse', 'TOU', 4.99, 25.00),
('Nice', 'NIC', 4.99, 25.00);

-- Insert default subscription plans
INSERT INTO public.subscription_plans (
  name, description, meals_per_week, price_per_week, price_per_meal,
  delivery_frequency, features, target_category
) VALUES
('Découverte', 'Parfait pour découvrir NutiFit', 4, 39.99, 9.99, 'weekly', 
 '["Livraison gratuite", "Recettes équilibrées", "Support client"]'::jsonb,
 ARRAY['balanced']),
 
('Équilibré', 'Le choix idéal pour un mode de vie sain', 6, 54.99, 9.16, 'weekly',
 '["Livraison gratuite", "Recettes variées", "Conseils nutritionnels", "Support prioritaire"]'::jsonb,
 ARRAY['balanced', 'weight_loss']),
 
('Performance', 'Pour les sportifs et actifs', 8, 69.99, 8.75, 'weekly',
 '["Livraison gratuite", "Recettes protéinées", "Plans personnalisés", "Support dédié"]'::jsonb,
 ARRAY['muscle_gain', 'balanced']),
 
('Premium', 'L\'expérience NutiFit complète', 10, 84.99, 8.50, 'weekly',
 '["Livraison express", "Recettes premium", "Nutritionniste dédié", "Support 24/7"]'::jsonb,
 ARRAY['muscle_gain', 'weight_loss', 'balanced']);

-- Insert default support categories
INSERT INTO public.support_categories (name, description, priority_level) VALUES
('Commande', 'Questions relatives aux commandes et livraisons', 3),
('Paiement', 'Problèmes de facturation et paiement', 4),
('Qualité', 'Retours qualité et réclamations produits', 5),
('Compte', 'Gestion du compte utilisateur', 2),
('Technique', 'Problèmes techniques sur le site', 3),
('Général', 'Questions générales et autres demandes', 1);