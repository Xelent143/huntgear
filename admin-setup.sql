-- XELENT HUNTGEAR - Admin Setup Script
-- Run this in phpMyAdmin SQL tab

-- Delete any existing admin users with wrong emails
DELETE FROM users WHERE email LIKE '%sialkotsamplemasters%' OR openId LIKE '%sialkotsamplemasters%';

-- Delete all admin users to start fresh
DELETE FROM users WHERE role = 'admin';

-- Insert correct admin user with password: Admin@123
-- Password hash generated with: crypto.scryptSync('Admin@123', salt, 64)
INSERT INTO users (
  openId, 
  name, 
  email, 
  role, 
  loginMethod, 
  password,
  createdAt,
  updatedAt,
  lastSignedIn
) VALUES (
  'admin@xelenthuntgear.com',
  'Super Admin',
  'admin@xelenthuntgear.com',
  'admin',
  'local',
  'a1b2c3d4e5f678901234567890123456:b3ffe16f382e85b18e77f1d12c191430a027180c07a3067eb4310585943d8e3f53834be2957e77dae12a1e3076f43563d2a2af9d44937d3e66c2776e66c00eb9',
  NOW(),
  NOW(),
  NOW()
);

-- Verify admin user exists
SELECT id, openId, email, role, LEFT(password, 20) as pwd_start 
FROM users 
WHERE email = 'admin@xelenthuntgear.com';

-- Show success message
SELECT '✅ Admin user setup complete!' as status;
SELECT 'Login with: admin@xelenthuntgear.com / Admin@123' as credentials;
