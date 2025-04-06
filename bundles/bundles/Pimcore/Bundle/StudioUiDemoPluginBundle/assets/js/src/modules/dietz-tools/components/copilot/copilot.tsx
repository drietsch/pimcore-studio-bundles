import React, { useEffect, useState } from 'react'
import { Agent, Task, Team } from 'kaibanjs'
import { TavilySearchResults } from '@langchain/community/tools/tavily_search'
import { ChatWebLLM } from '@langchain/community/chat_models/webllm'

// ✅ Manual wrapper for LangChain tools to work with KaibanJS
function wrapLangChainTool (tool: any) {
  return {
    name: tool.name ?? 'wrapped-tool',
    description: tool.description ?? 'No description provided',
    use: async ({ input }: { input: string }) => {
      return await tool.invoke(input)
    }
  }
}

const Copilot: React.FC = () => {
  const [query, setQuery] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [webLLM, setWebLLM] = useState<any>(null)

  // Initialize WebLLM on component mount
  useEffect(() => {
    const initLLM = async () => {
      const model = new ChatWebLLM({
        model: 'Phi-3-mini-4k-instruct-q4f16_1-MLC',
        chatOptions: {
          temperature: 0.5
        }
      })
      await model.initialize((progress) => {
        console.log('WebLLM loading...', progress)
      })
      setWebLLM(model)
    }

    initLLM()
  }, [])

  const handleRun = async () => {
    if (!query || !webLLM) return
    setLoading(true)
    setOutput('')

    // ✅ Create and wrap Tavily search tool
    const rawTool = new TavilySearchResults({
      maxResults: 5,
      apiKey: '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'
    })

    const searchTool = wrapLangChainTool(rawTool)

    // ✅ Create the research agent using WebLLM
    const researchAgent = new Agent({
      name: 'Scout',
      role: 'Web Researcher',
      goal: 'Search the web and summarize information.',
      background: 'Expert in retrieving relevant content quickly.',
      tools: [searchTool],
      llm: webLLM
    })

    // ✅ Define the task
    const researchTask = new Task({
      description: `Search and summarize: ${query}`,
      expectedOutput: 'Summarized information on the topic.',
      agent: researchAgent
    })

    // ✅ Create the team with API key in env
    const team = new Team({
      name: 'Web Research Team',
      agents: [researchAgent],
      tasks: [researchTask],
      inputs: {},
      env: {
        TAVILY_API_KEY: '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'
      }
    })

    try {
      const result = await team.start()
      if (result.status === 'FINISHED') {
        setOutput(result.result ?? 'No result.')
      } else {
        setOutput('Workflow did not finish successfully.')
      }
    } catch (err) {
      setOutput(`❌ Error: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={ { padding: '2rem', maxWidth: 600, margin: '0 auto' } }>
      <h1>🧠 Research Copilot (WebLLM)</h1>
      <textarea
        onChange={ (e) => { setQuery(e.target.value) } }
        placeholder="Ask something to research..."
        rows={ 5 }
        style={ { width: '100%', padding: '1rem', marginBottom: '1rem' } }
        value={ query }
      />
      <button
        disabled={ loading || !webLLM }
        onClick={ handleRun }
        style={ {
          padding: '0.75rem 1.5rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        } }
      >
        {loading ? 'Thinking...' : 'Run Copilot'}
      </button>
      {output && (
        <pre
          style={ {
            marginTop: '1rem',
            backgroundColor: '#f1f1f1',
            padding: '1rem',
            whiteSpace: 'pre-wrap'
          } }
        >
          {output}
        </pre>
      )}
    </div>
  )
}

export default Copilot
