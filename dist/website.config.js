module.exports = {
    apps : [{
      name        : "website-backend",
      script      : "./src/index.js",
      watch       : true,
      env: {
        "NODE_ENV": "development",
      },
      env_production : {
       "NODE_ENV": "production"
      }
    },
    // {
    //   name       : "website-client",
    //   cwd        : "./client",
    //   script     : "yarn run",
    //   args        : "start",
    //   watch       : true,
    //   env: {
    //     "NODE_ENV": "development",
    //   },
    //   env_production : {
    //     "NODE_ENV": "production"
    //   }
    // }
  ]
  }