module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import "@/scss/quasar.variables.sass";
                `
            }
        }
    }
}