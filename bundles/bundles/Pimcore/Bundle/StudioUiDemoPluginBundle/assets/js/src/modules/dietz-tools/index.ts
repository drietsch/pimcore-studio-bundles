import { type AbstractModule, container } from '@pimcore/studio-ui-bundle'
import { serviceIds } from '@pimcore/studio-ui-bundle/app'
import { type MainNavRegistry } from '@pimcore/studio-ui-bundle/modules/app'
import { type WidgetRegistry } from '@pimcore/studio-ui-bundle/modules/widget-manager'
import SuperAiTool from './components/super-ai-tool/super-ai-tool'

export const DietzToolsModule: AbstractModule = {
  onInit: (): void => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'Dietz Menu',
      icon: 'dashboard'
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'Dietz Menu/My Super AI Tool',
      className: 'item-style-modifier',
      widgetConfig: {
        name: 'Super Ai Tool',
        id: 'super-ai-tool',
        component: 'super-ai-tool',
        config: {
          icon: {
            type: 'name',
            value: 'user'
          }
        }
      }
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)
    widgetRegistryService.registerWidget({
      name: 'super-ai-tool',
      component: SuperAiTool
    })
  }
}
