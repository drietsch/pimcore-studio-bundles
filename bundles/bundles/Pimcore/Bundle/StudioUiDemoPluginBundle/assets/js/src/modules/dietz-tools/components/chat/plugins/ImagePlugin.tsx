import {
  Florence2ForConditionalGeneration,
  AutoProcessor,
  AutoTokenizer,
  RawImage
} from '@huggingface/transformers'

const modelId = 'onnx-community/Florence-2-base-ft'

class ImageProcessor {
  constructor () {
    this.model = null
    this.processor = null
    this.tokenizer = null
    this.ready = false
  }

  async initialize (onProgress) {
    if (this.ready) return

    if (onProgress) onProgress('Loading Florence-2 model...')
    this.model = await Florence2ForConditionalGeneration.from_pretrained(modelId, { dtype: 'fp32' })
    this.processor = await AutoProcessor.from_pretrained(modelId)
    this.tokenizer = await AutoTokenizer.from_pretrained(modelId)

    this.ready = true
    if (onProgress) onProgress('Florence-2 model loaded!')
  }

  async process (file, onProgress) {
    await this.initialize(onProgress)

    if (onProgress) onProgress('Processing image...')

    const url = URL.createObjectURL(file)
    const image = await RawImage.fromURL(url)
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

    URL.revokeObjectURL(url)

    if (onProgress) onProgress(null) // Clear loading indicator

    return `${caption}`
  }
}

export default new ImageProcessor()
