equalheight=function(container){var currentTallest=0,currentRowStart=0,rowDivs=new Array(),$el,topPosition=0;$(container).each(function(){$el=$(this);$($el).height('auto');topPostion=$el.position().top;if(currentRowStart!==topPostion){for(currentDiv=0;currentDiv<rowDivs.length;currentDiv++){rowDivs[currentDiv].height(currentTallest);}
rowDivs.length=0;currentRowStart=topPostion;currentTallest=$el.height();rowDivs.push($el);}else{rowDivs.push($el);currentTallest=(currentTallest<$el.height())?($el.height()):(currentTallest);}
for(currentDiv=0;currentDiv<rowDivs.length;currentDiv++){rowDivs[currentDiv].height(currentTallest);}});};var IDSeh={init:function()
{IDSeh.equalCol();$(window).on('resize',IDSeh.equalCol);},equalCol:function()
{if($(window).width()>991)
{equalheight('#testimonials div.col-md-4');$('#testimonials div.col-md-4').addClass('equal');}
else
{$('#testimonials div.col-md-4').removeAttr('style').removeClass('equal');}}};$(window).load(IDSeh.init);