module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-essential"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "vue"
    ],
    "globals": {
        "LoginUser": false,
        "ModifiedNote": false,
        "Mi_Endpoints": false,
        "Mi_Note": false,
        "Mi_File": false,
        "renoter": false,
        "Result": false,
        "loginUser": false,
        "TimeLine": false,
        "ModifiedNotification": false,
	},
    "rules": {
    }
}
