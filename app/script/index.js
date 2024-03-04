Promise.all([
  new Promise((resolve) => {setTimeout(resolve, 3000)}),
  navigator.getBattery().then((battery) => {
    return battery.level * 100;
  }).catch(() => {
    return 100;
  }),
]).then(([_, batteryPercentage]) => {
  const context = {
    windowHeight: window.outerHeight,
    windowWidth: window.outerWidth,
    batteryPercentage,
    language: window.language,
    connectionType: navigator.connection.effectiveType
  };
  const search = new URLSearchParams(window.location.search);
  search.set('context', encodeURIComponent(JSON.stringify(context)));
  window.location.search = search;
}).catch(() => {
  console.error('error reloading')
});
