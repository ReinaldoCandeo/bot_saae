module.exports = {
  apps: [{
    name: 'saae-whatsapp-bot',
    script: 'server.js',
    cwd: '/opt/saae-whatsapp-bot',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOST: '0.0.0.0'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOST: '0.0.0.0'
    },
    // Logs
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // Performance
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024',
    
    // Auto restart
    watch: false,
    ignore_watch: ['node_modules', 'logs', 'database'],
    
    // Graceful shutdown
    kill_timeout: 5000,
    wait_ready: true,
    listen_timeout: 10000,
    
    // Health check
    health_check_grace_period: 3000,
    
    // Advanced options
    min_uptime: '10s',
    max_restarts: 10,
    restart_delay: 4000,
    
    // Environment variables
    env_file: '.env'
  }]
};
