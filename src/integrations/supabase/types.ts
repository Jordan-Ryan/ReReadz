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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          achievement_description: string | null
          achievement_name: string
          achievement_type: string
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          icon: string | null
          id: string
          progress: number | null
          target: number
          tier: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          achievement_description?: string | null
          achievement_name: string
          achievement_type: string
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          progress?: number | null
          target: number
          tier?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          achievement_description?: string | null
          achievement_name?: string
          achievement_type?: string
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          progress?: number | null
          target?: number
          tier?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      addresses: {
        Row: {
          city: string
          country: string
          county: string | null
          created_at: string
          deleted_at: string | null
          full_name: string
          id: string
          is_default: boolean
          line1: string
          line2: string | null
          phone: string | null
          postcode: string
          updated_at: string
          user_id: string
        }
        Insert: {
          city: string
          country?: string
          county?: string | null
          created_at?: string
          deleted_at?: string | null
          full_name: string
          id?: string
          is_default?: boolean
          line1: string
          line2?: string | null
          phone?: string | null
          postcode: string
          updated_at?: string
          user_id: string
        }
        Update: {
          city?: string
          country?: string
          county?: string | null
          created_at?: string
          deleted_at?: string | null
          full_name?: string
          id?: string
          is_default?: boolean
          line1?: string
          line2?: string | null
          phone?: string | null
          postcode?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      admin_audit_events: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          entity_id: string | null
          entity_type: string
          from_data: Json | null
          id: string
          ip_address: unknown
          session_id: string | null
          to_data: Json | null
          user_agent: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          from_data?: Json | null
          id?: string
          ip_address?: unknown
          session_id?: string | null
          to_data?: Json | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          from_data?: Json | null
          id?: string
          ip_address?: unknown
          session_id?: string | null
          to_data?: Json | null
          user_agent?: string | null
        }
        Relationships: []
      }
      admin_audit_log: {
        Row: {
          action: string
          admin_id: string
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          new_values: Json | null
          previous_values: Json | null
          reason: string | null
        }
        Insert: {
          action: string
          admin_id: string
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          new_values?: Json | null
          previous_values?: Json | null
          reason?: string | null
        }
        Update: {
          action?: string
          admin_id?: string
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          new_values?: Json | null
          previous_values?: Json | null
          reason?: string | null
        }
        Relationships: []
      }
      admin_kpi_cache: {
        Row: {
          calculated_at: string
          expires_at: string
          id: string
          metadata: Json | null
          metric_key: string
          period: string
          value: number | null
        }
        Insert: {
          calculated_at?: string
          expires_at: string
          id?: string
          metadata?: Json | null
          metric_key: string
          period: string
          value?: number | null
        }
        Update: {
          calculated_at?: string
          expires_at?: string
          id?: string
          metadata?: Json | null
          metric_key?: string
          period?: string
          value?: number | null
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          admin_role: Database["public"]["Enums"]["admin_role"]
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_role?: Database["public"]["Enums"]["admin_role"]
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_role?: Database["public"]["Enums"]["admin_role"]
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          anon_key: string | null
          created_at: string
          id: string
          ip_trunc: string | null
          listing_id: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          anon_key?: string | null
          created_at?: string
          id?: string
          ip_trunc?: string | null
          listing_id?: string | null
          type: string
          user_id?: string | null
        }
        Update: {
          anon_key?: string | null
          created_at?: string
          id?: string
          ip_trunc?: string | null
          listing_id?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      app_launch_signups: {
        Row: {
          created_at: string
          email: string
          id: string
          source: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          source?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          source?: string | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          ip: string | null
          metadata: Json | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip?: string | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip?: string | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      blog_articles: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string
          created_by: string | null
          excerpt: string
          featured_image_url: string | null
          id: string
          is_featured: boolean
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          read_time: number
          slug: string
          status: string
          tags: string[]
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          author?: string
          category: string
          content: string
          created_at?: string
          created_by?: string | null
          excerpt: string
          featured_image_url?: string | null
          id?: string
          is_featured?: boolean
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          read_time?: number
          slug: string
          status?: string
          tags?: string[]
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          created_by?: string | null
          excerpt?: string
          featured_image_url?: string | null
          id?: string
          is_featured?: boolean
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          read_time?: number
          slug?: string
          status?: string
          tags?: string[]
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon_name: string | null
          id: string
          is_active: boolean
          name: string
          slug: string
          sort_order: number
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          is_active?: boolean
          name: string
          slug: string
          sort_order?: number
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      book_club_reads: {
        Row: {
          author: string | null
          book_club_id: string
          cover_url: string | null
          created_at: string | null
          discussion_date: string | null
          id: string
          is_current: boolean | null
          isbn: string | null
          notes: string | null
          title: string
        }
        Insert: {
          author?: string | null
          book_club_id: string
          cover_url?: string | null
          created_at?: string | null
          discussion_date?: string | null
          id?: string
          is_current?: boolean | null
          isbn?: string | null
          notes?: string | null
          title: string
        }
        Update: {
          author?: string | null
          book_club_id?: string
          cover_url?: string | null
          created_at?: string | null
          discussion_date?: string | null
          id?: string
          is_current?: boolean | null
          isbn?: string | null
          notes?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_club_reads_book_club_id_fkey"
            columns: ["book_club_id"]
            isOneToOne: false
            referencedRelation: "book_clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      book_clubs: {
        Row: {
          age_range: string | null
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          frequency: Database["public"]["Enums"]["book_club_frequency"]
          genres: string[] | null
          how_to_join: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          latitude: number | null
          location_city: string | null
          location_name: string | null
          location_postcode: string | null
          longitude: number | null
          max_members: number | null
          meeting_day: string | null
          meeting_time: string | null
          meeting_type: Database["public"]["Enums"]["book_club_meeting_type"]
          member_count: number | null
          name: string
          online_platform: string | null
          organizer_id: string
          tagline: string | null
          updated_at: string | null
          vibe_tags: string[] | null
        }
        Insert: {
          age_range?: string | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          frequency?: Database["public"]["Enums"]["book_club_frequency"]
          genres?: string[] | null
          how_to_join?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          latitude?: number | null
          location_city?: string | null
          location_name?: string | null
          location_postcode?: string | null
          longitude?: number | null
          max_members?: number | null
          meeting_day?: string | null
          meeting_time?: string | null
          meeting_type?: Database["public"]["Enums"]["book_club_meeting_type"]
          member_count?: number | null
          name: string
          online_platform?: string | null
          organizer_id: string
          tagline?: string | null
          updated_at?: string | null
          vibe_tags?: string[] | null
        }
        Update: {
          age_range?: string | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          frequency?: Database["public"]["Enums"]["book_club_frequency"]
          genres?: string[] | null
          how_to_join?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          latitude?: number | null
          location_city?: string | null
          location_name?: string | null
          location_postcode?: string | null
          longitude?: number | null
          max_members?: number | null
          meeting_day?: string | null
          meeting_time?: string | null
          meeting_type?: Database["public"]["Enums"]["book_club_meeting_type"]
          member_count?: number | null
          name?: string
          online_platform?: string | null
          organizer_id?: string
          tagline?: string | null
          updated_at?: string | null
          vibe_tags?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "book_clubs_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_clubs_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "public_seller_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      book_condition_assessments: {
        Row: {
          ai_condition_score: number | null
          ai_confidence_score: number | null
          ai_detected_issues: string[] | null
          created_at: string | null
          created_by: string | null
          id: string
          image_url: string
          listing_id: string | null
          manual_override_condition: string | null
          suggested_condition: string | null
          updated_at: string | null
        }
        Insert: {
          ai_condition_score?: number | null
          ai_confidence_score?: number | null
          ai_detected_issues?: string[] | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          image_url: string
          listing_id?: string | null
          manual_override_condition?: string | null
          suggested_condition?: string | null
          updated_at?: string | null
        }
        Update: {
          ai_condition_score?: number | null
          ai_confidence_score?: number | null
          ai_detected_issues?: string[] | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          image_url?: string
          listing_id?: string | null
          manual_override_condition?: string | null
          suggested_condition?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "book_condition_assessments_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_condition_assessments_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      book_images: {
        Row: {
          created_at: string
          height: number | null
          id: string
          is_primary: boolean
          listing_id: string
          metadata: Json
          placeholder_base64: string | null
          position: number
          size_bytes: number | null
          url: string
          width: number | null
        }
        Insert: {
          created_at?: string
          height?: number | null
          id?: string
          is_primary?: boolean
          listing_id: string
          metadata?: Json
          placeholder_base64?: string | null
          position?: number
          size_bytes?: number | null
          url: string
          width?: number | null
        }
        Update: {
          created_at?: string
          height?: number | null
          id?: string
          is_primary?: boolean
          listing_id?: string
          metadata?: Json
          placeholder_base64?: string | null
          position?: number
          size_bytes?: number | null
          url?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "book_images_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_images_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      book_listing_categories: {
        Row: {
          category_id: string
          created_at: string
          id: string
          is_primary: boolean
          listing_id: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          is_primary?: boolean
          listing_id: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          is_primary?: boolean
          listing_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_listing_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_listing_categories_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_listing_categories_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      book_listings: {
        Row: {
          active: boolean
          author: string | null
          category_id: string | null
          charity_id: string | null
          condition: Database["public"]["Enums"]["book_condition"]
          condition_notes: string | null
          created_at: string
          currency: string
          defects: string | null
          deleted_at: string | null
          description: string | null
          edition: string | null
          external_rating_avg: number | null
          external_rating_count: number | null
          external_rating_source: string | null
          external_rating_updated_at: string | null
          format: Database["public"]["Enums"]["book_format"]
          genre_id: string | null
          id: string
          is_promoted: boolean | null
          is_staff_pick: boolean | null
          isbn10: string | null
          isbn13: string | null
          language: string | null
          location_city: string | null
          location_postcode: string | null
          package_weight_g: number | null
          price_includes_vat: boolean
          price_minor: number
          primary_image_url: string | null
          promoted_until: string | null
          promotion_tier: string | null
          published_at: string | null
          quantity: number
          reading_moods: string[] | null
          removed_reason: string | null
          seller_id: string
          seller_notes: string | null
          shipping_option: Database["public"]["Enums"]["shipping_option"]
          sku: string | null
          slug: string | null
          staff_pick_added_at: string | null
          staff_pick_rank: number | null
          status: Database["public"]["Enums"]["listing_status"]
          tags: string[]
          title: string
          updated_at: string
          views: number
          views_14d: number
          views_24h: number
        }
        Insert: {
          active?: boolean
          author?: string | null
          category_id?: string | null
          charity_id?: string | null
          condition: Database["public"]["Enums"]["book_condition"]
          condition_notes?: string | null
          created_at?: string
          currency?: string
          defects?: string | null
          deleted_at?: string | null
          description?: string | null
          edition?: string | null
          external_rating_avg?: number | null
          external_rating_count?: number | null
          external_rating_source?: string | null
          external_rating_updated_at?: string | null
          format: Database["public"]["Enums"]["book_format"]
          genre_id?: string | null
          id?: string
          is_promoted?: boolean | null
          is_staff_pick?: boolean | null
          isbn10?: string | null
          isbn13?: string | null
          language?: string | null
          location_city?: string | null
          location_postcode?: string | null
          package_weight_g?: number | null
          price_includes_vat?: boolean
          price_minor: number
          primary_image_url?: string | null
          promoted_until?: string | null
          promotion_tier?: string | null
          published_at?: string | null
          quantity?: number
          reading_moods?: string[] | null
          removed_reason?: string | null
          seller_id: string
          seller_notes?: string | null
          shipping_option?: Database["public"]["Enums"]["shipping_option"]
          sku?: string | null
          slug?: string | null
          staff_pick_added_at?: string | null
          staff_pick_rank?: number | null
          status?: Database["public"]["Enums"]["listing_status"]
          tags?: string[]
          title: string
          updated_at?: string
          views?: number
          views_14d?: number
          views_24h?: number
        }
        Update: {
          active?: boolean
          author?: string | null
          category_id?: string | null
          charity_id?: string | null
          condition?: Database["public"]["Enums"]["book_condition"]
          condition_notes?: string | null
          created_at?: string
          currency?: string
          defects?: string | null
          deleted_at?: string | null
          description?: string | null
          edition?: string | null
          external_rating_avg?: number | null
          external_rating_count?: number | null
          external_rating_source?: string | null
          external_rating_updated_at?: string | null
          format?: Database["public"]["Enums"]["book_format"]
          genre_id?: string | null
          id?: string
          is_promoted?: boolean | null
          is_staff_pick?: boolean | null
          isbn10?: string | null
          isbn13?: string | null
          language?: string | null
          location_city?: string | null
          location_postcode?: string | null
          package_weight_g?: number | null
          price_includes_vat?: boolean
          price_minor?: number
          primary_image_url?: string | null
          promoted_until?: string | null
          promotion_tier?: string | null
          published_at?: string | null
          quantity?: number
          reading_moods?: string[] | null
          removed_reason?: string | null
          seller_id?: string
          seller_notes?: string | null
          shipping_option?: Database["public"]["Enums"]["shipping_option"]
          sku?: string | null
          slug?: string | null
          staff_pick_added_at?: string | null
          staff_pick_rank?: number | null
          status?: Database["public"]["Enums"]["listing_status"]
          tags?: string[]
          title?: string
          updated_at?: string
          views?: number
          views_14d?: number
          views_24h?: number
        }
        Relationships: [
          {
            foreignKeyName: "book_listings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_listings_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_listings_genre_id_fkey"
            columns: ["genre_id"]
            isOneToOne: false
            referencedRelation: "genres"
            referencedColumns: ["id"]
          },
        ]
      }
      book_recommendations: {
        Row: {
          created_at: string | null
          id: string
          listing_id: string
          reason: string | null
          recommended_to_id: string
          recommender_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          listing_id: string
          reason?: string | null
          recommended_to_id: string
          recommender_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          listing_id?: string
          reason?: string | null
          recommended_to_id?: string
          recommender_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      book_signings: {
        Row: {
          address_full: string
          author: string
          blurb: string | null
          created_at: string
          created_by: string | null
          hide_after: string
          id: string
          image_url: string | null
          latitude: number
          location_name: string
          longitude: number
          priority: number
          radius_miles: number
          show_from: string
          status: string
          time_from: string
          time_to: string
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          address_full: string
          author: string
          blurb?: string | null
          created_at?: string
          created_by?: string | null
          hide_after: string
          id?: string
          image_url?: string | null
          latitude: number
          location_name: string
          longitude: number
          priority?: number
          radius_miles?: number
          show_from: string
          status?: string
          time_from: string
          time_to: string
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          address_full?: string
          author?: string
          blurb?: string | null
          created_at?: string
          created_by?: string | null
          hide_after?: string
          id?: string
          image_url?: string | null
          latitude?: number
          location_name?: string
          longitude?: number
          priority?: number
          radius_miles?: number
          show_from?: string
          status?: string
          time_from?: string
          time_to?: string
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      book_similarities: {
        Row: {
          based_on: string
          created_at: string | null
          id: string
          listing_id_a: string
          listing_id_b: string
          similarity_score: number
          updated_at: string | null
        }
        Insert: {
          based_on: string
          created_at?: string | null
          id?: string
          listing_id_a: string
          listing_id_b: string
          similarity_score: number
          updated_at?: string | null
        }
        Update: {
          based_on?: string
          created_at?: string | null
          id?: string
          listing_id_a?: string
          listing_id_b?: string
          similarity_score?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      books: {
        Row: {
          author: string
          available: boolean | null
          category: string | null
          condition: string | null
          cover_url: string | null
          created_at: string | null
          description: string | null
          embedding: string | null
          format: string | null
          id: string
          isbn: string | null
          price_cents: number | null
          seller_id: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author: string
          available?: boolean | null
          category?: string | null
          condition?: string | null
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          embedding?: string | null
          format?: string | null
          id?: string
          isbn?: string | null
          price_cents?: number | null
          seller_id?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string
          available?: boolean | null
          category?: string | null
          condition?: string | null
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          embedding?: string | null
          format?: string | null
          id?: string
          isbn?: string | null
          price_cents?: number | null
          seller_id?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      bookshelf_review_helpful_votes: {
        Row: {
          created_at: string | null
          id: string
          review_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          review_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          review_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookshelf_review_helpful_votes_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "bookshelf_reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      bookshelf_reviews: {
        Row: {
          created_at: string | null
          helpful_count: number | null
          id: string
          listing_id: string
          rating: number
          review_text: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          listing_id: string
          rating: number
          review_text?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          listing_id?: string
          rating?: number
          review_text?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookshelf_reviews_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookshelf_reviews_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookshelves: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          name: string
          shelf_type: Database["public"]["Enums"]["shelf_type"]
          sort_order: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          name: string
          shelf_type?: Database["public"]["Enums"]["shelf_type"]
          sort_order?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          name?: string
          shelf_type?: Database["public"]["Enums"]["shelf_type"]
          sort_order?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bulk_job_items: {
        Row: {
          api_author: string | null
          api_cover_url: string | null
          api_title: string | null
          author: string | null
          bulk_job_id: string
          category_id: string | null
          charity_sku: string | null
          condition: string | null
          created_at: string
          description: string | null
          error_message: string | null
          format: string | null
          genre: string | null
          genre_id: string | null
          id: string
          is_draft: boolean | null
          isbn: string | null
          listing_id: string | null
          postage_option: string | null
          price_gbp: number | null
          processed_at: string | null
          quantity: number | null
          row_number: number
          status: string
          tags: string[] | null
          title: string | null
        }
        Insert: {
          api_author?: string | null
          api_cover_url?: string | null
          api_title?: string | null
          author?: string | null
          bulk_job_id: string
          category_id?: string | null
          charity_sku?: string | null
          condition?: string | null
          created_at?: string
          description?: string | null
          error_message?: string | null
          format?: string | null
          genre?: string | null
          genre_id?: string | null
          id?: string
          is_draft?: boolean | null
          isbn?: string | null
          listing_id?: string | null
          postage_option?: string | null
          price_gbp?: number | null
          processed_at?: string | null
          quantity?: number | null
          row_number: number
          status?: string
          tags?: string[] | null
          title?: string | null
        }
        Update: {
          api_author?: string | null
          api_cover_url?: string | null
          api_title?: string | null
          author?: string | null
          bulk_job_id?: string
          category_id?: string | null
          charity_sku?: string | null
          condition?: string | null
          created_at?: string
          description?: string | null
          error_message?: string | null
          format?: string | null
          genre?: string | null
          genre_id?: string | null
          id?: string
          is_draft?: boolean | null
          isbn?: string | null
          listing_id?: string | null
          postage_option?: string | null
          price_gbp?: number | null
          processed_at?: string | null
          quantity?: number | null
          row_number?: number
          status?: string
          tags?: string[] | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bulk_job_items_bulk_job_id_fkey"
            columns: ["bulk_job_id"]
            isOneToOne: false
            referencedRelation: "bulk_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bulk_job_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bulk_job_items_genre_id_fkey"
            columns: ["genre_id"]
            isOneToOne: false
            referencedRelation: "genres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bulk_job_items_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bulk_job_items_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      bulk_jobs: {
        Row: {
          charity_id: string
          completed_at: string | null
          created_at: string
          created_by: string
          error_count: number
          error_summary: Json | null
          filename: string
          id: string
          processed_rows: number
          started_at: string
          status: string
          success_count: number
          total_rows: number
          updated_at: string
        }
        Insert: {
          charity_id: string
          completed_at?: string | null
          created_at?: string
          created_by: string
          error_count?: number
          error_summary?: Json | null
          filename: string
          id?: string
          processed_rows?: number
          started_at?: string
          status?: string
          success_count?: number
          total_rows?: number
          updated_at?: string
        }
        Update: {
          charity_id?: string
          completed_at?: string | null
          created_at?: string
          created_by?: string
          error_count?: number
          error_summary?: Json | null
          filename?: string
          id?: string
          processed_rows?: number
          started_at?: string
          status?: string
          success_count?: number
          total_rows?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bulk_jobs_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
        ]
      }
      bundle_analytics: {
        Row: {
          bundle_id: string | null
          created_at: string
          discount_minor: number | null
          event_type: string
          id: string
          items_count: number | null
          subtotal_minor: number | null
          total_minor: number | null
        }
        Insert: {
          bundle_id?: string | null
          created_at?: string
          discount_minor?: number | null
          event_type: string
          id?: string
          items_count?: number | null
          subtotal_minor?: number | null
          total_minor?: number | null
        }
        Update: {
          bundle_id?: string | null
          created_at?: string
          discount_minor?: number | null
          event_type?: string
          id?: string
          items_count?: number | null
          subtotal_minor?: number | null
          total_minor?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bundle_analytics_bundle_id_fkey"
            columns: ["bundle_id"]
            isOneToOne: false
            referencedRelation: "bundle_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      bundle_deal_items: {
        Row: {
          bundle_id: string
          created_at: string
          id: string
          listing_id: string
        }
        Insert: {
          bundle_id: string
          created_at?: string
          id?: string
          listing_id: string
        }
        Update: {
          bundle_id?: string
          created_at?: string
          id?: string
          listing_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bundle_deal_items_bundle_id_fkey"
            columns: ["bundle_id"]
            isOneToOne: false
            referencedRelation: "bundle_deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bundle_deal_items_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bundle_deal_items_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      bundle_deals: {
        Row: {
          active: boolean | null
          created_at: string
          description: string | null
          discount_percentage: number
          id: string
          max_items: number | null
          min_items: number
          seller_id: string
          title: string
          updated_at: string
          valid_until: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          description?: string | null
          discount_percentage: number
          id?: string
          max_items?: number | null
          min_items?: number
          seller_id: string
          title: string
          updated_at?: string
          valid_until?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string
          description?: string | null
          discount_percentage?: number
          id?: string
          max_items?: number | null
          min_items?: number
          seller_id?: string
          title?: string
          updated_at?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bundle_deals_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bundle_deals_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "public_seller_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bundle_items: {
        Row: {
          bundle_id: string
          created_at: string
          id: string
          listing_id: string
          price_snapshot: number
        }
        Insert: {
          bundle_id: string
          created_at?: string
          id?: string
          listing_id: string
          price_snapshot: number
        }
        Update: {
          bundle_id?: string
          created_at?: string
          id?: string
          listing_id?: string
          price_snapshot?: number
        }
        Relationships: [
          {
            foreignKeyName: "bundle_items_bundle_id_fkey"
            columns: ["bundle_id"]
            isOneToOne: false
            referencedRelation: "bundle_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bundle_items_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bundle_items_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      bundle_sessions: {
        Row: {
          buyer_id: string
          created_at: string
          id: string
          negotiated_price_minor: number | null
          seller_id: string
          status: string
          updated_at: string
        }
        Insert: {
          buyer_id: string
          created_at?: string
          id?: string
          negotiated_price_minor?: number | null
          seller_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          buyer_id?: string
          created_at?: string
          id?: string
          negotiated_price_minor?: number | null
          seller_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      bundle_settings: {
        Row: {
          discount_percentage: number
          enabled: boolean
          id: string
          min_items: number
          updated_at: string
        }
        Insert: {
          discount_percentage?: number
          enabled?: boolean
          id?: string
          min_items?: number
          updated_at?: string
        }
        Update: {
          discount_percentage?: number
          enabled?: boolean
          id?: string
          min_items?: number
          updated_at?: string
        }
        Relationships: []
      }
      buyer_payment_methods: {
        Row: {
          card_brand: string | null
          card_last4: string | null
          created_at: string | null
          id: string
          is_default: boolean | null
          stripe_customer_id: string
          stripe_payment_method_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          card_brand?: string | null
          card_last4?: string | null
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          stripe_customer_id: string
          stripe_payment_method_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          card_brand?: string | null
          card_last4?: string | null
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          stripe_customer_id?: string
          stripe_payment_method_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          icon_color: string | null
          icon_name: string | null
          id: string
          is_active: boolean
          name: string
          parent_id: string | null
          slug: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon_color?: string | null
          icon_name?: string | null
          id?: string
          is_active?: boolean
          name: string
          parent_id?: string | null
          slug: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          icon_color?: string | null
          icon_name?: string | null
          id?: string
          is_active?: boolean
          name?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      category_suggestions: {
        Row: {
          confidence_score: number
          created_at: string
          final_category_id: string | null
          id: string
          isbn: string | null
          listing_id: string | null
          metadata: Json | null
          suggested_category_id: string | null
          user_id: string | null
          was_accepted: boolean | null
        }
        Insert: {
          confidence_score: number
          created_at?: string
          final_category_id?: string | null
          id?: string
          isbn?: string | null
          listing_id?: string | null
          metadata?: Json | null
          suggested_category_id?: string | null
          user_id?: string | null
          was_accepted?: boolean | null
        }
        Update: {
          confidence_score?: number
          created_at?: string
          final_category_id?: string | null
          id?: string
          isbn?: string | null
          listing_id?: string | null
          metadata?: Json | null
          suggested_category_id?: string | null
          user_id?: string | null
          was_accepted?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "category_suggestions_final_category_id_fkey"
            columns: ["final_category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_suggestions_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_suggestions_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_suggestions_suggested_category_id_fkey"
            columns: ["suggested_category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      category_synonyms: {
        Row: {
          category_id: string
          confidence_boost: number | null
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean
          synonym: string
          updated_at: string
        }
        Insert: {
          category_id: string
          confidence_boost?: number | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          synonym: string
          updated_at?: string
        }
        Update: {
          category_id?: string
          confidence_boost?: number | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          synonym?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_synonyms_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      charities: {
        Row: {
          country_code: string | null
          created_at: string | null
          created_by: string | null
          follower_count: number | null
          hospice_id: string | null
          id: string
          is_verified: boolean | null
          logo_url: string | null
          name: string
          registered_charity_number: string
          slug: string | null
          tagline: string | null
          updated_at: string | null
          verification_source: string | null
        }
        Insert: {
          country_code?: string | null
          created_at?: string | null
          created_by?: string | null
          follower_count?: number | null
          hospice_id?: string | null
          id?: string
          is_verified?: boolean | null
          logo_url?: string | null
          name: string
          registered_charity_number: string
          slug?: string | null
          tagline?: string | null
          updated_at?: string | null
          verification_source?: string | null
        }
        Update: {
          country_code?: string | null
          created_at?: string | null
          created_by?: string | null
          follower_count?: number | null
          hospice_id?: string | null
          id?: string
          is_verified?: boolean | null
          logo_url?: string | null
          name?: string
          registered_charity_number?: string
          slug?: string | null
          tagline?: string | null
          updated_at?: string | null
          verification_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "charities_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "charities_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "public_seller_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "charities_hospice_id_fkey"
            columns: ["hospice_id"]
            isOneToOne: false
            referencedRelation: "hospices"
            referencedColumns: ["id"]
          },
        ]
      }
      charity_applications: {
        Row: {
          admin_email: string | null
          admin_password_hash: string | null
          charity_id: string
          charity_name: string | null
          created_at: string
          documents: Json | null
          id: string
          notes: string | null
          rejection_reason: string | null
          reviewed_at: string | null
          reviewer_id: string | null
          status: string
          submitted_by: string
          updated_at: string
        }
        Insert: {
          admin_email?: string | null
          admin_password_hash?: string | null
          charity_id: string
          charity_name?: string | null
          created_at?: string
          documents?: Json | null
          id?: string
          notes?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          status?: string
          submitted_by: string
          updated_at?: string
        }
        Update: {
          admin_email?: string | null
          admin_password_hash?: string | null
          charity_id?: string
          charity_name?: string | null
          created_at?: string
          documents?: Json | null
          id?: string
          notes?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          status?: string
          submitted_by?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "charity_applications_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
        ]
      }
      charity_follows: {
        Row: {
          charity_id: string
          created_at: string | null
          id: string
          notify_new_listings: boolean | null
          user_id: string
        }
        Insert: {
          charity_id: string
          created_at?: string | null
          id?: string
          notify_new_listings?: boolean | null
          user_id: string
        }
        Update: {
          charity_id?: string
          created_at?: string | null
          id?: string
          notify_new_listings?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "charity_follows_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
        ]
      }
      charity_invites: {
        Row: {
          charity_id: string
          created_at: string | null
          expires_at: string
          id: string
          invited_by: string | null
          invited_email: string
          role: string
          status: string
          token: string
        }
        Insert: {
          charity_id: string
          created_at?: string | null
          expires_at: string
          id?: string
          invited_by?: string | null
          invited_email: string
          role?: string
          status?: string
          token: string
        }
        Update: {
          charity_id?: string
          created_at?: string | null
          expires_at?: string
          id?: string
          invited_by?: string | null
          invited_email?: string
          role?: string
          status?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "charity_invites_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "charity_invites_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "charity_invites_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "public_seller_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      charity_members: {
        Row: {
          charity_id: string
          created_at: string | null
          id: string
          manages_subscription: boolean | null
          role: string
          status: string
          user_id: string
        }
        Insert: {
          charity_id: string
          created_at?: string | null
          id?: string
          manages_subscription?: boolean | null
          role: string
          status?: string
          user_id: string
        }
        Update: {
          charity_id?: string
          created_at?: string | null
          id?: string
          manages_subscription?: boolean | null
          role?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "charity_members_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "charity_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "charity_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_seller_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      charity_payout_settings: {
        Row: {
          charity_id: string
          payout_account_ref: string
          payout_provider: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          charity_id: string
          payout_account_ref: string
          payout_provider?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          charity_id?: string
          payout_account_ref?: string
          payout_provider?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "charity_payout_settings_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: true
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "charity_payout_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "charity_payout_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "public_seller_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      charity_payouts: {
        Row: {
          amount_minor: number
          charity_id: string
          created_at: string | null
          currency: string
          destination_ref: string
          external_reference: string | null
          id: string
          processed_at: string | null
          requested_by: string
          status: string
        }
        Insert: {
          amount_minor: number
          charity_id: string
          created_at?: string | null
          currency?: string
          destination_ref: string
          external_reference?: string | null
          id?: string
          processed_at?: string | null
          requested_by: string
          status?: string
        }
        Update: {
          amount_minor?: number
          charity_id?: string
          created_at?: string | null
          currency?: string
          destination_ref?: string
          external_reference?: string | null
          id?: string
          processed_at?: string | null
          requested_by?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "charity_payouts_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "charity_payouts_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "charity_payouts_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "public_seller_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      charity_verification_checks: {
        Row: {
          charity_id: string
          charity_number: string
          country_code: string
          created_at: string | null
          id: string
          raw_response: Json | null
          registry_source: string | null
          result: string
        }
        Insert: {
          charity_id: string
          charity_number: string
          country_code: string
          created_at?: string | null
          id?: string
          raw_response?: Json | null
          registry_source?: string | null
          result: string
        }
        Update: {
          charity_id?: string
          charity_number?: string
          country_code?: string
          created_at?: string | null
          id?: string
          raw_response?: Json | null
          registry_source?: string | null
          result?: string
        }
        Relationships: [
          {
            foreignKeyName: "charity_verification_checks_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
        ]
      }
      collection_items: {
        Row: {
          added_at: string | null
          added_by: string | null
          collection_id: string
          display_order: number | null
          id: string
          listing_id: string
        }
        Insert: {
          added_at?: string | null
          added_by?: string | null
          collection_id: string
          display_order?: number | null
          id?: string
          listing_id: string
        }
        Update: {
          added_at?: string | null
          added_by?: string | null
          collection_id?: string
          display_order?: number | null
          id?: string
          listing_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collection_items_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "featured_collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_items_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_items_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      collection_templates: {
        Row: {
          ai_prompt: string | null
          color: string | null
          created_at: string | null
          description: string | null
          icon_name: string | null
          id: string
          is_active: boolean | null
          last_generated_at: string | null
          matching_authors: string[] | null
          matching_categories: string[] | null
          matching_keywords: string[] | null
          name: string
          next_trigger_date: string | null
          slug: string
          trigger_day: number | null
          trigger_duration_days: number | null
          trigger_month: number | null
          trigger_type: string
          updated_at: string | null
        }
        Insert: {
          ai_prompt?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          last_generated_at?: string | null
          matching_authors?: string[] | null
          matching_categories?: string[] | null
          matching_keywords?: string[] | null
          name: string
          next_trigger_date?: string | null
          slug: string
          trigger_day?: number | null
          trigger_duration_days?: number | null
          trigger_month?: number | null
          trigger_type: string
          updated_at?: string | null
        }
        Update: {
          ai_prompt?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          last_generated_at?: string | null
          matching_authors?: string[] | null
          matching_categories?: string[] | null
          matching_keywords?: string[] | null
          name?: string
          next_trigger_date?: string | null
          slug?: string
          trigger_day?: number | null
          trigger_duration_days?: number | null
          trigger_month?: number | null
          trigger_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      community_badges: {
        Row: {
          badge_description: string | null
          badge_name: string
          badge_type: string
          earned_at: string | null
          icon: string | null
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          badge_description?: string | null
          badge_name: string
          badge_type: string
          earned_at?: string | null
          icon?: string | null
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          badge_description?: string | null
          badge_name?: string
          badge_type?: string
          earned_at?: string | null
          icon?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      community_collections: {
        Row: {
          created_at: string | null
          description: string | null
          follower_count: number | null
          id: string
          listing_ids: string[] | null
          name: string
          privacy: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          follower_count?: number | null
          id?: string
          listing_ids?: string[] | null
          name: string
          privacy?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          follower_count?: number | null
          id?: string
          listing_ids?: string[] | null
          name?: string
          privacy?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      daily_challenges: {
        Row: {
          active_date: string
          challenge_type: string
          created_at: string
          description: string
          icon: string | null
          id: string
          points: number
          title: string
        }
        Insert: {
          active_date?: string
          challenge_type: string
          created_at?: string
          description: string
          icon?: string | null
          id?: string
          points?: number
          title: string
        }
        Update: {
          active_date?: string
          challenge_type?: string
          created_at?: string
          description?: string
          icon?: string | null
          id?: string
          points?: number
          title?: string
        }
        Relationships: []
      }
      daily_points_claims: {
        Row: {
          claimed_at: string
          created_at: string
          id: string
          points_earned: number
          user_id: string
        }
        Insert: {
          claimed_at?: string
          created_at?: string
          id?: string
          points_earned: number
          user_id: string
        }
        Update: {
          claimed_at?: string
          created_at?: string
          id?: string
          points_earned?: number
          user_id?: string
        }
        Relationships: []
      }
      daily_quests: {
        Row: {
          created_at: string | null
          description: string
          expires_at: string
          id: string
          is_active: boolean | null
          period: string
          points_reward: number
          quest_type: string
          target_value: number
        }
        Insert: {
          created_at?: string | null
          description: string
          expires_at: string
          id?: string
          is_active?: boolean | null
          period?: string
          points_reward: number
          quest_type: string
          target_value: number
        }
        Update: {
          created_at?: string | null
          description?: string
          expires_at?: string
          id?: string
          is_active?: boolean | null
          period?: string
          points_reward?: number
          quest_type?: string
          target_value?: number
        }
        Relationships: []
      }
      delivery_confirmations: {
        Row: {
          confirmation_type: string
          confirmed_at: string | null
          confirmed_by: string
          delivery_address_confirmed: boolean | null
          evidence_url: string | null
          id: string
          notes: string | null
          order_id: string
        }
        Insert: {
          confirmation_type: string
          confirmed_at?: string | null
          confirmed_by: string
          delivery_address_confirmed?: boolean | null
          evidence_url?: string | null
          id?: string
          notes?: string | null
          order_id: string
        }
        Update: {
          confirmation_type?: string
          confirmed_at?: string | null
          confirmed_by?: string
          delivery_address_confirmed?: boolean | null
          evidence_url?: string | null
          id?: string
          notes?: string | null
          order_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "delivery_confirmations_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      dispute_actions: {
        Row: {
          action: string
          admin_id: string
          created_at: string
          dispute_id: string
          id: string
          note: string | null
        }
        Insert: {
          action: string
          admin_id: string
          created_at?: string
          dispute_id: string
          id?: string
          note?: string | null
        }
        Update: {
          action?: string
          admin_id?: string
          created_at?: string
          dispute_id?: string
          id?: string
          note?: string | null
        }
        Relationships: []
      }
      disputes: {
        Row: {
          buyer_description: string | null
          buyer_evidence: Json
          created_at: string
          id: string
          opened_by: string
          order_id: string
          reason: string | null
          refund_amount_minor: number
          resolution_notes: string | null
          seller_evidence: Json
          seller_response: string | null
          status: Database["public"]["Enums"]["dispute_status"]
          type: string | null
          updated_at: string
        }
        Insert: {
          buyer_description?: string | null
          buyer_evidence?: Json
          created_at?: string
          id?: string
          opened_by: string
          order_id: string
          reason?: string | null
          refund_amount_minor?: number
          resolution_notes?: string | null
          seller_evidence?: Json
          seller_response?: string | null
          status?: Database["public"]["Enums"]["dispute_status"]
          type?: string | null
          updated_at?: string
        }
        Update: {
          buyer_description?: string | null
          buyer_evidence?: Json
          created_at?: string
          id?: string
          opened_by?: string
          order_id?: string
          reason?: string | null
          refund_amount_minor?: number
          resolution_notes?: string | null
          seller_evidence?: Json
          seller_response?: string | null
          status?: Database["public"]["Enums"]["dispute_status"]
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "disputes_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      email_events: {
        Row: {
          created_at: string
          entity_id: string | null
          event_key: string
          id: string
          payload: Json
          user_id: string | null
        }
        Insert: {
          created_at?: string
          entity_id?: string | null
          event_key: string
          id?: string
          payload?: Json
          user_id?: string | null
        }
        Update: {
          created_at?: string
          entity_id?: string | null
          event_key?: string
          id?: string
          payload?: Json
          user_id?: string | null
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error: string | null
          id: string
          provider_id: string | null
          status: string
          subject: string
          template_key: string
          template_version: number
          to_email: string
          variables: Json
        }
        Insert: {
          created_at?: string
          error?: string | null
          id?: string
          provider_id?: string | null
          status?: string
          subject: string
          template_key: string
          template_version: number
          to_email: string
          variables?: Json
        }
        Update: {
          created_at?: string
          error?: string | null
          id?: string
          provider_id?: string | null
          status?: string
          subject?: string
          template_key?: string
          template_version?: number
          to_email?: string
          variables?: Json
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          created_at: string
          created_by: string | null
          html: string
          id: string
          name: string
          preview_text: string | null
          published_at: string | null
          status: string
          subject: string
          template_key: string
          text_alt: string | null
          updated_at: string
          updated_by: string | null
          variables: Json | null
          version: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          html: string
          id?: string
          name: string
          preview_text?: string | null
          published_at?: string | null
          status?: string
          subject: string
          template_key: string
          text_alt?: string | null
          updated_at?: string
          updated_by?: string | null
          variables?: Json | null
          version?: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          html?: string
          id?: string
          name?: string
          preview_text?: string | null
          published_at?: string | null
          status?: string
          subject?: string
          template_key?: string
          text_alt?: string | null
          updated_at?: string
          updated_by?: string | null
          variables?: Json | null
          version?: number
        }
        Relationships: []
      }
      email_verification_otps: {
        Row: {
          attempts: number
          created_at: string
          email: string
          expires_at: string
          id: string
          otp_code: string
          user_id: string
          verified_at: string | null
        }
        Insert: {
          attempts?: number
          created_at?: string
          email: string
          expires_at?: string
          id?: string
          otp_code: string
          user_id: string
          verified_at?: string | null
        }
        Update: {
          attempts?: number
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          otp_code?: string
          user_id?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      export_jobs: {
        Row: {
          completed_at: string | null
          created_at: string
          created_by: string
          error_message: string | null
          expires_at: string | null
          export_type: string
          file_size_bytes: number | null
          file_url: string | null
          id: string
          parameters: Json | null
          row_count: number | null
          status: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          created_by: string
          error_message?: string | null
          expires_at?: string | null
          export_type: string
          file_size_bytes?: number | null
          file_url?: string | null
          id?: string
          parameters?: Json | null
          row_count?: number | null
          status?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          created_by?: string
          error_message?: string | null
          expires_at?: string | null
          export_type?: string
          file_size_bytes?: number | null
          file_url?: string | null
          id?: string
          parameters?: Json | null
          row_count?: number | null
          status?: string
        }
        Relationships: []
      }
      feature_flags: {
        Row: {
          created_at: string
          description: string | null
          enabled: boolean
          id: string
          key: string
          rules: Json | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          enabled?: boolean
          id?: string
          key: string
          rules?: Json | null
        }
        Update: {
          created_at?: string
          description?: string | null
          enabled?: boolean
          id?: string
          key?: string
          rules?: Json | null
        }
        Relationships: []
      }
      featured_collections: {
        Row: {
          auto_generated: boolean | null
          color: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          display_order: number | null
          end_date: string | null
          icon_name: string | null
          id: string
          is_active: boolean | null
          name: string
          show_on_homepage: boolean | null
          slug: string
          start_date: string | null
          template_id: string | null
          updated_at: string | null
        }
        Insert: {
          auto_generated?: boolean | null
          color?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          end_date?: string | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          show_on_homepage?: boolean | null
          slug: string
          start_date?: string | null
          template_id?: string | null
          updated_at?: string | null
        }
        Update: {
          auto_generated?: boolean | null
          color?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          end_date?: string | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          show_on_homepage?: boolean | null
          slug?: string
          start_date?: string | null
          template_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "featured_collections_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "collection_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      featured_members: {
        Row: {
          active: boolean | null
          created_at: string | null
          feature_type: string
          featured_at: string | null
          featured_until: string
          id: string
          reason: string | null
          user_id: string
          votes: number | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          feature_type: string
          featured_at?: string | null
          featured_until: string
          id?: string
          reason?: string | null
          user_id: string
          votes?: number | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          feature_type?: string
          featured_at?: string | null
          featured_until?: string
          id?: string
          reason?: string | null
          user_id?: string
          votes?: number | null
        }
        Relationships: []
      }
      follows: {
        Row: {
          created_at: string
          follower_id: string
          seller_id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          seller_id: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          seller_id?: string
        }
        Relationships: []
      }
      genre_aliases: {
        Row: {
          alias: string
          created_at: string
          genre_id: string
          id: string
        }
        Insert: {
          alias: string
          created_at?: string
          genre_id: string
          id?: string
        }
        Update: {
          alias?: string
          created_at?: string
          genre_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "genre_aliases_genre_id_fkey"
            columns: ["genre_id"]
            isOneToOne: false
            referencedRelation: "genres"
            referencedColumns: ["id"]
          },
        ]
      }
      genres: {
        Row: {
          category_id: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          slug: string | null
          sort_order: number
        }
        Insert: {
          category_id?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          slug?: string | null
          sort_order?: number
        }
        Update: {
          category_id?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          slug?: string | null
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "genres_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      gift_cards: {
        Row: {
          amount_minor: number
          code: string
          created_at: string
          currency: string
          expires_at: string
          id: string
          personal_message: string | null
          purchaser_email: string | null
          purchaser_id: string | null
          recipient_email: string
          recipient_name: string | null
          redeemed_at: string | null
          redeemed_by: string | null
          status: string
          stripe_payment_intent_id: string | null
          updated_at: string
        }
        Insert: {
          amount_minor: number
          code: string
          created_at?: string
          currency?: string
          expires_at: string
          id?: string
          personal_message?: string | null
          purchaser_email?: string | null
          purchaser_id?: string | null
          recipient_email: string
          recipient_name?: string | null
          redeemed_at?: string | null
          redeemed_by?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          updated_at?: string
        }
        Update: {
          amount_minor?: number
          code?: string
          created_at?: string
          currency?: string
          expires_at?: string
          id?: string
          personal_message?: string | null
          purchaser_email?: string | null
          purchaser_id?: string | null
          recipient_email?: string
          recipient_name?: string | null
          redeemed_at?: string | null
          redeemed_by?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      hospices: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          city: string | null
          country_code: string
          county: string | null
          created_at: string
          created_by: string | null
          description: string | null
          email: string | null
          id: string
          is_verified: boolean | null
          logo_url: string | null
          name: string
          phone: string | null
          postcode: string | null
          registered_number: string | null
          updated_at: string
          verification_source: string | null
          website: string | null
        }
        Insert: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          country_code?: string
          county?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          email?: string | null
          id?: string
          is_verified?: boolean | null
          logo_url?: string | null
          name: string
          phone?: string | null
          postcode?: string | null
          registered_number?: string | null
          updated_at?: string
          verification_source?: string | null
          website?: string | null
        }
        Update: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          country_code?: string
          county?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          email?: string | null
          id?: string
          is_verified?: boolean | null
          logo_url?: string | null
          name?: string
          phone?: string | null
          postcode?: string | null
          registered_number?: string | null
          updated_at?: string
          verification_source?: string | null
          website?: string | null
        }
        Relationships: []
      }
      leaderboards: {
        Row: {
          category: string
          created_at: string | null
          id: string
          period: string
          period_end: string | null
          period_start: string
          rank: number | null
          score: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          period: string
          period_end?: string | null
          period_start: string
          rank?: number | null
          score?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          period?: string
          period_end?: string | null
          period_start?: string
          rank?: number | null
          score?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      listing_holds: {
        Row: {
          created_at: string | null
          held_until: string
          id: string
          listing_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          held_until: string
          id?: string
          listing_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          held_until?: string
          id?: string
          listing_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_holds_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: true
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_holds_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: true
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_price_history: {
        Row: {
          created_at: string
          id: string
          listing_id: string
          price_minor: number
          recorded_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          listing_id: string
          price_minor: number
          recorded_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          listing_id?: string
          price_minor?: number
          recorded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_price_history_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_price_history_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_reports: {
        Row: {
          created_at: string
          id: string
          listing_id: string
          notes: string | null
          reason: string
          reporter_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          listing_id: string
          notes?: string | null
          reason: string
          reporter_id: string
        }
        Update: {
          created_at?: string
          id?: string
          listing_id?: string
          notes?: string | null
          reason?: string
          reporter_id?: string
        }
        Relationships: []
      }
      message_attachments: {
        Row: {
          created_at: string
          id: string
          message_id: string
          type: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          message_id: string
          type: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          message_id?: string
          type?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_attachments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      message_flags: {
        Row: {
          created_at: string
          flag_type: string
          id: string
          matched: string | null
          message_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          flag_type: string
          id?: string
          matched?: string | null
          message_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          flag_type?: string
          id?: string
          matched?: string | null
          message_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_flags_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_flags_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_flags_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_seller_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      message_reports: {
        Row: {
          created_at: string
          description: string | null
          id: string
          reason: string
          reporter_id: string
          status: string
          thread_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          reason: string
          reporter_id: string
          status?: string
          thread_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          reason?: string
          reporter_id?: string
          status?: string
          thread_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_reports_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "message_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      message_threads: {
        Row: {
          book_club_id: string | null
          buyer_id: string
          created_at: string
          id: string
          last_message_at: string | null
          last_message_preview: string | null
          listing_id: string | null
          offer_id: string | null
          seller_id: string
        }
        Insert: {
          book_club_id?: string | null
          buyer_id: string
          created_at?: string
          id?: string
          last_message_at?: string | null
          last_message_preview?: string | null
          listing_id?: string | null
          offer_id?: string | null
          seller_id: string
        }
        Update: {
          book_club_id?: string | null
          buyer_id?: string
          created_at?: string
          id?: string
          last_message_at?: string | null
          last_message_preview?: string | null
          listing_id?: string | null
          offer_id?: string | null
          seller_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_threads_book_club_id_fkey"
            columns: ["book_club_id"]
            isOneToOne: false
            referencedRelation: "book_clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_threads_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "message_threads_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          metadata: Json | null
          read_at: string | null
          sender_display_name: string | null
          sender_id: string
          thread_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          metadata?: Json | null
          read_at?: string | null
          sender_display_name?: string | null
          sender_id: string
          thread_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          read_at?: string | null
          sender_display_name?: string | null
          sender_id?: string
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "message_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      moderation_appeals: {
        Row: {
          admin_response: string | null
          appeal_reason: string
          created_at: string | null
          id: string
          moderation_log_id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          admin_response?: string | null
          appeal_reason: string
          created_at?: string | null
          id?: string
          moderation_log_id: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          admin_response?: string | null
          appeal_reason?: string
          created_at?: string | null
          id?: string
          moderation_log_id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "moderation_appeals_moderation_log_id_fkey"
            columns: ["moderation_log_id"]
            isOneToOne: false
            referencedRelation: "moderation_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      moderation_logs: {
        Row: {
          admin_notes: string | null
          auto_action: string | null
          confidence_score: number | null
          content_id: string
          content_type: string
          created_at: string | null
          detected_issues: Json | null
          flagged_sections: Json | null
          id: string
          original_content: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          severity: string | null
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          auto_action?: string | null
          confidence_score?: number | null
          content_id: string
          content_type: string
          created_at?: string | null
          detected_issues?: Json | null
          flagged_sections?: Json | null
          id?: string
          original_content?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          severity?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          auto_action?: string | null
          confidence_score?: number | null
          content_id?: string
          content_type?: string
          created_at?: string | null
          detected_issues?: Json | null
          flagged_sections?: Json | null
          id?: string
          original_content?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          severity?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      moderation_settings: {
        Row: {
          allowed_profanity_contexts: Json | null
          auto_block_threshold: number | null
          auto_flag_threshold: number | null
          explicit_slurs: Json | null
          id: string
          moderate_images: boolean | null
          moderate_text: boolean | null
          moderate_usernames: boolean | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          allowed_profanity_contexts?: Json | null
          auto_block_threshold?: number | null
          auto_flag_threshold?: number | null
          explicit_slurs?: Json | null
          id?: string
          moderate_images?: boolean | null
          moderate_text?: boolean | null
          moderate_usernames?: boolean | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          allowed_profanity_contexts?: Json | null
          auto_block_threshold?: number | null
          auto_flag_threshold?: number | null
          explicit_slurs?: Json | null
          id?: string
          moderate_images?: boolean | null
          moderate_text?: boolean | null
          moderate_usernames?: boolean | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          created_at: string
          id: string
          preferences: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          preferences?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          preferences?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          content: string
          created_at: string
          data: Json | null
          id: string
          read_at: string | null
          read_status: boolean
          related_entity_id: string | null
          related_entity_type: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          data?: Json | null
          id?: string
          read_at?: string | null
          read_status?: boolean
          related_entity_id?: string | null
          related_entity_type?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          data?: Json | null
          id?: string
          read_at?: string | null
          read_status?: boolean
          related_entity_id?: string | null
          related_entity_type?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      offer_events: {
        Row: {
          actor_id: string
          amount_cents: number | null
          created_at: string | null
          event_type: string
          id: string
          thread_id: string
        }
        Insert: {
          actor_id: string
          amount_cents?: number | null
          created_at?: string | null
          event_type: string
          id?: string
          thread_id: string
        }
        Update: {
          actor_id?: string
          amount_cents?: number | null
          created_at?: string | null
          event_type?: string
          id?: string
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "offer_events_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_events_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "public_seller_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_events_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "offer_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      offer_threads: {
        Row: {
          buyer_id: string
          created_at: string | null
          expires_at: string
          id: string
          listing_id: string
          paid_at: string | null
          round_count: number
          seller_id: string
          status: string
        }
        Insert: {
          buyer_id: string
          created_at?: string | null
          expires_at: string
          id?: string
          listing_id: string
          paid_at?: string | null
          round_count?: number
          seller_id: string
          status?: string
        }
        Update: {
          buyer_id?: string
          created_at?: string | null
          expires_at?: string
          id?: string
          listing_id?: string
          paid_at?: string | null
          round_count?: number
          seller_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "offer_threads_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_threads_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "public_seller_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_threads_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_threads_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_threads_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offer_threads_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "public_seller_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      offers: {
        Row: {
          accepted_at: string | null
          amount_minor: number
          buyer_id: string
          counter_of_offer_id: string | null
          created_at: string
          currency: string
          deleted_at: string | null
          expires_at: string | null
          id: string
          listing_id: string
          paid_at: string | null
          status: string
          updated_at: string
        }
        Insert: {
          accepted_at?: string | null
          amount_minor: number
          buyer_id: string
          counter_of_offer_id?: string | null
          created_at?: string
          currency?: string
          deleted_at?: string | null
          expires_at?: string | null
          id?: string
          listing_id: string
          paid_at?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          accepted_at?: string | null
          amount_minor?: number
          buyer_id?: string
          counter_of_offer_id?: string | null
          created_at?: string
          currency?: string
          deleted_at?: string | null
          expires_at?: string | null
          id?: string
          listing_id?: string
          paid_at?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "offers_counter_of_offer_id_fkey"
            columns: ["counter_of_offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offers_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      order_cancellation_requests: {
        Row: {
          additional_details: string | null
          admin_notes: string | null
          created_at: string | null
          id: string
          order_id: string
          reason: string
          requested_by: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          additional_details?: string | null
          admin_notes?: string | null
          created_at?: string | null
          id?: string
          order_id: string
          reason: string
          requested_by: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          additional_details?: string | null
          admin_notes?: string | null
          created_at?: string | null
          id?: string
          order_id?: string
          reason?: string
          requested_by?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_cancellation_requests_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          listing_id: string
          order_id: string
          quantity: number
          unit_price_minor: number
        }
        Insert: {
          created_at?: string
          id?: string
          listing_id: string
          order_id: string
          quantity?: number
          unit_price_minor: number
        }
        Update: {
          created_at?: string
          id?: string
          listing_id?: string
          order_id?: string
          quantity?: number
          unit_price_minor?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
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
      order_refunds: {
        Row: {
          amount_minor: number
          created_at: string | null
          currency: string
          error_message: string | null
          id: string
          initiated_by: string | null
          metadata: Json | null
          order_id: string
          processed_at: string | null
          refund_method: string
          status: string
          stripe_payment_intent_id: string | null
          stripe_refund_id: string | null
          updated_at: string | null
          wallet_transaction_id: string | null
        }
        Insert: {
          amount_minor: number
          created_at?: string | null
          currency?: string
          error_message?: string | null
          id?: string
          initiated_by?: string | null
          metadata?: Json | null
          order_id: string
          processed_at?: string | null
          refund_method: string
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_refund_id?: string | null
          updated_at?: string | null
          wallet_transaction_id?: string | null
        }
        Update: {
          amount_minor?: number
          created_at?: string | null
          currency?: string
          error_message?: string | null
          id?: string
          initiated_by?: string | null
          metadata?: Json | null
          order_id?: string
          processed_at?: string | null
          refund_method?: string
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_refund_id?: string | null
          updated_at?: string | null
          wallet_transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_refunds_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_shipments: {
        Row: {
          auto_release_at: string | null
          buyer_id: string
          created_at: string
          id: string
          marked_received_at: string | null
          marked_sent_at: string | null
          order_id: string
          seller_id: string
          status: string
          updated_at: string
        }
        Insert: {
          auto_release_at?: string | null
          buyer_id: string
          created_at?: string
          id?: string
          marked_received_at?: string | null
          marked_sent_at?: string | null
          order_id: string
          seller_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          auto_release_at?: string | null
          buyer_id?: string
          created_at?: string
          id?: string
          marked_received_at?: string | null
          marked_sent_at?: string | null
          order_id?: string
          seller_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_shipments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          address_id: string | null
          address_revealed_at: string | null
          address_shared_at: string | null
          address_snapshot: Json | null
          auto_release_at: string | null
          buyer_address: Json | null
          buyer_confirmation_deadline: string | null
          buyer_confirmed_at: string | null
          buyer_id: string
          buyer_protection_fee_minor: number
          cancellation_reason: string | null
          cancellation_type: string | null
          cancelled_at: string | null
          cancelled_by: string | null
          checkout_initiated_at: string | null
          contact_phone: string | null
          courier: string | null
          created_at: string
          currency: string
          deleted_at: string | null
          delivered_at: string | null
          delivery_instructions: string | null
          delivery_method: string | null
          dispatch_by: string | null
          dispute_reason: string | null
          disputed_at: string | null
          escrow_release_at: string | null
          escrow_status: string | null
          estimated_delivery_date: string | null
          id: string
          offer_id: string | null
          order_status: Database["public"]["Enums"]["order_status"]
          package_size: string | null
          package_weight_g: number | null
          paid_at: string | null
          payment_method: string | null
          payment_pending_at: string | null
          requires_receipt: boolean | null
          requires_tracking: boolean | null
          seller_charity_id: string | null
          seller_id: string
          service_point_id: string | null
          shipping_label_created_at: string | null
          shipping_minor: number
          shipping_option: string | null
          source: string | null
          stripe_checkout_session_id: string | null
          stripe_payment_intent_id: string | null
          stripe_payment_minor: number
          stripe_session_id: string | null
          stripe_transfer_id: string | null
          subtotal_minor: number
          total_minor: number
          tracking_number: string | null
          tracking_url: string | null
          updated_at: string
          vat_amount_minor: number
          vat_rate_bps: number
          wallet_deduction_minor: number
        }
        Insert: {
          address_id?: string | null
          address_revealed_at?: string | null
          address_shared_at?: string | null
          address_snapshot?: Json | null
          auto_release_at?: string | null
          buyer_address?: Json | null
          buyer_confirmation_deadline?: string | null
          buyer_confirmed_at?: string | null
          buyer_id: string
          buyer_protection_fee_minor?: number
          cancellation_reason?: string | null
          cancellation_type?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          checkout_initiated_at?: string | null
          contact_phone?: string | null
          courier?: string | null
          created_at?: string
          currency?: string
          deleted_at?: string | null
          delivered_at?: string | null
          delivery_instructions?: string | null
          delivery_method?: string | null
          dispatch_by?: string | null
          dispute_reason?: string | null
          disputed_at?: string | null
          escrow_release_at?: string | null
          escrow_status?: string | null
          estimated_delivery_date?: string | null
          id?: string
          offer_id?: string | null
          order_status?: Database["public"]["Enums"]["order_status"]
          package_size?: string | null
          package_weight_g?: number | null
          paid_at?: string | null
          payment_method?: string | null
          payment_pending_at?: string | null
          requires_receipt?: boolean | null
          requires_tracking?: boolean | null
          seller_charity_id?: string | null
          seller_id: string
          service_point_id?: string | null
          shipping_label_created_at?: string | null
          shipping_minor?: number
          shipping_option?: string | null
          source?: string | null
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_payment_minor?: number
          stripe_session_id?: string | null
          stripe_transfer_id?: string | null
          subtotal_minor?: number
          total_minor?: number
          tracking_number?: string | null
          tracking_url?: string | null
          updated_at?: string
          vat_amount_minor?: number
          vat_rate_bps?: number
          wallet_deduction_minor?: number
        }
        Update: {
          address_id?: string | null
          address_revealed_at?: string | null
          address_shared_at?: string | null
          address_snapshot?: Json | null
          auto_release_at?: string | null
          buyer_address?: Json | null
          buyer_confirmation_deadline?: string | null
          buyer_confirmed_at?: string | null
          buyer_id?: string
          buyer_protection_fee_minor?: number
          cancellation_reason?: string | null
          cancellation_type?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          checkout_initiated_at?: string | null
          contact_phone?: string | null
          courier?: string | null
          created_at?: string
          currency?: string
          deleted_at?: string | null
          delivered_at?: string | null
          delivery_instructions?: string | null
          delivery_method?: string | null
          dispatch_by?: string | null
          dispute_reason?: string | null
          disputed_at?: string | null
          escrow_release_at?: string | null
          escrow_status?: string | null
          estimated_delivery_date?: string | null
          id?: string
          offer_id?: string | null
          order_status?: Database["public"]["Enums"]["order_status"]
          package_size?: string | null
          package_weight_g?: number | null
          paid_at?: string | null
          payment_method?: string | null
          payment_pending_at?: string | null
          requires_receipt?: boolean | null
          requires_tracking?: boolean | null
          seller_charity_id?: string | null
          seller_id?: string
          service_point_id?: string | null
          shipping_label_created_at?: string | null
          shipping_minor?: number
          shipping_option?: string | null
          source?: string | null
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_payment_minor?: number
          stripe_session_id?: string | null
          stripe_transfer_id?: string | null
          subtotal_minor?: number
          total_minor?: number
          tracking_number?: string | null
          tracking_url?: string | null
          updated_at?: string
          vat_amount_minor?: number
          vat_rate_bps?: number
          wallet_deduction_minor?: number
        }
        Relationships: [
          {
            foreignKeyName: "orders_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_seller_charity_id_fkey"
            columns: ["seller_charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount_minor: number
          buyer_id: string
          created_at: string | null
          currency: string | null
          id: string
          order_id: string | null
          platform_fee_minor: number
          seller_amount_minor: number
          seller_id: string
          status: string
          stripe_payment_intent_id: string
          updated_at: string | null
        }
        Insert: {
          amount_minor: number
          buyer_id: string
          created_at?: string | null
          currency?: string | null
          id?: string
          order_id?: string | null
          platform_fee_minor: number
          seller_amount_minor: number
          seller_id: string
          status?: string
          stripe_payment_intent_id: string
          updated_at?: string | null
        }
        Update: {
          amount_minor?: number
          buyer_id?: string
          created_at?: string | null
          currency?: string | null
          id?: string
          order_id?: string | null
          platform_fee_minor?: number
          seller_amount_minor?: number
          seller_id?: string
          status?: string
          stripe_payment_intent_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      payouts: {
        Row: {
          amount_minor: number
          created_at: string
          currency: string
          id: string
          initiated_by: string | null
          status: string
          stripe_transfer_id: string | null
          user_id: string
        }
        Insert: {
          amount_minor: number
          created_at?: string
          currency?: string
          id?: string
          initiated_by?: string | null
          status?: string
          stripe_transfer_id?: string | null
          user_id: string
        }
        Update: {
          amount_minor?: number
          created_at?: string
          currency?: string
          id?: string
          initiated_by?: string | null
          status?: string
          stripe_transfer_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      personalized_feeds: {
        Row: {
          algorithm: string
          created_at: string | null
          expires_at: string | null
          id: string
          listing_id: string
          reason: string | null
          recommendation_score: number
          user_id: string
        }
        Insert: {
          algorithm: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          listing_id: string
          reason?: string | null
          recommendation_score: number
          user_id: string
        }
        Update: {
          algorithm?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          listing_id?: string
          reason?: string | null
          recommendation_score?: number
          user_id?: string
        }
        Relationships: []
      }
      phone_otps: {
        Row: {
          attempts: number
          consumed: boolean
          created_at: string
          expires_at: string
          id: string
          otp_hash: string
          phone: string
          requester_ip: unknown
          user_id: string | null
        }
        Insert: {
          attempts?: number
          consumed?: boolean
          created_at?: string
          expires_at: string
          id?: string
          otp_hash: string
          phone: string
          requester_ip?: unknown
          user_id?: string | null
        }
        Update: {
          attempts?: number
          consumed?: boolean
          created_at?: string
          expires_at?: string
          id?: string
          otp_hash?: string
          phone?: string
          requester_ip?: unknown
          user_id?: string | null
        }
        Relationships: []
      }
      point_transactions: {
        Row: {
          created_at: string | null
          id: string
          points_amount: number
          reason: string
          related_entity_id: string | null
          related_entity_type: string | null
          transaction_type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          points_amount: number
          reason: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          transaction_type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          points_amount?: number
          reason?: string
          related_entity_id?: string | null
          related_entity_type?: string | null
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      price_drop_alerts: {
        Row: {
          active: boolean | null
          created_at: string
          id: string
          last_alerted_at: string | null
          last_alerted_price_minor: number
          listing_id: string
          original_price_minor: number
          updated_at: string
          user_id: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          id?: string
          last_alerted_at?: string | null
          last_alerted_price_minor: number
          listing_id: string
          original_price_minor: number
          updated_at?: string
          user_id: string
        }
        Update: {
          active?: boolean | null
          created_at?: string
          id?: string
          last_alerted_at?: string | null
          last_alerted_price_minor?: number
          listing_id?: string
          original_price_minor?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "price_drop_alerts_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "price_drop_alerts_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      pro_verifications: {
        Row: {
          business_name: string | null
          created_at: string
          documents: Json | null
          id: string
          notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          business_name?: string | null
          created_at?: string
          documents?: Json | null
          id?: string
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          business_name?: string | null
          created_at?: string
          documents?: Json | null
          id?: string
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_type: string | null
          age_confirmed_at: string | null
          agreed_terms_at: string | null
          ai_taste_summary: string | null
          avatar_source: string | null
          avatar_url: string | null
          banner_url: string | null
          bio: string | null
          bookquest_level: number | null
          bookquest_xp: number | null
          books_count: number | null
          books_saved_count: number | null
          charity_id: string | null
          co2_saved_kg: number | null
          created_at: string
          current_streak_days: number | null
          display_name: string | null
          email: string | null
          email_consent_gdpr: boolean
          email_notifications: boolean | null
          email_unsubscribed: boolean
          email_verified: boolean
          favorite_genres: string[] | null
          first_name: string | null
          first_sale_at: string | null
          followers_count: number | null
          following_count: number | null
          gamification_enabled: boolean | null
          id: string
          initials: string | null
          is_charity_verified: boolean | null
          last_activity_date: string | null
          last_name: string | null
          location_city: string | null
          location_postcode: string | null
          longest_streak_days: number | null
          manual_postage_agreed: boolean | null
          marketing_opt_in: boolean | null
          member_since: string | null
          oauth_picture_url: string | null
          onboarding_completed: boolean | null
          onboarding_status:
            | Database["public"]["Enums"]["onboarding_status"]
            | null
          phone: string | null
          phone_verification_method: string | null
          phone_verified_at: string | null
          profile_picture_url: string | null
          pronouns: string | null
          push_notifications: boolean | null
          rating_avg: number | null
          rating_count: number | null
          reading_interests: string[] | null
          stripe_customer_id: string | null
          stripe_onboarded: boolean | null
          stripe_subscription_id: string | null
          subscription_cancel_at: string | null
          subscription_current_period_end: string | null
          subscription_current_period_start: string | null
          subscription_status: string | null
          sustainability_champion: boolean | null
          updated_at: string
          username: string | null
        }
        Insert: {
          account_type?: string | null
          age_confirmed_at?: string | null
          agreed_terms_at?: string | null
          ai_taste_summary?: string | null
          avatar_source?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          bookquest_level?: number | null
          bookquest_xp?: number | null
          books_count?: number | null
          books_saved_count?: number | null
          charity_id?: string | null
          co2_saved_kg?: number | null
          created_at?: string
          current_streak_days?: number | null
          display_name?: string | null
          email?: string | null
          email_consent_gdpr?: boolean
          email_notifications?: boolean | null
          email_unsubscribed?: boolean
          email_verified?: boolean
          favorite_genres?: string[] | null
          first_name?: string | null
          first_sale_at?: string | null
          followers_count?: number | null
          following_count?: number | null
          gamification_enabled?: boolean | null
          id: string
          initials?: string | null
          is_charity_verified?: boolean | null
          last_activity_date?: string | null
          last_name?: string | null
          location_city?: string | null
          location_postcode?: string | null
          longest_streak_days?: number | null
          manual_postage_agreed?: boolean | null
          marketing_opt_in?: boolean | null
          member_since?: string | null
          oauth_picture_url?: string | null
          onboarding_completed?: boolean | null
          onboarding_status?:
            | Database["public"]["Enums"]["onboarding_status"]
            | null
          phone?: string | null
          phone_verification_method?: string | null
          phone_verified_at?: string | null
          profile_picture_url?: string | null
          pronouns?: string | null
          push_notifications?: boolean | null
          rating_avg?: number | null
          rating_count?: number | null
          reading_interests?: string[] | null
          stripe_customer_id?: string | null
          stripe_onboarded?: boolean | null
          stripe_subscription_id?: string | null
          subscription_cancel_at?: string | null
          subscription_current_period_end?: string | null
          subscription_current_period_start?: string | null
          subscription_status?: string | null
          sustainability_champion?: boolean | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          account_type?: string | null
          age_confirmed_at?: string | null
          agreed_terms_at?: string | null
          ai_taste_summary?: string | null
          avatar_source?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          bookquest_level?: number | null
          bookquest_xp?: number | null
          books_count?: number | null
          books_saved_count?: number | null
          charity_id?: string | null
          co2_saved_kg?: number | null
          created_at?: string
          current_streak_days?: number | null
          display_name?: string | null
          email?: string | null
          email_consent_gdpr?: boolean
          email_notifications?: boolean | null
          email_unsubscribed?: boolean
          email_verified?: boolean
          favorite_genres?: string[] | null
          first_name?: string | null
          first_sale_at?: string | null
          followers_count?: number | null
          following_count?: number | null
          gamification_enabled?: boolean | null
          id?: string
          initials?: string | null
          is_charity_verified?: boolean | null
          last_activity_date?: string | null
          last_name?: string | null
          location_city?: string | null
          location_postcode?: string | null
          longest_streak_days?: number | null
          manual_postage_agreed?: boolean | null
          marketing_opt_in?: boolean | null
          member_since?: string | null
          oauth_picture_url?: string | null
          onboarding_completed?: boolean | null
          onboarding_status?:
            | Database["public"]["Enums"]["onboarding_status"]
            | null
          phone?: string | null
          phone_verification_method?: string | null
          phone_verified_at?: string | null
          profile_picture_url?: string | null
          pronouns?: string | null
          push_notifications?: boolean | null
          rating_avg?: number | null
          rating_count?: number | null
          reading_interests?: string[] | null
          stripe_customer_id?: string | null
          stripe_onboarded?: boolean | null
          stripe_subscription_id?: string | null
          subscription_cancel_at?: string | null
          subscription_current_period_end?: string | null
          subscription_current_period_start?: string | null
          subscription_status?: string | null
          sustainability_champion?: boolean | null
          updated_at?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
        ]
      }
      promoted_listing_plans: {
        Row: {
          created_at: string | null
          duration_days: number
          features: Json | null
          id: string
          is_active: boolean | null
          name: string
          price_minor: number
          tier: string
        }
        Insert: {
          created_at?: string | null
          duration_days: number
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name: string
          price_minor: number
          tier: string
        }
        Update: {
          created_at?: string | null
          duration_days?: number
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          price_minor?: number
          tier?: string
        }
        Relationships: []
      }
      promotions: {
        Row: {
          active: boolean
          created_at: string
          discount_bps: number | null
          end_at: string | null
          id: string
          listing_id: string
          start_at: string | null
          type: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          discount_bps?: number | null
          end_at?: string | null
          id?: string
          listing_id: string
          start_at?: string | null
          type: string
        }
        Update: {
          active?: boolean
          created_at?: string
          discount_bps?: number | null
          end_at?: string | null
          id?: string
          listing_id?: string
          start_at?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "promotions_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotions_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      reading_goals: {
        Row: {
          created_at: string
          id: string
          reason: string | null
          target_books: number
          updated_at: string
          user_id: string
          year: number
        }
        Insert: {
          created_at?: string
          id?: string
          reason?: string | null
          target_books: number
          updated_at?: string
          user_id: string
          year: number
        }
        Update: {
          created_at?: string
          id?: string
          reason?: string | null
          target_books?: number
          updated_at?: string
          user_id?: string
          year?: number
        }
        Relationships: []
      }
      reading_group_members: {
        Row: {
          group_id: string
          id: string
          joined_at: string | null
          role: string
          user_id: string
        }
        Insert: {
          group_id: string
          id?: string
          joined_at?: string | null
          role?: string
          user_id: string
        }
        Update: {
          group_id?: string
          id?: string
          joined_at?: string | null
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reading_group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "reading_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      reading_group_posts: {
        Row: {
          content: string
          created_at: string | null
          group_id: string
          id: string
          listing_id: string | null
          post_type: string | null
          reactions: Json | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          group_id: string
          id?: string
          listing_id?: string | null
          post_type?: string | null
          reactions?: Json | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          group_id?: string
          id?: string
          listing_id?: string | null
          post_type?: string | null
          reactions?: Json | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reading_group_posts_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "reading_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      reading_groups: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          created_by: string
          description: string | null
          genres: string[] | null
          id: string
          member_count: number | null
          name: string
          privacy: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          created_by: string
          description?: string | null
          genres?: string[] | null
          id?: string
          member_count?: number | null
          name: string
          privacy?: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          created_by?: string
          description?: string | null
          genres?: string[] | null
          id?: string
          member_count?: number | null
          name?: string
          privacy?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      reading_progress: {
        Row: {
          current_page: number
          finished_at: string | null
          id: string
          listing_id: string
          percentage: number | null
          started_at: string | null
          total_pages: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          current_page?: number
          finished_at?: string | null
          id?: string
          listing_id: string
          percentage?: number | null
          started_at?: string | null
          total_pages?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          current_page?: number
          finished_at?: string | null
          id?: string
          listing_id?: string
          percentage?: number | null
          started_at?: string | null
          total_pages?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reading_progress_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reading_progress_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      recently_viewed: {
        Row: {
          id: string
          listing_id: string
          user_id: string
          viewed_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          user_id: string
          viewed_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          user_id?: string
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recently_viewed_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recently_viewed_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      recommendation_cache: {
        Row: {
          algorithm_version: string | null
          created_at: string
          expires_at: string
          id: string
          listing_ids: string[]
          score: number | null
          user_id: string
        }
        Insert: {
          algorithm_version?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          listing_ids?: string[]
          score?: number | null
          user_id: string
        }
        Update: {
          algorithm_version?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          listing_ids?: string[]
          score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      recommendation_preferences: {
        Row: {
          created_at: string
          data_collection_enabled: boolean
          enabled: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data_collection_enabled?: boolean
          enabled?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          data_collection_enabled?: boolean
          enabled?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      referral_codes: {
        Row: {
          code: string
          created_at: string
          id: string
          max_uses: number | null
          updated_at: string | null
          user_id: string
          uses_count: number
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          max_uses?: number | null
          updated_at?: string | null
          user_id: string
          uses_count?: number
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          max_uses?: number | null
          updated_at?: string | null
          user_id?: string
          uses_count?: number
        }
        Relationships: []
      }
      referrals: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          referee_id: string
          referee_reward_minor: number | null
          referral_code: string
          referrer_id: string
          referrer_reward_minor: number | null
          rewarded_at: string | null
          status: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          referee_id: string
          referee_reward_minor?: number | null
          referral_code: string
          referrer_id: string
          referrer_reward_minor?: number | null
          rewarded_at?: string | null
          status?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          referee_id?: string
          referee_reward_minor?: number | null
          referral_code?: string
          referrer_id?: string
          referrer_reward_minor?: number | null
          rewarded_at?: string | null
          status?: string
        }
        Relationships: []
      }
      refunds: {
        Row: {
          amount_minor: number
          created_at: string
          id: string
          order_id: string
          processed_at: string | null
          processed_by: string | null
          reason: string | null
        }
        Insert: {
          amount_minor: number
          created_at?: string
          id?: string
          order_id: string
          processed_at?: string | null
          processed_by?: string | null
          reason?: string | null
        }
        Update: {
          amount_minor?: number
          created_at?: string
          id?: string
          order_id?: string
          processed_at?: string | null
          processed_by?: string | null
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "refunds_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      review_helpful_votes: {
        Row: {
          created_at: string
          id: string
          review_id: string
          voter_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          review_id: string
          voter_id: string
        }
        Update: {
          created_at?: string
          id?: string
          review_id?: string
          voter_id?: string
        }
        Relationships: []
      }
      review_moderation_queue: {
        Row: {
          created_at: string
          id: string
          reason: string | null
          review_id: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          reason?: string | null
          review_id: string
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          reason?: string | null
          review_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_moderation_queue_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      review_reports: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          reason: string
          reporter_id: string
          review_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          reason: string
          reporter_id: string
          review_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          reason?: string
          reporter_id?: string
          review_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          flag_reason: string | null
          id: string
          is_flagged: boolean
          listing_id: string
          order_id: string | null
          rating: number
          reviewed_user_id: string | null
          reviewee_id: string
          reviewer_id: string
          role: string | null
          stars: number | null
          updated_at: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          flag_reason?: string | null
          id?: string
          is_flagged?: boolean
          listing_id: string
          order_id?: string | null
          rating: number
          reviewed_user_id?: string | null
          reviewee_id: string
          reviewer_id: string
          role?: string | null
          stars?: number | null
          updated_at?: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          flag_reason?: string | null
          id?: string
          is_flagged?: boolean
          listing_id?: string
          order_id?: string | null
          rating?: number
          reviewed_user_id?: string | null
          reviewee_id?: string
          reviewer_id?: string
          role?: string | null
          stars?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      reward_items: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          points_cost: number
          reward_value_minor: number | null
          stock: number | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          points_cost: number
          reward_value_minor?: number | null
          stock?: number | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          points_cost?: number
          reward_value_minor?: number | null
          stock?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reward_redemptions: {
        Row: {
          created_at: string | null
          fulfilled_at: string | null
          id: string
          points_spent: number
          redeemed_at: string | null
          reward_id: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          fulfilled_at?: string | null
          id?: string
          points_spent: number
          redeemed_at?: string | null
          reward_id: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          fulfilled_at?: string | null
          id?: string
          points_spent?: number
          redeemed_at?: string | null
          reward_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reward_redemptions_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "reward_items"
            referencedColumns: ["id"]
          },
        ]
      }
      reward_vouchers: {
        Row: {
          created_at: string
          id: string
          points_spent: number
          redeemed_at: string | null
          user_id: string
          voucher_amount: number
          voucher_code: string
        }
        Insert: {
          created_at?: string
          id?: string
          points_spent: number
          redeemed_at?: string | null
          user_id: string
          voucher_amount: number
          voucher_code: string
        }
        Update: {
          created_at?: string
          id?: string
          points_spent?: number
          redeemed_at?: string | null
          user_id?: string
          voucher_amount?: number
          voucher_code?: string
        }
        Relationships: []
      }
      saved_searches: {
        Row: {
          created_at: string
          frequency: string
          id: string
          name: string
          query: Json
          user_id: string
        }
        Insert: {
          created_at?: string
          frequency?: string
          id?: string
          name: string
          query: Json
          user_id: string
        }
        Update: {
          created_at?: string
          frequency?: string
          id?: string
          name?: string
          query?: Json
          user_id?: string
        }
        Relationships: []
      }
      search_queries: {
        Row: {
          created_at: string
          id: string
          query: string
          query_normalized: string
          results_count: number | null
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          query: string
          query_normalized: string
          results_count?: number | null
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          query?: string
          query_normalized?: string
          results_count?: number | null
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      seller_analytics: {
        Row: {
          active_listings: number | null
          avg_days_to_sell: number | null
          bookmarked_count: number | null
          created_at: string
          id: string
          offers_received: number | null
          period_end: string
          period_start: string
          revenue_minor: number | null
          sales_count: number | null
          seller_id: string
          total_listings: number | null
          updated_at: string
          views_count: number | null
        }
        Insert: {
          active_listings?: number | null
          avg_days_to_sell?: number | null
          bookmarked_count?: number | null
          created_at?: string
          id?: string
          offers_received?: number | null
          period_end: string
          period_start: string
          revenue_minor?: number | null
          sales_count?: number | null
          seller_id: string
          total_listings?: number | null
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          active_listings?: number | null
          avg_days_to_sell?: number | null
          bookmarked_count?: number | null
          created_at?: string
          id?: string
          offers_received?: number | null
          period_end?: string
          period_start?: string
          revenue_minor?: number | null
          sales_count?: number | null
          seller_id?: string
          total_listings?: number | null
          updated_at?: string
          views_count?: number | null
        }
        Relationships: []
      }
      seller_badges: {
        Row: {
          awarded_at: string
          badge: string
          id: string
          user_id: string
        }
        Insert: {
          awarded_at?: string
          badge: string
          id?: string
          user_id: string
        }
        Update: {
          awarded_at?: string
          badge?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      seller_prefs: {
        Row: {
          auto_accept_pct: number | null
          min_offer_pct: number | null
          user_id: string
        }
        Insert: {
          auto_accept_pct?: number | null
          min_offer_pct?: number | null
          user_id: string
        }
        Update: {
          auto_accept_pct?: number | null
          min_offer_pct?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "seller_prefs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seller_prefs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "public_seller_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      seller_profiles: {
        Row: {
          auto_notify_buyer: boolean | null
          charges_enabled: boolean | null
          created_at: string
          default_dispatch_time_days: number
          default_shipping_option: Database["public"]["Enums"]["shipping_option"]
          details_submitted: boolean
          holiday_end_date: string | null
          holiday_message: string | null
          holiday_mode: boolean
          holiday_start_date: string | null
          is_onboarded: boolean
          onboarding_completed_at: string | null
          payouts_enabled: boolean
          preferred_carriers: string[] | null
          pro_badge: boolean
          pro_verified: boolean
          returns_policy: string | null
          stripe_account_id: string | null
          stripe_connect_onboarding_completed: boolean | null
          updated_at: string
          user_id: string
          vat_number: string | null
        }
        Insert: {
          auto_notify_buyer?: boolean | null
          charges_enabled?: boolean | null
          created_at?: string
          default_dispatch_time_days?: number
          default_shipping_option?: Database["public"]["Enums"]["shipping_option"]
          details_submitted?: boolean
          holiday_end_date?: string | null
          holiday_message?: string | null
          holiday_mode?: boolean
          holiday_start_date?: string | null
          is_onboarded?: boolean
          onboarding_completed_at?: string | null
          payouts_enabled?: boolean
          preferred_carriers?: string[] | null
          pro_badge?: boolean
          pro_verified?: boolean
          returns_policy?: string | null
          stripe_account_id?: string | null
          stripe_connect_onboarding_completed?: boolean | null
          updated_at?: string
          user_id: string
          vat_number?: string | null
        }
        Update: {
          auto_notify_buyer?: boolean | null
          charges_enabled?: boolean | null
          created_at?: string
          default_dispatch_time_days?: number
          default_shipping_option?: Database["public"]["Enums"]["shipping_option"]
          details_submitted?: boolean
          holiday_end_date?: string | null
          holiday_message?: string | null
          holiday_mode?: boolean
          holiday_start_date?: string | null
          is_onboarded?: boolean
          onboarding_completed_at?: string | null
          payouts_enabled?: boolean
          preferred_carriers?: string[] | null
          pro_badge?: boolean
          pro_verified?: boolean
          returns_policy?: string | null
          stripe_account_id?: string | null
          stripe_connect_onboarding_completed?: boolean | null
          updated_at?: string
          user_id?: string
          vat_number?: string | null
        }
        Relationships: []
      }
      seller_rating_aggregates: {
        Row: {
          rating_avg: number
          rating_count: number
          updated_at: string
          user_id: string
        }
        Insert: {
          rating_avg?: number
          rating_count?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          rating_avg?: number
          rating_count?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      seller_shipping_services: {
        Row: {
          carrier: string
          created_at: string
          enabled: boolean
          id: string
          service: string
          updated_at: string
          user_id: string
        }
        Insert: {
          carrier: string
          created_at?: string
          enabled?: boolean
          id?: string
          service: string
          updated_at?: string
          user_id: string
        }
        Update: {
          carrier?: string
          created_at?: string
          enabled?: boolean
          id?: string
          service?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      seller_shipping_settings: {
        Row: {
          created_at: string
          default_address_id: string | null
          dispatch_sla_days: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          default_address_id?: string | null
          dispatch_sla_days?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          default_address_id?: string | null
          dispatch_sla_days?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_settings_default_address"
            columns: ["default_address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
        ]
      }
      sendcloud_parcels: {
        Row: {
          carrier: string | null
          carrier_id: number | null
          carrier_name: string | null
          carrier_service: string | null
          country: string | null
          created_at: string | null
          delivered_at: string | null
          dispatched_at: string | null
          id: string
          label_url: string | null
          metadata: Json | null
          order_id: string
          postcode: string | null
          qr_code_url: string | null
          sendcloud_parcel_id: number | null
          service_point_address: string | null
          service_point_id: number | null
          service_point_name: string | null
          status: string | null
          tracking_number: string | null
          updated_at: string | null
          weight_grams: number | null
        }
        Insert: {
          carrier?: string | null
          carrier_id?: number | null
          carrier_name?: string | null
          carrier_service?: string | null
          country?: string | null
          created_at?: string | null
          delivered_at?: string | null
          dispatched_at?: string | null
          id?: string
          label_url?: string | null
          metadata?: Json | null
          order_id: string
          postcode?: string | null
          qr_code_url?: string | null
          sendcloud_parcel_id?: number | null
          service_point_address?: string | null
          service_point_id?: number | null
          service_point_name?: string | null
          status?: string | null
          tracking_number?: string | null
          updated_at?: string | null
          weight_grams?: number | null
        }
        Update: {
          carrier?: string | null
          carrier_id?: number | null
          carrier_name?: string | null
          carrier_service?: string | null
          country?: string | null
          created_at?: string | null
          delivered_at?: string | null
          dispatched_at?: string | null
          id?: string
          label_url?: string | null
          metadata?: Json | null
          order_id?: string
          postcode?: string | null
          qr_code_url?: string | null
          sendcloud_parcel_id?: number | null
          service_point_address?: string | null
          service_point_id?: number | null
          service_point_name?: string | null
          status?: string | null
          tracking_number?: string | null
          updated_at?: string | null
          weight_grams?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sendcloud_parcels_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      sendcloud_tracking_events: {
        Row: {
          created_at: string | null
          id: string
          location: string | null
          message: string | null
          metadata: Json | null
          parcel_id: string
          status: string
          timestamp: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          location?: string | null
          message?: string | null
          metadata?: Json | null
          parcel_id: string
          status: string
          timestamp: string
        }
        Update: {
          created_at?: string | null
          id?: string
          location?: string | null
          message?: string | null
          metadata?: Json | null
          parcel_id?: string
          status?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "sendcloud_tracking_events_parcel_id_fkey"
            columns: ["parcel_id"]
            isOneToOne: false
            referencedRelation: "sendcloud_parcels"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          created_at: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          created_at?: string
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          created_at?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      shelf_items: {
        Row: {
          created_at: string
          current_page: number | null
          finished_reading_at: string | null
          id: string
          last_progress_update: string | null
          listing_id: string
          notes: string | null
          rating: number | null
          reading_speed_pages_per_day: number | null
          shelf_id: string
          started_reading_at: string | null
          total_pages: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_page?: number | null
          finished_reading_at?: string | null
          id?: string
          last_progress_update?: string | null
          listing_id: string
          notes?: string | null
          rating?: number | null
          reading_speed_pages_per_day?: number | null
          shelf_id: string
          started_reading_at?: string | null
          total_pages?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_page?: number | null
          finished_reading_at?: string | null
          id?: string
          last_progress_update?: string | null
          listing_id?: string
          notes?: string | null
          rating?: number | null
          reading_speed_pages_per_day?: number | null
          shelf_id?: string
          started_reading_at?: string | null
          total_pages?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "shelf_items_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shelf_items_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shelf_items_shelf_id_fkey"
            columns: ["shelf_id"]
            isOneToOne: false
            referencedRelation: "bookshelves"
            referencedColumns: ["id"]
          },
        ]
      }
      shipments: {
        Row: {
          carrier: string | null
          created_at: string
          delivered_at: string | null
          id: string
          order_id: string
          pkg_json: Json | null
          service: string | null
          shipped_at: string | null
          status: Database["public"]["Enums"]["shipment_status"]
          tracking_number: string | null
          updated_at: string
        }
        Insert: {
          carrier?: string | null
          created_at?: string
          delivered_at?: string | null
          id?: string
          order_id: string
          pkg_json?: Json | null
          service?: string | null
          shipped_at?: string | null
          status?: Database["public"]["Enums"]["shipment_status"]
          tracking_number?: string | null
          updated_at?: string
        }
        Update: {
          carrier?: string | null
          created_at?: string
          delivered_at?: string | null
          id?: string
          order_id?: string
          pkg_json?: Json | null
          service?: string | null
          shipped_at?: string | null
          status?: Database["public"]["Enums"]["shipment_status"]
          tracking_number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "shipments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      shipping_disputes: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          description: string | null
          dispute_type: string
          evidence_urls: string[] | null
          id: string
          order_id: string
          reported_by: string
          resolution: string | null
          resolution_type: string | null
          resolved_at: string | null
          resolved_by: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          description?: string | null
          dispute_type: string
          evidence_urls?: string[] | null
          id?: string
          order_id: string
          reported_by: string
          resolution?: string | null
          resolution_type?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          description?: string | null
          dispute_type?: string
          evidence_urls?: string[] | null
          id?: string
          order_id?: string
          reported_by?: string
          resolution?: string | null
          resolution_type?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shipping_disputes_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      shipping_label_voids: {
        Row: {
          created_at: string | null
          id: string
          order_id: string
          sendcloud_label_id: string | null
          sendcloud_parcel_id: string | null
          void_response: Json | null
          void_status: string
          voided_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id: string
          sendcloud_label_id?: string | null
          sendcloud_parcel_id?: string | null
          void_response?: Json | null
          void_status?: string
          voided_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string
          sendcloud_label_id?: string | null
          sendcloud_parcel_id?: string | null
          void_response?: Json | null
          void_status?: string
          voided_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shipping_label_voids_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      shipping_labels: {
        Row: {
          cost_minor: number
          created_at: string
          currency: string
          id: string
          label_url: string | null
          provider: string | null
          shipment_id: string
        }
        Insert: {
          cost_minor?: number
          created_at?: string
          currency?: string
          id?: string
          label_url?: string | null
          provider?: string | null
          shipment_id: string
        }
        Update: {
          cost_minor?: number
          created_at?: string
          currency?: string
          id?: string
          label_url?: string | null
          provider?: string | null
          shipment_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shipping_labels_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      shipping_receipts: {
        Row: {
          cost_minor: number | null
          created_at: string | null
          id: string
          order_id: string
          postal_service: string | null
          receipt_url: string | null
          tracking_number: string | null
          updated_at: string | null
          uploaded_by: string
        }
        Insert: {
          cost_minor?: number | null
          created_at?: string | null
          id?: string
          order_id: string
          postal_service?: string | null
          receipt_url?: string | null
          tracking_number?: string | null
          updated_at?: string | null
          uploaded_by: string
        }
        Update: {
          cost_minor?: number | null
          created_at?: string | null
          id?: string
          order_id?: string
          postal_service?: string | null
          receipt_url?: string | null
          tracking_number?: string | null
          updated_at?: string | null
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "shipping_receipts_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      short_links: {
        Row: {
          code: string
          created_at: string | null
          target_url: string
        }
        Insert: {
          code: string
          created_at?: string | null
          target_url: string
        }
        Update: {
          code?: string
          created_at?: string | null
          target_url?: string
        }
        Relationships: []
      }
      sms_verification_codes: {
        Row: {
          attempts: number
          code: string
          created_at: string
          expires_at: string
          id: string
          phone: string
          user_id: string
          verified_at: string | null
        }
        Insert: {
          attempts?: number
          code: string
          created_at?: string
          expires_at?: string
          id?: string
          phone: string
          user_id: string
          verified_at?: string | null
        }
        Update: {
          attempts?: number
          code?: string
          created_at?: string
          expires_at?: string
          id?: string
          phone?: string
          user_id?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      social_recommendations: {
        Row: {
          created_at: string
          id: string
          listing_id: string
          score: number | null
          source_id: string | null
          source_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          listing_id: string
          score?: number | null
          source_id?: string | null
          source_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          listing_id?: string
          score?: number | null
          source_id?: string | null
          source_type?: string
          user_id?: string
        }
        Relationships: []
      }
      spotlight_promotions: {
        Row: {
          amount_minor: number
          created_at: string
          expires_at: string
          id: string
          is_active: boolean
          listing_id: string
          seller_id: string
          starts_at: string
          stripe_payment_intent_id: string | null
        }
        Insert: {
          amount_minor: number
          created_at?: string
          expires_at: string
          id?: string
          is_active?: boolean
          listing_id: string
          seller_id: string
          starts_at?: string
          stripe_payment_intent_id?: string | null
        }
        Update: {
          amount_minor?: number
          created_at?: string
          expires_at?: string
          id?: string
          is_active?: boolean
          listing_id?: string
          seller_id?: string
          starts_at?: string
          stripe_payment_intent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "spotlight_promotions_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spotlight_promotions_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_picks: {
        Row: {
          active: boolean
          created_at: string
          curated_by: string | null
          end_at: string | null
          id: string
          listing_id: string
          notes: string | null
          rank: number | null
          sort_order: number
          start_at: string | null
          tag: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          curated_by?: string | null
          end_at?: string | null
          id?: string
          listing_id: string
          notes?: string | null
          rank?: number | null
          sort_order?: number
          start_at?: string | null
          tag?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          curated_by?: string | null
          end_at?: string | null
          id?: string
          listing_id?: string
          notes?: string | null
          rank?: number | null
          sort_order?: number
          start_at?: string | null
          tag?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_picks_curated_by_fkey"
            columns: ["curated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_picks_curated_by_fkey"
            columns: ["curated_by"]
            isOneToOne: false
            referencedRelation: "public_seller_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_picks_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: true
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_picks_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: true
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      static_pages: {
        Row: {
          content_html: string
          created_at: string
          id: string
          published: boolean
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          content_html: string
          created_at?: string
          id?: string
          published?: boolean
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          content_html?: string
          created_at?: string
          id?: string
          published?: boolean
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      test_listings: {
        Row: {
          author: string
          condition: Database["public"]["Enums"]["book_condition"]
          cover_image_url: string
          created_at: string
          genre: string | null
          id: string
          price_minor: number
          seller_id: string
          title: string
        }
        Insert: {
          author: string
          condition?: Database["public"]["Enums"]["book_condition"]
          cover_image_url: string
          created_at?: string
          genre?: string | null
          id?: string
          price_minor: number
          seller_id: string
          title: string
        }
        Update: {
          author?: string
          condition?: Database["public"]["Enums"]["book_condition"]
          cover_image_url?: string
          created_at?: string
          genre?: string | null
          id?: string
          price_minor?: number
          seller_id?: string
          title?: string
        }
        Relationships: []
      }
      test_orders: {
        Row: {
          book_price_minor: number
          buyer_email: string
          buyer_id: string
          buyer_name: string
          buyer_phone: string
          created_at: string | null
          currency: string
          delivery_address: Json | null
          delivery_method: string
          estimated_delivery_days: string | null
          id: string
          listing_id: string
          payment_method: string
          pickup_point_address: string | null
          pickup_point_id: string | null
          pickup_point_name: string | null
          reader_shield_minor: number
          seller_id: string
          sendcloud_data: Json | null
          shipping_minor: number
          status: string
          subtotal_minor: number
          total_minor: number
          wallet_balance_used: boolean | null
          wallet_deduction_minor: number | null
        }
        Insert: {
          book_price_minor: number
          buyer_email: string
          buyer_id: string
          buyer_name: string
          buyer_phone: string
          created_at?: string | null
          currency?: string
          delivery_address?: Json | null
          delivery_method: string
          estimated_delivery_days?: string | null
          id?: string
          listing_id: string
          payment_method?: string
          pickup_point_address?: string | null
          pickup_point_id?: string | null
          pickup_point_name?: string | null
          reader_shield_minor: number
          seller_id: string
          sendcloud_data?: Json | null
          shipping_minor: number
          status?: string
          subtotal_minor: number
          total_minor: number
          wallet_balance_used?: boolean | null
          wallet_deduction_minor?: number | null
        }
        Update: {
          book_price_minor?: number
          buyer_email?: string
          buyer_id?: string
          buyer_name?: string
          buyer_phone?: string
          created_at?: string | null
          currency?: string
          delivery_address?: Json | null
          delivery_method?: string
          estimated_delivery_days?: string | null
          id?: string
          listing_id?: string
          payment_method?: string
          pickup_point_address?: string | null
          pickup_point_id?: string | null
          pickup_point_name?: string | null
          reader_shield_minor?: number
          seller_id?: string
          sendcloud_data?: Json | null
          shipping_minor?: number
          status?: string
          subtotal_minor?: number
          total_minor?: number
          wallet_balance_used?: boolean | null
          wallet_deduction_minor?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "test_orders_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "test_orders_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      trending_books: {
        Row: {
          active: boolean
          created_at: string
          curated_by: string | null
          id: string
          listing_id: string
          notes: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          curated_by?: string | null
          id?: string
          listing_id: string
          notes?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          curated_by?: string | null
          id?: string
          listing_id?: string
          notes?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trending_books_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trending_books_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      trending_searches: {
        Row: {
          created_at: string | null
          id: string
          period: string
          search_count: number
          search_term: string
          trending_score: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          period: string
          search_count?: number
          search_term: string
          trending_score?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          period?: string
          search_count?: number
          search_term?: string
          trending_score?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      user_activities: {
        Row: {
          activity_type: string
          created_at: string
          entity_id: string | null
          entity_type: string | null
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      user_activity_feed: {
        Row: {
          activity_type: string
          created_at: string
          entity_id: string | null
          entity_type: string | null
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          active: boolean
          badge_data: Json | null
          badge_type: string
          earned_at: string
          expires_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          active?: boolean
          badge_data?: Json | null
          badge_type: string
          earned_at?: string
          expires_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          active?: boolean
          badge_data?: Json | null
          badge_type?: string
          earned_at?: string
          expires_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_challenge_progress: {
        Row: {
          challenge_id: string
          completed: boolean
          completed_at: string | null
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_challenge_progress_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "daily_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: []
      }
      user_interactions: {
        Row: {
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          interaction_type: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          interaction_type: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          interaction_type?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      user_points: {
        Row: {
          created_at: string | null
          last_earned_at: string | null
          lifetime_points: number
          points_balance: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          last_earned_at?: string | null
          lifetime_points?: number
          points_balance?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          last_earned_at?: string | null
          lifetime_points?: number
          points_balance?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_quest_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          current_progress: number
          id: string
          quest_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          current_progress?: number
          id?: string
          quest_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          current_progress?: number
          id?: string
          quest_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_quest_progress_quest_id_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "daily_quests"
            referencedColumns: ["id"]
          },
        ]
      }
      user_reading_history: {
        Row: {
          created_at: string | null
          id: string
          interaction_type: string
          listing_id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          interaction_type: string
          listing_id: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          interaction_type?: string
          listing_id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_streaks: {
        Row: {
          best_count: number | null
          current_count: number | null
          id: string
          last_updated_at: string | null
          streak_type: string
          user_id: string
        }
        Insert: {
          best_count?: number | null
          current_count?: number | null
          id?: string
          last_updated_at?: string | null
          streak_type: string
          user_id: string
        }
        Update: {
          best_count?: number | null
          current_count?: number | null
          id?: string
          last_updated_at?: string | null
          streak_type?: string
          user_id?: string
        }
        Relationships: []
      }
      user_sustainability_stats: {
        Row: {
          books_bought: number | null
          books_sold: number | null
          created_at: string | null
          last_purchase_at: string | null
          last_sale_at: string | null
          total_co2_saved_kg: number | null
          total_contribution_minor: number | null
          trees_saved_equivalent: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          books_bought?: number | null
          books_sold?: number | null
          created_at?: string | null
          last_purchase_at?: string | null
          last_sale_at?: string | null
          total_co2_saved_kg?: number | null
          total_contribution_minor?: number | null
          trees_saved_equivalent?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          books_bought?: number | null
          books_sold?: number | null
          created_at?: string | null
          last_purchase_at?: string | null
          last_sale_at?: string | null
          total_co2_saved_kg?: number | null
          total_contribution_minor?: number | null
          trees_saved_equivalent?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_taste_profile: {
        Row: {
          created_at: string | null
          preferred_authors: string[] | null
          preferred_genres: string[] | null
          price_range_max: number | null
          price_range_min: number | null
          reading_moods: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          preferred_authors?: string[] | null
          preferred_genres?: string[] | null
          price_range_max?: number | null
          price_range_min?: number | null
          reading_moods?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          preferred_authors?: string[] | null
          preferred_genres?: string[] | null
          price_range_max?: number | null
          price_range_min?: number | null
          reading_moods?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      wallet_accounts: {
        Row: {
          balance_minor: number
          created_at: string
          currency: string
          hold_minor: number
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          balance_minor?: number
          created_at?: string
          currency?: string
          hold_minor?: number
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          balance_minor?: number
          created_at?: string
          currency?: string
          hold_minor?: number
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      wallet_reservations: {
        Row: {
          amount_minor: number
          captured_at: string | null
          created_at: string
          id: string
          order_id: string
          released_at: string | null
          status: string
          user_id: string
        }
        Insert: {
          amount_minor: number
          captured_at?: string | null
          created_at?: string
          id?: string
          order_id: string
          released_at?: string | null
          status?: string
          user_id: string
        }
        Update: {
          amount_minor?: number
          captured_at?: string | null
          created_at?: string
          id?: string
          order_id?: string
          released_at?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      wallet_transactions: {
        Row: {
          account_id: string
          amount_minor: number
          created_at: string
          description: string | null
          id: string
          metadata: Json | null
          reference_id: string | null
          reference_type: string | null
          stripe_payout_id: string | null
          stripe_transfer_id: string | null
          transaction_type: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string | null
        }
        Insert: {
          account_id: string
          amount_minor: number
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          reference_id?: string | null
          reference_type?: string | null
          stripe_payout_id?: string | null
          stripe_transfer_id?: string | null
          transaction_type?: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          user_id?: string | null
        }
        Update: {
          account_id?: string
          amount_minor?: number
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          reference_id?: string | null
          reference_type?: string | null
          stripe_payout_id?: string | null
          stripe_transfer_id?: string | null
          transaction_type?: string | null
          type?: Database["public"]["Enums"]["transaction_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "wallet_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      wanted_books: {
        Row: {
          author: string
          created_at: string | null
          description: string | null
          google_books_id: string | null
          id: string
          is_available: boolean | null
          isbn10: string | null
          isbn13: string | null
          matched_listing_id: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          author: string
          created_at?: string | null
          description?: string | null
          google_books_id?: string | null
          id?: string
          is_available?: boolean | null
          isbn10?: string | null
          isbn13?: string | null
          matched_listing_id?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          author?: string
          created_at?: string | null
          description?: string | null
          google_books_id?: string | null
          id?: string
          is_available?: boolean | null
          isbn10?: string | null
          isbn13?: string | null
          matched_listing_id?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wanted_books_matched_listing_id_fkey"
            columns: ["matched_listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wanted_books_matched_listing_id_fkey"
            columns: ["matched_listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlist_items: {
        Row: {
          created_at: string
          id: string
          listing_id: string
          wishlist_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          listing_id: string
          wishlist_id: string
        }
        Update: {
          created_at?: string
          id?: string
          listing_id?: string
          wishlist_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_items_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "book_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlist_items_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "seller_active_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlist_items_wishlist_id_fkey"
            columns: ["wishlist_id"]
            isOneToOne: false
            referencedRelation: "wishlists"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlists: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      xp_events: {
        Row: {
          created_at: string | null
          event_description: string | null
          event_type: string
          id: string
          metadata: Json | null
          user_id: string
          xp_amount: number
        }
        Insert: {
          created_at?: string | null
          event_description?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          user_id: string
          xp_amount: number
        }
        Update: {
          created_at?: string | null
          event_description?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          user_id?: string
          xp_amount?: number
        }
        Relationships: []
      }
    }
    Views: {
      public_seller_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          display_name: string | null
          id: string | null
          joined_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          display_name?: string | null
          id?: string | null
          joined_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          display_name?: string | null
          id?: string | null
          joined_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      seller_active_listings: {
        Row: {
          author: string | null
          condition: Database["public"]["Enums"]["book_condition"] | null
          format: Database["public"]["Enums"]["book_format"] | null
          id: string | null
          isbn10: string | null
          isbn13: string | null
          price_minor: number | null
          primary_image_url: string | null
          seller_id: string | null
          slug: string | null
          title: string | null
        }
        Insert: {
          author?: string | null
          condition?: Database["public"]["Enums"]["book_condition"] | null
          format?: Database["public"]["Enums"]["book_format"] | null
          id?: string | null
          isbn10?: string | null
          isbn13?: string | null
          price_minor?: number | null
          primary_image_url?: string | null
          seller_id?: string | null
          slug?: string | null
          title?: string | null
        }
        Update: {
          author?: string | null
          condition?: Database["public"]["Enums"]["book_condition"] | null
          format?: Database["public"]["Enums"]["book_format"] | null
          id?: string | null
          isbn10?: string | null
          isbn13?: string | null
          price_minor?: number | null
          primary_image_url?: string | null
          seller_id?: string | null
          slug?: string | null
          title?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      add_user_role: { Args: { p_role: string }; Returns: undefined }
      auto_complete_delivered_orders: { Args: never; Returns: undefined }
      calculate_distance_miles: {
        Args: { lat1: number; lat2: number; lon1: number; lon2: number }
        Returns: number
      }
      calculate_spotlight_fee: {
        Args: { listing_price_minor: number }
        Returns: number
      }
      check_escrow_auto_release: { Args: never; Returns: undefined }
      cleanup_expired_holds: { Args: never; Returns: undefined }
      cleanup_expired_otps: { Args: never; Returns: undefined }
      complete_referral_and_issue_rewards: {
        Args: { referral_id: string }
        Returns: boolean
      }
      create_user_address: {
        Args: {
          p_city: string
          p_country: string
          p_full_name: string
          p_line1: string
          p_line2: string
          p_postcode: string
        }
        Returns: undefined
      }
      enqueue_email: {
        Args: {
          entity_id?: string
          event_key: string
          to_email: string
          user_id?: string
          variables?: Json
        }
        Returns: string
      }
      generate_charity_slug: { Args: { charity_name: string }; Returns: string }
      generate_gift_card_code: { Args: never; Returns: string }
      generate_initials: { Args: { email: string }; Returns: string }
      get_admin_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["admin_role"]
      }
      get_available_listings_for_shelf_books: {
        Args: { p_user_id: string }
        Returns: {
          available_listing_id: string
          available_listing_price_minor: number
          available_listing_slug: string
          available_listing_title: string
          match_type: string
          shelf_item_listing_id: string
        }[]
      }
      get_homepage_collections: {
        Args: never
        Returns: {
          book_count: number
          color: string
          description: string
          display_order: number
          icon_name: string
          id: string
          name: string
          slug: string
        }[]
      }
      get_latest_listing_prices: {
        Args: never
        Returns: {
          latest_price_minor: number
          listing_id: string
          recorded_at: string
        }[]
      }
      get_listing_popularity_90d: {
        Args: never
        Returns: {
          listing_id: string
          score: number
        }[]
      }
      get_live_template: {
        Args: { template_key: string }
        Returns: {
          html: string
          id: string
          key: string
          name: string
          preview_text: string
          published_at: string
          subject: string
          text_alt: string
          variables: Json
          version: number
        }[]
      }
      get_popular_reading_moods: {
        Args: never
        Returns: {
          count: number
          mood: string
        }[]
      }
      get_public_profiles: {
        Args: never
        Returns: {
          avatar_source: string
          avatar_url: string
          banner_url: string
          bio: string
          created_at: string
          display_name: string
          id: string
          initials: string
          location_city: string
          updated_at: string
          username: string
        }[]
      }
      get_trending_searches: {
        Args: { limit_count?: number }
        Returns: {
          query: string
          search_count: number
        }[]
      }
      get_user_charity_ids: { Args: { _user_id: string }; Returns: string[] }
      get_user_ratings: {
        Args: never
        Returns: {
          avg_stars: number
          five_stars: number
          four_stars: number
          one_star: number
          review_count: number
          three_stars: number
          two_stars: number
          user_id: string
        }[]
      }
      has_active_subscription: { Args: { _user_id: string }; Returns: boolean }
      has_admin_role: {
        Args: {
          _role: Database["public"]["Enums"]["admin_role"]
          _user_id: string
        }
        Returns: boolean
      }
      has_min_admin_role: {
        Args: {
          _min_role: Database["public"]["Enums"]["admin_role"]
          _user_id: string
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      is_charity_admin: {
        Args: { _charity_id: string; _user_id: string }
        Returns: boolean
      }
      is_charity_member: {
        Args: { _charity_id: string; _user_id: string }
        Returns: boolean
      }
      log_admin_audit: {
        Args: {
          _action: string
          _actor_id: string
          _entity_id: string
          _entity_type: string
          _from_data?: Json
          _ip_address?: unknown
          _session_id?: string
          _to_data?: Json
          _user_agent?: string
        }
        Returns: string
      }
      normalize_author: { Args: { author_text: string }; Returns: string }
      normalize_isbn: { Args: { isbn: string }; Returns: string }
      normalize_title: { Args: { title_text: string }; Returns: string }
      process_payout: {
        Args: {
          p_amount_minor: number
          p_stripe_transfer_id: string
          p_user_id: string
        }
        Returns: Json
      }
      redeem_gift_card: {
        Args: { p_code: string; p_user_id: string }
        Returns: Json
      }
      search_books_hybrid: {
        Args: {
          category?: string
          condition?: string
          format?: string
          limit_count?: number
          max_price_cents?: number
          offset_count?: number
          q: string
          query_embedding: string
        }
        Returns: {
          author: string
          category: string
          condition: string
          cover_url: string
          description: string
          format: string
          id: string
          isbn: string
          price_cents: number
          score: number
          seller_id: string
          tags: string[]
          title: string
        }[]
      }
      update_wanted_books_availability: { Args: never; Returns: undefined }
      user_has_active_listings: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      admin_role:
        | "super_admin"
        | "ops_admin"
        | "support_agent"
        | "read_only"
        | "editor"
      app_role: "admin" | "pro_seller" | "user" | "moderator"
      book_club_frequency:
        | "weekly"
        | "fortnightly"
        | "monthly"
        | "bi_monthly"
        | "quarterly"
      book_club_meeting_type: "online" | "in_person" | "hybrid"
      book_condition:
        | "new"
        | "like_new"
        | "very_good"
        | "good"
        | "acceptable"
        | "poor"
      book_format: "hardcover" | "paperback" | "ebook" | "audiobook"
      dispute_status:
        | "open"
        | "under_review"
        | "resolved_refund"
        | "resolved_no_refund"
        | "cancelled"
        | "resolved_buyer_favour"
        | "resolved_seller_favour"
      listing_status: "draft" | "active" | "paused" | "removed" | "sold"
      onboarding_status:
        | "not_started"
        | "in_progress"
        | "completed"
        | "seller_pending_requirements"
      order_status:
        | "pending"
        | "paid"
        | "processing"
        | "shipped"
        | "delivered"
        | "completed"
        | "cancelled"
        | "refunded"
        | "pending_payment"
        | "paid_awaiting_dispatch"
        | "preparing_shipment"
        | "dispatched"
        | "disputed"
        | "checkout_initiated"
        | "payment_pending"
        | "label_created"
      shelf_type: "want_to_read" | "currently_reading" | "read" | "custom"
      shipment_status:
        | "pending"
        | "label_generated"
        | "in_transit"
        | "out_for_delivery"
        | "delivered"
        | "returned"
        | "lost"
        | "label_created"
        | "dispatched"
        | "cancelled"
      shipping_option: "BUYER_LABEL" | "SELLER_PAYS" | "LOCAL_PICKUP"
      transaction_type:
        | "credit"
        | "debit"
        | "hold"
        | "release"
        | "payout"
        | "fee"
        | "refund"
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
      admin_role: [
        "super_admin",
        "ops_admin",
        "support_agent",
        "read_only",
        "editor",
      ],
      app_role: ["admin", "pro_seller", "user", "moderator"],
      book_club_frequency: [
        "weekly",
        "fortnightly",
        "monthly",
        "bi_monthly",
        "quarterly",
      ],
      book_club_meeting_type: ["online", "in_person", "hybrid"],
      book_condition: [
        "new",
        "like_new",
        "very_good",
        "good",
        "acceptable",
        "poor",
      ],
      book_format: ["hardcover", "paperback", "ebook", "audiobook"],
      dispute_status: [
        "open",
        "under_review",
        "resolved_refund",
        "resolved_no_refund",
        "cancelled",
        "resolved_buyer_favour",
        "resolved_seller_favour",
      ],
      listing_status: ["draft", "active", "paused", "removed", "sold"],
      onboarding_status: [
        "not_started",
        "in_progress",
        "completed",
        "seller_pending_requirements",
      ],
      order_status: [
        "pending",
        "paid",
        "processing",
        "shipped",
        "delivered",
        "completed",
        "cancelled",
        "refunded",
        "pending_payment",
        "paid_awaiting_dispatch",
        "preparing_shipment",
        "dispatched",
        "disputed",
        "checkout_initiated",
        "payment_pending",
        "label_created",
      ],
      shelf_type: ["want_to_read", "currently_reading", "read", "custom"],
      shipment_status: [
        "pending",
        "label_generated",
        "in_transit",
        "out_for_delivery",
        "delivered",
        "returned",
        "lost",
        "label_created",
        "dispatched",
        "cancelled",
      ],
      shipping_option: ["BUYER_LABEL", "SELLER_PAYS", "LOCAL_PICKUP"],
      transaction_type: [
        "credit",
        "debit",
        "hold",
        "release",
        "payout",
        "fee",
        "refund",
      ],
    },
  },
} as const
