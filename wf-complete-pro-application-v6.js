var progressBar = $("#progress-bar");
//VALIDTE FORM ON PAGE LOAD
$(document).ready(function () {
  console.log('script v3');
  validateStep(1), validateStep(2), validateStep(3), validateStep(4), validateStep(5), moveProgressBar(currentStep);
});
//DROPDOWN FUNCTIONALITY
var selectedDropdown = null,
  selectedList = null,
  selectedOptions = null,
  lastPressed = null,
  currentPressed = null,
  letterMatchedItems = null,
  targetItem = null,
  repeatLetterCount = 0;
function goToTargetItem() {
  $(selectedList).scrollTop(selectedList.scrollTop() + $(targetItem).position().top);
}
$(".c-form_dd.is--fin-dd").click(function () {
  $(this).find(".c-form_dd-link").eq(0).hide(),
    (repeatLetterCount = 0),
    (lastPressed = null),
    (currentPressed = null),
    (selectedList = $((selectedDropdown = this)).find(".c-form_dd-list")),
    (selectedOptions = $(selectedList).find(".c-form_dd-link").not(":eq(0)"));
})
// $(document).keyup(function (e) {
//     if (
//       ((lastPressed = currentPressed),
//       (currentPressed = e.key.toUpperCase()),
//       (letterMatchedItems = $.map(selectedOptions, function (e) {
//         return e.text.charAt(0) == currentPressed ? e : void 0;
//       })),
//       0 == letterMatchedItems.length)
//     )
//       return;
//     lastPressed !== currentPressed || repeatLetterCount >= letterMatchedItems.length - 1
//       ? ((repeatLetterCount = 0), goToTargetItem((targetItem = letterMatchedItems[0])))
//       : lastPressed == currentPressed && (repeatLetterCount++, goToTargetItem((targetItem = letterMatchedItems[repeatLetterCount])));
//   }
// );
//TAG MULTISELECT FIELDS INFO. Array names must match data tag value
var tagSelectionArrays = { states: [], languages: [] },
  currentDataTag = null;
//TAG MULTISELECT FUNCTIONALITY
//Get Data Tag Value utility function
function getDataTagValue(a) {
  currentDataTag = $(a).closest(".c-form_input").data("tag-input");
}
//Render Tags utility function
function renderTags(a) {
  $("[data-tag-container=" + currentDataTag).empty(),
    $.each(a, function (a, e) {
      "zh" == e ? (e = "Chinese") : "es" == e ? (e = "Spanish") : "fr" == e ? (e = "French") : "ja" == e ? (e = "Japanese") : "ko" == e ? (e = "Korean") : "de" == e ? (e = "German") : "ar" == e && (e = "Arabic"),
        $("[data-tag-container=" + currentDataTag).append(
          '<div class="c-form_tag-container"><div class="c-tag"><div class="c-tag_content"><p class="t-input is--tc-white">' +
            e +
            '</p><div class="c-tag_close-container"><img src="https://assets-global.website-files.com/5fda31241e14aeef074be642/62b1c863017e5059038a3b6c_i_close_white.svg" loading="lazy" alt=""/></div></div></div></div></div>'
        );
    });
}
//Remove selected tag value from selected tags array
function removeTagOption(a, e) {
  (tagSelectionArrays[currentDataTag] = $.grep(tagSelectionArrays[currentDataTag], function (e) {
    return e != a;
  })),
    $(e).removeClass("is--active");
}
//SEARCH FUNCTION WITHIN TAG INPUT
//initial variables
$('.c-form_multi-item[data-tag="item"]').click(function () {
  getDataTagValue(this);
  var a = $(this).text();
  $(this).hasClass("is--active")
    ? ("Chinese" == a ? (a = "zh") : "Spanish" == a ? (a = "es") : "French" == a ? (a = "fr") : "Japanese" == a ? (a = "ja") : "Korean" == a ? (a = "ko") : "German" == a ? (a = "de") : "Arabic" == a && (a = "ar"),
      removeTagOption(a, this),
      renderTags(tagSelectionArrays[currentDataTag]))
    : ($(this).addClass("is--active"),
      "Chinese" == a ? (a = "zh") : "Spanish" == a ? (a = "es") : "French" == a ? (a = "fr") : "Japanese" == a ? (a = "ja") : "Korean" == a ? (a = "ko") : "German" == a ? (a = "de") : "Arabic" == a && (a = "ar"),
      tagSelectionArrays[currentDataTag].push(a),
      renderTags(tagSelectionArrays[currentDataTag])),
    $(this).closest(".c-form_field").find("input").val(""),
    $(this).closest(".c-form_input").find("select").val(tagSelectionArrays[currentDataTag]),
    validateStep(currentStep);
}),
  //clear total selection on x click
  $(".c-form_tag-close-container").click(function () {
    getDataTagValue(this),
      $(this).closest(".c-form_field").find("input").val(""),
      $(this).closest(".c-form_input").find("select").val([]),
      (tagSelectionArrays[currentDataTag] = []),
      renderTags(tagSelectionArrays[currentDataTag]),
      $(this).closest(".c-form_input").find(".c-form_multi-item").removeClass("is--active"),
      validateStep(currentStep);
  }),
  //clear individual tag on tag x click
  $(document).on("click", ".c-tag_close-container", function () {
    getDataTagValue(this);
    var e = $(this).siblings("p").text(),
      t = $(this)
        .closest(".c-form_field")
        .find(".c-form_multi-item:contains(" + e + ")");
    "Chinese" == e ? (e = "zh") : "Spanish" == e ? (e = "es") : "French" == e ? (e = "fr") : "Japanese" == e ? (e = "ja") : "Korean" == e ? (e = "ko") : "German" == e ? (e = "de") : "Arabic" == e && (e = "ar"),
      removeTagOption(e, t),
      $(this).closest(".c-form_input").find("select").val(tagSelectionArrays[currentDataTag]),
      renderTags(tagSelectionArrays[currentDataTag]),
      validateStep(currentStep);
  });
