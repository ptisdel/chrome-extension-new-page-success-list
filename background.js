// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


var Bookmarks = {};
var TabsToUpdate = {};
getAllBookmarks();

chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tabInfo) {
    
     
    if (changeInfo.url) {
        
        // set to blue if it's a tab being watched
        if (TabsToUpdate[tabID]!=null) {
            chrome.browserAction.setIcon({
                path: {
                "16": "images/bookmark_blue_16.png",
                "32": "images/bookmark_blue_32.png",
                "48": "images/bookmark_blue_48.png",
                "128": "images/bookmark_blue_128.png"
              },
                tabId: tabID
            });
        }
        
        
        
        
        for (var key in Bookmarks) {
            if (Bookmarks[key] == changeInfo.url.toLowerCase()) {
                TabsToUpdate[tabID] = key;
                console.log("Associated tab with bookmark.");
                console.log("Tab "+tabID+" is now referencing Bookmark "+Bookmarks[key]);
                
                //set to green if this is the saved bookmark
                chrome.browserAction.setIcon({
                    path: {
                    "16": "images/bookmark_green_16.png",
                    "32": "images/bookmark_green_32.png",
                    "48": "images/bookmark_green_48.png",
                    "128": "images/bookmark_green_128.png"
                  },
                    tabId: tabID
                });
                
            }
        }
        
        
        
    }
     
     
});

chrome.browserAction.onClicked.addListener(function(tab) { 
    
    
    for (var key in TabsToUpdate) {
        
        // if active tab has a bookmark in its history
        if (key == tab.id) {
            
            console.log("Found the old bookmark.");
            //confirm that the user wants to replace the associated bookmark with the current url 
//            var r = confirm("Updating bookmark "+Bookmarks[TabsToUpdate[key]]+" to "+tab.url+". Is this correct?");
            
            //don't ask for confirmation, just do it
            var r = true;
            
            if (r) {           
                //replace the current url
                chrome.bookmarks.update(TabsToUpdate[key], { title: tab.title, url: tab.url }, function() {
                    console.log("Updated bookmark!");
                });

                //
                Bookmarks[TabsToUpdate[key]]=tab.url;
                console.log("Bookmark is now "+tab.url);
                
                //set to green now that this is the saved bookmark
                chrome.browserAction.setIcon({
                    path: {
                    "16": "images/bookmark_green_16.png",
                    "32": "images/bookmark_green_32.png",
                    "48": "images/bookmark_green_48.png",
                    "128": "images/bookmark_green_128.png"
                  },
                    tabId: tab.id
                });
                
                
            }
        }
    }

    
    
    
});

function getAllBookmarks() {
    
    Bookmarks = {};
    
    chrome.bookmarks.getSubTree( "1", function(results) {
        loopThroughBookmarks(results[0]);
    });
    
    console.log("Here is a list of all your bookmarks.");
    console.log(Bookmarks);
    
}

function loopThroughBookmarks(node) {
    
    // if it's a bookmark and not a folder
    if (node.children == null) {
        Bookmarks[node.id]=node.url.toLowerCase();
        return;
    }        
    
    for (var i = 0; i < node.children.length; i++) {
        loopThroughBookmarks(node.children[i]);
    }
        
    
    
    

//        var bookmarkURLMatches = node.url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
//        var bookmarkURL = bookmarkURLMatches && bookmarkURLMatches[1]; 


//        if (currentDomain == bookmarkURL) {
//
//            chrome.bookmarks.update(node.id, { title: tab.title, url: tab.url }, function() {
//                console.log("updated!");
//            });
//
//        }
    


    
}