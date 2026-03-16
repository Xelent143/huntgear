module.exports = {
  apps: [
    {
      name: 'xelent-huntgear',
      script: './dist/index.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      // Resource management
      max_memory_restart: '1G',
      node_args: '--max-old-space-size=1024',
      
      // Logging
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Process management
      autorestart: true,
      watch: false,
      ignore_watch: ['node_modules', 'logs', 'uploads'],
      
      // Health monitoring
      min_uptime: '10s',
      max_restarts: 5,
      
      // Environment file
      env_file: '.env',
      
      // Advanced features
      kill_timeout: 5000,
      listen_timeout: 10000,
      
      // Cron restart (optional - restart at 3 AM daily)
      // cron_restart: '0 3 * * *',
    }
  ],
  
  deploy: {
    production: {
      user: 'root',
      host: ['your-server-ip'],
      ref: 'origin/main',
      repo: 'https://github.com/yourusername/xelent-huntgear.git',
      path: '/var/www/xelent-huntgear',
      'pre-deploy-local': '',
      'post-deploy': 'pnpm install && pnpm build:local && pm2 reload ecosystem.config.cjs --env production',
      'pre-setup': '',
      'ssh_options': 'StrictHostKeyChecking=no'
    }
  }
};
