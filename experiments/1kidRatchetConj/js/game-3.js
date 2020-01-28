var prev = null;

var condition = _.sample(["disjunction","conjunction"])


 var audienceimagechild = _.sample([{path: "../_shared/images/malechild1.jpg", name: "malechild1"},
  {path: "../_shared/images/malechild2.jpg", name: "malechild2"},
  {path: "../_shared/images/femchild1copy.jpg", name: "femchild1"},
  {path: "../_shared/images/femchild2.jpg", name: "femchild2"}])

 var audienceimageadult = _.sample([{path: "../_shared/images/maleadult1.jpg", name: "maleadult1"},
  {path: "../_shared/images/maleadult2.jpg", name: "maleadult2"},
  {path: "../_shared/images/femadult1copy.jpg", name: "femadult1"},
  {path: "../_shared/images/femadult2.jpg", name: "femadult2"}])


function mark(el, otherEls) {
  if(prev != null){
    gray(prev);
  }
  prev = el;

    el.style.border=='' ? 
    $('#'+el.id).css({"border":'2px solid red',
                    'background-color': 'white','opacity': '1'}) &
    $('#'+el.id+'critname').css({'opacity': '1', 'font-weight': 'bold'})
                     : 
    $('#'+el.id).css({"border":'',
                    'background-color': 'white'})
    otherEls.map(function(cell){$('#'+cell).css({"border":'',
      'background-color': 'white'})})

  $('#'+el.id+'critname').css({'opacity': '1'});
  check(allCreatures.length);

}


function gray(el) {
   $('#'+el.id).css({'opacity': '0.5'})
   $('#'+el.id+'critname').css({'opacity': '0.5', 'font-weight': 'normal'});

}

function check(num){
  var check_all = 0;
  for(var i=0; i<num; i++) {
     if($('#cell'+i+'critname').css('opacity') != 0){
        ++check_all;
     }
  }
  //console.log(check_all);

  if(check_all == num) {
     $("#learning_button").show();
  }

}

function create_table(rows, cols) { //rows * cols = number of exemplars
  var table = "<table>";
  for(var i=0; i <rows; i++) {
    table += "<tr>";
    for(var j=0; j<cols; j++) {
      table += "<td>";
      var ind = i * cols + j;
      table += "<table class ='cell' id='cell" + ind + "' onclick=\"mark(cell" + ind +",";
      table += "[";
      for(var k=0; k<rows*cols; k++) {
        if(k != ind){
          table += "'cell" + k + "'";
        }
        if(!(k == rows*cols-1 || k == ind || (ind == rows*cols-1 && k == rows*cols-2))) {
          table += ",";
        }
      }
      table += "])\">";

      table += "<td>";
      table += "<svg id='critter" + ind +
        "' style='max-width:100px;max-height:100px\'></svg></td>";

      table += "<tr>";
      table += "<div class='critname' id='cell" + ind + "critname'></div></tr>";
      table += "</table>";
      table += "</td>";
      
    }
    table += "</tr>"
  }
  table += "</table>";
  $("#critter_display").append(table);
}



