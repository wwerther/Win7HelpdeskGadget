function GadgetSetup() {
	/*
	 * Docked Size and Undocked size need at least 1px difference (either in width or height)
	 */
	this.gadgetDockWidth = 130;
	this.gadgetDockHeight = 100;
	this.gadgetDockedBg = "url(../images/bg.png)";

	this.gadgetUnDockWidth = 280;
	this.gadgetUnDockHeight = 200;
	this.gadgetUnDockedBg = "url(../images/bg_undocked.png)";

	// Amount of time desired to perform transition (in seconds).
	this.gadgetDockTransitionTime = 2;

	//
	this.loaddefaults=function() {
		message.innerHTML = "TEST";
		/*
		 * do further setup of the application here.
		 * e.g. restore default values from last start
		 */
		// chkConsole.checked=System.Gadget.Settings.read("chkConsole");
	 	// chkRemoteAssistance.checked=System.Gadget.Settings.read("chkRemoteAssistance");
		// serverName.value = System.Gadget.Settings.read("current");
	}

	/*
	 * This function is called when we are in the docked mode (smaller)
	 */
	this.showDockedElements=function () {
		message.innerHTML = "Docked";
	}


	/*
	 * This function is called when we are in the undocked mode (larger)
	 */
	this.showUnDockedElements=function () {
		message.innerHTML = "Undocked";
	}

	/*
	 * This function will be called as soon as the flyout is closed
	 */
	this.onFlyoutClosed=function () {
		// serverName.value=System.Gadget.Settings.read("current");
		message.innerHTML = "Flyoutclosed";
	}

	/*
	 * This function will be called right before the flyout is opened
	 */
	this.onFlyoutOpen=function () {
		// serverName.value=System.Gadget.Settings.read("current");
		message.innerHTML = "Flyoutopen";
		// System.Gadget.Settings.write("current", serverName.value);
	}

	/*
	 * This function is called as soon as the settings menu disappears
	 * and the confirm button is clicked > assume we should reload our config
	 */
	this.onSettingsClosed=function () {
		//variableName = System.Gadget.Settings.read("variableName");
		message.innerHTML = "Settingsclosed";
	}
	
}



/*
 *
 * Gadget Framework
 *
 */


// Docked gadgets must be at least 60 pixels high (the height of the gadget toolbar including the // Settings icon) 
// and anywhere from 25 pixels to 130 pixels wide to fit within the maximum width of the Sidebar. 
// Oversized gadgets are not clipped at the bounds of the Sidebar. Undocked gadgets have no maximum size constraints. 
// Gadget width and height.

/*
 * This is the main entry function of our 
 */
function loadMain() {
	Setup=new GadgetSetup();
	/*
	 * Associate the settings-menu if we find a settings.html
	 */
	if (fileExists(System.Gadget.path+"/de-DE/settings.html")) {
	        System.Gadget.settingsUI = "settings.html";
        	System.Gadget.onSettingsClosed = function(p_event) {
			if (p_event.closeAction == p_event.Action.commit) {
				if (Setup.onSettingsClosed) Setup.onSettingsClosed();
			}
		};
	}

	/*
	 * Associate the flyout if we find a flyout-file
	 */
	if (fileExists(System.Gadget.path+"/de-DE/flyout.html")) {
		System.Gadget.Flyout.file = "flyout.html";
        	System.Gadget.Flyout.onHide = function() {
			if (Setup.onFlyoutClosed) Setup.onFlyoutClosed();
		}
	}

	// Used for resizing the gadget
	if (Setup.gadgetDockWidth && Setup.gadgetDockHeight && Setup.gadgetUnDockWidth && Setup.gadgetUnDockHeight) {
		if ((Math.abs(Setup.gadgetDockHeight-Setup.gadgetUnDockHeight)+Math.abs(Setup.gadgetDockWidth-Setup.gadgetUnDockWidth))>0) {
			System.Gadget.onUndock = changeDockState;
			System.Gadget.onDock = changeDockState;
		} else {
		changeDockState();
		}
	} else {
		changeDockState();
	}

	if (Setup.loaddefaults) Setup.loaddefaults();
}

function fileExists(filename) {
	if (ActiveXObject) {
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		return fso.FileExists(filename);
	}
}


/*
 * This function shall be called to open the flyout
 */
function openFlyout() {
	if (!System.Gadget.Flyout.show) {
		if (Setup.onFlyoutOpen) Setup.onFlyoutOpen();
	}
	System.Gadget.Flyout.show=true;
}

function toggleFlyout() {
	if (!System.Gadget.Flyout.show) {
		if (Setup.onFlyoutOpen) Setup.onFlyoutOpen();
	}
	System.Gadget.Flyout.show=!System.Gadget.Flyout.show;
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
    if (oBackground) oBackground.style.width = 0;

    System.Gadget.beginTransition();

    var oBody = document.body.style;
    if (System.Gadget.docked) {
        oBody.width = Setup.gadgetDockWidth;
        oBody.height = Setup.gadgetDockHeight;  
	if (oBackground) {
	 	if (Setup.gadgetDockedBg) oBackground.src = Setup.gadgetDockedBg;
		oBackground.style.width=oBody.width;
		oBackground.style.height=oBody.height;
	} else {
		if (Setup.gadgetDockedBg) oBody.background = Setup.gadgetDockedBg;
	}
	if (Setup.showDockedElements) Setup.showDockedElements();
    } else {
        oBody.width = Setup.gadgetUnDockWidth;
        oBody.height = Setup.gadgetUnDockHeight;  
	if (oBackground) {
		if (Setup.gadgetUnDockedBg) oBackground.src = Setup.gadgetUnDockedBg;
		oBackground.style.width=oBody.width;
		oBackground.style.height=oBody.height;
	} else {
		if (Setup.gadgetUnDockedBg) oBody.background = Setup.gadgetUnDockedBg;
	}
	if (Setup.showUnDockedElements) Setup.showUnDockedElements();
    }
    System.Gadget.endTransition(System.Gadget.TransitionType.morph, Setup.gadgetDockTransitionTime);
}
