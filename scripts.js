function pasaValor(){
	var color = document.getElementById("col").value;
	var num = document.getElementById("num").value;

	if(color === '' || num === '')
		myFunction(0, 0, 0, 6);
	else
		obtainValues(color, num);
}

function obtainValues(color, num){
	const maximo = 15;
	const minimo = 1;
	var tam = color.length;
	var redDefault = 0;
	var greenDefault = 0;
	var blueDefault = 0;
	var numDefault = 6;
	var i =0;
	var aux = "rojo";
	var red, green, blue;
	
	red = green = blue = '';

	if(color[0]==='r'&&color[1]==='g'&&color[2]==='b'&&color[3]==='('&&color[tam-1]===')')
		if(color[tam-1] === ')')
			i = 4;
		else
			return myFunction(redDefault, greenDefault, blueDefault, numDefault);
	else
		i = 0;

	for(i; i<tam; i++)
		if(color[i] === ','){
			i++;
			break;
		}else
			red = red.concat(color[i]);

	for(i; i<tam; i++)
		if(color[i] === ','){
			i++;
			break;
		}else{
			if(color[i] === ' '){
				continue;
			}else
				green = green.concat(color[i]);
		}

	if(color[0] === 'r')
		var auxTam = (tam - 1);
	else auxTam = tam;

	for(i; i<(auxTam); i++)
		if(color[i] === ','){
			i++;
			break;
		}else
			if(color[i] === ' ')
				continue;
			else
				blue = blue.concat(color[i]);

	var redTam = red.length;

	if(red.length == 0 || green.length == 0 || blue.length == 0)
		return myFunction(redDefault, greenDefault, blueDefault, numDefault);

	if(red.length > 3 || green.length > 3 || blue.length > 3)
		return myFunction(redDefault, greenDefault, blueDefault, numDefault);

	for(var j=0; j<red.length; j++)
		if(isNaN(red[j])){
			return myFunction(redDefault, greenDefault, blueDefault, numDefault);
		}

	for(var j=0; j<green.length; j++)
		if(isNaN(green[j])){
			return myFunction(redDefault, greenDefault, blueDefault, numDefault);
		}

	for(var j=0; j<blue.length; j++)
		if(isNaN(blue[j])){
			return myFunction(redDefault, greenDefault, blueDefault, numDefault);
		}

	red = parseInt(red);
	green = parseInt(green);
	blue = parseInt(blue);

	if(num < minimo || num > maximo)
		num = numDefault;

	if(red<256 && green<256 && blue<256)
		return myFunction(red, green, blue, num);
	else
		return myFunction(redDefault, greenDefault, blueDefault, numDefault);
}

