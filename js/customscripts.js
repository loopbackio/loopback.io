// Copyright IBM Corp. 2016,2018. All Rights Reserved.
// Node module: loopback.io-workflow-scripts
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

$('#mysidebar').height($(".nav").height());


$( document ).ready(function() {

    // activate tooltips. although this is a bootstrap js function, it must be activated this way in your theme.
    $('[data-toggle="tooltip"]').tooltip({
        placement : 'top'
    });

    /**
     * AnchorJS
     */
    anchors.add('h2,h3,h4,h5');

});

// needed for nav tabs on pages. See Formatting > Nav tabs for more details.
// script from http://stackoverflow.com/questions/10523433/how-do-i-keep-the-current-tab-active-with-twitter-bootstrap-after-a-page-reload
$(function() {
    var json, tabsState;
    $('a[data-toggle="pill"], a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var href, json, parentId, tabsState;

        tabsState = localStorage.getItem("tabs-state");
        json = JSON.parse(tabsState || "{}");
        parentId = $(e.target).parents("ul.nav.nav-pills, ul.nav.nav-tabs").attr("id");
        href = $(e.target).attr('href');
        json[parentId] = href;

        return localStorage.setItem("tabs-state", JSON.stringify(json));
    });

    tabsState = localStorage.getItem("tabs-state");
    json = JSON.parse(tabsState || "{}");

    $.each(json, function(containerId, href) {
        return $("#" + containerId + " a[href=" + href + "]").tab('show');
    });

    $("ul.nav.nav-pills, ul.nav.nav-tabs").each(function() {
        var $this = $(this);
        if (!json[$this.attr("id")]) {
            return $this.find("a[data-toggle=tab]:first, a[data-toggle=pill]:first").tab("show");
        }
    });

    setupSidebarTreeNav();
});

function setupSidebarTreeNav(){

    //hide all non-active nav-lists:
    $('.nav-list').not('#mysidebar').each(function(i, list){
      if(!$(list).parent().is('.active')){
        $(list).hide();
      }
    });

    //add active class to parents of active nav elems
    $("li.active").parentsUntil('#mysidebar', '.tree-parent')
      .addClass('expanded')
      .children('ul.nav-list').show();


    //add expanded class to active tree parents
    $('.tree-parent.active').addClass('expanded');

    $('a.show-hide').click(function (e) {
      console.log('clicked', this);
      $(this)
        .blur()
        .parent().toggleClass('expanded')
        .children('ul.nav-list').toggle(200);
      return false;
      // $(this).parent().children('ul.nav-list').toggle(200);
    });
}
