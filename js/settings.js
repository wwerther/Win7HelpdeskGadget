function SettingsSetup() {
	this.onLoad=function() {
		tvpath.value=gf.readSetting('tvpath','c:\\Program Files (x86)\\TeamViewer\\Version6\\')
	}


	this.onSettingsClosed=function () {
		//variableName = System.Gadget.Settings.read("variableName");
		log("Settingsclosed");
		System.Gadget.Settings.write("test","Walter");
		gf.writeSetting('tvpath',tvpath.value)
	}
	
	this.onSettingsCancelled=function() {
		log("Settingscancelled");
		System.Gadget.Settings.write("test","Werther");

	}

}

