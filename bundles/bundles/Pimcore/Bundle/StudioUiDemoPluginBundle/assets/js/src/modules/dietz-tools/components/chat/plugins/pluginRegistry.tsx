// plugins/pluginRegistry.js
import ImagePlugin from './ImagePlugin'
import TextPlugin from './TextPlugin'

const plugins = {
  'image/png': ImagePlugin,
  'image/jpeg': ImagePlugin,
  'text/plain': TextPlugin
}

export default {
  getPlugin: (mimeType) => plugins[mimeType]
}
