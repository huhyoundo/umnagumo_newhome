module.exports = {
  apps: [
    {
      name: 'umnagumo-nextjs',
      cwd: process.env.UMNAGUMO_APP_DIR || '/srv/umnagumo-nextjs/current',
      script: 'server.js',
      interpreter: process.env.UMNAGUMO_NODE || '/usr/local/bin/node',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || '3000',
        HOSTNAME: process.env.HOSTNAME || '127.0.0.1',
        NEXT_TELEMETRY_DISABLED: '1',
      },
    },
  ],
};
