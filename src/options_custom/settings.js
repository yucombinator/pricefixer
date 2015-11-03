window.addEvent("domready", function () {
    // Option 1: Use the manifest:
    new FancySettings.initWithManifest(function (settings) {
        chrome.storage.sync.get(
            {
                'store.settings.tooltip': 'true',  //default values
                'store.settings.underline': 'true',
                'store.settings.decimal': 'true'
            },
        function(items){ 
            console.log(items);
            settings.manifest.tooltip.element.checked = (items['store.settings.tooltip'] == 'true')? true: false;
            settings.manifest.underline.element.checked = (items['store.settings.underline'] == 'true')? true: false;
            settings.manifest.decimal.element.checked = (items['store.settings.decimal'] == 'true')? true: false;
        });
    });
    
    // Option 2: Do everything manually:
    /*
    var settings = new FancySettings("My Extension", "icon.png");
    
    var username = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("login"),
        "name": "username",
        "type": "text",
        "label": i18n.get("username"),
        "text": i18n.get("x-characters")
    });
    
    var password = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("login"),
        "name": "password",
        "type": "text",
        "label": i18n.get("password"),
        "text": i18n.get("x-characters-pw"),
        "masked": true
    });
    
    var myDescription = settings.create({
        "tab": i18n.get("information"),
        "group": i18n.get("login"),
        "name": "myDescription",
        "type": "description",
        "text": i18n.get("description")
    });
    
    var myButton = settings.create({
        "tab": "Information",
        "group": "Logout",
        "name": "myButton",
        "type": "button",
        "label": "Disconnect:",
        "text": "Logout"
    });
    
    // ...
    
    myButton.addEvent("action", function () {
        alert("You clicked me!");
    });
    
    settings.align([
        username,
        password
    ]);
    */
});
