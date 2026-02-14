export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Project: {
        Row: {
          id: string;
          title: string;
          description: string;
          projectUrl: string | null;
          githubUrl: string | null;
          featured: boolean;
          order: number;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id: string;
          title: string;
          description: string;
          projectUrl?: string | null;
          githubUrl?: string | null;
          featured?: boolean;
          order?: number;
          createdAt?: string;
          updatedAt: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          projectUrl?: string | null;
          githubUrl?: string | null;
          featured?: boolean;
          order?: number;
          createdAt?: string;
          updatedAt?: string;
        };
        Relationships: [];
      };
      ProjectTechnology: {
        Row: {
          id: string;
          projectId: string;
          technologyId: string;
        };
        Insert: {
          id: string;
          projectId: string;
          technologyId: string;
        };
        Update: {
          id?: string;
          projectId?: string;
          technologyId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ProjectTechnology_projectId_fkey";
            columns: ["projectId"];
            referencedRelation: "Project";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ProjectTechnology_technologyId_fkey";
            columns: ["technologyId"];
            referencedRelation: "Technology";
            referencedColumns: ["id"];
          }
        ];
      };
      Technology: {
        Row: {
          id: string;
          name: string;
          icon: string | null;
          category: string | null;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id: string;
          name: string;
          icon?: string | null;
          category?: string | null;
          createdAt?: string;
          updatedAt: string;
        };
        Update: {
          id?: string;
          name?: string;
          icon?: string | null;
          category?: string | null;
          createdAt?: string;
          updatedAt?: string;
        };
        Relationships: [];
      };
      User: {
        Row: {
          id: string;
          email: string;
          password: string;
          name: string | null;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id: string;
          email: string;
          password: string;
          name?: string | null;
          createdAt?: string;
          updatedAt: string;
        };
        Update: {
          id?: string;
          email?: string;
          password?: string;
          name?: string | null;
          createdAt?: string;
          updatedAt?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Types utilitaires pour faciliter l'utilisation
export type Project = Database['public']['Tables']['Project']['Row'];
export type Technology = Database['public']['Tables']['Technology']['Row'];
export type ProjectTechnology = Database['public']['Tables']['ProjectTechnology']['Row'];
export type User = Database['public']['Tables']['User']['Row'];

// Type pour un projet avec ses technologies
export type ProjectWithTechnologies = Project & {
  technologies: Technology[];
};
