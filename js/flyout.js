function FlyoutSetup() {
	this.height=180;
	this.width=250;
	this.FlyoutBg = "url(../images/bg.png)";

	this.onLoad=function() {
		log("onLoad");
        //System.Gadget.settingsUI = "settings.htm";
       	//System.Gadget.onSettingsClosed = SettingsClosed;
		//Read all Servers from a String like "server1;#server2;#"
		var favlist = System.Gadget.Settings.read("favs");
		if(favlist.length>0) {
			var favs = favlist.split(";#");
			favs.sort();
			for (var i = 0; i < favs.length; i++) {
				if(favs[i].length>0) {
					var opt = document.createElement('option');
					opt.text = favs[i];
					opt.value = favs[i];
					lstFav.add(opt);
				}
			}
		}
		txtNewServer.value = System.Gadget.Settings.read("current");
	}
}

  
function AddFav()   {
	log("AddFav");
	var txt =  System.Gadget.Settings.read("favs");
	if(txt.length>0) txt += ";#";
	System.Gadget.Settings.write("favs",txt + txtNewServer.value);
	var opt = document.createElement('option');
	opt.text = txtNewServer.value;
	opt.value = txtNewServer.value;
	lstFav.add(opt); // IE only
	txtNewServer.value=""; 
}
     
function removeSelected() {
	log("removeFav");
	lstFav.remove(lstFav.selectedIndex);
        var favs="";
        //recreate Setting
        for (var i = 0; i<lstFav.length; i++) {
           favs+=lstFav.options(i).text
           if(i<lstFav.length-1) favs+=";#";
        }
        System.Gadget.Settings.write("favs", favs); 
}

function lstFav_dblClick() {
	log("dblclick");
	System.Gadget.Settings.write("current", lstFav.options(lstFav.selectedIndex).text);
	System.Gadget.Flyout.show = false;
}

