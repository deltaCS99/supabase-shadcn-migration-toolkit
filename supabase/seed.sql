-- Seed data for projects
-- Note: These will only work once you have actual users in the system
-- Replace 'user-uuid-here' with actual user IDs when you have them

-- Example projects (these won't actually insert without valid user IDs)
/*
INSERT INTO public.projects (name, description, status, user_id)
VALUES 
  ('Personal Website', 'My portfolio website built with Next.js', 'active', 'user-uuid-here'),
  ('E-commerce Platform', 'Online store with payment integration', 'planning', 'user-uuid-here'),
  ('Mobile App Backend', 'API services for the mobile application', 'in-progress', 'user-uuid-here');
*/

-- This is a safer way to seed data that doesn't require existing users
-- It will create test data for any new user that signs up
CREATE OR REPLACE FUNCTION create_sample_data_for_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create sample projects for the new user
  INSERT INTO public.projects (name, description, status, user_id)
  VALUES 
    ('Sample Project 1', 'This is an example project to help you get started', 'active', NEW.id),
    ('Sample Project 2', 'Another example project with different settings', 'planning', NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add this trigger if you want sample data created for each new user
-- Comment it out if you don't want sample data automatically created
CREATE TRIGGER on_auth_user_created_sample_data
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE create_sample_data_for_new_user();