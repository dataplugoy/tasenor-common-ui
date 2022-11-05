import { TasenorSetup, SaveSettingsAction, ActionHandler, InteractiveElement, RenderingProps } from "@dataplug/tasenor-common"

export const saveSettingActionHandler: ActionHandler<TasenorSetup, InteractiveElement, SaveSettingsAction> = async (action: SaveSettingsAction, props: RenderingProps<TasenorSetup>) => {
  const { values, setup } = props
  const settings = {}
  if (action.plugin) {
    for (const [k, v] of Object.entries(values)) {
      settings[`${action.plugin}.${k}`] = v
    }
  } else {
    Object.assign(settings, values)
  }
  await setup.store.updateSettings(action.backend ? null : setup.store.db, settings)
  return { success: true, result: undefined }
}
