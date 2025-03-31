import React, { useState, useEffect } from 'react'
import { ProChat } from '@ant-design/pro-chat'
import * as webllm from '@mlc-ai/web-llm'
import { theme, Upload, message, Input, Button, Spin, Typography } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import pluginRegistry from './plugins/pluginRegistry'

const { Dragger } = Upload

const ChatComponent = () => {
  const [engine, setEngine] = useState(null)
  const { token } = theme.useToken()
  const [initLabel, setInitLabel] = useState('Loading WebLLM...')
  const [inputText, setInputText] = useState('')
  const [loadingMessage, setLoadingMessage] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const model = 'Llama-3.2-3B-Instruct-q4f16_1-MLC'
        const engineInstance = await webllm.CreateMLCEngine(model, {
          initProgressCallback: (report) => { setInitLabel(report.text) }
        })
        setEngine(engineInstance)
      } catch (error) {
        setInitLabel('Error loading model')
        console.error(error)
      }
    })()
  }, [])

  const handleChatRequest = async (messages) => {
    if (!engine) return new Response('Model not loaded', { status: 500 })

    const request = {
      stream: true,
      messages: messages.map((m) => ({ role: m.role, content: m.content.trim() }))
    }

    const stream = new ReadableStream({
      async start (controller) {
        try {
          const generator = await engine.chat.completions.create(request)
          for await (const chunk of generator) {
            const content = chunk.choices[0]?.delta?.content
            if (content) controller.enqueue(new TextEncoder().encode(content))
          }
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      }
    })

    return new Response(stream, { headers: { 'Content-Type': 'text/plain' } })
  }

  const handleFileUpload = async (file) => {
    const plugin = pluginRegistry.getPlugin(file.type)
    if (plugin) {
      const result = await plugin.process(file, setLoadingMessage)
      setInputText((prev) => prev + 'Create a textual description of an image, based on that facts:' + result)
      message.success(`${file.name} processed by ${plugin.name}.`)
    } else {
      message.error('No plugin available for file type: ' + file.type)
    }
    return false
  }

  return (
    <div
      style={ {
        backgroundColor: token.colorBgLayout,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      } }
    >
      {engine
        ? (
          <>
            {loadingMessage && (
            <Spin
              style={ { margin: 'auto' } }
              tip={ loadingMessage }
            >
              <Typography.Text>{loadingMessage}</Typography.Text>
            </Spin>
            )}
            <ProChat
              renderInputArea={ (defaultDom, onMessageSend) => (
                <div style={ { padding: '10px', gap: '10px', display: 'flex', flexDirection: 'column' } }>
                  <Dragger
                    beforeUpload={ handleFileUpload }
                    multiple
                    showUploadList={ false }
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Drag files or click to upload</p>
                  </Dragger>

                  <Input.TextArea
                    onChange={ (e) => { setInputText(e.target.value) } }
                    placeholder="Type a message..."
                    rows={ 2 }
                    value={ inputText }
                  />

                  <Button
                    onClick={ () => {
                      if (!inputText.trim()) {
                        message.warning('Please enter a message.')
                        return
                      }
                      onMessageSend(inputText.trim())
                      setInputText('')
                    } }
                    type="primary"
                  >
                    Send
                  </Button>
                </div>
              ) }
              request={ handleChatRequest }
              style={ { flex: 1 } }
            />
          </>
          )
        : (
          <Spin
            style={ { margin: 'auto' } }
            tip={ initLabel }
          >
            <Typography.Text>{initLabel}</Typography.Text>
          </Spin>
          )}
    </div>
  )
}

export default ChatComponent
