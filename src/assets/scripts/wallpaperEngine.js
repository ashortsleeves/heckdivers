window.wallpaperPropertyListener = {
  applyUserProperties: function (properties) {
    var bodyElement = document.body;
    var map = document.getElementById("map");

    if (properties.spin) {
      var mySliderValue = properties.spin.value;

      if (mySliderValue) {
        bodyElement.classList.add('rotate-active');
      }
      else {
        bodyElement.classList.remove('rotate-active');
      }
    }

    if (properties.theme) {
      var activeTheme = properties.theme.value;

      if (activeTheme === 'basic') {
        map.classList.add('basic');
        map.classList.remove('retro-active');
        map.classList.remove('default');
      }
      else if (activeTheme === 'retro') {
        map.classList.add('retro-active');
        map.classList.remove('basic');
        map.classList.remove('default');
      }
      else {
        map.classList.add('default');
        map.classList.remove('retro-active');
        map.classList.remove('basic');
      }
    }
  },
};
