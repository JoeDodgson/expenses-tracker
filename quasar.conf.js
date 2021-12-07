module.exports = function (ctx) {
  // Print out the context
  console.log(ctx);
  return {
    extras: ["roboto-font"],
    framework: {
      plugins: ["Notify"],
      config: {
        notify: {
          /* look at QuasarConfOptions from the API card */
        },
      },
    },
  };
};
