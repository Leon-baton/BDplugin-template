/**
 * @name Name
 * @author LEON
 * @authorId 633223783204782090
 * @version 1.0.0
 * @description Шаблон для создания плагина.
*/

module.exports = (() => {
    const config = {
        "info": {
            "name": "Name",
            "authors": [{"name":"LEON"}],
            "version": "1.0.0",
            "description": "Шаблон для создания плагина"
        }
    };

    return !global.ZeresPluginLibrary ? class {
        constructor() {
            this._config = config;
        }

        getName() { return config.info.name; }
        getAuthor() { return config.info.authors.map(a => a.name).join(", "); }
        getDescription() { return config.info.description; }
        getVersion() { return config.info.version; }

        load() {
            BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: "Download Now",
                cancelText: "Cancel",
                onConfirm: () => {
                    require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                        if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                    });
                }
            });
        }
        start() { }
        stop() { }
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Api) => {
            const { DOMTools } = Api; // Ваши импорты с апи.
          
            return class Name extends Plugin {
                onStart() {
                    BdApi.alert('Плагин успешно запущен!');
                }

                yourFunction1(arg1, arg2, ...args) {
                  
                }
              
                yourFunction2(arg1, arg2, ...args) {
                  
                }
            }
        }

        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
