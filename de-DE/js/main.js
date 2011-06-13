// Docked gadgets must be at least 60 pixels high (the height of the gadget toolbar including the // Settings icon) 
// and anywhere from 25 pixels to 130 pixels wide to fit within the maximum width of the Sidebar. 
// Oversized gadgets are not clipped at the bounds of the Sidebar. Undocked gadgets have no maximum size constraints. 
// Gadget width and height.
/*
 * Docked Size and Undocked size need at least 1px difference (either in width or height)
 */
var gadgetDockWidth = 140;
var gadgetDockHeight = 101;
var gadgetDockedBg = "url(../images/bg.png)";

var gadgetUnDockWidth = 141;
var gadgetUnDockHeight = 101;
var gadgetUnDockedBg = "url(../images/bg_undocked.png)";

// Amount of time desired to perform transition (in seconds).
var gadgetDockTransitionTime = 2;



/*
 * This is the main entry function of our 
 */
function loadMain() {
	/*
	 * Associate the settings-menu
	 */
        System.Gadget.settingsUI = "settings.html";
        System.Gadget.onSettingsClosed = SettingsClosed;

	/*
	 * Associate the flyout
	 */
	System.Gadget.Flyout.file = "flyout.html";
        System.Gadget.Flyout.onHide = FlyoutClosed;

	// Used for resizing the gadget
	System.Gadget.onUndock = changeDockState;
	System.Gadget.onDock = changeDockState;

	/*
	 * do further setup of the application here.
	 * e.g. restore default values from last start
	 */
	// chkConsole.checked=System.Gadget.Settings.read("chkConsole");
 	// chkRemoteAssistance.checked=System.Gadget.Settings.read("chkRemoteAssistance");
	// serverName.value = System.Gadget.Settings.read("current");
}

/*
 * This function is called as soon as the settings menu disappears
 */
function SettingsClosed() {
	//variableName = System.Gadget.Settings.read("variableName");
}

/*
 * This function will be called as soon as the flyout is closed
 */
function FlyoutClosed() {
	// serverName.value=System.Gadget.Settings.read("current");
}

/*
 * This function shall be called to open the flyout
 */
function openFlyout() {
	// System.Gadget.Settings.write("current", serverName.value);
	System.Gadget.Flyout.show=!System.Gadget.Flyout.show;
}

/*
 * This function is called when we are in the docked mode (smaller)
 */
function showDockedElements() {
	message.innerHTML = "Docked";
}

/*
 * This function is called when we are in the undocked mode (larger)
 */
function showUnDockedElements() {
	message.innerHTML = "Undocked";
}


/*
 *
 *
 */
// --------------------------------------------------------------------
// as described in
// http://msdn.microsoft.com/en-us/library/ms723676%28v=VS.85%29.aspx
// Check the gadget dock state; set the gadget style.
// imgBackground is the value of the 'id' attribute for the 
// g:background element.
// --------------------------------------------------------------------
function changeDockState() {
    var oBackground = document.getElementById("background");

    /* The following line crashes the sidebar. Skip it */    
    // Set the width of the background element to 0.
    // This forces the image to be refreshed appropriately.
    oBackground.style.width = 0;

    System.Gadget.beginTransition();

    var oBody = document.body.style;
    if (System.Gadget.docked) {
        oBody.width = gadgetDockWidth;
        oBody.height = gadgetDockHeight;  
 	oBackground.src = gadgetDockedBg;
	showDockedElements();
    } else {
        oBody.width = gadgetUnDockWidth;
        oBody.height = gadgetUnDockHeight;  
	oBackground.src = gadgetUnDockedBg;
	showUnDockedElements();
    }
    System.Gadget.endTransition(System.Gadget.TransitionType.morph, gadgetDockTransitionTime);
}


/******************************************************************************
 * Further user-functions can follow below here
 *****************************************************************************/

