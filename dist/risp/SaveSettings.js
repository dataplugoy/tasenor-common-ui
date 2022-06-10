"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveSettingActionHandler = void 0;
const saveSettingActionHandler = async (action, props) => {
    const { values, setup } = props;
    const settings = {};
    if (action.plugin) {
        for (const [k, v] of Object.entries(values)) {
            settings[`${action.plugin}.${k}`] = v;
        }
    }
    else {
        Object.assign(settings, values);
    }
    await setup.store.updateSettings(action.backend ? null : setup.store.db, settings);
    return { success: true, result: undefined };
};
exports.saveSettingActionHandler = saveSettingActionHandler;
//# sourceMappingURL=SaveSettings.js.map