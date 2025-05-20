window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
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
          }
          else if(activeTheme === 'retro') {
            map.classList.add('retro-active');
          }
          else {
            map.classList.add('default');
          }
        }
    },
};
