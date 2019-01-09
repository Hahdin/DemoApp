module.exports = {
  "settings": {
    "react": {
      "createClass": "createReactClass", // Regex for Component Factory to use,
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "detect", // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      "flowVersion": "0.53" // Flow version   
    }
  },
  "extends": ["standard", "eslint:recommended", "plugin:react/recommended"],
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true
  }
}