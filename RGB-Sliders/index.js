    function updateColor() {
      const red = document.getElementById('redSlider').value;
      const green = document.getElementById('greenSlider').value;
      const blue = document.getElementById('blueSlider').value;

      const rgbColor = `rgb(${red}, ${green}, ${blue})`;

      document.getElementById('colorText').style.color = rgbColor;

      document.getElementById('redValue').textContent = red;
      document.getElementById('greenValue').textContent = green;
      document.getElementById('blueValue').textContent = blue;
    }

    updateColor();