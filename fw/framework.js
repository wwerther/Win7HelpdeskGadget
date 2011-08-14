/*
 *
 * Gadget Framework
 *
 */


// Docked gadgets must be at least 60 pixels high (the height of the gadget toolbar including the // Settings icon) 
// and anywhere from 25 pixels to 130 pixels wide to fit within the maximum width of the Sidebar. 
// Oversized gadgets are not clipped at the bounds of the Sidebar. Undocked gadgets have no maximum size constraints. 
// Gadget width and height.

var gf=new function() {
	/*
	 * This is the main entry function of our 
	 */
	this.loadMain=function () {
		Setup=new GadgetSetup();
		/*
		 * Associate the settings-menu if we find a settings.html
		 */
		if (fileExists(System.Gadget.path+"/settings.html")) {
		        System.Gadget.settingsUI = "settings.html";
        		System.Gadget.onSettingsClosed = function(p_event) {
				if (p_event.closeAction == p_event.Action.commit) {
					if (Setup.onSettingsClosed) Setup.onSettingsClosed();
				} else {
					if (Setup.onSettingsCancelled) Setup.onSettingsCancelled();
				}
			};
		}

		/*
		 * Associate the flyout if we find a flyout-file
		 */
		if (fileExists(System.Gadget.path+"/flyout.html")) {
			System.Gadget.Flyout.file = "flyout.html";
	        	System.Gadget.Flyout.onHide = function() {
				if (Setup.onFlyoutClosed) Setup.onFlyoutClosed();
			}
		}

		// Used for resizing the gadget
		if (Setup.gadgetDockWidth && Setup.gadgetDockHeight && Setup.gadgetUnDockWidth && Setup.gadgetUnDockHeight) {
			if ((Math.abs(Setup.gadgetDockHeight-Setup.gadgetUnDockHeight)+Math.abs(Setup.gadgetDockWidth-Setup.gadgetUnDockWidth))>0) {
				System.Gadget.onUndock = gf.changeDockState;
				System.Gadget.onDock = gf.changeDockState;
			} else {
				gf.changeDockState();
			}
		} else {
			gf.changeDockState();
		}

		if (Setup.loaddefaults) Setup.loaddefaults();
	}

	/*
	 * This function shall be called to open the flyout
	 */
	this.openFlyout=function () {
		if (!System.Gadget.Flyout.show) {
			if (Setup.onFlyoutOpen) Setup.onFlyoutOpen();
		}
		System.Gadget.Flyout.show=true;
	}

	this.toggleFlyout=function () {
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
	this.changeDockState=function () {
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


	this.readSetting=function (name,defaultval) {
		return System.Gadget.Settings.read(name) || defaultval;
	}

	this.writeSetting=function (name,value) {
		System.Gadget.Settings.write(name,value);
	}

	this.loadFlyout=function () {
		Setup=new FlyoutSetup();
		log("LoadFlyout");
		var oBackground = document.getElementById("background");
		var oBody = document.body.style;
		if (oBackground) {
			if (Setup.FlyoutBg) oBackground.src = Setup.FlyoutBg;
			oBackground.style.width=Setup.width;
			oBackground.style.height=Setup.height;
		} else {
			if (Setup.FlyoutBg) oBody.src = Setup.FlyoutBg;
		}
		oBody.width=Setup.width;
		oBody.height=Setup.height;

		if (Setup.onLoad) Setup.onLoad();
	}

	this.loadSettings=function () {
		Setup=new SettingsSetup();
		log("LoadSettings");

		System.Gadget.onSettingsClosing = function(p_event) {
			if (p_event.closeAction == p_event.Action.commit) {
				if (Setup.onSettingsClosed) Setup.onSettingsClosed();
			} else {
				if (Setup.onSettingsCancelled) Setup.onSettingsCancelled();
			}
		};

		log ("loadingdefaults");

		if (Setup.onLoad) Setup.onLoad();
	}
}

function isNumber (o) {
	return ! isNaN (o-0);
}

function execute(command) {
	var wshShell = new ActiveXObject('WScript.Shell');
        var exec = wshShell.Run(command);
        System.Gadget.Shell.execute(exec);
}

function fileExists(filename) {
	if (ActiveXObject) {
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		return fso.FileExists(filename);
	}
}

function log(message) {
	var debug=document.getElementById("debug");
	if (debug) debug.innerHTML = message+"<br/>"+debug.innerHTML;
}
