// Select the main list and add the class "hasSubmenu" in each LI that contains an UL
$('.menuLateral ul').each(function(){
  $this = $(this);
  $this.find("li").has("ul").addClass("hasSubmenu");
});

// Find the last li in each level
$('.menuLateral li:last-child').each(function(){
  $this = $(this);
  // Check if LI has children
  if ($this.children('ul').length === 0){
    // Add border-left in every UL where the last LI has not children
    $this.closest('ul').css("border-left", "1px solid white");
  } else {
    // Add border in child LI, except in the last one
    
    $this.closest('ul').children("li").not(":last").css("border-left","1px solid white");
    // Add the class "addBorderBefore" to create the pseudo-element :defore in the last li
    $this.closest('ul').children("li").last().children("a").addClass("addBorderBefore");
    // Add margin in the first level of the list
    $this.closest('ul').css("margin-top","20px");
    // Add margin in other levels of the list
    $this.closest('ul').find("li").children("ul").css("margin-top","20px");
  };
});
// Add bold in li and levels above
$('.menuLateral ul li').each(function(){
  $this = $(this);
  
  $( this ).children("a").css({"font-weight":"normal","color":"#fff"});
  $this.mouseenter(function(){
    $( this ).children("a").css({"font-weight":"bold","color":"#336b9b"});
    $( this ).children("i").css({"font-weight":"bold","color":"#336b9b"});
  });
  $this.mouseleave(function(){
    $( this ).children("a").css({"font-weight":"normal","color":"#fff"});
  });
});
// Add button to expand and condense - Using FontAwesome
$('.menuLateral ul li.hasSubmenu').each(function(){
  $this = $(this);
  $this.prepend("<a href='#'><i class='fa fa-minus-circle'></i><i style='display:none;' class='fa fa-plus-circle'></i></a>");
   $this.children("a").not(":last").removeClass().addClass("toogle").addClass("rootmenu");
//   $this.click();
});

// Actions to expand and consense
$('.menuLateral ul li.hasSubmenu a.toogle').click(function(){
  $this = $(this);
  $this.closest("li").children("ul").toggle("show");
  $this.children("i").toggle();
  return false;
});

$('.menuLateral .vu ul li.hasSubmenu a.rootmenu').each(function(){
  $this = $(this);
  $this.closest("li").children("ul").toggle("show");
  $this.children("i").toggle();
});
$('.menuLateral .vu ul a').first().click();