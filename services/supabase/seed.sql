-- services/supabase/seed.sql

-- This file contains SQL INSERT statements to populate the database tables
-- with initial seed data for the IDE AI Rule Generation web application.
--
-- IMPORTANT: This script should be run AFTER the database schema has been created
-- (e.g., after running `supabase db reset` with schema.sql or applying schema
-- via the Supabase UI).

------------------------------------------------------------------------------------
-- Seed Data:
-- Insert initial data into the tables to get started.
------------------------------------------------------------------------------------

------------------------------------------------------------------------------------
-- tech_stacks Seed Data (Corrected - letting DB generate UUIDs - no changes needed here)
------------------------------------------------------------------------------------
INSERT INTO tech_stacks (name, version, category, description) VALUES
('Next.js', '15.latest', 'frontend', 'React framework with App Router and Server Components'),
('React', '18.latest', 'frontend-library', 'Component-based UI library'),
('TypeScript', '5.latest', 'language', 'Statically typed superset of JavaScript'),
('ESLint', '8.latest', 'tooling', 'Pluggable JavaScript and TypeScript linter'),
('Prettier', '3.latest', 'tooling', 'Code formatter for consistent style');


------------------------------------------------------------------------------------
-- rules Seed Data (Corrected - Value list length and explicit UUIDs for rules)
-- IMPORTANT: We are now explicitly providing UUIDs for rules to reference them in rule_sets correctly
------------------------------------------------------------------------------------
INSERT INTO rules (id, tech_stack_id, category, name, description, rule_content, tags, parameters) VALUES
('a1b2c3d4-e5f6-7890-1234-567890abcdef', (SELECT id FROM tech_stacks WHERE name = 'Next.js'), 'File Structure', 'Next.js App Router File Structure', 'Standard file naming conventions for Next.js 15+ App Router projects',
'# File Structure Rules for Next.js App Router:

- Use `page.{page_extension}` for route pages in the `app/` directory.
- Use `layout.{layout_extension}` for shared layouts within directories.
- Group related routes in folders under `app/`.
- Place API routes in `app/api` directory using `route.{route_extension}`.',
ARRAY['file-structure', 'app-router', 'conventions'],
'{"page_extension": "tsx", "layout_extension": "tsx", "route_extension": "ts"}'),

('b9c8d7e6-f5a4-3210-fedc-ba9876543210', (SELECT id FROM tech_stacks WHERE name = 'Next.js'), 'Component Organization', 'Next.js Component Organization', 'Best practices for organizing React components in Next.js projects',
'# Component Organization in Next.js:

- Place React components in a `components/` directory at the root of your project or within feature folders.
- Use `components/server/` for Server Components and `components/client/` for Client Components if separation is needed.
- Consider feature-based folders to colocate components, styles, and tests related to a specific feature.',
ARRAY['components', 'architecture', 'organization'], NULL), -- Corrected: Added NULL for parameters to match 7 columns

('c0d9e8f7-a6b5-4321-0123-456789abcdef', (SELECT id FROM tech_stacks WHERE name = 'ESLint'), 'Linting', 'React Hooks Rules (ESLint)', 'Recommended ESLint rules for React Hooks best practices',
'# ESLint Rules for React Hooks:

- **`eslint-plugin-react-hooks`**:  Enforce rules of React Hooks for correct usage.
  - Enable `rules-of-hooks` and `exhaustive-deps` rules.
  - Example ESLint configuration in `.eslintrc.js`:
    ```javascript
    module.exports = {
      plugins: ["react-hooks"],
      rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
      }
    };
    ```',
ARRAY['linting', 'react', 'hooks', 'eslint'], NULL), -- Corrected: Added NULL for parameters to match 7 columns

('d1e2f3a4-b7c6-5432-10fe-dcba98765432', (SELECT id FROM tech_stacks WHERE name = 'Prettier'), 'Code Style', 'Basic Prettier Formatting', 'Basic Prettier configuration for code formatting',
'# Prettier Configuration:

- Enforce consistent code formatting with Prettier.
- Basic Prettier configuration (e.g., in `.prettierrc.json` or `.prettierrc.js`):
  ```json
  {
    "semi": true,
    "trailingComma": "all",
    "singleQuote": true,
    "printWidth": 100,
    "tabWidth": 2,
    "useTabs": false
  }
  ```',
ARRAY['code-style', 'formatting', 'prettier', 'basic'], NULL); -- Corrected: Added NULL for parameters to match 7 columns


------------------------------------------------------------------------------------
-- rule_sets Seed Data (Corrected - using UUID arrays for rules column)
------------------------------------------------------------------------------------
INSERT INTO rule_sets (name, description, rules) VALUES
('Next.js 15 Standard Setup', 'Standard ruleset for Next.js 15 projects with App Router, ESLint and Prettier',
ARRAY[
    'a1b2c3d4-e5f6-7890-1234-567890abcdef'::uuid,  -- Next.js App Router File Structure rule UUID (CAST to UUID!)
    'b9c8d7e6-f5a4-3210-fedc-ba9876543210'::uuid, -- Next.js Component Organization rule UUID (CAST to UUID!)
    'c0d9e8f7-a6b5-4321-0123-456789abcdef'::uuid, -- ESLint React Hooks rules UUID (CAST to UUID!)
    'd1e2f3a4-b7c6-5432-10fe-dcba98765432'::uuid  -- Basic Prettier formatting UUID (CAST to UUID!)
]);


------------------------------------------------------------------------------------
-- user_preferences Seed Data (Corrected - letting DB generate UUIDs - now with VALID UUIDs for user_id)
------------------------------------------------------------------------------------
INSERT INTO user_preferences (user_id, name, preferences) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'John Doe''s Preferences', -- Corrected: Valid UUID for user_id - John Doe
'{"indentation": "spaces", "indentation_size": 2, "quote_style": "single", "semi": false}'),

('660e8400-e29b-41d4-a716-446655440001', 'Jane Smith''s Strict Style', -- Corrected: Valid UUID for user_id - Jane Smith
'{"indentation": "tabs", "quote_style": "double", "max_line_length": 80, "semi": true}');


-- IMPORTANT NOTES:
-- 1. rules Seed Data is corrected:
--    - Explicit UUIDs are provided for the 'id' column of each rule (e.g., 'a1b2c3d4-e5f6-7890-1234-567890abcdef').
--    - Ensure these UUIDs are valid UUID format. You can generate them using a UUID generator.
--    - Corrected value list length error by adding `NULL` for the `parameters` column in rules INSERTs where parameters were missing, to ensure 7 values for 7 columns. (Now 8 values including 'id')
-- 2. rule_sets Seed Data is corrected:
--    - The `rules` array now contains UUIDs (the ones we defined for rules) and each element is explicitly CAST to UUID using `::uuid`.
-- 3. user_preferences Seed Data is corrected:
--    - Valid UUIDs are now used for the `user_id` column in `user_preferences` table.
--    - Example UUIDs: '550e8400-e29b-41d4-a716-446655440000' (John Doe), '660e8400-e29b-41d4-a716-446655440001' (Jane Smith).
--    - **You can replace these example UUIDs with your own if needed.**

-- To apply this seed data, run `supabase db seed` or use the Supabase UI SQL editor.