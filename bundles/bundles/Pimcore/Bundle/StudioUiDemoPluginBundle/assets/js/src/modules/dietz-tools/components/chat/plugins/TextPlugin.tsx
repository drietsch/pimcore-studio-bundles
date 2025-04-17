// plugins/TextPlugin.jsx
export default {
  name: 'TextPlugin',
  async process (file, onProgress, nlpTask = 'default', modelId = null) {
    const content = await file.text()
    let result = ''
    switch (nlpTask) {
      case 'translation':
        result = `[Translation] (mock) ${content}`
        break
      case 'classification':
        result = `[Classification] (mock) ${content}`
        break
      case 'summarization':
        result = `[Summary] (mock) ${content}`
        break
      case 'feature-extraction':
        result = `[Features] (mock) ${content}`
        break
      default:
        result = `File: ${file.name}\nContent:\n${content}`
    }
    return result
  }
}