// var selectedSearchInput = $('[data-search="input"]').first(),
//   selectedSearchContainer = null,
//   selectedSearchList = null,
//   selectedSearchOptions = null;
// function typeTest() {
//   selectedSearchInput.on("keyup", function () {
//     selectedSearchOptions.each(function () {
//       $(this).text().toLowerCase().includes(selectedSearchInput.val().toLowerCase()) ? $(this).show() : $(this).hide();
//     });
//   });
// }
// function showAllSearchOptions() {
//   selectedSearchOptions.each(function () {
//     $(this).show();
//   });
// }
// $("input").click(function () {
//   $(this).is('[data-search="input"]') &&
//     ((selectedSearchInput = $(this)),
//     (selectedSearchContainer = $(this).closest('[data-search="container"]')),
//     (selectedSearchList = selectedSearchContainer.find('[data-search="list"]')),
//     (selectedSearchOptions = selectedSearchList.children()),
//     showAllSearchOptions(),
//     typeTest());
// });
//MULTISELECT FUNCTIONALITY
var multiSelectedInput,
  multiSelectionArrays = { specialties: [], ownedSoftware: [], softwareExp: [] };
$('.c-form_multi-item[data-multi="item"]').click(function () {
  var t = $(this).text(),
    i = $(this).closest(".c-form_input").data("multi-input");
  $(this).hasClass("is--active")
    ? ((multiSelectionArrays[i] = $.grep(multiSelectionArrays[i], function (i) {
        return i != t;
      })),
      $(this).removeClass("is--active"),
      $(this).find(".t-input").removeClass("is--bold is--tc-blue"),
      $(this).find(".c-form_multi-check-container").removeClass("is--active"))
    : (multiSelectionArrays[i].push(t), $(this).addClass("is--active"), $(this).find(".t-input").addClass("is--bold is--tc-blue"), $(this).find(".c-form_multi-check-container").addClass("is--active")),
    $(this).parent().siblings("select").val(multiSelectionArrays[i]),
    validateStep(currentStep);
}),
  //TABS FUNCTIONALITY
  //Take value from c-form_tabs and change value of the hidden select
  $(".c-form_tab").click(function () {
    var t = $(this).attr("data-name");
    $(this).addClass("is--active"), $(this).find(".t-input").addClass("is--active"), $(this).parent().siblings("select").val(t);
    var i = $(this).siblings(".c-form_tab");
    $(i).each(function () {
      $(this).removeClass("is--active"), $(this).find(".t-input").removeClass("is--active");
    }),
      validateStep(currentStep);
  });
