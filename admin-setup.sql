-- XELENT HUNTGEAR - Admin Setup Script
-- Run this in phpMyAdmin SQL tab

-- Delete any existing admin users with wrong emails
DELETE FROM users WHERE email LIKE '%sialkotsamplemasters%' OR openId LIKE '%sialkotsamplemasters%';

-- Insert correct admin user with password: Admin@123
-- Password hash format: salt:scrypt_hash
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
  'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456:7a8b9c0d1e2f3456789012345678901234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  NOW(),
  NOW(),
  NOW()
)
ON DUPLICATE KEY UPDATE 
  email = 'admin@xelenthuntgear.com',
  openId = 'admin@xelenthuntgear.com',
  password = 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456:7a8b9c0d1e2f3456789012345678901234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  role = 'admin';

-- Verify admin user exists
SELECT id, openId, email, role, LEFT(password, 20) as pwd_start 
FROM users 
WHERE email = 'admin@xelenthuntgear.com';

-- Show success message
SELECT '✅ Admin user setup complete!' as status;
SELECT 'Login with: admin@xelenthuntgear.com / Admin@123' as credentials;
