module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
            @import "@/sass/quasar.variables.sass"
            @import "@/sass/quasar.sass"
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