function make_slides(f) {
  var   slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions = slide({
    name : "instructions",
    start: function() {
               $('.categoryName').html(categoryName);
    },
    button : function() {
      exp.go(); // use exp.go() if and only if there is no "present" data.
    },
  });

  slides.welcome_zoo = slide({
    name : "welcome_zoo",


    start : function(stim) {
      var start_time = Date.now()
      this.stim = stim;
      $(".critname").hide();
      $(".err").hide();
      $("#learning_button").hide(); //fix this
      var shuffledCritters = _.shuffle(allCreatures)


      create_table(4,5);

      for (var i=0; i<shuffledCritters.length; i++) {
            var scale = 0.5;
            Ecosystem.draw(
              shuffledCritters[i]["critter"], shuffledCritters[i],
              "critter"+i, scale)
      }

      
       for(var i=0; i<shuffledCritters.length; i++) {
         $('#cell'+i+'critname').html(shuffledCritters[i]["creatureNameReal"]);
         $('#cell'+i+'critname').css({'opacity': '0'});

      }

    },

    button : function() {
      var end_time = Date.now()
      this.time_spent = end_time - this.start_time;
      //this.log_responses();
      exp.go(); // use exp.go() if and only if there is no "present" data.
      
    },

    //fix this
    log_responses: function(){
      exp.catch_trials.push({
          "trial_type" : "learning_trial",
          "condition": condition,
          "trial_num" : 0, //change later when we add more blocks
          "question": "NA",
          "distribution": JSON.stringify(exp.distribution),
          "response" : "NA",
          // "response" : $('input[type=radio]:checked').val(),
          // "question" : this.stim["attentionCheck"],
          "time_in_seconds" : this.time_spent/1000,
          "critter" : this.stim["critter"],
          "species" : this.stim["creatureName"],

          "col1_crit" : this.critOpts.col1,
          "col2_crit" : this.critOpts.col2,
          "col3_crit" : this.critOpts.col3,
          "col4_crit" : this.critOpts.col4,
          "col5_crit" : this.critOpts.col5,
          "prop1_crit" : this.critOpts.prop1,
          "prop2_crit" : this.critOpts.prop2,
          "tar1_crit" : this.critOpts.tar1,
          "tar2_crit" : this.critOpts.tar2,

          //"color" : this.stim["color"], //change this
          "col1" : this.stim["col1"],
          "col2" : this.stim["col2"],
          "col3" : this.stim["col3"] == null ? "-99" : this.stim["col3"],
          "col4" : this.stim["col4"] == null ? "-99" : this.stim["col4"],
          "col5" : this.stim["col5"] == null ? "-99" : this.stim["col5"],
          "prop1" : this.stim["prop1"] == null ? "-99" : this.stim["prop1"],
          "prop2" : this.stim["prop2"] == null ? "-99" : this.stim["prop2"],
          "tar1" : this.stim["tar1"] ? 1 : 0,
          "tar2" : this.stim["tar2"] ? 1 : 0
        });
    }
  });


  slides.learning_trial = slide({
    name: "learning_trial",

    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */

    present : exp.learning_critters,
    trial_num: 0,

    present_handle : function(stim) {
      // reset critter & note
      $("#critterSVG").empty();
      $("#participantNote").val('');
      $(".prompt").html('');

      // hide stuff
      $(".err").hide();
      $("#continueButton").hide();
      $(".notePrompt").hide();
      $("#participantNote").hide();

      // show stuff
      $("#detectorButton").show();

      this.critOpts = _.where(critFeatures, {creature: stim.critter})[0];
      this.question = _.where(question_phrase, {creature: stim.critter})[0];

      this.stim = stim; //I like to store this information in the slide so I can record it later.

      this.start_time = Date.now()

      var scale = 0.5;
      Ecosystem.draw(
        stim.critter, stim,
        "critterSVG", scale)

      // would need to change if you want a different internal property
      stim.location == "trees" ?
        environmentString = "in the <strong>trees</strong>" :
        environmentString = "on the <strong>ground</strong>"

      // $(".critterInfo").html("You see this creature " + environmentString);
      $(".critterInfo").html("You see this creature.");

      // $(".attentionCheck").html("Does it have " + this.question[stim.attentionCheck] + "?")

      // $('input[type=radio]').attr('checked', false);

      this.trial_num++;

    },

    detector: function(){
      // hide stuff
      $("#detectorButton").hide();

      // present stuff
      $(".prompt").html("CritterDex output: " + this.stim.creatureNameReal);
      $(".notePrompt").html("Write yourself a note to help you remember.");

      // show stuff
      $("#participantNote").show();
      $("#continueButton").show();
      $(".notePrompt").show();

    },

    button : function() {
      var end_time = Date.now();
      response = $("#participantNote").val();
      if (response == "") {
        $(".err").show();
      } else {
        this.time_spent = end_time - this.start_time;
        this.log_responses();
        _stream.apply(this); //make sure this is at the *end*, after you log your data
      }
    },

    log_responses: function(){
      exp.catch_trials.push({
          "trial_type" : "learning_trial",
          "condition" : condition,
          "trial_num" : this.trial_num,
          "question": exp.question,
          "distribution": JSON.stringify(exp.distribution),
          "response" : $("#participantNote").val(),
          // "response" : $('input[type=radio]:checked').val(),
          // "question" : this.stim["attentionCheck"],
          "time_in_seconds" : this.time_spent/1000,
          "critter" : this.stim["critter"],
          "species" : this.stim["creatureName"],

          "col1_crit" : this.critOpts.col1,
          "col2_crit" : this.critOpts.col2,
          "col3_crit" : this.critOpts.col3,
          "col4_crit" : this.critOpts.col4,
          "col5_crit" : this.critOpts.col5,
          "prop1_crit" : this.critOpts.prop1,
          "prop2_crit" : this.critOpts.prop2,
          "tar1_crit" : this.critOpts.tar1,
          "tar2_crit" : this.critOpts.tar2,

          //"color" : this.stim["color"], //change this
          "col1" : this.stim["col1"],
          "col2" : this.stim["col2"],
          "col3" : this.stim["col3"] == null ? "-99" : this.stim["col3"],
          "col4" : this.stim["col4"] == null ? "-99" : this.stim["col4"],
          "col5" : this.stim["col5"] == null ? "-99" : this.stim["col5"],
          "prop1" : this.stim["prop1"] == null ? "-99" : this.stim["prop1"],
          "prop2" : this.stim["prop2"] == null ? "-99" : this.stim["prop2"],
          "tar1" : this.stim["tar1"] ? 1 : 0,
          "tar2" : this.stim["tar2"] ? 1 : 0
        });
    }
  });
  slides.test_trial = slide({
    name: "test_trial",

    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */

    present : _.shuffle(exp.test_trial_critters),
    trial_num: 0,

    present_handle : function(stim) {
      // reset critter & note
      $("#critterTestSVG").empty();
      //$("#testFreeResponse").val(''); //for text response
      $('input[type=radio]').attr('checked', false); //for radio button response

      // hide stuff
      $(".err").hide();

      this.critOpts = _.where(critFeatures, {creature: stim.critter})[0];

      this.question = _.where(question_phrase, {creature: stim.critter})[0];

      this.stim = stim; //I like to store this information in the slide so I can record it later.

      this.start_time = Date.now()

      var scale = 0.5;
      Ecosystem.draw(
        stim.critter, stim,
        "critterTestSVG", scale)

      this.trial_num++;

    },

    button : function() {
      var end_time = Date.now();
      //response = $("#testFreeResponse").val();
      if ($('input[type=radio]:checked').size() == 0) {
        $(".err").show();
      } else {
        this.time_spent = end_time - this.start_time;
        this.log_responses();
        _stream.apply(this); //make sure this is at the *end*, after you log your data
      }
    },

    log_responses: function(){
      exp.data_trials.push({
          "trial_type" : "test_trial",
          "condition": condition,
          "trial_num" : this.trial_num,
          "question": exp.question,
          "distribution": JSON.stringify(exp.distribution),
          //"response" : $("#testFreeResponse").val(), //if using text box
          "response" : $('input[type=radio]:checked').val(), //if using radio buttons
          "question": exp.question,
          "time_in_seconds" : this.time_spent/1000,
          "critter" : this.stim["critter"],
          "species" : this.stim["creatureName"],

          "col1_crit" : this.critOpts.col1,
          "col2_crit" : this.critOpts.col2,
          "col3_crit" : this.critOpts.col3,
          "col4_crit" : this.critOpts.col4,
          "col5_crit" : this.critOpts.col5,
          "prop1_crit" : this.critOpts.prop1,
          "prop2_crit" : this.critOpts.prop2,
          "tar1_crit" : this.critOpts.tar1,
          "tar2_crit" : this.critOpts.tar2,

          //"color" : this.stim["color"], //change this
          "col1" : this.stim["col1"],
          "col2" : this.stim["col2"],
          "col3" : this.stim["col3"] == null ? "-99" : this.stim["col3"],
          "col4" : this.stim["col4"] == null ? "-99" : this.stim["col4"],
          "col5" : this.stim["col5"] == null ? "-99" : this.stim["col5"],
          "prop1" : this.stim["prop1"] == null ? "-99" : this.stim["prop1"],
          "prop2" : this.stim["prop2"] == null ? "-99" : this.stim["prop2"],
          "tar1" : this.stim["tar1"] ? 1 : 0,
          "tar2" : this.stim["tar2"] ? 1 : 0
        });
    }
  });

 slides.audience_slide = slide({
    name : "audience_slide",

    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */
    present : _.sample([
      {item: "explanation1", explanation: categoryNameUpper.concat('s are ', animalType, '. They have tailfeathers and headcrests. Other ', 
        animalType, ' have either tailfeathers or headcrests. ', categoryNameUpper, 's have both.')},
    ], 1),

    //this gets run only at the beginning of the block
    present_handle : function(stim) {
      $(".err").hide();

      this.stim = stim; //I like to store this information in the slide so I can record it later.

      $(".explanation").html(stim.explanation)
      // $(".prompt").html(stim.subject + "s like " + stim.object + "s.");
      "<img src=" + audienceimagechild + "alt=\"Child\" id=\"childpic\"></img>"
      $("#childpicaudience").html("<img src=\"" + audienceimagechild.path + "\" alt=\"Child\" id=\"childpic\"></img>")
      // $(".explanation").html(stim.explanation)
      "<img src=" + audienceimageadult + "alt=\"Adult\" id=\"adultpic\"></img>"
      $("#adultpicaudience").html("<img src =\"" + audienceimageadult.path + "\" alt=\"Adult\" id=\"adultpic\"></img>")
      this.init_sliders();
      exp.sliderPost = null; //erase current slider value
    },

    button : function() {
      if (exp.sliderPost == null) {
        $(".err").show();
      } else {
        this.log_responses();

        /* use _stream.apply(this); if and only if there is
        "present" data. (and only *after* responses are logged) */
        _stream.apply(this);
      }
    },

    init_sliders : function() {
      utils.make_slider("#audience_slider", function(event, ui) {
        exp.sliderPost = ui.value;
      });
    },

    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "audience_slider",
        "condition" : condition,
        "item" : this.stim.item,
        "response" : exp.sliderPost,
        "childimage" : audienceimagechild.name
      });
    }
  });


