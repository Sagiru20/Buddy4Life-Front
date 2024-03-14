module.exports = {
  apps: [
    {
      name: "front",
      script: "vite preview --port 4000 --host --config vite.config.ts",
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
}
