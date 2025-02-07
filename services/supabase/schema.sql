-- services/supabase/schema.sql

-- This file defines the database schema for the IDE AI Rule Generation web application in Supabase.

------------------------------------------------------------------------------------
-- tech_stacks Table:
-- Stores information about different technology stacks (e.g., Next.js, React, Vue).
------------------------------------------------------------------------------------
create table tech_stacks (
  id uuid primary key default gen_random_uuid(),
  name text not null,             -- Name of the tech stack (e.g., "Next.js")
  version text not null,          -- Version of the tech stack (e.g., "15.0")
  category text not null,         -- Category of the tech stack (e.g., "frontend", "backend", "language")
  description text,               -- Optional description of the tech stack
  created_at timestamp with time zone default now(),
  unique(name, version)          -- Ensure uniqueness for name and version combination
);

------------------------------------------------------------------------------------
-- rules Table:
-- Stores individual, reusable rules associated with tech stacks.
-- 'category' is used to group rules by type (e.g., "File Structure", "Linting").
-- 'tags' provide further, more granular classification for filtering and searching.
------------------------------------------------------------------------------------
create table rules (
  id uuid primary key default gen_random_uuid(),
  tech_stack_id uuid references tech_stacks(id), -- Foreign key referencing tech_stacks table
  name text not null,             -- Name of the rule (e.g., "App Router File Structure")
  description text,               -- Description of the rule
  rule_content text not null,      -- The actual content of the rule (e.g., in Markdown format)
  tags text[],                    -- Array of tags for categorizing and filtering rules (e.g., ['file-structure', 'conventions'])
  category text not null,         -- Category of the rule (e.g., "File Structure", "Linting", "Code Style")
  parameters jsonb,             -- For parameterized rules (e.g., {"indentation": "spaces"})
  created_at timestamp with time zone default now()
);

------------------------------------------------------------------------------------
-- rule_sets Table:
-- Stores collections of rules that work well together as a pre-defined ruleset.
------------------------------------------------------------------------------------
create table rule_sets (
  id uuid primary key default gen_random_uuid(),
  name text not null,             -- Name of the rule set (e.g., "Next.js 15 Standard Setup")
  description text,               -- Description of the rule set
  rules uuid[] not null,          -- Array of rule UUIDs that belong to this rule set
  created_at timestamp with time zone default now()
);

------------------------------------------------------------------------------------
-- user_profiles Table:
-- Stores user-specific preferences for rule generation.
------------------------------------------------------------------------------------
create table user_preferences (  -- Renamed table to user_preferences
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,          -- User ID (adjust if needed)
  name text not null,             -- Profile name (e.g., "My Coding Style", "Strict Rules")
  preferences jsonb,              -- JSON to store key-value pairs of preferences (e.g., {"indentation": "spaces", "quote_style": "single"})
  created_at timestamp with time zone default now()
);

------------------------------------------------------------------------------------
-- Indexes for Performance:
-- These indexes improve query performance, especially for filtering and relationships.
------------------------------------------------------------------------------------
CREATE INDEX idx_tech_stacks_category ON tech_stacks (category); -- Index for filtering tech stacks by category
CREATE INDEX idx_rules_tech_stack_id ON rules (tech_stack_id); -- Index for fast lookup of rules by tech stack
CREATE INDEX idx_rules_category ON rules (category);           -- Index for fast lookup of rules by category
CREATE INDEX idx_rules_tags ON rules USING gin (tags);        -- GIN index for efficient tag filtering (array search)
CREATE INDEX idx_rule_sets_rules ON rule_sets USING gin (rules); -- GIN index for efficient searching of rules within rule sets
CREATE INDEX idx_user_profiles_user_id ON user_profiles (user_id); -- Index for fast lookup of user profiles by user ID
CREATE INDEX idx_user_preferences_user_id ON user_preferences (user_id); -- Create index with new table name