slides.accuracy_slide = slide({
    name : "accuracy_slide",

    /* trial information for this block
     (the variable 'stim' will change between each of these values,
      and for each of these, present_handle will be run.) */
    present : _.sample([
      {item: "explanation1", explanation: categoryNameUpper.concat('s are ', animalType, '. They have tailfeathers and headcrests. Other ', 
        animalType, ' have either tailfeathers or headcrests. ', categoryNameUpper, 's have both.')},
    ], 1),

    //this gets run only at the beginning of the block
    present_handle : function(stim) {
      $(".err").hide();

      this.stim = stim; //I like to store this information in the slide so I can record it later.

      $(".explanation").html(stim.explanation)
      // $(".prompt").html(stim.subject + "s like " + stim.object + "s.");
      this.init_sliders();
      exp.sliderPost = null; //erase current slider value
    },

    button : function() {
      if (exp.sliderPost == null) {
        $(".err").show();
      } else {
        this.log_responses();

        /* use _stream.apply(this); if and only if there is
        "present" data. (and only *after* responses are logged) */
        _stream.apply(this);
      }
    },

    init_sliders : function() {
      utils.make_slider("#accuracy_slider", function(event, ui) {
        exp.sliderPost = ui.value;
      });
    },

    log_responses : function() {
      exp.data_trials.push({
        "trial_type" : "accuracy_slider",
        "condition": condition,
        "item" : this.stim.item,
        "response" : exp.sliderPost
      });
    }
  });



