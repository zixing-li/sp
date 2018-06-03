import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PackageListWrapper extends Component {
  componentWillMount() {
    var SETTINGS = {
        navBarTravelling: false,
        navBarTravelDirection: "",
      navBarTravelDistance: 150
    }
    
    var colours = {
        0: "#867100",
        1: "#7F4200",
        2: "#99813D",
        3: "#40FEFF",
        4: "#14CC99",
        5: "#00BAFF",
        6: "#0082B2",
        7: "#B25D7A",
        8: "#00FF17",
        9: "#006B49",
        10: "#00B27A",
        11: "#996B3D",
        12: "#CC7014",
        13: "#40FF8C",
        14: "#FF3400",
        15: "#ECBB5E",
        16: "#ECBB0C",
        17: "#B9D912",
        18: "#253A93",
        19: "#125FB9",
    }
    
    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");
    
    // Out advancer buttons
    var pnAdvancerLeft = document.getElementById("pnAdvancerLeft");
    var pnAdvancerRight = document.getElementById("pnAdvancerRight");
    // the indicator
    var pnIndicator = document.getElementById("pnIndicator");
    
    var pnProductNav = document.getElementById("pnProductNav");
    var pnProductNavContents = document.getElementById("pnProductNavContents");
    
    pnProductNav.setAttribute("data-overflowing", determineOverflow(pnProductNavContents, pnProductNav));
    
    // Set the indicator
    moveIndicator(pnProductNav.querySelector("[aria-selected=\"true\"]"), colours[0]);
    
    // Handle the scroll of the horizontal container
    var last_known_scroll_position = 0;
    var ticking = false;
    
    function doSomething(scroll_pos) {
        pnProductNav.setAttribute("data-overflowing", determineOverflow(pnProductNavContents, pnProductNav));
    }
    
    pnProductNav.addEventListener("scroll", function() {
        last_known_scroll_position = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function() {
                doSomething(last_known_scroll_position);
                ticking = false;
            });
        }
        ticking = true;
    });
    
    
    pnAdvancerLeft.addEventListener("click", function() {
      // If in the middle of a move return
        if (SETTINGS.navBarTravelling === true) {
            return;
        }
        // If we have content overflowing both sides or on the left
        if (determineOverflow(pnProductNavContents, pnProductNav) === "left" || determineOverflow(pnProductNavContents, pnProductNav) === "both") {
            // Find how far this panel has been scrolled
            var availableScrollLeft = pnProductNav.scrollLeft;
            // If the space available is less than two lots of our desired distance, just move the whole amount
            // otherwise, move by the amount in the settings
            if (availableScrollLeft < SETTINGS.navBarTravelDistance * 2) {
                pnProductNavContents.style.transform = "translateX(" + availableScrollLeft + "px)";
            } else {
                pnProductNavContents.style.transform = "translateX(" + SETTINGS.navBarTravelDistance + "px)";
            }
            // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
            pnProductNavContents.classList.remove("pn-ProductNav_Contents-no-transition");
            // Update our settings
            SETTINGS.navBarTravelDirection = "left";
            SETTINGS.navBarTravelling = true;
        }
        // Now update the attribute in the DOM
        pnProductNav.setAttribute("data-overflowing", determineOverflow(pnProductNavContents, pnProductNav));
    });
    
    pnAdvancerRight.addEventListener("click", function() {
        // If in the middle of a move return
        if (SETTINGS.navBarTravelling === true) {
            return;
        }
        // If we have content overflowing both sides or on the right
        if (determineOverflow(pnProductNavContents, pnProductNav) === "right" || determineOverflow(pnProductNavContents, pnProductNav) === "both") {
            // Get the right edge of the container and content
            var navBarRightEdge = pnProductNavContents.getBoundingClientRect().right;
            var navBarScrollerRightEdge = pnProductNav.getBoundingClientRect().right;
            // Now we know how much space we have available to scroll
            var availableScrollRight = Math.floor(navBarRightEdge - navBarScrollerRightEdge);
            // If the space available is less than two lots of our desired distance, just move the whole amount
            // otherwise, move by the amount in the settings
            if (availableScrollRight < SETTINGS.navBarTravelDistance * 2) {
                pnProductNavContents.style.transform = "translateX(-" + availableScrollRight + "px)";
            } else {
                pnProductNavContents.style.transform = "translateX(-" + SETTINGS.navBarTravelDistance + "px)";
            }
            // We do want a transition (this is set in CSS) when moving so remove the class that would prevent that
            pnProductNavContents.classList.remove("pn-ProductNav_Contents-no-transition");
            // Update our settings
            SETTINGS.navBarTravelDirection = "right";
            SETTINGS.navBarTravelling = true;
        }
        // Now update the attribute in the DOM
        pnProductNav.setAttribute("data-overflowing", determineOverflow(pnProductNavContents, pnProductNav));
    });
    
    pnProductNavContents.addEventListener(
        "transitionend",
        function() {
            // get the value of the transform, apply that to the current scroll position (so get the scroll pos first) and then remove the transform
            var styleOfTransform = window.getComputedStyle(pnProductNavContents, null);
            var tr = styleOfTransform.getPropertyValue("-webkit-transform") || styleOfTransform.getPropertyValue("transform");
            // If there is no transition we want to default to 0 and not null
            var amount = Math.abs(parseInt(tr.split(",")[4]) || 0);
            pnProductNavContents.style.transform = "none";
            pnProductNavContents.classList.add("pn-ProductNav_Contents-no-transition");
            // Now lets set the scroll position
            if (SETTINGS.navBarTravelDirection === "left") {
                pnProductNav.scrollLeft = pnProductNav.scrollLeft - amount;
            } else {
                pnProductNav.scrollLeft = pnProductNav.scrollLeft + amount;
            }
            SETTINGS.navBarTravelling = false;
        },
        false
    );
    
    // Handle setting the currently active link
    pnProductNavContents.addEventListener("click", function(e) {
      var links = [].slice.call(document.querySelectorAll(".pn-ProductNav_Link"));
      links.forEach(function(item) {
        item.setAttribute("aria-selected", "false");
      })
      e.target.setAttribute("aria-selected", "true");
      // Pass the clicked item and it's colour to the move indicator function
      moveIndicator(e.target, colours[links.indexOf(e.target)]);
      console.log(colours[links.indexOf(e.target)]);
    });
    
    function moveIndicator(item, color) {
        var textPosition = item.getBoundingClientRect();
        var container = pnProductNavContents.getBoundingClientRect().left;
        var distance = textPosition.left - container;
        pnIndicator.style.transform = "translateX(" + (distance + pnProductNavContents.scrollLeft) + "px) scaleX(" + textPosition.width * 0.01 + ")";
        if (color) {
            pnIndicator.style.backgroundColor = color;
        }
    }
    
    function determineOverflow(content, container) {
        var containerMetrics = container.getBoundingClientRect();
        var containerMetricsRight = Math.floor(containerMetrics.right);
        var containerMetricsLeft = Math.floor(containerMetrics.left);
        var contentMetrics = content.getBoundingClientRect();
        var contentMetricsRight = Math.floor(contentMetrics.right);
        var contentMetricsLeft = Math.floor(contentMetrics.left);
      if (containerMetricsLeft > contentMetricsLeft && containerMetricsRight < contentMetricsRight) {
            return "both";
        } else if (contentMetricsLeft < containerMetricsLeft) {
            return "left";
        } else if (contentMetricsRight > containerMetricsRight) {
            return "right";
        } else {
            return "none";
        }
    }
  }

  render() {
    return (
      <div className="pn-ProductNav_Wrapper">
        <nav id="pnProductNav" className="pn-ProductNav">
          <div id="pnProductNavContents" className="pn-ProductNav_Contents">
            <a href="#" className="pn-ProductNav_Link" aria-selected="true">Chairs</a>
            <a href="#" className="pn-ProductNav_Link">Tables</a>
            <a href="#" className="pn-ProductNav_Link">Cookware</a>
            <a href="#" className="pn-ProductNav_Link">Beds</a>
            <a href="#" className="pn-ProductNav_Link">Desks</a>
            <a href="#" className="pn-ProductNav_Link">Flooring</a>
            <a href="#" className="pn-ProductNav_Link">Lighting</a>
            <a href="#" className="pn-ProductNav_Link">Mattresses</a>
            <a href="#" className="pn-ProductNav_Link">Solar Panels</a>
            <a href="#" className="pn-ProductNav_Link">Bookcases</a>
            <a href="#" className="pn-ProductNav_Link">Mirrors</a>
            <a href="#" className="pn-ProductNav_Link">Rugs</a>  
            <a href="#" className="pn-ProductNav_Link">Curtains &amp; Blinds</a>  
            <a href="#" className="pn-ProductNav_Link">Frames &amp; Pictures</a>  
            <a href="#" className="pn-ProductNav_Link">Wardrobes</a>  
            <a href="#" className="pn-ProductNav_Link">Storage</a>  
            <a href="#" className="pn-ProductNav_Link">Decoration</a>  
            <a href="#" className="pn-ProductNav_Link">Appliances</a>
            <a href="#" className="pn-ProductNav_Link">Racks</a>
            <a href="#" className="pn-ProductNav_Link">Worktops</a>
            <span id="pnIndicator" className="pn-ProductNav_Indicator"></span>
          </div>
        </nav>
        <button id="pnAdvancerLeft" className="pn-Advancer pn-Advancer_Left" type="button">
          <svg className="pn-Advancer_Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 551 1024"><path d="M445.44 38.183L-2.53 512l447.97 473.817 85.857-81.173-409.6-433.23v81.172l409.6-433.23L445.44 38.18z"/></svg>
        </button>
        <button id="pnAdvancerRight" className="pn-Advancer pn-Advancer_Right" type="button">
          <svg className="pn-Advancer_Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 551 1024"><path d="M105.56 985.817L553.53 512 105.56 38.183l-85.857 81.173 409.6 433.23v-81.172l-409.6 433.23 85.856 81.174z"/></svg>
        </button>
      </div>
    )
  }
}

export default PackageListWrapper