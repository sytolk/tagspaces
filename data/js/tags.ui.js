/* Copyright (c) 2012 The Tagspaces Authors. All rights reserved.
 * Use of this source code is governed by a AGPL3 license that 
 * can be found in the LICENSE file. */
/*
define([
    'require',
    'exports',
    'module',
    'dynatree',
//    'css!dynatreecss'
],function(require, exports, module) {
"use strict";
*/
console.debug("Loading TagsUI...");

var TagsUI = (typeof TagsUI == 'object' && TagsUI != null) ? TagsUI : {};

TagsUI.initContextMenus = function() {

//    $( "#tagSuggestionsMenu" ).menu({
//        select: function( event, ui ) {
//            console.debug("Tag suggestion "+ui.item.attr( "action" )+" for tag: "+UIAPI.selectedTag);            
//        }        
//    });        
    
    // Context menu for the tags in the file table and the file viewer
    $( "#tagMenu" ).menu({
        select: function( event, ui ) {
            console.debug("Tag menu action: "+ui.item.attr( "action" )+" for tag: "+UIAPI.selectedTag);
            switch (ui.item.attr( "action" )) {
              case "addTagAsFilter":
                $( this ).hide();
                $("#filterBox").val(UIAPI.selectedTag);
                UIAPI.fileTable.fnFilter(UIAPI.selectedTag);
                break;                            
              case "addTagInTagGroup":
                $( this ).hide();
                // TODO Finish add tag in group
                break;                            
              case "editTag":
                $( this ).hide();
                $( "#newTag" ).val(UIAPI.selectedTag);
                $( "#dialogEditTag" ).dialog( "open" );
                break;                            
              case "removeTag":
                $( this ).hide();
                TSAPI.removeTag(UIAPI.selectedTag);
                break;
              case "closeMenu":
                $( this).hide();                
                break;                
            }
        }
    });

    // Context menu for the tags in the tag tree
    $( "#tagTreeMenu" ).menu({
        select: function( event, ui ) {
            console.debug("Tag menu action: "+ui.item.attr( "action" )+" for tag: "+UIAPI.selectedTag);
            switch (ui.item.attr( "action" )) {
              case "addTagToFile":
                TSAPI.addTag(UIAPI.selectedTag, UIAPI.selectedTagData.type);  
                break;                            
              case "addTagAsFilter":
                $("#filterBox").val(UIAPI.selectedTag);
                UIAPI.fileTable.fnFilter(UIAPI.selectedTag);
                break;                            
              case "editTag":
              // TODO Consider smart tags
                $( "#tagName" ).val(UIAPI.selectedTagData.title);
                $( "#dialog-tagedit" ).dialog( "open" );
                break;                            
              case "deleteTag":
                $( "#dialog-confirmtagdelete" ).dialog( "open" );                
                break;
              case "closeMenu":
                $( this ).hide();                
                break;
            }
        }
    });
    
    // Context menu for the tags groups
    $( "#tagGroupMenu" ).menu({
        select: function( event, ui ) {
            console.debug("TagGroup  menu action: "+ui.item.attr( "action" )+" for tag: "+UIAPI.selectedTag);
            switch (ui.item.attr( "action" )) {
              case "toggleTagGroup":
                $("#tagGroups").dynatree("getTree").getNodeByKey(UIAPI.selectedTagData.key).toggleExpand();
                break;                            
              case "createNewTag":
                $( "#newTagName" ).val("");
                $( "#dialog-tagcreate" ).dialog( "open" );
                break;                            
              case "deleteTagGroup":
                $( "#dialog-confirmtaggroupdelete" ).dialog( "open" );                
                break;                            
              case "duplicateTagGroup":
                $( "#dialog-taggroupDupicate" ).dialog( "open" );
                break;
              case "editTagGroup":
                $( "#tagGroupName" ).val(UIAPI.selectedTagData.title);              
                $( "#dialog-taggroupEdit" ).dialog( "open" );
                break;
              case "closeMenu":
                $( "#tagGroupMenu" ).hide();                
                break;                
            }
        }
    });  
}

