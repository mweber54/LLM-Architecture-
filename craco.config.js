// craco.config.js
module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        // Find the rule for source-map-loader and modify it to skip react-router-dom
        webpackConfig.module.rules = webpackConfig.module.rules.map((rule) => {
          if (rule.use && Array.isArray(rule.use)) {
            rule.use = rule.use.map((loaderConfig) => {
              if (
                loaderConfig.loader &&
                loaderConfig.loader.includes('source-map-loader')
              ) {
                loaderConfig.options = {
                  ...loaderConfig.options,
                  // For any file in react-router-dom, do not try to load its source map.
                  filterSourceMappingUrl: (url, resourcePath) =>
                    !resourcePath.includes('react-router-dom'),
                };
              }
              return loaderConfig;
            });
          }
          return rule;
        });
        return webpackConfig;
      },
    },
  };
  