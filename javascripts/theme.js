( function( window ) {

  'use strict';
  /* set true to enable static sidebar */
  var activeStaticSidebar = false

  function classReg( className ) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  }

  var hasClass, addClass, removeClass;

  if ( 'classList' in document.documentElement ) {
    hasClass = function( elem, c ) {
      return elem.classList.contains( c );
    };
    addClass = function( elem, c ) {
      elem.classList.add( c );
    };
    removeClass = function( elem, c ) {
      elem.classList.remove( c );
    };
  }
  else {
    hasClass = function( elem, c ) {
      return classReg( c ).test( elem.className );
    };
    addClass = function( elem, c ) {
      if ( !hasClass( elem, c ) ) {
        elem.className = elem.className + ' ' + c;
      }
    };
    removeClass = function( elem, c ) {
      elem.className = elem.className.replace( classReg( c ), ' ' );
    };
  }

  function toggleClass( elem, c ) {
    var fn = hasClass( elem, c ) ? removeClass : addClass;
    fn( elem, c );
  }

  window.classie = {
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
  };

  function addElements (){
    $( '<div id="menu"><div class="burger"><div class="one"></div><div class="two"></div><div class="three"></div></div><div class="circle"></div></div>' ).insertBefore( $( "#top-menu" ) );
    var menuLeft = document.getElementById( 'top-menu' ),
    showLeft = document.getElementById( 'menu' ),
    body = document.body,
    search = document.getElementById( 'quick-search' ),
    menuButton = document.getElementById( 'menu' );

    showLeft.onclick = function() {
      classie.toggle( this, 'active' );
      classie.toggle( body, 'menu-push-toright' );
      classie.toggle( menuButton, 'menu-push-toright' );
      if (search != null) {
        classie.toggle( search, 'menu-push-toright' );
      }
      classie.toggle( menuLeft, 'open' );
    };
  }
  if (!activeStaticSidebar) {
    $(document).ready(addElements)
  }
  function addLogo () {
    // Redmine 7 has no #loggedas; put the logo at the top of the side panel
    if ( $( "#top-menu > .redmine-logo" ).length === 0 ) {
      $( "#top-menu" ).prepend( "<div class='redmine-logo'></div>" );
    }
  }
  $(document).ready(addLogo)

  // $(window).load() was removed in jQuery 3
  $(window).on('load', function() {
    $( "#quick-search form" ).css('margin-right', ($( "#project-jump" ).outerWidth() || 0) + 30);
    $( 'input[name$="q"]' ).attr( 'placeholder','Enter Search Text' );
    if (activeStaticSidebar) {
      $( "#wrapper" ).css( "margin-left", "215px" ); // #wrapper3 no longer exists
      $( "#quick-search" ).css( "left", "200px" );
      $( "#top-menu" ).css( "left", "0" );
      $( "#top-menu" ).css( "width", "215px" );
      $( "#top-menu" ).css( "transition", "none" );
      $( "#quick-search" ).css( "transition", "none" );
    }
  })
  $( document ).on( "click", "#main, #header", function() {
    $( "#top-menu" ).removeClass( "open" );
    $( ".menu-push-toright" ).removeClass( "menu-push-toright" );
  });
  window.onerror = function myErrorFunction(message, url, linenumber) {
    if (location.href.indexOf("/dmsf") != -1 || location.href.indexOf("/master_backlog") != -1){
      $(document).ready(addLogo)
      if (!activeStaticSidebar) {
        $(document).ready(addElements)
      }
    }
  };

  function removeRule() {
      if(typeof window.CSSMediaRule !== "function")
          return false; //Your browser doesn't support media query feature

      var s = document.styleSheets, r,
          i, j, k;

      if(!s) return false; //no style sheets found

      // walk throuth css sheets
      for(i=0; i<s.length; i++) {
          // get all rules
          try { r = s[i].cssRules; } catch (e) { continue; } // cross-origin sheet
          if(!r) continue;

          for(j=0; j<r.length; j++) {
              //If there's a rule for media query
              if(r[j] instanceof CSSMediaRule &&
                      r[j].media.mediaText == "screen and (max-width: 899px)") {
                  // remove all rules of it (deleteRule takes an index)
                  while (r[j].cssRules.length > 0) {
                      r[j].deleteRule(0);
                  }
                  return true;
              }
          }
      }
  }
  removeRule();
})( window );
