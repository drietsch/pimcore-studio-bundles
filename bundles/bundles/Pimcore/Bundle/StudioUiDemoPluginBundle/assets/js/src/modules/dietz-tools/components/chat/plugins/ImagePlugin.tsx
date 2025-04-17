import {
  Florence2ForConditionalGeneration,
  AutoProcessor,
  AutoTokenizer,
  RawImage
} from '@huggingface/transformers'

const modelIdDefault = 'onnx-community/Florence-2-base-ft'

class ImageProcessor {
  constructor () {
    this.model = null
    this.processor = null
    this.tokenizer = null
    this.ready = false
    this.modelId = modelIdDefault
  }

  async initialize (onProgress, modelId = modelIdDefault) {
    if (this.ready && this.modelId === modelId) return

    this.modelId = modelId
    if (onProgress) onProgress(`Loading model (${modelId})...`, 0)

    this.model = await Florence2ForConditionalGeneration.from_pretrained(modelId, {
      dtype: 'fp32',
      progress_callback: (progress) => {
        if (typeof progress === 'number' && !isNaN(progress)) {
          if (onProgress) onProgress(`Loading model (${modelId})...`, progress)
        }
      }
    })

    this.processor = await AutoProcessor.from_pretrained(modelId)
    this.tokenizer = await AutoTokenizer.from_pretrained(modelId)
    this.ready = true
    if (onProgress) onProgress('Model loaded!', 1)
  }

  async process (input, onProgress, modelId = modelIdDefault) {
    let progress = 0
    const progressCb = (msg, p) => {
      if (typeof p === 'number' && !isNaN(p)) {
        progress = Math.round(p * 100)
        if (onProgress) onProgress(`${msg} (${progress}%)`, p)
      } else {
        if (onProgress) onProgress(msg)
      }
    }

    await this.initialize(progressCb, modelId)

    if (onProgress) onProgress('Processing image...')

    let imageBlob
    let imageUrl
    let revokeUrl = false

    if (input instanceof File) {
      imageUrl = URL.createObjectURL(input)
      revokeUrl = true
    } else if (input.filename) {
      // Fetch the asset from Pimcore using its filename as relative path
      const fullUrl = window.location.origin + '/' + input.filename
      const response = await fetch(fullUrl)
      if (!response.ok) throw new Error(`Failed to fetch asset: ${response.statusText}`)

      imageBlob = await response.blob()
      imageUrl = URL.createObjectURL(imageBlob)
      revokeUrl = true
    } else {
      throw new Error('Unsupported input for image processing')
    }

    const image = await RawImage.fromURL(imageUrl)
    const vision_inputs = await this.processor(image)

    const task = '<MORE_DETAILED_CAPTION>'
    const prompts = this.processor.construct_prompts(task)
    const text_inputs = this.tokenizer(prompts)

    const generated_ids = await this.model.generate({
      ...text_inputs,
      ...vision_inputs,
      max_new_tokens: 100
    })

    const generated_text = this.tokenizer.batch_decode(generated_ids, { skip_special_tokens: false })[0]
    const caption = JSON.stringify(this.processor.post_process_generation(generated_text, task, image.size))

    if (revokeUrl) {
      URL.revokeObjectURL(imageUrl)
    }

    if (onProgress) onProgress(null)
    return caption
  }
}

export default new ImageProcessor()