// slides.LikertExperience = slide({
//     name: "LikertExperience",

//     /* trial information for this block
//      (the variable 'stim' will change between each of these values,
//       and for each of these, present_handle will be run.) */
//     present : _.sample([
//       {item: "LikertStatement1", LikertStatement: "I have experience in communicating with children."},
//     ], 1),


//     //this gets run only at the beginning of the block
//     present_handle : function(stim) {
//       $(".err").hide();

//       this.stim = stim; //I like to store this information in the slide so I can record it later.

//       $(".LikertStatement").html(stim.LikertStatement)
//       // $(".prompt").html(stim.subject + "s like " + stim.object + "s.");
//       this.init_sliders();
//       exp.sliderPost = null; //erase current slider value
//     },

//     button : function() {
//       if (exp.sliderPost == null) {
//         $(".err").show();
//       } else {
//         this.log_responses();

//         /* use _stream.apply(this); if and only if there is
//         "present" data. (and only *after* responses are logged) */
//         _stream.apply(this);
//       }
//     },

//     init_sliders : function() {
//       utils.make_slider("#likert_slider", function(event, ui) {
//         exp.sliderPost = ui.value;
//       });
//     },

//     log_responses : function() {
//       exp.data_trials.push({
//         "trial_type" : "likert_slider",
//         "item" : this.stim.item,
//         "response" : exp.sliderPost
//       });
//     }
//   });
  //   present_handle : function(stim) {
  //     $(".err").hide();

  //     this.stim = stim; //I like to store this information in the slide so I can record it later.

  //     $(".LikertStatement").html(stim.LikertStatement)
  //   },
  //   button : function() {
  //     var end_time = Date.now();
    
  //     //response = $("#testFreeResponse").val();
  //     if ($('input[type=radio]:checked').size() == 0) {
  //       $(".err").show();
  //     } else {
  //       this.time_spent = end_time - this.start_time;
  //       this.log_responses();
  //       _stream.apply(this); //make sure this is at the *end*, after you log your data
  //     }
  //   },

  //   log_responses: function(){
  //     exp.catch_trials.push({
  //         "trial_type" : "LikertExperience",
  //         "trial_num" : this.trial_num,
  //         "question": exp.question,
  //         "distribution": JSON.stringify(exp.distribution),
  //         //"response" : $("#testFreeResponse").val(), //if using text box
  //         "response" : $('input[type=radio]:checked').val(), //if using radio buttons
  //         "question": exp.question,
  //         "time_in_seconds" : this.time_spent/1000,

  //         //"color" : this.stim["color"], //change this
  //       });
  //   }
  // });

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
        problems: $("#problems").val(),
        fairprice: $("#fairprice").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          //"learning_trials" : exp.learning_trials,
          "system" : exp.system,
          "question": exp.question,
          "distribution": JSON.stringify(exp.distribution),          
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {

  (function(){
       var ut_id = "mht-gengame2-20170710";
       if (UTWorkerLimitReached(ut_id)) {
         $('.slide').empty();
         repeatWorker = true;
         alert("You have already completed the maximum number of HITs allowed by this requester. Please click 'Return HIT' to avoid any impact on your approval rating.");
       }
   })();
  exp.trials = [];
  exp.catch_trials = [];
  //exp.learning_trials = [];
  //exp.all_stimuli = _.shuffle(all_stimuli); // all_stimuli
  exp.question = _.sample([
    "find creatures",
    "find all of the creatures"
  ]); //can randomize between subject conditions here
  
  // exp.distribution is probability of binary feature
  // p( color | category1), p( color | category2 )
  // color is binary (but may have different binary values for two categories)

  // inside shuffle is to randomize between the two colors
  exp.distribution = _.sample([
    [1, 1, 0.5],
    [1, 1, 0.25]
  ])
  // console.log(exp.distribution)
  // TO DO:
  // - test trials: 2 x each category (perhaps one of each color)

  // Generates the characteristics for each critter
  for (var i = 0; i < creatureTypesN; i++){
  // for (var i = 0; i < uniqueCreatures.length; i++){
  	var creatureName = uniqueCreatures[i]
  	var creatOpts = _.where(creatureOpts, {name: creatureName})[0];
  	var creatureColor = createFeatureArray(
      creatureName, exp.distribution[i]
    );

  	var localCounter = 0;
  	// debugger;
  	while (j<(exemplarN*(i+1))) {
  		allCreatures.push({
        //"color": creatureColor, //color 
  			"col1": creatureColor["color"][localCounter],
  			"col2": creatureColor["color"][localCounter],
  			"col3": creatureColor["color"][localCounter] == null ? null : creatureColor["color"][localCounter] ,
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
  			"location":creatureColor.location[localCounter]
  		})
  		localCounter++;
    		j++;
  	}

    //var shuffledCritters = _.shuffle(allCreatures)
  }

  exp.creatureCategories = _.uniq(_.pluck(allCreatures, "creatureName"))

  // exp.test_critters = _.uniq(_.map(allCreatures, function(stim){
  //   _.omit(stim, ["col4", "col5","stimID", "internal_prop",
  // "attentionCheck", "location"])
  // }

// ))
  exp.learning_critters = _.shuffle(allCreatures);
  exp.test_critters = _.uniq(allCreatures, function(stim){
    return _.values(_.pick(stim,
      //"col1", "col2","col3", "creatureName", "tar1","tar2"
      "color", "col1", "col2","col3", "creatureName", "tar1","tar2", //maybe change back later
    )).join('')
  })

if (condition == 'conjunction'){
  exp.target_critters = _.filter(exp.test_critters,function(item){return item["cat_mem"] == 1})
  exp.distractor1_critters = _.filter(exp.test_critters,function(item){return item["cat_mem"] == 0.1})
  exp.distractor2_critters = _.filter(exp.test_critters,function(item){return item["cat_mem"] == 0.2})
  exp.distractor3_critters = _.filter(exp.test_critters,function(item){return item["cat_mem"] == 0.3})
  exp.test_trial_critters1 = _.sample(exp.target_critters,3).concat(_.sample(exp.distractor1_critters,3))
  exp.test_trial_critters2 = exp.test_trial_critters1.concat(_.sample(exp.distractor2_critters,3))
  exp.test_trial_critters = _.shuffle(exp.test_trial_critters2.concat(_.sample(exp.distractor3_critters,3)))
  // exp.test_trial_critters = _.shuffle(exp.test_trial_critters.push())
}
else{exp.target1_critters = _.filter(exp.test_critters,function(item){return item["cat_mem"] == 1.1})
  exp.target2_critters = _.filter(exp.test_critters,function(item){return item["cat_mem"] == 1.2})
  exp.distractor1_critters = _.filter(exp.test_critters,function(item){return item["cat_mem"] == 0.1})
  exp.distractor2_critters = _.filter(exp.test_critters,function(item){return item["cat_mem"] == 0.2})
  exp.test_trial_critters1 = _.sample(exp.target1_critters,3).concat(_.sample(exp.target2_critters,3))
  exp.test_trial_critters2 = exp.test_trial_critters1.concat(_.sample(exp.distractor1_critters,3))
  exp.test_trial_critters = _.shuffle(exp.test_trial_critters2.concat(_.sample(exp.distractor2_critters,3)))}

  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //Change order of slides here, blocks of the experiment:
  exp.structure=[
    "i0",
    "instructions",
    "welcome_zoo",
    //"learning_trial",
    //"messagePassing",
       "test_trial",
    "audience_slide",
    "accuracy_slide",
    // "LikertExperience",
    'subj_info',
    'thanks'
  ];


  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });
  exp.go(); //show first slide

}






