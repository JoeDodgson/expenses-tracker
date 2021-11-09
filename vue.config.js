module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
            @import "@/scss/quasar.variables.sass"
        `,
      },
    },
  },

  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },

  transpileDependencies: ["quasar"],
};
