module.exports = {
    apps: [{
        name: "react-app",
        script: "npx",
        interpreter:'none',
        args : 'serve -s build -p 3000',
        env_production: {
            NODE_ENV: "production"
        },
        env_development: {
            NODE_ENV: "development"
        }
    }]
}
