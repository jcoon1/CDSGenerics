// To use this code: before implementing, see line 37, you can alter creatureOpts to make certain types of critters, add your own creatures to the array if you please
// Currently there are 3 species and each is randomly organized on the screen 4 times
// To customize see lines 34, 37, 95, and 193.

var categoryName = _.sample(["morseth","kwep","blin","reesle","dorb","zorb","taifel","truft","daith","mook",
	"fram","luzak","jav","wug","cheeba","plov","grink","glippet","saper","stup","krivel","zoov","thup","crullet","fep"])

const categoryNameUpper = categoryName.charAt(0).toUpperCase() + categoryName.substring(1);

var animalType = 'birds'

var flip = function(p){
	return p > Math.random()
}

var generateAttentionQuestion = function(){
	return flip(0.5) ? "tar1" : "tar2"
}

// this will generate random colors - trying to create ability to not be so random
var genColor = function(color, variance) {
	function shuffle(v) { newarray = v.slice(0);for(var j, x, i = newarray.length; i; j = parseInt(Math.random() * i), x = newarray[--i], newarray[i] = newarray[j], newarray[j] = x);return newarray;} // non-destructive.
	var n = 10; // this is the default in ecosystem.js see line 12
	if (color == null) {
		var h = [];
		var offset = Math.random() * .99 / n;
	    for (var i=0;i<n-1;i++) {
	   		h.push((i/n)+offset);
	  	}
	  	h = shuffle(h);
	    h = h.shift();
		var s = Ecosystem.uniformAroundMean(.99, .1);
	    var v = Ecosystem.uniformAroundMean(.99, .1);
		color = Raphael.hsb2rgb(h, s, v).hex;
	}
	else
		color = Ecosystem.myColor(color, variance);
	return color;
}

// Can change the scale of the critters
var scale = 0.5;

