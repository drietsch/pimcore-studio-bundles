// imports (static, normal!)
import { type AbstractModule, container } from '@pimcore/studio-ui-bundle'
import React from 'react'
import { Icon } from '@pimcore/studio-ui-bundle/components'
import { type IconLibrary } from '@pimcore/studio-ui-bundle/modules/icon-library'
import { serviceIds } from '@pimcore/studio-ui-bundle/app'
import { type MainNavRegistry } from '@pimcore/studio-ui-bundle/modules/app'
import { type WidgetRegistry } from '@pimcore/studio-ui-bundle/modules/widget-manager'
import RapidDataApps from './components/rapid-data-apps/rapid-data-apps'
import CodeEditor from './components/code-editor/code-editor'
import CreativeEditor from './components/creative-editor/creative-editor'
import Chat from './components/chat/chat'
import Copilot from './components/copilot/copilot'
import Inspire from './components/inspire/inspire'
import Studio from './components/studio/studio'
import Droppable from './components/droppable/droppable'
import film03 from './icons/film-03.inline.svg'
import { type TextTabManager } from '@pimcore/studio-ui-bundle/modules/asset'

// feature toggles
const features = {
  copilot: true,
  inspire: true,
  studio: true,
  creativeEditor: true,
  chat: true,
  rapidDataApps: true,
  codeEditor: true,
  droppable: true
}

export const DietzToolsModule: AbstractModule = {
  onInit: (): void => {
    const iconLibrary = container.get<IconLibrary>(serviceIds.iconLibrary)

    iconLibrary.register({
      name: 'film-03',
      component: film03
    })

    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'Inspire 2025',
      icon: 'dashboard'
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    // Copilot
    if (features.copilot) {
      mainNavRegistryService.registerMainNavItem({
        path: 'Inspire 2025/Copilot',
        className: 'item-style-modifier',
        icon: 'dashboard',
        widgetConfig: {
          name: 'Copilot',
          id: 'copilot',
          component: 'copilot',
          config: {
            icon: { type: 'name', value: 'user' }
          }
        }
      })
      widgetRegistryService.registerWidget({
        name: 'copilot',
        component: Copilot
      })
    }

    // Droppable
    if (features.droppable) {
      mainNavRegistryService.registerMainNavItem({
        path: 'Inspire 2025/Droppable',
        className: 'item-style-modifier',
        icon: 'dashboard',
        widgetConfig: {
          name: 'Droppable',
          id: 'droppable',
          component: 'droppable',
          config: {
            icon: { type: 'name', value: 'user' }
          }
        }
      })
      widgetRegistryService.registerWidget({
        name: 'droppable',
        component: Droppable
      })
    }

    // Chat
    if (features.chat) {
      mainNavRegistryService.registerMainNavItem({
        path: 'Inspire 2025/Copilot Chat',
        className: 'item-style-modifier',
        icon: 'dashboard',
        widgetConfig: {
          name: 'Copilot Chat',
          id: 'chat',
          component: 'chat',
          config: {
            icon: { type: 'name', value: 'user' }
          }
        }
      })
      widgetRegistryService.registerWidget({
        name: 'chat',
        component: Chat
      })
    }

    // Rapid Data Apps
    if (features.rapidDataApps) {
      mainNavRegistryService.registerMainNavItem({
        path: 'Inspire 2025/Rapid Data Apps',
        className: 'item-style-modifier',
        icon: 'dashboard',
        widgetConfig: {
          name: 'Pimcore Rapid Data Apps',
          id: 'rapid-data-apps',
          component: 'rapid-data-apps',
          config: {
            icon: { type: 'name', value: 'user' }
          }
        }
      })
      widgetRegistryService.registerWidget({
        name: 'rapid-data-apps',
        component: RapidDataApps
      })

      const assetTabManager = container.get<TextTabManager>(serviceIds['Asset/Editor/TextTabManager'])
      assetTabManager.register({
        key: 'my-first-tab-component',
        label: 'Rapid Data App',
        icon: <Icon value="film-03" />,
        children: <RapidDataApps />
      })
    }

    // Code Editor
    if (features.codeEditor) {
      mainNavRegistryService.registerMainNavItem({
        path: 'Inspire 2025/Code Editor',
        className: 'item-style-modifier',
        icon: 'dashboard',
        widgetConfig: {
          name: 'Pimcore Code Editor',
          id: 'code-editor',
          component: 'code-editor',
          config: {
            icon: { type: 'name', value: 'user' }
          }
        }
      })
      widgetRegistryService.registerWidget({
        name: 'code-editor',
        component: CodeEditor
      })
    }

    // Creative Editor
    if (features.creativeEditor) {
      mainNavRegistryService.registerMainNavItem({
        path: 'Inspire 2025/Creative Editor',
        className: 'item-style-modifier',
        icon: 'dashboard',
        widgetConfig: {
          name: 'Creative Editor',
          id: 'creative-editor',
          component: 'creative-editor',
          config: {
            icon: { type: 'name', value: 'user' }
          }
        }
      })
      widgetRegistryService.registerWidget({
        name: 'creative-editor',
        component: CreativeEditor
      })
    }

    // Inspire
    if (features.inspire) {
      mainNavRegistryService.registerMainNavItem({
        path: 'Inspire 2025/Inspire 2025',
        className: 'item-style-modifier',
        icon: 'dashboard',
        widgetConfig: {
          name: 'Inspire 2025',
          id: 'inspire',
          component: 'inspire',
          config: {
            icon: { type: 'name', value: 'user' }
          }
        }
      })
      widgetRegistryService.registerWidget({
        name: 'inspire',
        component: Inspire
      })
    }

    // Studio
    if (features.studio) {
      mainNavRegistryService.registerMainNavItem({
        path: 'Inspire 2025/Studio Presentation',
        className: 'item-style-modifier',
        icon: 'dashboard',
        widgetConfig: {
          name: 'Studio Presentation',
          id: 'studio',
          component: 'studio',
          config: {
            icon: { type: 'name', value: 'user' }
          }
        }
      })
      widgetRegistryService.registerWidget({
        name: 'studio',
        component: Studio
      })
    }
  }
}
