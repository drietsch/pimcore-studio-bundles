import { Pimcore } from '@pimcore/studio-ui-bundle'
import { DietzToolsModule } from './modules/dietz-tools'

if (module.hot !== undefined) {
  module.hot.accept()
}

Pimcore.pluginSystem.registerPlugin({
  name: 'pimcore-plugin',

  // Register and overwrite services here
  onInit: ({ container }): void => {

  },

  // register modules here
  onStartup: ({ moduleSystem }): void => {
    moduleSystem.registerModule(DietzToolsModule)
    console.log('Hello from the demo plugin!')
  }
})
