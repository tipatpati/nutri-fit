export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string
          country: string
          created_at: string
          delivery_instructions: string | null
          id: string
          is_default: boolean
          label: string
          latitude: number | null
          longitude: number | null
          postal_code: string
          region_id: string | null
          street_address: string
          street_address_2: string | null
          updated_at: string
          user_id: string
          verified: boolean
          verified_at: string | null
        }
        Insert: {
          city: string
          country?: string
          created_at?: string
          delivery_instructions?: string | null
          id?: string
          is_default?: boolean
          label: string
          latitude?: number | null
          longitude?: number | null
          postal_code: string
          region_id?: string | null
          street_address: string
          street_address_2?: string | null
          updated_at?: string
          user_id: string
          verified?: boolean
          verified_at?: string | null
        }
        Update: {
          city?: string
          country?: string
          created_at?: string
          delivery_instructions?: string | null
          id?: string
          is_default?: boolean
          label?: string
          latitude?: number | null
          longitude?: number | null
          postal_code?: string
          region_id?: string | null
          street_address?: string
          street_address_2?: string | null
          updated_at?: string
          user_id?: string
          verified?: boolean
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addresses_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_analytics: {
        Row: {
          avg_order_value: number | null
          churn_risk_score: number | null
          created_at: string
          date: string
          favorite_category: string | null
          id: string
          last_order_date: string | null
          lifetime_value: number | null
          total_orders: number | null
          total_spent: number | null
          user_id: string
        }
        Insert: {
          avg_order_value?: number | null
          churn_risk_score?: number | null
          created_at?: string
          date: string
          favorite_category?: string | null
          id?: string
          last_order_date?: string | null
          lifetime_value?: number | null
          total_orders?: number | null
          total_spent?: number | null
          user_id: string
        }
        Update: {
          avg_order_value?: number | null
          churn_risk_score?: number | null
          created_at?: string
          date?: string
          favorite_category?: string | null
          id?: string
          last_order_date?: string | null
          lifetime_value?: number | null
          total_orders?: number | null
          total_spent?: number | null
          user_id?: string
        }
        Relationships: []
      }
      delivery_assignments: {
        Row: {
          actual_arrival: string | null
          created_at: string
          customer_signature_url: string | null
          delivery_notes: string | null
          delivery_status: string
          estimated_arrival: string | null
          id: string
          order_id: string
          photo_proof_url: string | null
          route_id: string
          sequence_number: number
        }
        Insert: {
          actual_arrival?: string | null
          created_at?: string
          customer_signature_url?: string | null
          delivery_notes?: string | null
          delivery_status?: string
          estimated_arrival?: string | null
          id?: string
          order_id: string
          photo_proof_url?: string | null
          route_id: string
          sequence_number: number
        }
        Update: {
          actual_arrival?: string | null
          created_at?: string
          customer_signature_url?: string | null
          delivery_notes?: string | null
          delivery_status?: string
          estimated_arrival?: string | null
          id?: string
          order_id?: string
          photo_proof_url?: string | null
          route_id?: string
          sequence_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "delivery_assignments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "delivery_assignments_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "delivery_routes"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_routes: {
        Row: {
          created_at: string
          delivery_date: string
          driver_id: string | null
          end_time: string | null
          id: string
          notes: string | null
          start_time: string | null
          status: string
          total_distance_km: number | null
          total_orders: number | null
          zone_id: string
        }
        Insert: {
          created_at?: string
          delivery_date: string
          driver_id?: string | null
          end_time?: string | null
          id?: string
          notes?: string | null
          start_time?: string | null
          status?: string
          total_distance_km?: number | null
          total_orders?: number | null
          zone_id: string
        }
        Update: {
          created_at?: string
          delivery_date?: string
          driver_id?: string | null
          end_time?: string | null
          id?: string
          notes?: string | null
          start_time?: string | null
          status?: string
          total_distance_km?: number | null
          total_orders?: number | null
          zone_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "delivery_routes_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "delivery_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_slots: {
        Row: {
          active: boolean
          created_at: string
          day_of_week: number
          end_time: string
          id: string
          max_orders: number
          start_time: string
          zone_id: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          day_of_week: number
          end_time: string
          id?: string
          max_orders?: number
          start_time: string
          zone_id: string
        }
        Update: {
          active?: boolean
          created_at?: string
          day_of_week?: number
          end_time?: string
          id?: string
          max_orders?: number
          start_time?: string
          zone_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "delivery_slots_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "delivery_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_zones: {
        Row: {
          active: boolean
          created_at: string
          delivery_fee: number
          estimated_delivery_time_minutes: number
          id: string
          name: string
          polygon_coordinates: Json | null
          region_id: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          delivery_fee?: number
          estimated_delivery_time_minutes?: number
          id?: string
          name: string
          polygon_coordinates?: Json | null
          region_id: string
        }
        Update: {
          active?: boolean
          created_at?: string
          delivery_fee?: number
          estimated_delivery_time_minutes?: number
          id?: string
          name?: string
          polygon_coordinates?: Json | null
          region_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "delivery_zones_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredients: {
        Row: {
          active: boolean
          cost_per_unit: number | null
          created_at: string
          current_stock: number | null
          description: string | null
          id: string
          minimum_stock: number | null
          name: string
          nutrition_profile_id: string | null
          nutritional_info: Json | null
          reorder_point: number | null
          supplier_info: Json | null
          type: string
          unit_of_measurement: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          cost_per_unit?: number | null
          created_at?: string
          current_stock?: number | null
          description?: string | null
          id?: string
          minimum_stock?: number | null
          name: string
          nutrition_profile_id?: string | null
          nutritional_info?: Json | null
          reorder_point?: number | null
          supplier_info?: Json | null
          type: string
          unit_of_measurement?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          cost_per_unit?: number | null
          created_at?: string
          current_stock?: number | null
          description?: string | null
          id?: string
          minimum_stock?: number | null
          name?: string
          nutrition_profile_id?: string | null
          nutritional_info?: Json | null
          reorder_point?: number | null
          supplier_info?: Json | null
          type?: string
          unit_of_measurement?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ingredients_nutrition_profile_id_fkey"
            columns: ["nutrition_profile_id"]
            isOneToOne: false
            referencedRelation: "nutrition_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_transactions: {
        Row: {
          created_at: string
          expiry_date: string | null
          id: string
          ingredient_id: string
          notes: string | null
          processed_by: string | null
          quantity_change: number
          reference_number: string | null
          supplier_id: string | null
          total_cost: number | null
          transaction_type: string
          unit_cost: number | null
        }
        Insert: {
          created_at?: string
          expiry_date?: string | null
          id?: string
          ingredient_id: string
          notes?: string | null
          processed_by?: string | null
          quantity_change: number
          reference_number?: string | null
          supplier_id?: string | null
          total_cost?: number | null
          transaction_type: string
          unit_cost?: number | null
        }
        Update: {
          created_at?: string
          expiry_date?: string | null
          id?: string
          ingredient_id?: string
          notes?: string | null
          processed_by?: string | null
          quantity_change?: number
          reference_number?: string | null
          supplier_id?: string | null
          total_cost?: number | null
          transaction_type?: string
          unit_cost?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_transactions_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_transactions_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_categories: {
        Row: {
          active: boolean
          color_code: string | null
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          color_code?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          color_code?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      meal_ingredients: {
        Row: {
          cooking_method: string | null
          cooking_time_minutes: number | null
          cost_per_serving: number | null
          created_at: string
          id: string
          ingredient_id: string
          is_primary: boolean
          meal_id: string
          preparation_method: string | null
          quantity: string | null
          weight_grams: number | null
        }
        Insert: {
          cooking_method?: string | null
          cooking_time_minutes?: number | null
          cost_per_serving?: number | null
          created_at?: string
          id?: string
          ingredient_id: string
          is_primary?: boolean
          meal_id: string
          preparation_method?: string | null
          quantity?: string | null
          weight_grams?: number | null
        }
        Update: {
          cooking_method?: string | null
          cooking_time_minutes?: number | null
          cost_per_serving?: number | null
          created_at?: string
          id?: string
          ingredient_id?: string
          is_primary?: boolean
          meal_id?: string
          preparation_method?: string | null
          quantity?: string | null
          weight_grams?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_meal_ingredients_ingredient"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_meal_ingredients_meal"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_meal_ingredients_meal"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals_with_details"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_tag_assignments: {
        Row: {
          created_at: string
          id: string
          meal_id: string
          tag_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          meal_id: string
          tag_id: string
        }
        Update: {
          created_at?: string
          id?: string
          meal_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_meal_tag_assignments_meal"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_meal_tag_assignments_meal"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals_with_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_meal_tag_assignments_tag"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "meal_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_tags: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      meal_variants: {
        Row: {
          available: boolean
          calories_adjustment: number | null
          created_at: string
          display_order: number | null
          id: string
          meal_id: string
          name: string
          price_multiplier: number
          size_multiplier: number
        }
        Insert: {
          available?: boolean
          calories_adjustment?: number | null
          created_at?: string
          display_order?: number | null
          id?: string
          meal_id: string
          name: string
          price_multiplier?: number
          size_multiplier?: number
        }
        Update: {
          available?: boolean
          calories_adjustment?: number | null
          created_at?: string
          display_order?: number | null
          id?: string
          meal_id?: string
          name?: string
          price_multiplier?: number
          size_multiplier?: number
        }
        Relationships: [
          {
            foreignKeyName: "meal_variants_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_variants_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals_with_details"
            referencedColumns: ["id"]
          },
        ]
      }
      meals: {
        Row: {
          active: boolean
          allergens: string[] | null
          availability_end_date: string | null
          availability_start_date: string | null
          badge: string | null
          base_recipe: boolean | null
          calories_per_serving: number | null
          carbs: string
          carbs_grams: number | null
          category: string
          category_id: string | null
          created_at: string
          description: string
          dietary_restrictions: string[] | null
          difficulty_level: number | null
          fat_grams: number | null
          id: string
          image_url: string | null
          meat: string
          name: string
          premium: boolean
          preparation_time_minutes: number | null
          protein_grams: number | null
          serving_size: string | null
          updated_at: string
          vegetables: string
        }
        Insert: {
          active?: boolean
          allergens?: string[] | null
          availability_end_date?: string | null
          availability_start_date?: string | null
          badge?: string | null
          base_recipe?: boolean | null
          calories_per_serving?: number | null
          carbs: string
          carbs_grams?: number | null
          category: string
          category_id?: string | null
          created_at?: string
          description: string
          dietary_restrictions?: string[] | null
          difficulty_level?: number | null
          fat_grams?: number | null
          id?: string
          image_url?: string | null
          meat: string
          name: string
          premium?: boolean
          preparation_time_minutes?: number | null
          protein_grams?: number | null
          serving_size?: string | null
          updated_at?: string
          vegetables: string
        }
        Update: {
          active?: boolean
          allergens?: string[] | null
          availability_end_date?: string | null
          availability_start_date?: string | null
          badge?: string | null
          base_recipe?: boolean | null
          calories_per_serving?: number | null
          carbs?: string
          carbs_grams?: number | null
          category?: string
          category_id?: string | null
          created_at?: string
          description?: string
          dietary_restrictions?: string[] | null
          difficulty_level?: number | null
          fat_grams?: number | null
          id?: string
          image_url?: string | null
          meat?: string
          name?: string
          premium?: boolean
          preparation_time_minutes?: number | null
          protein_grams?: number | null
          serving_size?: string | null
          updated_at?: string
          vegetables?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_meals_category"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "meal_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      nutrition_profiles: {
        Row: {
          calories_per_100g: number | null
          carbs_per_100g: number | null
          created_at: string
          description: string | null
          fat_per_100g: number | null
          fiber_per_100g: number | null
          id: string
          name: string
          protein_per_100g: number | null
          sodium_mg_per_100g: number | null
          sugar_per_100g: number | null
        }
        Insert: {
          calories_per_100g?: number | null
          carbs_per_100g?: number | null
          created_at?: string
          description?: string | null
          fat_per_100g?: number | null
          fiber_per_100g?: number | null
          id?: string
          name: string
          protein_per_100g?: number | null
          sodium_mg_per_100g?: number | null
          sugar_per_100g?: number | null
        }
        Update: {
          calories_per_100g?: number | null
          carbs_per_100g?: number | null
          created_at?: string
          description?: string | null
          fat_per_100g?: number | null
          fiber_per_100g?: number | null
          id?: string
          name?: string
          protein_per_100g?: number | null
          sodium_mg_per_100g?: number | null
          sugar_per_100g?: number | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          meal_id: string
          meal_variant_id: string | null
          order_id: string
          quantity: number
          special_instructions: string | null
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          meal_id: string
          meal_variant_id?: string | null
          order_id: string
          quantity?: number
          special_instructions?: string | null
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          meal_id?: string
          meal_variant_id?: string | null
          order_id?: string
          quantity?: number
          special_instructions?: string | null
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals_with_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_meal_variant_id_fkey"
            columns: ["meal_variant_id"]
            isOneToOne: false
            referencedRelation: "meal_variants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          actual_delivery_time: string | null
          created_at: string
          delivered_at: string | null
          delivery_address_id: string | null
          delivery_date: string | null
          delivery_fee: number
          delivery_instructions: string | null
          delivery_time_slot: string | null
          discount_amount: number
          dispatched_at: string | null
          estimated_delivery_time: string | null
          gift_message: string | null
          id: string
          order_number: string
          order_type: string
          payment_intent_id: string | null
          prepared_at: string | null
          promotional_code: string | null
          special_instructions: string | null
          status: Database["public"]["Enums"]["order_status"]
          subscription_id: string | null
          subtotal: number
          tax_amount: number
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          actual_delivery_time?: string | null
          created_at?: string
          delivered_at?: string | null
          delivery_address_id?: string | null
          delivery_date?: string | null
          delivery_fee?: number
          delivery_instructions?: string | null
          delivery_time_slot?: string | null
          discount_amount?: number
          dispatched_at?: string | null
          estimated_delivery_time?: string | null
          gift_message?: string | null
          id?: string
          order_number: string
          order_type?: string
          payment_intent_id?: string | null
          prepared_at?: string | null
          promotional_code?: string | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          subscription_id?: string | null
          subtotal?: number
          tax_amount?: number
          total_amount?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          actual_delivery_time?: string | null
          created_at?: string
          delivered_at?: string | null
          delivery_address_id?: string | null
          delivery_date?: string | null
          delivery_fee?: number
          delivery_instructions?: string | null
          delivery_time_slot?: string | null
          discount_amount?: number
          dispatched_at?: string | null
          estimated_delivery_time?: string | null
          gift_message?: string | null
          id?: string
          order_number?: string
          order_type?: string
          payment_intent_id?: string | null
          prepared_at?: string | null
          promotional_code?: string | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          subscription_id?: string | null
          subtotal?: number
          tax_amount?: number
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_delivery_address_id_fkey"
            columns: ["delivery_address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "user_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          active: boolean
          billing_address: Json | null
          brand: string | null
          created_at: string
          exp_month: number | null
          exp_year: number | null
          id: string
          is_default: boolean
          last_four: string | null
          stripe_payment_method_id: string | null
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          active?: boolean
          billing_address?: Json | null
          brand?: string | null
          created_at?: string
          exp_month?: number | null
          exp_year?: number | null
          id?: string
          is_default?: boolean
          last_four?: string | null
          stripe_payment_method_id?: string | null
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          active?: boolean
          billing_address?: Json | null
          brand?: string | null
          created_at?: string
          exp_month?: number | null
          exp_year?: number | null
          id?: string
          is_default?: boolean
          last_four?: string | null
          stripe_payment_method_id?: string | null
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payment_transactions: {
        Row: {
          amount: number
          created_at: string
          currency: string
          failure_reason: string | null
          fees: number | null
          id: string
          net_amount: number | null
          order_id: string | null
          payment_method_id: string | null
          payment_type: string
          processed_at: string | null
          refund_reason: string | null
          status: string
          stripe_payment_intent_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          failure_reason?: string | null
          fees?: number | null
          id?: string
          net_amount?: number | null
          order_id?: string | null
          payment_method_id?: string | null
          payment_type: string
          processed_at?: string | null
          refund_reason?: string | null
          status: string
          stripe_payment_intent_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          failure_reason?: string | null
          fees?: number | null
          id?: string
          net_amount?: number | null
          order_id?: string | null
          payment_method_id?: string | null
          payment_type?: string
          processed_at?: string | null
          refund_reason?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_transactions_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
        ]
      }
      production_batches: {
        Row: {
          actual_quantity: number | null
          assigned_cook_id: string | null
          batch_number: string
          created_at: string
          end_time: string | null
          id: string
          meal_id: string
          notes: string | null
          planned_quantity: number
          production_date: string
          quality_score: number | null
          start_time: string | null
          status: string
          total_cost: number | null
          updated_at: string
          waste_quantity: number | null
        }
        Insert: {
          actual_quantity?: number | null
          assigned_cook_id?: string | null
          batch_number: string
          created_at?: string
          end_time?: string | null
          id?: string
          meal_id: string
          notes?: string | null
          planned_quantity: number
          production_date: string
          quality_score?: number | null
          start_time?: string | null
          status?: string
          total_cost?: number | null
          updated_at?: string
          waste_quantity?: number | null
        }
        Update: {
          actual_quantity?: number | null
          assigned_cook_id?: string | null
          batch_number?: string
          created_at?: string
          end_time?: string | null
          id?: string
          meal_id?: string
          notes?: string | null
          planned_quantity?: number
          production_date?: string
          quality_score?: number | null
          start_time?: string | null
          status?: string
          total_cost?: number | null
          updated_at?: string
          waste_quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "production_batches_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "production_batches_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals_with_details"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          activity_level: string | null
          allergens: string[] | null
          avatar_url: string | null
          created_at: string
          date_of_birth: string | null
          dietary_preferences: string[] | null
          email: string
          email_notifications: boolean | null
          first_name: string
          fitness_goals: string[] | null
          height_cm: number | null
          id: string
          last_login_at: string | null
          last_name: string
          marketing_consent: boolean | null
          phone: string | null
          privacy_consent: boolean | null
          sms_notifications: boolean | null
          status: string | null
          target_weight_kg: number | null
          terms_accepted_at: string | null
          updated_at: string
          user_id: string
          weight_kg: number | null
        }
        Insert: {
          activity_level?: string | null
          allergens?: string[] | null
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          dietary_preferences?: string[] | null
          email: string
          email_notifications?: boolean | null
          first_name: string
          fitness_goals?: string[] | null
          height_cm?: number | null
          id?: string
          last_login_at?: string | null
          last_name: string
          marketing_consent?: boolean | null
          phone?: string | null
          privacy_consent?: boolean | null
          sms_notifications?: boolean | null
          status?: string | null
          target_weight_kg?: number | null
          terms_accepted_at?: string | null
          updated_at?: string
          user_id: string
          weight_kg?: number | null
        }
        Update: {
          activity_level?: string | null
          allergens?: string[] | null
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          dietary_preferences?: string[] | null
          email?: string
          email_notifications?: boolean | null
          first_name?: string
          fitness_goals?: string[] | null
          height_cm?: number | null
          id?: string
          last_login_at?: string | null
          last_name?: string
          marketing_consent?: boolean | null
          phone?: string | null
          privacy_consent?: boolean | null
          sms_notifications?: boolean | null
          status?: string | null
          target_weight_kg?: number | null
          terms_accepted_at?: string | null
          updated_at?: string
          user_id?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      regions: {
        Row: {
          active: boolean
          code: string
          country_code: string
          created_at: string
          delivery_fee: number
          id: string
          minimum_order: number
          name: string
          timezone: string
        }
        Insert: {
          active?: boolean
          code: string
          country_code?: string
          created_at?: string
          delivery_fee?: number
          id?: string
          minimum_order?: number
          name: string
          timezone?: string
        }
        Update: {
          active?: boolean
          code?: string
          country_code?: string
          created_at?: string
          delivery_fee?: number
          id?: string
          minimum_order?: number
          name?: string
          timezone?: string
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          active: boolean
          created_at: string
          delivery_frequency: string
          description: string
          discount_percentage: number | null
          display_order: number | null
          features: Json | null
          id: string
          meals_quantity: number
          minimum_commitment_weeks: number | null
          name: string
          price_per_meal: number
          promoted: boolean
          target_category: string[] | null
          total_price: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          delivery_frequency: string
          description: string
          discount_percentage?: number | null
          display_order?: number | null
          features?: Json | null
          id?: string
          meals_quantity: number
          minimum_commitment_weeks?: number | null
          name: string
          price_per_meal: number
          promoted?: boolean
          target_category?: string[] | null
          total_price: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          delivery_frequency?: string
          description?: string
          discount_percentage?: number | null
          display_order?: number | null
          features?: Json | null
          id?: string
          meals_quantity?: number
          minimum_commitment_weeks?: number | null
          name?: string
          price_per_meal?: number
          promoted?: boolean
          target_category?: string[] | null
          total_price?: number
          updated_at?: string
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          active: boolean
          address: Json | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          id: string
          name: string
          payment_terms: string | null
          quality_rating: number | null
          reliability_rating: number | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          address?: Json | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          name: string
          payment_terms?: string | null
          quality_rating?: number | null
          reliability_rating?: number | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          address?: Json | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          name?: string
          payment_terms?: string | null
          quality_rating?: number | null
          reliability_rating?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      support_categories: {
        Row: {
          active: boolean
          auto_response_template: string | null
          created_at: string
          description: string | null
          escalation_threshold_hours: number | null
          id: string
          name: string
          priority_level: number
        }
        Insert: {
          active?: boolean
          auto_response_template?: string | null
          created_at?: string
          description?: string | null
          escalation_threshold_hours?: number | null
          id?: string
          name: string
          priority_level?: number
        }
        Update: {
          active?: boolean
          auto_response_template?: string | null
          created_at?: string
          description?: string | null
          escalation_threshold_hours?: number | null
          id?: string
          name?: string
          priority_level?: number
        }
        Relationships: []
      }
      support_messages: {
        Row: {
          attachments: Json | null
          created_at: string
          id: string
          internal: boolean
          message: string
          message_type: string
          sender_id: string
          ticket_id: string
        }
        Insert: {
          attachments?: Json | null
          created_at?: string
          id?: string
          internal?: boolean
          message: string
          message_type?: string
          sender_id: string
          ticket_id: string
        }
        Update: {
          attachments?: Json | null
          created_at?: string
          id?: string
          internal?: boolean
          message?: string
          message_type?: string
          sender_id?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          category_id: string | null
          closed_at: string | null
          created_at: string
          description: string
          id: string
          order_id: string | null
          priority: string
          resolution: string | null
          resolved_at: string | null
          satisfaction_rating: number | null
          status: string
          subject: string
          ticket_number: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_to?: string | null
          category_id?: string | null
          closed_at?: string | null
          created_at?: string
          description: string
          id?: string
          order_id?: string | null
          priority?: string
          resolution?: string | null
          resolved_at?: string | null
          satisfaction_rating?: number | null
          status?: string
          subject: string
          ticket_number: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_to?: string | null
          category_id?: string | null
          closed_at?: string | null
          created_at?: string
          description?: string
          id?: string
          order_id?: string | null
          priority?: string
          resolution?: string | null
          resolved_at?: string | null
          satisfaction_rating?: number | null
          status?: string
          subject?: string
          ticket_number?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "support_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          active: boolean
          assigned_at: string
          assigned_by: string | null
          expires_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          active?: boolean
          assigned_at?: string
          assigned_by?: string | null
          expires_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          active?: boolean
          assigned_at?: string
          assigned_by?: string | null
          expires_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          auto_renew: boolean
          cancellation_date: string | null
          cancellation_reason: string | null
          created_at: string
          end_date: string | null
          id: string
          next_delivery_date: string | null
          pause_until_date: string | null
          plan_id: string
          special_instructions: string | null
          start_date: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_renew?: boolean
          cancellation_date?: string | null
          cancellation_reason?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          next_delivery_date?: string | null
          pause_until_date?: string | null
          plan_id: string
          special_instructions?: string | null
          start_date: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_renew?: boolean
          cancellation_date?: string | null
          cancellation_reason?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          next_delivery_date?: string | null
          pause_until_date?: string | null
          plan_id?: string
          special_instructions?: string | null
          start_date?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      meals_with_details: {
        Row: {
          active: boolean | null
          allergens: string[] | null
          availability_end_date: string | null
          availability_start_date: string | null
          badge: string | null
          calories_per_serving: number | null
          carbs: string | null
          carbs_grams: number | null
          category: string | null
          category_color: string | null
          category_id: string | null
          category_name: string | null
          created_at: string | null
          description: string | null
          dietary_restrictions: string[] | null
          difficulty_level: number | null
          fat_grams: number | null
          id: string | null
          image_url: string | null
          ingredients: Json | null
          meat: string | null
          name: string | null
          premium: boolean | null
          preparation_time_minutes: number | null
          protein_grams: number | null
          serving_size: string | null
          tags: Json | null
          updated_at: string | null
          vegetables: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_meals_category"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "meal_categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["user_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_or_owner: {
        Args: { _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      order_status:
        | "draft"
        | "confirmed"
        | "preparing"
        | "ready"
        | "out_for_delivery"
        | "delivered"
        | "cancelled"
        | "refunded"
        | "failed"
      user_role:
        | "customer"
        | "admin"
        | "cook"
        | "delivery_driver"
        | "owner"
        | "support"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      order_status: [
        "draft",
        "confirmed",
        "preparing",
        "ready",
        "out_for_delivery",
        "delivered",
        "cancelled",
        "refunded",
        "failed",
      ],
      user_role: [
        "customer",
        "admin",
        "cook",
        "delivery_driver",
        "owner",
        "support",
      ],
    },
  },
} as const
