var minval = -1.5;
var maxval = 1.5;


function setup() {
    createCanvas(window.innerHeight, window.innerHeight);
    pixelDensity(1);



    var maxIterations = 1000;
    loadPixels();

    for(var x =0; x < width;x++){
        for(var y =0;y < height; y++){

            var a = map(x, 0, width,minval, maxval);
            var b = map(y, 0, height, minval, maxval);
            //var b = map(y, 0, width, -2.5, 2.5);
           // var b = map(y, 0, height, minSlider.value(), maxSlider.value());

            var ca = a;
            var cb = b;

            var n = 0;

            var z = 0;

                while(n < maxIterations){
                    var aa = a*a - b*b;
                    var bb = 2 * a * b;

                    a = aa + ca;
                    b = bb + cb;
                    if(abs(a + b) > 16) {
                        break;
                    }
                    n++;
                }
                var bright = map(n, 0,maxIterations,0,1);
                bright = map(sqrt(bright),0,1,0,255);

                if(n === maxIterations){
                    bright = 0;
                }
            var pix = (x + y * width) * 4;
            pixels[pix] = bright;
            pixels[pix + 1] = bright;
            pixels[pix + 2] = bright;
            pixels[pix + 3] = 255;
        }
    }
    updatePixels();
}