// Change this to desired creature features/names
var options = {conjunction: [
	{ creature: "bird",
		name: "not a " + categoryName,
		// list by decreasing probabilities ( highest first )
		globalColors: [
			{
				p: 0.99,
				props: {
					color_mean: "blue",
					color_var: 0.001,
					location: "ground"
				}
			}, {
				p: 0.01,
				props: {
					color_mean: "yellow",
					color_var: 0.001,
					location: "trees"
				}
			}],
		col1_mean: "#00ff00", // col1 = crest
		col1_var: 3,
		col2_mean: "#00ff1a", // col2 = body
		col2_var: 3,
		col3_mean: "#006400", // col3 = wing
		col3_var: 3,
	    col4_mean: null,
	    col4_var: null,
	    col5_mean: null,
	    col5_var: null,
		prop1: null, // height
		prop2: null, // fatness
		tar1: 0, // tails
		tar2: 0, // crest
		internal_prop: 0.8, // pepsin
		cat_mem: 0.1,
		creatureNameReal: "not a " + categoryName
	},
	{ creature: "bird",
		name: "not a 1" + categoryName,
		// list by decreasing probabilities ( highest first )
		globalColors: [
			{
				p: 0.99,
				props: {
					color_mean: "blue",
					color_var: 0.001,
					location: "ground"
				}
			}, {
				p: 0.01,
				props: {
					color_mean: "yellow",
					color_var: 0.001,
					location: "trees"
				}
			}],
		col1_mean: "#00ff00", // col1 = crest
		col1_var: 3,
		col2_mean: "#00ff1a", // col2 = body
		col2_var: 3,
		col3_mean: "#006400", // col3 = wing
		col3_var: 3,
	    col4_mean: null,
	    col4_var: null,
	    col5_mean: null,
	    col5_var: null,
		prop1: null, // height
		prop2: null, // fatness
		tar1: 1, // tails
		tar2: 0, // crest
		internal_prop: 0.8, // pepsin
		cat_mem: 0.2,
		creatureNameReal: "not a " + categoryName
	},
	{ creature: "bird",
		name: "not a 2" + categoryName,
		// list by decreasing probabilities ( highest first )
		globalColors: [
			{
				p: 0.99,
				props: {
					color_mean: "blue",
					color_var: 0.001,
					location: "ground"
				}
			}, {
				p: 0.01,
				props: {
					color_mean: "yellow",
					color_var: 0.001,
					location: "trees"
				}
			}],
		col1_mean: "#00ff00", // col1 = crest
		col1_var: 3,
		col2_mean: "#00ff1a", // col2 = body
		col2_var: 3,
		col3_mean: "#006400", // col3 = wing
		col3_var: 3,
	    col4_mean: null,
	    col4_var: null,
	    col5_mean: null,
	    col5_var: null,
		prop1: null, // height
		prop2: null, // fatness
		tar1: 0, // tails
		tar2: 1, // crest
		internal_prop: 0.8, // pepsin
		cat_mem: 0.3,
		creatureNameReal: "not a " + categoryName
	},
	{ creature: "bird",
		globalColors: [
			{
				p: 1,
				props: {
					color_mean: "blue",
					color_var: 0.001,
					location: "ground"
				}
			}, {
				p: 0,
				props: {
					color_mean: "red",
					color_var: 0.001,
					location: "trees"
				}
			}],
		name: categoryName,
		col1_mean: "#00ff00", // col1 = crest
		// col1_mean: "#ff4500", // col1 = crest
		col1_var: 1.5,
		col2_mean: "#00ff1a", // col2 = body
		// col2_mean: "#ff4500", // col2 = body
		col2_var: 1.5,
		col3_mean: "#006400", // col3 = wing
		// col3_mean: "#ff4500", // col3 = wing
		col3_var: 1.5,
    	col4_mean: null,
	    col4_var: null,
	    col5_mean: null,
	    col5_var: null,
		prop1: null, // height
		prop2: null, // fatness
		tar1: 1, // tails
		tar2: 1, // crest
		internal_prop: 1, // pepsin
		cat_mem: 1,
		creatureNameReal: categoryName
	}
	// { creature: "bird",
	// 	name: "not lorch",
	// 	globalColors: [
	// 		{
	// 			p: 0.5,
	// 			props: {
	// 				color_mean: "yellow",
	// 				color_var: 0.001,
	// 				location: "ground"
	// 			}
	// 		}, {
	// 			p: 0.5,
	// 			props: {
	// 				color_mean: "purple",
	// 				color_var: 0.001,
	// 				location: "trees"}
	// 		}],
	// 	col1_mean: "#ffff00", // col1 = crest
	// 	col1_var: 0,
	// 	col2_mean: "#ffff00", // col2 = body
	// 	col2_var: 0,
	// 	col3_mean: "#ffff00", // col3 = wing
	// 	col3_var: 0,
	//     col4_mean: null,
	//     col4_var: null,
	//     col5_mean: null,
	//     col5_var: null,
	// 	prop1: null, // height
	// 	prop2: null, // fatness
	// 	tar1: 0, // tails
	// 	tar1: 0, // crest
	// 	internal_prop: 0 // pepsin
	
], disjunction :  [
	{ creature: "bird",
		name: "not a " + categoryName,
		// list by decreasing probabilities ( highest first )
		globalColors: [
			{
				p: 0.99,
				props: {
					color_mean: "blue",
					color_var: 0.001,
					location: "ground"
				}
			}, {
				p: 0.01,
				props: {
					color_mean: "yellow",
					color_var: 0.001,
					location: "trees"
				}
			}],
		col1_mean: "#00ff00", // col1 = crest
		col1_var: 3,
		col2_mean: "#00ff1a", // col2 = body
		col2_var: 3,
		col3_mean: "#006400", // col3 = wing
		col3_var: 3,
	    col4_mean: null,
	    col4_var: null,
	    col5_mean: null,
	    col5_var: null,
		prop1: null, // height
		prop2: null, // fatness
		tar1: 0, // tails
		tar2: 0, // crest
		internal_prop: 0.8, // pepsin
		cat_mem: 0.1,
		creatureNameReal: "not a " + categoryName
	},
	{ creature: "bird",
		name: "not a 1" + categoryName,
		// list by decreasing probabilities ( highest first )
		globalColors: [
			{
				p: 0.99,
				props: {
					color_mean: "blue",
					color_var: 0.001,
					location: "ground"
				}
			}, {
				p: 0.01,
				props: {
					color_mean: "yellow",
					color_var: 0.001,
					location: "trees"
				}
			}],
		col1_mean: "#00ff00", // col1 = crest
		col1_var: 3,
		col2_mean: "#00ff1a", // col2 = body
		col2_var: 3,
		col3_mean: "#006400", // col3 = wing
		col3_var: 3,
	    col4_mean: null,
	    col4_var: null,
	    col5_mean: null,
	    col5_var: null,
		prop1: null, // height
		prop2: null, // fatness
		tar1: 1, // tails
		tar2: 0, // crest
		internal_prop: 0.8, // pepsin
		cat_mem: 0.2,
		creatureNameReal: "not a " + categoryName
	},
	{ creature: "bird",
		name: "not a 2" + categoryName,
		// list by decreasing probabilities ( highest first )
		globalColors: [
			{
				p: 0.99,
				props: {
					color_mean: "blue",
					color_var: 0.001,
					location: "ground"
				}
			}, {
				p: 0.01,
				props: {
					color_mean: "yellow",
					color_var: 0.001,
					location: "trees"
				}
			}],
		col1_mean: "#00ff00", // col1 = crest
		col1_var: 3,
		col2_mean: "#00ff1a", // col2 = body
		col2_var: 3,
		col3_mean: "#006400", // col3 = wing
		col3_var: 3,
	    col4_mean: null,
	    col4_var: null,
	    col5_mean: null,
	    col5_var: null,
		prop1: null, // height
		prop2: null, // fatness
		tar1: 0, // tails
		tar2: 1, // crest
		internal_prop: 0.8, // pepsin
		cat_mem: 0.3,
		creatureNameReal: "not a " + categoryName
	},
	{ creature: "bird",
		globalColors: [
			{
				p: 1,
				props: {
					color_mean: "blue",
					color_var: 0.001,
					location: "ground"
				}
			}, {
				p: 0,
				props: {
					color_mean: "red",
					color_var: 0.001,
					location: "trees"
				}
			}],
		name: categoryName,
		col1_mean: "#00ff00", // col1 = crest
		// col1_mean: "#ff4500", // col1 = crest
		col1_var: 1.5,
		col2_mean: "#00ff1a", // col2 = body
		// col2_mean: "#ff4500", // col2 = body
		col2_var: 1.5,
		col3_mean: "#006400", // col3 = wing
		// col3_mean: "#ff4500", // col3 = wing
		col3_var: 1.5,
    	col4_mean: null,
	    col4_var: null,
	    col5_mean: null,
	    col5_var: null,
		prop1: null, // height
		prop2: null, // fatness
		tar1: 1, // tails
		tar2: 1, // crest
		internal_prop: 1, // pepsin
		cat_mem: 1,
		creatureNameReal: categoryName
	}
	// { creature: "bird",
	// 	name: "not lorch",
	// 	globalColors: [
	// 		{
	// 			p: 0.5,
	// 			props: {
	// 				color_mean: "yellow",
	// 				color_var: 0.001,
	// 				location: "ground"
	// 			}
	// 		}, {
	// 			p: 0.5,
	// 			props: {
	// 				color_mean: "purple",
	// 				color_var: 0.001,
	// 				location: "trees"}
	// 		}],
	// 	col1_mean: "#ffff00", // col1 = crest
	// 	col1_var: 0,
	// 	col2_mean: "#ffff00", // col2 = body
	// 	col2_var: 0,
	// 	col3_mean: "#ffff00", // col3 = wing
	// 	col3_var: 0,
	//     col4_mean: null,
	//     col4_var: null,
	//     col5_mean: null,
	//     col5_var: null,
	// 	prop1: null, // height
	// 	prop2: null, // fatness
	// 	tar1: 0, // tails
	// 	tar1: 0, // crest
	// 	internal_prop: 0 // pepsin
	
] }