function myFunction(red, green, blue, num) {
	redHsl = red/255;
	greenHsl = green/255;
	blueHsl = blue/255;

	redHsl = redHsl.toFixed(2);
	greenHsl = greenHsl.toFixed(2);
	blueHsl = blueHsl.toFixed(2);

	var max = Math.max(redHsl, greenHsl, blueHsl);
	var min = Math.min(redHsl, greenHsl, blueHsl);

	var luminace = (max + min)/2;
	luminace *= 100;
	

	var saturation;
	var hue;

	if(max == min)
		hue = saturation = 0;
	else{
		if(luminace <= 50)
			saturation = (max - min) / (max + min);

		if(luminace > 50)
			saturation = (max - min) / (2 - (max - min));

		if(max == redHsl)
			hue = (greenHsl - blueHsl) / (max - min);

		if(max == greenHsl)
			hue = 2 + (blueHsl - redHsl) / (max - min);

		if(max == blueHsl)
			hue = 4 + (redHsl - greenHsl) / (max - min);
	}

	hue *= 60;

	if(hue < 0)
		hue += 360;

	saturation *= 100;

	hue = hue.toFixed();
	saturation = saturation.toFixed();
	luminace = luminace.toFixed();

	document.documentElement.style.setProperty('--hue', hue);
	document.documentElement.style.setProperty('--saturation', saturation);
	document.documentElement.style.setProperty('--lightness', luminace);

	num = parseInt(num);

	var rango = 80 / num;
	rango = rango.toFixed();
	var aux = parseInt(10);
	var color = [15];
	for(var i=0; i<15; i++)
		color[i] = 99;
	color[0] = 10;

	for(var i=1; i<num; i++){
		color[i] = parseInt(color[i-1]) + parseInt(rango);
	}

	color.sort();

	var alt = 44.66*num;
	alt = parseInt(alt);
	alt = alt.toFixed();
	alt = alt.concat("px");

	document.documentElement.style.setProperty("--h1", color[0]);
	document.documentElement.style.setProperty("--h2", color[1]);
	document.documentElement.style.setProperty("--h3", color[2]);
	document.documentElement.style.setProperty("--h4", color[3]);
	document.documentElement.style.setProperty("--h5", color[4]);
	document.documentElement.style.setProperty("--h6", color[5]);
	document.documentElement.style.setProperty("--h7", color[6]);
	document.documentElement.style.setProperty("--h8", color[7]);
	document.documentElement.style.setProperty("--h9", color[8]);
	document.documentElement.style.setProperty("--h10", color[9]);
	document.documentElement.style.setProperty("--h11", color[10]);
	document.documentElement.style.setProperty("--h12", color[11]);
	document.documentElement.style.setProperty("--h13", color[12]);
	document.documentElement.style.setProperty("--h14", color[13]);
	document.documentElement.style.setProperty("--h15", color[14]);
	document.documentElement.style.setProperty("--alt", alt);

	/*var ids = [15];
	var vis = [15];

	for(var i=0; i<15; i++){
		var c = i+1;
		ids[i] = "b".concat(c);
		vis[i] = "hidden";
	}

	for(var i=0; i<num; i++)
		vis[i] = "visible";

	for(var i=0; i<15; i++)
		document.getElementById(ids[i]).style.visibility = vis[i];*/

	var rgb = [num];
	var t1, t2, tr, tg, tb, huetemp;

	saturation /= 100;

	for(var i = 0; i < num; i++){
		t1 = t2 = tr = tg = tb = 0;
		huetemp = hue;

		luminace = color[i];
		luminace /= 100;

		if(saturation == 0){
			luminace = parseInt(luminace) * 255;
			red = green = blue = luminace;
		}
		else{
			if(luminace < 0.5)
				t1 = luminace * (1+saturation);
			else
				t1 = (luminace + saturation) - (luminace * saturation);

			t2 = (2 * luminace) - t1;
			huetemp /= 360;

			tr = huetemp + 0.333;
			tg = huetemp;
			tb = huetemp - 0.333;

			if(tr < 1)
				tr += 1;
			if(tr > 1)
				tr -= 1;

			if(tg < 1)
				tg += 1;
			if(tg > 1)
				tg -= 1;

			if(tb < 1)
				tb += 1;
			if(tb > 1)
				tb -= 1;
			// --- RED ---
			if((6 * tr) < 1)
				red = t2 + (t1 - t2) * 6 * tr;
			else
				if((2 * tr) < 1)
					red = t1;
				else
					if((3 * tr) < 2)
						red = t2 + (t1 - t2) * (0.666 - tr) * 6;
					else
						red = t2;
			// --- GREEN ---
			if((6 * tg) < 1)
				green = t2 + (t1 - t2) * 6 * tg;
			else
				if((2 * tg) < 1)
					green = t1;
				else
					if((3 * tg) < 2)
						green = t2 + (t1 - t2) * (0.666 - tg) * 6;
					else
						green = t2;
			// --- BLUE ---
			if((6 * tb) < 1)
				blue = t2 + (t1 - t2) * 6 * tb;
			else
				if((2 * tb) < 1)
					blue = t1;
				else
					if((3 * tb) < 2)
						blue = t2 + (t1 - t2) * (0.666 - tb) * 6;
					else
						blue = t2;
		}

		red = parseInt(red*255);
		green = parseInt(green*255);
		blue = parseInt(blue*255);

		rgb[i] = [red, green, blue, 1];
	}
	return rgb;
}