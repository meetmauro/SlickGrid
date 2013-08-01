/***
 * Contains basic SlickGrid editors.
 * @module Editors
 * @namespace Slick
 */

(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "Editors": {
        "Text": TextEditor,
        "Integer": IntegerEditor,
        "Date": DateEditor,
        "YesNoSelect": YesNoSelectEditor,
        "Checkbox": CheckboxEditor,
        "PercentComplete": PercentCompleteEditor,
        "LongText": LongTextEditor,
        "Float": FloatEditor,
        "Percentage": PercentageEditor,
        "RowMulti": RowEditor,
        "ReadOnly": ReadOnlyEditor,
        "Combo": SelectCellEditor,
        "Color": ColorEditor
      }
    }
  });



  function RowEditor(args) {
     var theEditor = undefined;
     var scope = this;
     
     this.init = function () {
        //var data = args.grid.getData();
        if (args.item.editor === undefined)
           theEditor = new ReadOnlyEditor(args);
        else
           theEditor = new (args.item.editor)(args);
      };

      this.destroy = function () {
        theEditor.destroy();
      };

      this.focus = function () {
        theEditor.focus();
      };

      this.getValue = function () {
        return theEditor.getValue();
      };

      this.setValue = function (val) {
        theEditor.setValue(val);
      };

      this.loadValue = function (item) {
        theEditor.loadValue(item);
      };

      this.serializeValue = function () {
        return theEditor.serializeValue();
      };

      this.applyValue = function (item, state) {
        theEditor.applyValue(item,state);
      };

      this.isValueChanged = function () {
        return theEditor.isValueChanged();
      };

      this.validate = function () {
        return theEditor.validate();
      };

      this.init();
  }
  
  

  function TextEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $input = $("<INPUT type=text class='editor-text' />")
          .appendTo(args.container)
          .bind("keydown.nav", function (e) {
            if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
              e.stopImmediatePropagation();
            }
          });
      $input.focus();
      $input.select();
    };

    this.destroy = function () {
      $input.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.getValue = function () {
      return $input.val();
    };

    this.setValue = function (val) {
      $input.val(val);
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field] || "";
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };

    this.serializeValue = function () {
      return $input.val();
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
    };

    this.validate = function () {
      if (args.column.validator) {
        var validationResults = args.column.validator($input.val());
        if (!validationResults.valid) {
          return validationResults;
        }
      }

      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }



  function ReadOnlyEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $input = $("<span class='editor-text' />").appendTo(args.container);
    };

    this.destroy = function () {
      $input.remove();
    };

    this.focus = function () { };

    this.getValue = function () {
      return $input.val();
    };

    this.setValue = function (val) {
      $input.val(val);
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field] || "";
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };

    this.serializeValue = function () {
      return $input.val();
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return false;
    };

    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }  
  

  function IntegerEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $input = $("<INPUT type=text class='editor-text' />");

      $input.bind("keydown.nav", function (e) {
        if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
          e.stopImmediatePropagation();
        }
      });

      $input.appendTo(args.container);
      $input.focus().select();
    };

    this.destroy = function () {
      $input.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      defaultValue = parseInt(item[args.column.field]);
      if (isNaN(defaultValue)) defaultValue='';
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };

    this.serializeValue = function () {
      return parseInt($input.val(), 10) || 0;
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
    };

    this.validate = function () {
      if (isNaN($input.val())) {
        return {
          valid: false,
          msg: "Please enter a valid integer"
        };
      }

      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }


  function FloatEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $input = $("<INPUT type=text class='editor-text' />");

      $input.bind("keydown.nav", function (e) {
        if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
          e.stopImmediatePropagation();
        }
      });

      $input.appendTo(args.container);
      $input.focus().select();
    };

    this.destroy = function () {
      $input.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      defaultValue = parseFloat(item[args.column.field]);
      if (isNaN(defaultValue)) defaultValue='';
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };

    this.serializeValue = function () {
      var v = $input.val();
      if (v == '') return v;
      return parseFloat(v) || 0.0;
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      //return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
      return ($input.val() != defaultValue.toString());
    };

    this.validate = function () {
      if (isNaN($input.val())) {
        return {
          valid: false,
          msg: "Please enter a valid float"
        };
      }

      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }


  function PercentageEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $input = $("<INPUT type=text class='editor-text' />");

      $input.bind("keydown.nav", function (e) {
        if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
          e.stopImmediatePropagation();
        }
      });

      $input.appendTo(args.container);
      $input.focus().select();
    };

    this.destroy = function () {
      $input.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      defaultValue = parseFloat(item[args.column.field]);
      if (isNaN(defaultValue)) defaultValue=''; else defaultValue += ' %';
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };
    this.serializeValue = function () {
      var v = $input.val();
      if (v == '') return v;
      if(v.charAt( v.length-1 ) == '%') return Math.round(parseFloat(v)*10)/1000 || 0.0;
      return parseFloat(v) || 0.0;
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = Math.round(state*1000)/10 + ' %';
    };

    this.isValueChanged = function () {
      //return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
      return ($input.val() != defaultValue.toString());
    };

    this.validate = function () {
      if (isNaN(parseFloat($input.val()))) {
        return {
          valid: false,
          msg: "Please enter a valid percentage"
        };
      }

      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }


  function DateEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;
    var calendarOpen = false;

    this.init = function () {
      $input = $("<INPUT type=text class='editor-text' />");
      $input.appendTo(args.container);
      $input.focus().select();
      $input.datepicker({
        showOn: "button",
        buttonImageOnly: true,
        buttonImage: "../images/calendar.gif",
        beforeShow: function () {
          calendarOpen = true
        },
        onClose: function () {
          calendarOpen = false
        }
      });
      $input.width($input.width() - 18);
    };

    this.destroy = function () {
      $.datepicker.dpDiv.stop(true, true);
      $input.datepicker("hide");
      $input.datepicker("destroy");
      $input.remove();
    };

    this.show = function () {
      if (calendarOpen) {
        $.datepicker.dpDiv.stop(true, true).show();
      }
    };

    this.hide = function () {
      if (calendarOpen) {
        $.datepicker.dpDiv.stop(true, true).hide();
      }
    };

    this.position = function (position) {
      if (!calendarOpen) {
        return;
      }
      $.datepicker.dpDiv
          .css("top", position.top + 30)
          .css("left", position.left);
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field];
      $input.val(defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };

    this.serializeValue = function () {
      return $input.val();
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
    };

    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }


 function SelectCellEditor(args) {
        var $select;
        var defaultValue;
        var scope = this;

        this.init = function() {
            var opt = args.column.options;
            option_str = ""
            for(i in opt){
              v = opt[i];
              option_str += "<OPTION value='"+v.key+"'>"+v.val+"</OPTION>";
            }
            $select = $("<SELECT tabIndex='0' class='editor-select'>"+ option_str +"</SELECT>");
            $select.appendTo(args.container);
            $select.focus();
        };

        this.destroy = function() {
            $select.remove();
        };

        this.focus = function() {
            $select.focus();
        };

        this.loadValue = function(item) {
            defaultValue = item[args.column.field];
            $select.val(defaultValue);
        };

        this.serializeValue = function() {
            if(args.column.options){
              return $select.children("option:selected").text();
            }else{
              return ($select.val() == "yes");
            }
        };

        this.applyValue = function(item,state) {
            item[args.column.field] = state;
        };

        this.isValueChanged = function() {
            return ($select.val() != defaultValue);
        };

        this.validate = function() {
            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    } 
    
  function YesNoSelectEditor(args) {
    var $select;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='yes'>Yes</OPTION><OPTION value='no'>No</OPTION></SELECT>");
      $select.appendTo(args.container);
      $select.focus();
    };

    this.destroy = function () {
      $select.remove();
    };

    this.focus = function () {
      $select.focus();
    };

    this.loadValue = function (item) {
      $select.val((defaultValue = item[args.column.field]) ? "yes" : "no");
      $select.select();
    };

    this.serializeValue = function () {
      return ($select.val() == "yes");
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return ($select.val() != defaultValue);
    };

    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }

  function CheckboxEditor(args) {
    var $select;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $select = $("<INPUT type=checkbox value='true' class='editor-checkbox' hideFocus>");
      $select.appendTo(args.container);
      $select.focus();
    };

    this.destroy = function () {
      $select.remove();
    };

    this.focus = function () {
      $select.focus();
    };

    this.loadValue = function (item) {
      defaultValue = stringToBoolean(item[args.column.field]);
      if (defaultValue) {
        $select.attr("checked", "checked");
      } else {
        $select.removeAttr("checked");
      }
    };

    this.serializeValue = function () {
      return $select.is(":checked");
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return ($select.is(":checked") != defaultValue);
    };

    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }

  function PercentCompleteEditor(args) {
    var $input, $picker;
    var defaultValue;
    var scope = this;

    this.init = function () {
      $input = $("<INPUT type=text class='editor-percentcomplete' />");
      $input.width($(args.container).innerWidth() - 25);
      $input.appendTo(args.container);

      $picker = $("<div class='editor-percentcomplete-picker' />").appendTo(args.container);
      $picker.append("<div class='editor-percentcomplete-helper'><div class='editor-percentcomplete-wrapper'><div class='editor-percentcomplete-slider' /><div class='editor-percentcomplete-buttons' /></div></div>");

      $picker.find(".editor-percentcomplete-buttons").append("<button val=0>Not started</button><br/><button val=50>In Progress</button><br/><button val=100>Complete</button>");

      $input.focus().select();

      $picker.find(".editor-percentcomplete-slider").slider({
        orientation: "vertical",
        range: "min",
        value: defaultValue,
        slide: function (event, ui) {
          $input.val(ui.value)
        }
      });

      $picker.find(".editor-percentcomplete-buttons button").bind("click", function (e) {
        $input.val($(this).attr("val"));
        $picker.find(".editor-percentcomplete-slider").slider("value", $(this).attr("val"));
      })
    };

    this.destroy = function () {
      $input.remove();
      $picker.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      $input.val(defaultValue = item[args.column.field]);
      $input.select();
    };

    this.serializeValue = function () {
      return parseInt($input.val(), 10) || 0;
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ((parseInt($input.val(), 10) || 0) != defaultValue);
    };

    this.validate = function () {
      if (isNaN(parseInt($input.val(), 10))) {
        return {
          valid: false,
          msg: "Please enter a valid positive number"
        };
      }

      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }

  /*
   * An example of a "detached" editor.
   * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
   * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
   */
  function LongTextEditor(args) {
    var $input, $wrapper;
    var defaultValue;
    var scope = this;

    this.init = function () {
      var $container = $("body");

      $wrapper = $("<DIV style='z-index:10000;position:absolute;background:white;padding:5px;border:3px solid gray; -moz-border-radius:10px; border-radius:10px;'/>")
          .appendTo($container);

      $input = $("<TEXTAREA hidefocus rows=5 style='backround:white;width:250px;height:80px;border:0;outline:0'>")
          .appendTo($wrapper);

      $("<DIV style='text-align:right'><BUTTON>Save</BUTTON><BUTTON>Cancel</BUTTON></DIV>")
          .appendTo($wrapper);

      $wrapper.find("button:first").bind("click", this.save);
      $wrapper.find("button:last").bind("click", this.cancel);
      $input.bind("keydown", this.handleKeyDown);

      scope.position(args.position);
      $input.focus().select();
    };

    this.handleKeyDown = function (e) {
      if (e.which == $.ui.keyCode.ENTER && e.ctrlKey) {
        scope.save();
      } else if (e.which == $.ui.keyCode.ESCAPE) {
        e.preventDefault();
        scope.cancel();
      } else if (e.which == $.ui.keyCode.TAB && e.shiftKey) {
        e.preventDefault();
        args.grid.navigatePrev();
      } else if (e.which == $.ui.keyCode.TAB) {
        e.preventDefault();
        args.grid.navigateNext();
      }
    };

    this.save = function () {
      args.commitChanges();
    };

    this.cancel = function () {
      $input.val(defaultValue);
      args.cancelChanges();
    };

    this.hide = function () {
      $wrapper.hide();
    };

    this.show = function () {
      $wrapper.show();
    };

    this.position = function (position) {
      $wrapper
          .css("top", position.top - 5)
          .css("left", position.left - 5)
    };

    this.destroy = function () {
      $wrapper.remove();
    };

    this.focus = function () {
      $input.focus();
    };

    this.loadValue = function (item) {
      $input.val(defaultValue = item[args.column.field]);
      $input.select();
    };

    this.serializeValue = function () {
      return $input.val();
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
    };

    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }



  function ColorEditor(args) {
    var $input;
    var defaultValue;
    var scope = this;
    var isOpen = false;

    this.init = function () {
      me = this;
      $('html').click(function(event) {
         if (isOpen) {
            if (args.container.has(event.target).length !== 0) return;
            // me.destroy();
         }
       });

      //$input = $("<a href='#'>color</a>");
      $input = $("<input type='color' />");
      // $input.appendTo($('body'));
      $input.appendTo(args.container);
      $input.focus().select();
      this.show();
    };




    this.destroy = function () {
      $input.spectrum("destroy");
      $input.remove();
      isOpen=false;
    };

    this.show = function () {
      if (!isOpen) {
        $input.spectrum({
            className: 'spectrumSlick',
            clickoutFiresChange: true,
            showButtons: false,
            showPalette: true,
            showInput: true,
            showSelectionPalette: true,
            maxPaletteSize: 16,
            preferredFormat: "hex6",
            appendTo: "body",
            flat: true,
          palette: [
              ["#000000","#262626","#464646","#626262","#707070","#7D7D7D","#898989","#959595","#A0A0A0","#ACACAC","#B7B7B7","#C2C2C2","#D7D7D7","#E1E1E1","#EBEBEB","#FFFFFF"],
              ["#FF0000","#FFFF00","#00FF00","#00FFFF","#0000FF","#FF00FF","#ED1C24","#FFF200","#00A651","#00AEEF","#2E3192","#EC008C"],
              ["#F7977A","#F9AD81","#FDC68A","#FFF79A","#C4DF9B","#A2D39C","#82CA9D","#7BCDC8","#6ECFF6","#7EA7D8","#8493CA","#8882BE","#A187BE","#BC8DBF","#F49AC2","#F6989D"],
              ["#F26C4F","#F68E55","#FBAF5C","#FFF467","#ACD372","#7CC576","#3BB878","#1ABBB4","#00BFF3","#438CCA","#5574B9","#605CA8","#855FA8","#A763A8","#F06EA9","#F26D7D"],
              ["#ED1C24","#F26522","#F7941D","#FFF200","#8DC73F","#39B54A","#00A651","#00A99D","#00AEEF","#0072BC","#0054A6","#2E3192","#662D91","#92278F","#EC008C","#ED145B"],
              ["#9E0B0F","#A0410D","#A36209","#ABA000","#598527","#1A7B30","#007236","#00746B","#0076A3","#004B80","#003471","#1B1464","#440E62","#630460","#9E005D","#9E0039"],
              ["#790000","#7B2E00","#7D4900","#827B00","#406618","#005E20","#005826","#005952","#005B7F","#003663","#002157","#0D004C","#32004B","#4B0049","#7B0046","#7A0026"],
          ]
        });
        isOpen = true;
      }
     $input.spectrum("show");
    };

    this.hide = function () {
      if (isOpen) {
        $input.spectrum("hide");
        isOpen=false;
      }
    };

    this.position = function (position) {
      if (!isOpen) return;
      //$cp.css("top", position.top + 20).css("left", position.left);
    };

    this.focus = function () {
      $input.focus();
      this.show();
    };

    this.getValue = function () {
      return $input.spectrum("get").toHexString();
    };

    this.setValue = function (val) {
      $input.spectrum("set",val);
    };

    this.loadValue = function (item) {
      defaultValue = item[args.column.field] || "";
      $input.spectrum("set",defaultValue);
      $input[0].defaultValue = defaultValue;
      $input.select();
    };

    this.serializeValue = function () {
      return $input.spectrum("get").toHexString();
    };

    this.applyValue = function (item, state) {
      item[args.column.field] = state;
    };

    this.isValueChanged = function () {
      var v = $input.spectrum("get").toHexString();
      return (!(v == "" && defaultValue == null)) && (v != defaultValue);
    };

    this.validate = function () {
      return {
        valid: true,
        msg: null
      };
    };

    this.init();
  }


})(jQuery);
