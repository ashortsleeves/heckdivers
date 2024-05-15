window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
        var bodyElement = document.body;
        if (properties.spin) {
            var mySliderValue = properties.spin.value;

            if (mySliderValue) {
              bodyElement.classList.add('rotate-active');
            }
            else {
              bodyElement.classList.remove('rotate-active');
            }
        }

        if (properties.retro) {
            var mySliderValue = properties.retro.value;

            if (mySliderValue) {
              bodyElement.classList.add('retro-active');
            }
            else {
              bodyElement.classList.remove('retro-active');
            }
        }
    },
};
