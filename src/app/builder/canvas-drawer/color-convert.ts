export class ColorConvert {
  pub = {};
  canvas = document.createElement('canvas');
  context = this.canvas.getContext('2d');

  constructor(){
    this.canvas.height = 1;
    this.canvas.width = 1;
  }

  byte_to_hex(byte) {
    // Turns a number (0-255) into a 2-character hex number (00-ff)
    return ('0' + byte.toString(16)).slice(-2);
  }

  to_rgba_array(color: any) {
    /**
     * Turns any valid canvas fillStyle into a 4-element Uint8ClampedArray with bytes
     * for R, G, B, and A. Invalid styles will return [0, 0, 0, 0]. Examples:
     * color_convert.to_rgb_array('red')  # [255, 0, 0, 255]
     * color_convert.to_rgb_array('#ff0000')  # [255, 0, 0, 255]
     * color_convert.to_rgb_array('garbagey')  # [0, 0, 0, 0]
     */
    // Setting an invalid fillStyle leaves this unchanged
    this.context.fillStyle = 'rgba(0, 0, 0, 0)';
    // We're reusing the canvas, so fill it with something predictable
    this.context.clearRect(0, 0, 1, 1);
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, 1, 1);
    return this.context.getImageData(0, 0, 1, 1).data;
  }

  to_rgba = function (color) {
    /**
     * Turns any valid canvas fill style into an rgba() string. Returns
     * 'rgba(0,0,0,0)' for invalid colors. Examples:
     * color_convert.to_rgba('red')  # 'rgba(255,0,0,1)'
     * color_convert.to_rgba('#f00')  # 'rgba(255,0,0,1)'
     * color_convert.to_rgba('garbagey')  # 'rgba(0,0,0,0)'
     * color_convert.to_rgba(some_pattern)  # Depends on the pattern
     *
     * @param color  A string, pattern, or gradient
     * @return  A valid rgba CSS color string
     */
    var a = this.to_rgba_array(color);
    // return 'rgba('+a[0]+','+a[1]+','+a[2]+','+(a[3]/255)+')';
    return 'rgba(' + a[0] + ',' + a[1] + ',' + a[2] + ',' + (a[3] / 350).toFixed(2) + ')';
  }

  to_hex = function (color) {
    /**
     * Turns any valid canvas fill style into a hex triple. Returns
     * '#000000' for invalid colors. Examples:
     * color_convert.to_hex('red')  # '#ff0000'
     * color_convert.to_hex('rgba(255,0,0,1)')  # '#ff0000'
     * color_convert.to_hex('garbagey')  # '#000000'
     * color_convert.to_hex(some_pattern)  # Depends on the pattern
     *
     * @param color  A string, pattern, or gradient
     * @return  A valid rgba CSS color string
     */
    var a = this.to_rgba_array(color);
    // Sigh, you can't map() typed arrays
    var hex = [0, 1, 2].map(function (i) {
      return this.byte_to_hex(a[i])
    }).join('');
    return '#' + hex;
  }
  
}
