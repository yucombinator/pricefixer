// SAMPLE
this.manifest = {
    "name": "PriceFixer",
    "icon": "icon.png",
    "settings": [
        {
            "tab": i18n.get("Features"),
            "group": i18n.get("Tooltip"),
            "name": "tooltip",
            "type": "checkbox",
            "label": i18n.get("enable")
        },
        {
            "tab": i18n.get("Features"),
            "group": i18n.get("Tooltip"),
            "name": "tooltipDescription",
            "type": "description",
            "text": "Show a tooltip when you hover over a price that has been rounded up."
        },
        {
            "tab": i18n.get("Features"),
            "group": i18n.get("Underline"),
            "name": "underline",
            "type": "checkbox",
            "label": i18n.get("enable")
        },
        {
            "tab": i18n.get("Features"),
            "group": i18n.get("Underline"),
            "name": "underlineDescription",
            "type": "description",
            "text": "Underline prices that have been modified by the extension."
        },
        {
            "tab": i18n.get("Features"),
            "group": i18n.get("Decimals"),
            "name": "decimal",
            "type": "checkbox",
            "label": i18n.get("enable")
        },
        {
            "tab": i18n.get("Features"),
            "group": i18n.get("Decimals"),
            "name": "decimalDescription",
            "type": "description",
            "text": "Show decimal points after a price."
        },
        {
            "tab": i18n.get("About"),
            "group": i18n.get("About"),
            "name": "myDescription",
            "type": "description",
            "text": "This is a a browser plugin that just rounds all online retail prices up to the nearest unit so all those $10.00 and $19.99 bullshit prices go away. <a href='https://github.com/icechen1/pricefixer'>GitHub website</a>"
        }
    ]
};
