// return a color string
// all values are 0 <= value < 256
function randomColor(hueMin, hueMax, hueExp, satMin, satMax, satExp,
                     valMin, valMax, valExp) {
    if(hueMin > hueMax) {
        hueMax += 256.0;
    }
    h = weightedRandomRange(hueMin, hueMax, hueExp);
    if(h > 250.0) {
        h -= 250.0;
    }
    
    s = weightedRandomRange(satMin, satMax, satExp);
    v = weightedRandomRange(valMin, valMax, valExp);
    
    return hsbToColorString(h, s, v);
}

// 0 for even distribution
// higher values for bias towards 0.5
function weightedRandom(exponent) {
    r = Math.random();
    if(r >= 0.5) {
        return Math.pow(2.0 * (r - 0.5), exponent + 1) / 2.0 + 0.5;
    } else {
        r = 1.0 - r
        return -Math.pow(2.0 * (r - 0.5), exponent + 1) / 2.0 + 0.5;
    }
    
}

function weightedRandomRange(min, max, exp) {
    return weightedRandom(exp) * (max - min) + min;
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

