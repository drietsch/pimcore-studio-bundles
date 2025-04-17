import React, { useState, useEffect } from 'react'
import { ProChat } from '@ant-design/pro-chat'
import enUS from '@ant-design/pro-chat/es/locale/en-US'
import * as webllm from '@mlc-ai/web-llm'
import type { MLCEngine } from '@mlc-ai/web-llm'
import {
  theme,
  message,
  Input,
  Button,
  Spin,
  Typography,
  Select,
  Progress
} from 'antd'
import { Toolbar, Droppable } from '@pimcore/studio-ui-bundle/components'
import modelList from './MLC_Models_Table.json'
import pluginRegistry from './plugins/pluginRegistry'
import Copilot from '../copilot/copilot'

const IMAGE_MODELS = [
  { label: 'onnx-community/Florence-2-base-ft', value: 'onnx-community/Florence-2-base-ft' },
  { label: 'microsoft/beit-base-patch16-224-pt22k-ft22k', value: 'microsoft/beit-base-patch16-224-pt22k-ft22k' }
]

const ChatComponent = () => {
  const [engine, setEngine] = useState<MLCEngine | null>(null)
  const { token } = theme.useToken()
  const [initLabel, setInitLabel] = useState('Loading WebLLM...')
  const [inputText, setInputText] = useState('')
  const [loadingMessage, setLoadingMessage] = useState(null)
  const [groupedModels, setGroupedModels] = useState({})
  const [mlcModelOptions, setMlcModelOptions] = useState([])
  const [selectedTextModel, setSelectedTextModel] = useState<string | undefined>(undefined)
  const [selectedImageModel, setSelectedImageModel] = useState(IMAGE_MODELS[0].value)
  const [progress, setProgress] = useState(0)
  const [droppedFilename, setDroppedFilename] = useState<string | null>(null)

  useEffect(() => {
    const grouped = {}

    const options = modelList.map((row) => {
      const linkParts = row.Link?.split('/') || []
      const modelShortName = linkParts[linkParts.length - 1] || ''
      const base = row['Model ID'].split('-')[0]

      if (!grouped[base]) grouped[base] = []
      grouped[base].push({ ...row, modelShortName })

      return {
        label: `${row['Model ID']} (${row.Quantization})`,
        value: modelShortName
      }
    })

    setGroupedModels(grouped)
    setMlcModelOptions(options)

    const DEFAULT_MODEL = 'Llama-3-8B-Instruct-q4f32_1-MLC'
    const defaultExists = options.some(opt => opt.value === DEFAULT_MODEL)

    if (!selectedTextModel) {
      setSelectedTextModel(defaultExists ? DEFAULT_MODEL : options[0]?.value)
    }
  }, [])

  useEffect(() => {
    if (!selectedTextModel && mlcModelOptions.length > 0) {
      setSelectedTextModel(mlcModelOptions[0].value)
    }
  }, [mlcModelOptions])

  useEffect(() => {
    if (!selectedTextModel) return

    (async () => {
      try {
        setEngine(null)
        setInitLabel('Loading WebLLM...')
        setProgress(0)
        console.log('Loading model:', selectedTextModel)
        const engineInstance = await webllm.CreateMLCEngine(selectedTextModel, {
          initProgressCallback: (report) => {
            setInitLabel(report.text)
            if (report.progress) setProgress(Math.round(report.progress * 100))
          }
        })
        setEngine(engineInstance)
        setProgress(100)
      } catch (error) {
        setInitLabel('Error loading model')
        setProgress(0)
        console.error('Model loading error:', error)
      }
    })()
  }, [selectedTextModel])

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

  return (
    <div style={ { backgroundColor: token.colorBgLayout, height: '90%', width: '100%' } }>
      <Toolbar>
        <div style={ { display: 'flex', gap: 16, alignItems: 'center' } }>
          <span>Text Model:</span>
          <Select
            onChange={ (val) => {
              if (val) setSelectedTextModel(val)
              else message.error('Invalid model selected')
            } }
            options={ mlcModelOptions }
            style={ { minWidth: 260 } }
            value={ selectedTextModel }
          />
          <span>Image Model:</span>
          <Select
            onChange={ setSelectedImageModel }
            options={ IMAGE_MODELS }
            style={ { minWidth: 320 } }
            value={ selectedImageModel }
          />
        </div>
      </Toolbar>

      {progress > 0 && progress < 100 && (
        <div style={ { padding: 16 } }>
          <Progress
            percent={ progress }
            status={ progress < 100 ? 'active' : 'success' }
          />
          <Typography.Text>{initLabel}</Typography.Text>
        </div>
      )}

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
              helloMessage={ 'Hello! I am your Pimcore Copilot. How may I assist you today?' }
              locale={ enUS }
              renderInputArea={ (defaultDom, onMessageSend) => (
                <div style={ { padding: '10px', gap: '10px', display: 'flex', flexDirection: 'column' } }>
                  <Droppable
                    isValidContext={ (info) => info.type === 'asset' }
                    isValidData={ (info) => info.type === 'asset' }
                    onDrop={ async (info) => {
                      const asset = info.data
                      const mime = asset.mimeType || 'unknown'
                      const plugin = pluginRegistry.getPlugin(mime)

                      if (!plugin) {
                        message.error(`No plugin available for asset type: ${mime}`)
                        return
                      }

                      setDroppedFilename(asset.filename)
                      message.info(`Processing asset: ${asset.filename}`)

                      try {
                        const result = await plugin.process(asset, setLoadingMessage, selectedImageModel)
                        const fullText = `Create a textual description of an image, based on these facts: ${result}`
                        onMessageSend(fullText)
                        setInputText('')
                        setDroppedFilename(null)
                        message.success(`${asset.filename} processed`)
                      } catch (e) {
                        console.error(e)
                        message.error('Processing failed')
                        setDroppedFilename(null)
                      }
                    } }
                    style={ {
                      width: '100%',
                      height: '160px',
                      border: '3px dashed #1890ff',
                      borderRadius: '12px',
                      background: '#e6f7ff',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: '#0050b3',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      transition: 'all 0.3s ease'
                    } }
                    variant="outline"
                  >
                    <div>
                      {droppedFilename
                        ? `🔄 Processing: ${droppedFilename}`
                        : '📁 Drag and drop a Pimcore asset here from the DAM'}
                    </div>
                  </Droppable>

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
          &nbsp;
          </Spin>
          )}
    </div>
  )
}

export default ChatComponent
