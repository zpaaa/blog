module.exports = {
    apps : [
        {
          name: "namexxx",
          script: "./bin/www",
          watch: true,
          env: {
            "NODE_ENV": "dev"
          },
          env_production: {
            "NODE_ENV": "production",
          }
        }
    ]
  }