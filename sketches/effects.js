
// timing
var timingIndent = "";
function timeStart(name) {
    timeLog("start " + name);
    timingIndent += "  ";
    return [name, new Date().getTime()];
}
function timeEnd(startTime) {
    timingIndent = timingIndent.substring(0, timingIndent.length - 2);
    timeLog("end " + startTime[0]
            + " (" + (new Date().getTime() - startTime[1]) + " millis)");
}
function timeLog(text) {
    console.log(timingIndent + text);
}


function glow(graphics, f_createGraphics) {
    glowTime = timeStart("glow");
        // fix p5 bug:
        graphics.canvas = graphics.elt;
        
        posterizeTime = timeStart("alpha posterize");
            graphics.loadPixels();
            numPixels = graphics.pixels.length;
            for(var i = 3; i < numPixels; i+=4) {
                c = graphics.pixels[i];
                if(c < 128) {
                    graphics.pixels[i] = 0;
                } else {
                    graphics.pixels[i] = 255;
                }
            }
            graphics.updatePixels();
        timeEnd(posterizeTime);
        
        blur1Time = timeStart("blur 1");
            graphics2 = f_createGraphics(graphics.width, graphics.height);
            graphics2.canvas = graphics2.elt;
            graphics2.image(graphics, 0, 0);
            graphics2.filter(graphics.BLUR, 1);
        timeEnd(blur1Time);
        
        dilateTime = timeStart("dilate");
            for(var i = 0; i < 10; i++)
                graphics.filter(graphics.DILATE);
        timeEnd(dilateTime);
        
        blur2Time = timeStart("blur 2");
            graphics.filter(graphics.BLUR, 16);
        timeEnd(blur2Time);
        
        glowEffectTime = timeStart("glow effect");
            for(var i = 0; i < 5; i++) {
                graphics.filter(graphics.BLUR, 2);
                graphics.image(graphics2, 0, 0);
            }
        timeEnd(glowEffectTime);
    timeEnd(glowTime);
}


function colorLayers(graphics, f_createGraphics,
                     hueMin, hueMax, hueCen, hueExp,
                     satMin, satMax, satCen, satExp,
                     valMin, valMax, valCen, valExp) {
    colorLayersTime = timeStart("color layers");
        graphics.canvas = graphics.elt;
        
        blurTime = timeStart("blur");
            graphics2 = f_createGraphics(graphics.width, graphics.height);
            graphics2.canvas = graphics2.elt;
            graphics2.image(graphics, 0, 0);
            graphics2.filter(graphics.BLUR, 1);
        timeEnd(blurTime);
        
        layerTime = timeStart("layers");
            for(var i = 0; i < 8; i++) {
                graphics.tint(randomColor(hueMin, hueMax, hueCen, hueExp,
                                          satMin, satMax, satCen, satExp,
                                          valMin, valMax, valCen, valExp));
                graphics.image(graphics2,
                               Math.random() * 6 - 3, Math.random() * 6 - 3);
                graphics.noTint();
            }
        timeEnd(layerTime);
    timeEnd(colorLayersTime);
}


function invertGraphics(graphics) {
    graphics.loadPixels();
    numPixels = graphics.pixels.length;
    for(var i = 0; i < numPixels; i++) {
        c = graphics.pixels[i];
        if(c == 0) {
            graphics.pixels[i] = 255;
        } else {
            graphics.pixels[i] = 0;
        }
    }
    graphics.updatePixels();
}


// return a color string
// all values are 0 <= value < 256
function randomColor(hueMin, hueMax, hueCen, hueExp,
                     satMin, satMax, satCen, satExp,
                     valMin, valMax, valCen, valExp) {
    if(hueMax < hueMin) {
        hueMax += 256.0;
    }
    if(hueCen < hueMin) {
        hueCen += 256.0;
    }
    h = weightedRandomRange(hueMin, hueMax, hueCen, hueExp);
    if(h > 250.0) {
        h -= 250.0;
    }
    
    s = weightedRandomRange(satMin, satMax, satCen, satExp);
    v = weightedRandomRange(valMin, valMax, valCen, valExp);
    
    return hsbToColorString(h, s, v);
}

// 0 for even distribution
// higher values for bias towards center
function weightedRandom(center, exponent) {
    r = Math.random();
    if(r >= 0.5) {
        return Math.pow(2.0 * (r - 0.5), exponent + 1) * (1.0 - center)
               + center;
    } else {
        r = 1.0 - r;
        center = 1.0 - center;
        return -(Math.pow(2.0 * (r - 0.5), exponent + 1) * (1.0 - center)
               + center) + 1.0;
    }
}

function weightedRandomRange(min, max, cen, exp) {
    return weightedRandom((cen - min) / (max - min), exp) * (max - min) + min;
}

function rgbToColorString(r, g, b) {
    return "#"
	    + (numberToHexString(r))
	    + (numberToHexString(g))
	    + (numberToHexString(b));
}

function numberToHexString(num) {
    var string = num.toString(16);
    if(string.length == 1)
	string = "0" + string;
    return string;
}

function hsbToColorString(h, s, v) {
    // from http://stackoverflow.com/a/17243070

    h /= 256;
    s /= 256;
    v /= 256;

    var r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    return rgbToColorString(r, g, b);
}

