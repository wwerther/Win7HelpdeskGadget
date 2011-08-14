function GadgetSetup() {
	/*
	 * Docked Size and Undocked size need at least 1px difference (either in width or height)
	 */
	this.gadgetDockWidth = 130;
	this.gadgetDockHeight = 100;
	this.gadgetDockedBg = "url(../images/bg.png)";

	this.gadgetUnDockWidth = 300;
//	this.gadgetUnDockHeight = 200;
	//this.gadgetUnDockedBg = "url(../images/bg_undocked.png)";

	// Amount of time desired to perform transition (in seconds).
	this.gadgetDockTransitionTime = 2;

	//
	this.loaddefaults=function() {
		log("Loaddefaults");
		/*
		 * do further setup of the application here.
		 * e.g. restore default values from last start
		 */
		chkConsole.checked=System.Gadget.Settings.read("chkConsole");
	 	chkRemoteAssistance.checked=System.Gadget.Settings.read("chkRemoteAssistance");
		serverName.value = System.Gadget.Settings.read("current");
		// chkConsole.checked=System.Gadget.Settings.read("chkConsole");
	 	// chkRemoteAssistance.checked=System.Gadget.Settings.read("chkRemoteAssistance");
		// serverName.value = System.Gadget.Settings.read("current");
	}

	/*
	 * This function is called when we are in the docked mode (smaller)
	 */
	this.showDockedElements=function () {
		log("Docked");
	}


	/*
	 * This function is called when we are in the undocked mode (larger)
	 */
	this.showUnDockedElements=function () {
		log("Undocked");
	}

	/*
	 * This function will be called as soon as the flyout is closed
	 */
	this.onFlyoutClosed=function () {
		log("Flyoutclosed");
		serverName.value=System.Gadget.Settings.read("current");
	}

	/*
	 * This function will be called right before the flyout is opened
	 */
	this.onFlyoutOpen=function () {
		// serverName.value=System.Gadget.Settings.read("current");
		log("Flyoutopen");
		System.Gadget.Settings.write("current", serverName.value);
	}

	/*
	 * This function is called as soon as the settings menu disappears
	 * and the confirm button is clicked > assume we should reload our config
	 */
	this.onSettingsClosed=function () {
		//variableName = System.Gadget.Settings.read("variableName");
		var bla=System.Gadget.Settings.read("test")
		log("Settingsclosed "+bla);
	}
	
	this.onSettingsCancelled=function() {
		var bla=System.Gadget.Settings.read("test")
		log("Settingscancelled "+bla);
	}

}


function startTool() {
	log ("startTool");
	var name=serverName.value;
	name=name.replace(/\s/g,'');

	// if the name only contains of a number, we assume the use of Teamviewer
	if (isNumber(name)) {
		cmdTeamview(name);
	// else we assume that we need to handle Remote-Assistance or Terminal-Session
	} else if(chkRemoteAssistance.checked==true) {
		cmdRA();
	} else {
		cmdMstsc();
	}
}

function cmdTeamview(name) {
	log ("startTeamview");
	var cmd='"'+gf.readSetting('tvpath','c:\\Program Files (x86)\\TeamViewer\\Version6\\');
	cmd += 'TeamViewer.exe"';
        cmd += " -i " + name;
	log ("Path: "+cmd);
	execute(cmd);
}

function cmdMstsc() {
	log("cmdMstsc");
        var cmd = "mstsc.exe";
        if(chkConsole.checked==true) cmd += " /console /admin ";
        cmd += " /v:" + serverName.value ;
	execute(cmd);
}

function cmdRA() {
	log("cmdRA");
	// http://technet.microsoft.com/en-us/magazine/ff356868.aspx
        var wshShell = new ActiveXObject('WScript.Shell');
        var cmd = "msra.exe";
        cmd += " /offerRA " + serverName.value;
        var exec = wshShell.Run(cmd);
        System.Gadget.Shell.execute(exec);
}

function cmdPing() {
	log("cmdPing");
        var wshShell = new ActiveXObject('WScript.Shell');
        var cmd = "ping.exe -t ";
        cmd += serverName.value;
        var exec = wshShell.Run(cmd);
        System.Gadget.Shell.execute(exec);
}

function cmdMtr() {
	log("cmdMtr");
	var wshShell = new ActiveXObject('WScript.Shell');
	var cmd = '"'+System.Gadget.path+'\\tools\\winmtr.exe" ';
	cmd += serverName.value;
	var exec = wshShell.Run(cmd);
        System.Gadget.Shell.execute(exec);

}

function cmdPutty() {
	log("cmdPutty");
	var wshShell = new ActiveXObject('WScript.Shell');
	var cmd = '"'+System.Gadget.path+'\\tools\\putty.exe" ';
	cmd += serverName.value;
	var exec = wshShell.Run(cmd);
        System.Gadget.Shell.execute(exec);

}


function saveRa() {
	log("savera");
	System.Gadget.Settings.write("chkRemoteAssistance",chkRemoteAssistance.checked);
}

function saveCons() {
	log("savecons");
	System.Gadget.Settings.write("chkConsole",chkConsole.checked);
}

   
function inputtext(event) {
	if (event.keyCode==13) startTool()
}