// var creatureOpts = options["conjunction"]

// Change this to desired critter count / distribution
var creatureTypesN = 4;
var exemplarN = 5;
var creatureN = creatureTypesN*exemplarN;

var uniqueCreatures = _.uniq(_.pluck(creatureOpts, "name"))
var allCreatures = [];
var j=0;

var color_dict = {
	blue: "#5da5db",
	red: "#f42935",
	yellow: "#eec900",
	green: "#228b22",
	orange: "#ff8c00",
	purple: "#dda0dd"
}

var fillArray = function(n, fillVal){
	return Array(n).fill(fillVal)
}

var probToCount = function(p, n){
	return Math.round(p*n);
}


var createCreatureColors = function(creatureLabel){
	var creatOpts = _.where(creatureOpts, {name: creatureLabel})[0];
	var creatureColors = [];
	var creatureLocation = [];
	// debugger;
	var nRemaining = exemplarN;
	for (var i=0; i<creatOpts.globalColors.length; i++ ){
		var colorProps = creatOpts.globalColors[i];

		var n_creatures_of_this_color =  probToCount(
			colorProps.p, exemplarN
		);

	var ncrit =	n_creatures_of_this_color == 0 ?
			((colorProps.p > 0) && (nRemaining > 0)) ? 1 : 0 :
			n_creatures_of_this_color

		creatureColors = creatureColors.concat(
			fillArray(creatureN,
				genColor(
				color_dict[colorProps["props"]["color_mean"]],
				colorProps["props"]["color_var"]
			))
		)
		creatureLocation = creatureLocation.concat(
			fillArray(creatureN, colorProps["props"]["location"]
			)
		)
	  nRemaining = nRemaining-ncrit;
	}
	return {color: creatureColors, location: creatureLocation}
}