TagsUI.initDialogs = function() {

    var newDirName = $( "#dirname" );
    
    var newFileName = $( "#newFileName" );
    
    var renamedFileName = $( "#renamedFileName" );
    
    var smartTag = $( "#smartTagName" );
    
    // TODO evtl add smarttag and the others...    
    var allFields = $( [] ).add( newDirName );
    
    var tips = $( ".validateTips" );

    function updateTips( t ) {
        tips
            .text( t )
            .addClass( "ui-state-highlight" );
        setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }

    function checkLength( o, n, min, max ) {
        if ( o.val().length > max || o.val().length < min ) {
            o.addClass( "ui-state-error" );
            updateTips( "Length of " + n + " must be between " +
                min + " and " + max + "." );
            return false;
        } else {
            return true;
        }
    }

    function checkRegexp( o, regexp, n ) {
        if ( !( regexp.test( o.val() ) ) ) {
            o.addClass( "ui-state-error" );
            updateTips( n );
            return false;
        } else {
            return true;
        }
    }

    $( "#dialog-smarttag" ).dialog({
        autoOpen: false,
        height: 220,
        width: 450,
        modal: true,
        buttons: {
            "Add smart tag": function() {
                var bValid = true;                
                allFields.removeClass( "ui-state-error" );

                bValid = bValid && checkLength( smartTag, "tagname", 2, 40 );
                if ( bValid ) {
                    for (var i=0; i < UIAPI.selectedFiles.length; i++) {
                       TSAPI.writeTagsToFile(UIAPI.selectedFiles[i], [smartTag.val()]);
                    };
                    $( this ).dialog( "close" );
                    IOAPI.listDirectory(UIAPI.currentPath);                    
                }
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            allFields.val( "" ).removeClass( "ui-state-error" );
        },
        open: function() {
            $( "#renamedFileName" ).val(UIAPI.selectedFiles[0]);
        }                
    });     
    
    $( "#dialog-confirmtagremove" ).dialog({
        autoOpen: false,
        resizable: false,
        height:140,
        modal: true,
        buttons: {
            "Remove tag": function() {
                TSAPI.removeTag(UIAPI.selectedTag);  
                $( this ).dialog( "close" );
                IOAPI.listDirectory(UIAPI.currentPath);   
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        }
    });    

    $( "#dialog-confirmtagdelete" ).dialog({
        autoOpen: false,
        resizable: false,
        height:140,
        modal: true,
        buttons: {
            "Delete tag from taggroup": function() {                
                TSSETTINGS.deleteTag(UIAPI.selectedTagData);
                TagsUI.generateTagGroups();    
                $( this ).dialog( "close" );
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        }
    });    

    $( "#dialog-confirmtaggroupdelete" ).dialog({
        autoOpen: false,
        resizable: false,
        height:140,
        modal: true,
        buttons: {
            "Delete": function() {                
                TSSETTINGS.deleteTagGroup(UIAPI.selectedTagData);
                TagsUI.generateTagGroups();    
                $( this ).dialog( "close" );
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        }
    }); 

    $( "#dialog-tagedit" ).dialog({
        autoOpen: false,
        resizable: false,
        height:240,
        modal: true,
        buttons: {
            "Save": function() {
                // TODO complete the functionality for smart tags
                TSSETTINGS.editTag(UIAPI.selectedTagData, $( "#tagName" ).val() )
                TagsUI.generateTagGroups();    
                $( this ).dialog( "close" );
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        }
    });   

    $( "#dialog-tagcreate" ).dialog({
        autoOpen: false,
        resizable: false,
        height:240,
        modal: true,
        buttons: {
            "Create tag": function() {
                TSSETTINGS.createTag(UIAPI.selectedTagData, $( "#newTagName" ).val() )
                TagsUI.generateTagGroups();                    
                $( this ).dialog( "close" );
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        }
    });  
    
    $( "#dialog-taggroupDupicate" ).dialog({
        autoOpen: false,
        resizable: false,
        height:240,
        modal: true,
        buttons: {
            "Duplicate taggroup": function() {
                TSSETTINGS.duplicateTagGroup(UIAPI.selectedTagData, $( "#newTagGroupName" ).val(), $( "#newTagGroupKey" ).val() )
                TagsUI.generateTagGroups();                    
                $( this ).dialog( "close" );
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        }
    });   
    
    $( "#dialog-taggroupEdit" ).dialog({
        autoOpen: false,
        resizable: false,
        height:240,
        modal: true,
        buttons: {
            "Save": function() {
                TSSETTINGS.editTagGroup(UIAPI.selectedTagData, $( "#tagGroupName" ).val() )
                TagsUI.generateTagGroups();                    
                $( this ).dialog( "close" );
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        }
    });               
}

TagsUI.generateTagGroups = function() {
    console.debug("Generating TagGroups...");
    $("#tagGroups").empty();
    $("#tagGroups").addClass("ui-accordion ui-accordion-icons ui-widget ui-helper-reset")
    for(var i=0; i < TSSETTINGS.Settings["tagGroups"].length; i++) {
        $("#tagGroups").append($("<h3>", { 
            class: "ui-accordion-header ui-helper-reset ui-state-default ui-corner-top ui-corner-bottom"    
        })
        .hover(function() { $(this).toggleClass("ui-state-hover"); })        
        .append($("<span>", { 
            class: "tagGroupTitle",
            text: TSSETTINGS.Settings["tagGroups"][i].title, 
        })
        .click(function() {
          $(this)
            .parent().toggleClass("ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom").end()
            .parent().next().toggleClass("ui-accordion-content-active").toggle();
          return false;
        })        
        )
        .append($("<span>", { 
                class: "tagGroupSettings",
                tag: TSSETTINGS.Settings["tagGroups"][i].title, 
                key: TSSETTINGS.Settings["tagGroups"][i].key, 
                title: "Taggroup options",
                text: "-", 
        })                
        .dropdown( 'attach' , '#tagGroupMenu' )
        .click( function(event) {
                //console.debug("Clicked in taggroup setting");    
                UIAPI.selectedTag = $(this).attr("tag");
                UIAPI.selectedTagData = TSSETTINGS.getTagGroupData($(this).attr("key"));
                UIAPI.selectedTagData.parentKey = undefined;  
        })
        )
        );
          
        var tagButtons = $("<div>").appendTo( "#tagGroups" );  
        tagButtons.attr("style","margin: 0px; padding: 5px;");
        tagButtons.addClass("ui-accordion-content  ui-helper-reset ui-widget-content ui-corner-bottom")
        tagButtons.hide(); 
        for(var j=0; j < TSSETTINGS.Settings["tagGroups"][i]["children"].length; j++) {
            tagButtons.append($("<button>", { 
                class: "tagButton", 
                tag: TSSETTINGS.Settings["tagGroups"][i]["children"][j].title, 
                parentKey: TSSETTINGS.Settings["tagGroups"][i].key,
                title: "Opens context menu for "+TSSETTINGS.Settings["tagGroups"][i]["children"][j].title,
                text: TSSETTINGS.Settings["tagGroups"][i]["children"][j].title, 
            })
            .click( function() {
                UIAPI.selectedTag = $(this).attr("tag");
                UIAPI.selectedTagData = TSSETTINGS.getTagData($(this).attr("tag"), $(this).attr("parentKey"));
                UIAPI.selectedTagData.parentKey = $(this).attr("parentKey");
            })
            .dropdown( 'attach' , '#tagTreeMenu' )               
            );                      
        }
    }
}

// TODO evtl. move to Fileviewer.js
TagsUI.openTagMenu = function(tagButton, tag, fileName) {
    BasicViewsUI.clearSelectedFiles();
    $(tagButton).parent().parent().toggleClass("selectedRow");

    UIAPI.currentFilename = fileName;
    UIAPI.selectedFiles.push(UIAPI.currentFilename);
    
    UIAPI.selectedTag = tag;
    UIAPI.currentFilename = fileName;
}

//});