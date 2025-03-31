import { type AbstractModule, container } from '@pimcore/studio-ui-bundle'
import React from 'react'
import { Icon } from '@pimcore/studio-ui-bundle/components'
import { type IconLibrary } from '@pimcore/studio-ui-bundle/modules/icon-library'
import { serviceIds } from '@pimcore/studio-ui-bundle/app'
import { type MainNavRegistry } from '@pimcore/studio-ui-bundle/modules/app'
import { type WidgetRegistry } from '@pimcore/studio-ui-bundle/modules/widget-manager'
import RapidDataApps from './components/rapid-data-apps/rapid-data-apps'
import CodeEditor from './components/code-editor/code-editor'
import Chat from './components/chat/chat'
import film03 from './icons/film-03.inline.svg'

import { type TextTabManager } from '@pimcore/studio-ui-bundle/modules/asset'

export const DietzToolsModule: AbstractModule = {
  onInit: (): void => {
    const iconLibrary = container.get<IconLibrary>(serviceIds.iconLibrary)

    iconLibrary.register({
      name: 'film-03',
      component: film03
    })

    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'Dietz Tools',
      icon: 'dashboard'
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'Dietz Tools/Copilot Chat',
      className: 'item-style-modifier',
      icon: 'dashboard',
      widgetConfig: {
        name: 'Copilot Chat',
        id: 'chat',
        component: 'chat',
        config: {
          icon: {
            type: 'name',
            value: 'user'
          }
        }
      }
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'Dietz Tools/Rapid Data Apps',
      className: 'item-style-modifier',
      icon: 'dashboard',
      widgetConfig: {
        name: 'Pimcore Rapid Data Apps',
        id: 'rapid-data-apps',
        component: 'rapid-data-apps',
        config: {
          icon: {
            type: 'name',
            value: 'user'
          }
        }
      }
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'Dietz Tools/Code Editor',
      className: 'item-style-modifier',
      icon: 'dashboard',
      widgetConfig: {
        name: 'Pimcore Code Editor',
        id: 'code-editor',
        component: 'code-editor',
        config: {
          icon: {
            type: 'name',
            value: 'user'
          }
        }
      }
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'Dietz Tools/Copilot Chat',
      className: 'item-style-modifier',
      icon: 'dashboard',
      widgetConfig: {
        name: 'Copilot Chat',
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
      name: 'chat',
      component: Chat
    })

    widgetRegistryService.registerWidget({
      name: 'rapid-data-apps',
      component: RapidDataApps
    })

    widgetRegistryService.registerWidget({
      name: 'code-editor',
      component: CodeEditor
    })

    const assetTabManager = container.get<TextTabManager>((serviceIds['Asset/Editor/TextTabManager']))
    assetTabManager.register({
      key: 'my-first-tab-component',
      label: 'Rapid Data App',
      icon: <Icon value="film-03" />,
      children: <RapidDataApps />
    })
  }
}