var createFeatureArray = function(creatureLabel, p){
	var probs = [p, 1-p]
	var creatOpts = _.where(creatureOpts, {name: creatureLabel})[0];
	var creatureColors = [];
	var creatureColor_alph = [];
	var creatureLocation = [];
	// debugger;
	var nRemaining = exemplarN;
	for (var i=0; i<2; i++ ){
		var colorProps = creatOpts.globalColors[i];

		var n_creatures_of_this_color =  probToCount(
			probs[i], exemplarN
		);
	var ncrit =	n_creatures_of_this_color == 0 ?
			((probs[i] > 0) && (nRemaining > 0)) ? 1 : 0 :
			n_creatures_of_this_color

		creatureColors = creatureColors.concat(
			fillArray(creatureN,
				genColor(
				color_dict[colorProps["props"]["color_mean"]],
				colorProps["props"]["color_var"]
			))
		)
		//creatureColor_alph = colorProps["props"]["color_mean"];
		creatureLocation = 0;
	  nRemaining = nRemaining-ncrit;
	}
	return {color: creatureColors, location: creatureLocation} //color encoded
}

// Generates the characteristics for each critter
for (var i = 0; i < uniqueCreatures.length; i++){
	var creatOpts = _.where(creatureOpts, {name: uniqueCreatures[i]})[0];
	while (j<(exemplarN*(i+1))) {
		allCreatures.push({
			"col1": genColor(creatOpts.col1_mean, creatOpts.col1_var),
			"col2": genColor(creatOpts.col2_mean, creatOpts.col2_var),
			"col3": creatOpts.col3_mean == null ? null : genColor(creatOpts.col3_mean, creatOpts.col3_var),
	    	"col4" : creatOpts.col4_mean == null ? null : genColor(creatOpts.col4_mean, creatOpts.col4_var),
	    	"col5" : creatOpts.col5_mean == null ? null : genColor(creatOpts.col5_mean, creatOpts.col5_var),
			"prop1": creatOpts.prop1 == null ? Ecosystem.randProp() : creatOpts.prop1,
			"prop2": creatOpts.prop2 == null ? Ecosystem.randProp() : creatOpts.prop2,
			"tar1": flip(creatOpts.tar1),
			"tar2": flip(creatOpts.tar2),
			"creatureName": uniqueCreatures[i],
			"critter" : creatOpts.creature,
			"query": "question",
			"stimID": j,
			"internal_prop": flip(creatOpts.internal_prop),
			"attentionCheck": generateAttentionQuestion(),
			"cat_mem": creatOpts.cat_mem,
			"creatureNameReal" : creatOpts.creatureNameReal
		})
  		j++;
	}
}


// This outlines the features of all critters defined in ecosystem.js
var critFeatures = [
	{ creature: "bird",
		col1: "crest",
		col2: "body",
		col3: "wing",
    	col4: "-99",
   		col5: "-99",
		prop1: "height",
		prop2: "fatness",
		tar1: "tail",
		tar2: "crest",
		internal_prop: "pepsin"
	},
	{ creature: "fish",
		col1: "body",
		col2: "fins",
		col3: "-99",
    	col4: "-99",
   		col5: "-99",
		prop1: "bodysize (short->tall)",
		prop2: "tailsize",
		tar1: "fangs",
		tar2: "whiskers",
		internal_prop: "--"
	},
	{ creature: "bug",
		col1: "legs",
		col2: "head",
		col3: "body",
    	col4: "antennae",
   		col5: "wings",
		prop1: "headsize(small->wide)",
		prop2: "bodysize(narrow->fat)",
		tar1: "antennae",
		tar2: "wings",
		internal_prop: "--"
	},
  { creature: "flower",
		col1: "stem",
		col2: "spots",
		col3: "petals",
    	col4: "center",
   		col5: "-99",
		prop1: "centersize",
		prop2: "petallength",
		tar1: "thorns",
		tar2: "spots",
		internal_prop: "--"
	},
  { creature: "tree",
		col1: "berries",
		col2: "leaves",
		col3: "trunk",
    	col4: "-99",
   		col5: "-99",
		prop1: "-99",
		prop2: "-99",
		tar1: "berries",
		tar2: "leaves",
		internal_prop: "--"
	}
]

// Change this is you want to change the phrasing of "Does it have .."
var question_phrase = [
{ creature: "bird",
		tar1: "a tail",
		tar2: "feathers on its head"
	},
	{ creature: "fish",
		tar1: "fangs",
		tar2: "whiskers"
	},
	{ creature: "bug",
		tar1: "antennae",
		tar2: "wings"
	},
  	{ creature: "flower",
		tar1: "thorns",
		tar2: "spots"
	},
  	{ creature: "tree",
		tar1: "berries",
		tar2: "leaves"
	}
]
