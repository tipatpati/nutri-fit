export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ingredients: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          id: string
          name: string
          nutritional_info: Json | null
          type: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          name: string
          nutritional_info?: Json | null
          type: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          nutritional_info?: Json | null
          type?: string
          updated_at?: string
        }
        Relationships: []
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
          created_at: string
          id: string
          ingredient_id: string
          is_primary: boolean
          meal_id: string
          preparation_method: string | null
          quantity: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          ingredient_id: string
          is_primary?: boolean
          meal_id: string
          preparation_method?: string | null
          quantity?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          ingredient_id?: string
          is_primary?: boolean
          meal_id?: string
          preparation_method?: string | null
          quantity?: string | null
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
      meals: {
        Row: {
          active: boolean
          allergens: string[] | null
          availability_end_date: string | null
          availability_start_date: string | null
          badge: string | null
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
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
