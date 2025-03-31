// plugins/TextPlugin.jsx
export default {
  name: 'TextPlugin',
  async process (file) {
    const content = await file.text()
    return `File: ${file.name}\nContent:\n${content}`
  }
}
