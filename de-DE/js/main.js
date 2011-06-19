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
	
	this.onSettingsCancelled=function() {

	}

}




