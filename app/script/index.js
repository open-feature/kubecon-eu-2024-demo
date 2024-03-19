const search = new URLSearchParams(window.location.search);
const targetingKey = 'targetingKey';
if (!localStorage.getItem(targetingKey)) {
  localStorage.setItem(targetingKey, Math.floor(Math.random() * 1000000));
}

Promise.all([
  new Promise((resolve) => {setTimeout(resolve, search.size ? 3000 : 0)}),
  typeof navigator?.getBattery === 'function' ? navigator?.getBattery()?.then((battery) => {
    return battery.level * 100;
  }).catch(() => {
    return 0;
  }) : Promise.resolve(0),
]).then(([_, batteryPercentage]) => {
  const context = {
    windowHeight: window.outerHeight,
    windowWidth: window.outerWidth,
    batteryPercentage,
    language: navigator?.language,
    connectionType: navigator?.connection?.effectiveType,
    targetingKey: localStorage.getItem(targetingKey),
  };
  search.set('context', encodeURIComponent(JSON.stringify(context)));
  window.location.search = search;
}).catch(() => {
  console.error('error reloading');
});