var currentStep = 0;
//Next btn triggers
//Go to step X Utility function
function goToStep(targetNum) {
  //scroll to top
  $("html, body").animate({ scrollTop: 0 }, "slow");
  //get currentNum
  var currentItems = $("*[data-step-num]").filter(function () {
    return "none" != $(this).css("display");
  });
  $('.c-breadcrumb[data-step-target="' + currentStep + '"]').removeClass("is--current"),
    $('.c-breadcrumb[data-step-target="' + currentStep + '"]')
      .find(".t-breadcrumb_link-txt")
      .removeClass("is--current"),
    $('.c-nav-dd_link[data-step-target="' + currentStep + '"]').addClass("is--active"),
    (currentStep = currentItems.data("step-num")),
    currentItems.fadeOut(250, function () {
      0 == currentStep && $('[data-step="container-container"]').removeClass("is--hidden"), (currentStep = targetNum), $("[data-step-num=" + targetNum + "]").fadeIn(250);
    }),
    $('.c-breadcrumb[data-step-target="' + targetNum + '"]')
      .find(".t-breadcrumb_link-txt")
      .addClass("is--current")
      .removeClass("is--inactive"),
    $('.c-breadcrumb[data-step-target!="' + targetNum + '"]')
      .find(".t-breadcrumb_link-txt")
      .removeClass("is--current"),
    $('.c-breadcrumb[data-step-target="' + targetNum + '"]').removeClass("is--inactive"),
    $('.c-breadcrumb[data-step-target="' + targetNum + '"]').addClass("is--current"),
    moveProgressBar(targetNum),
    //mobile
    $(".c-breadcrumb-holder").addClass("is--active"),
    $(".c-nav-dd_link").removeClass("is--current"),
    $('.c-nav-dd_link[data-step-target="' + targetNum + '"]')
      .removeClass("is--active")
      .addClass("is--current"),
    validateStep(targetNum);
}
//VALIDATE ON ACTION
$('a[data-step="btn"]').click(function () {
  $(this).hasClass("is--inactive") || goToStep($(this).data("step-target"));
}),
  $("select").change(function () {
    validateStep(currentStep);
  }),
  $("input").on("keyup", function () {
    validateStep(currentStep);
  }),
  $('input[type="checkbox"]').change(function (e) {
    validateStep(currentStep);
  });
//STEP VALIDATION UTILITY FUNCTION
function validateStep(currentStep) {
  var numNextLinks = 5 - currentStep,
    nextLinks = [],
    nextNavLinks = [],
    submitBtn = $('.c-btn[data-step-num="' + currentStep + '"]'),
    inputs = $('input[associated-step="' + currentStep + '"]'),
    selects = $('select[associated-step="' + currentStep + '"]'),
    checks = $('input[type="checkbox"][associated-step="' + currentStep + '"]');

  if (
    ((inputCheck = $(inputs).map(function () {
      return $(this).val();
    })),
    (selectCheck = $(selects).map(function () {
      return $(this).val().length;
    })),
    (checkCheck = $(checks).map(function () {
      return $(this).is(":checked");
    })),
    $.inArray(!1, checkCheck) >= 0 || $.inArray(0, selectCheck) >= 0 || $.inArray("undefined", inputCheck) >= 0 || $.inArray("", inputCheck) >= 0)
  ) {
    for (console.log("step " + currentStep + " is not complete"), submitBtn.addClass("is--btn-inactive").css("pointer-events", "none"); numNextLinks > 0; )
      nextLinks.push($(".c-breadcrumb[data-step-target=" + (currentStep + numNextLinks) + "]")), nextNavLinks.push($(".c-nav-dd_link[data-step-target=" + (currentStep + numNextLinks) + "]")), numNextLinks--;
    $.map(nextLinks, function (n) {
      $(n).find(".t-breadcrumb_link-txt").addClass("is--inactive"), $(n).addClass("is--inactive");
    }),
      $.map(nextNavLinks, function (n) {
        $(n).removeClass("is--active");
      });
  } else console.log("step " + currentStep + " is complete"), submitBtn.removeClass("is--btn-inactive").css("pointer-events", "auto");
  0 == $(".c-nav-dd_link.is--active").length, $(".c-breadcrumb-holder").removeClass("is--active"),saveToLocalStorage(inputs, selects);
}
//mobile breadcrumb menu
$(".c-nav-dd_link").click(function () {
  $(".c-nav-dd").trigger("w-close");
});

function moveProgressBar(o) {
  if(o == 0){
    console.log("moving to step " + o), progressBar.css("transform", "translate(-" + (99 - 20 * o) + "%)");
  }else{
    console.log("moving to step " + o), progressBar.css("transform", "translate(-" + (100 - 20 * o) + "%)");
  }
}

function saveToLocalStorage(inputs, selects){
  $.map(inputs, function(n){
    localStorage.setItem(n.id, n.value);
  });
  $.map(selects, function(select){
      var toStorage = ""
      var selectValues = []
      selectValues.push($(select).val());
      $.map(selectValues, function(n){
          toStorage = toStorage + ',' + n;
      })
      toStorage = toStorage.substring(1);
      localStorage.setItem(select.id, toStorage)
  })
}
