module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
            @import "@/sass/quasar.variables.sass"
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