// var condition = _.sample(["conjunction","disjunction"])


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
    name: "neither not" + categoryName,
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
    name: "has1not" + categoryName,
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
    name: "has2not" + categoryName,
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
  //  name: "not lorch",
  //  globalColors: [
  //    {
  //      p: 0.5,
  //      props: {
  //        color_mean: "yellow",
  //        color_var: 0.001,
  //        location: "ground"
  //      }
  //    }, {
  //      p: 0.5,
  //      props: {
  //        color_mean: "purple",
  //        color_var: 0.001,
  //        location: "trees"}
  //    }],
  //  col1_mean: "#ffff00", // col1 = crest
  //  col1_var: 0,
  //  col2_mean: "#ffff00", // col2 = body
  //  col2_var: 0,
  //  col3_mean: "#ffff00", // col3 = wing
  //  col3_var: 0,
  //     col4_mean: null,
  //     col4_var: null,
  //     col5_mean: null,
  //     col5_var: null,
  //  prop1: null, // height
  //  prop2: null, // fatness
  //  tar1: 0, // tails
  //  tar1: 0, // crest
  //  internal_prop: 0 // pepsin
  
], disjunction :  [
  { creature: "bird",
    name: "hasneithernot" + categoryName,
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
    name: "has1" + categoryName,
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
    cat_mem: 1.1,
    creatureNameReal: categoryName
  },
  { creature: "bird",
    name: "has2" + categoryName,
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
    cat_mem: 1.2,
    creatureNameReal: categoryName
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
    name: "hasbothnot" + categoryName,
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
    cat_mem: 0.2,
    creatureNameReal:"not a " + categoryName
  }
  // { creature: "bird",
  //  name: "not lorch",
  //  globalColors: [
  //    {
  //      p: 0.5,
  //      props: {
  //        color_mean: "yellow",
  //        color_var: 0.001,
  //        location: "ground"
  //      }
  //    }, {
  //      p: 0.5,
  //      props: {
  //        color_mean: "purple",
  //        color_var: 0.001,
  //        location: "trees"}
  //    }],
  //  col1_mean: "#ffff00", // col1 = crest
  //  col1_var: 0,
  //  col2_mean: "#ffff00", // col2 = body
  //  col2_var: 0,
  //  col3_mean: "#ffff00", // col3 = wing
  //  col3_var: 0,
  //     col4_mean: null,
  //     col4_var: null,
  //     col5_mean: null,
  //     col5_var: null,
  //  prop1: null, // height
  //  prop2: null, // fatness
  //  tar1: 0, // tails
  //  tar1: 0, // crest
  //  internal_prop: 0 // pepsin
  
] }

var creatureOpts = options[condition]
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

  var ncrit = n_creatures_of_this_color == 0 ?
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
  var ncrit = n_creatures_of_this_color == 0 ?
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

