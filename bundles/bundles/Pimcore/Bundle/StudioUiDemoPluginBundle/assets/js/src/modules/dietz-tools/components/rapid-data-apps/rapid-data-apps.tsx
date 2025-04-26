import React, { useContext } from 'react'
import { AssetContext, useAssetDraft, AssetApiSlice } from '@pimcore/studio-ui-bundle/modules/asset'
import { useStyle } from './preview-container.styles'

const STLITE_JS = 'https://cdn.jsdelivr.net/npm/@stlite/browser@0.80.1/build/stlite.js'
const STLITE_CSS = 'https://cdn.jsdelivr.net/npm/@stlite/browser@0.80.1/build/style.css'

// Local helper since `isSet` is not in the SDK
const isSet = (value: unknown): boolean => value !== undefined && value !== null

const RapidDataApps: React.FC = () => {
  // const assetContext = useContext(AssetContext)
  // const { asset } = useAssetDraft(assetContext.id)
  // const { useAssetGetTextDataByIdQuery } = AssetApiSlice
  // const { data } = useAssetGetTextDataByIdQuery({ id: assetContext.id })
  // const { styles } = useStyle()

  let pythonScript = data?.data || `
import streamlit as st

st.set_page_config(page_title="🚀 Streamlit in Pimcore!", layout="wide")

st.title("🚀 Streamlit in Pimcore!")
st.write("This app runs inside an iframe using stlite!")
st.text_area("Edit your Python code here:")
  `
  pythonScript = pythonScript.replace(/`/g, '\\`')

  const iframeHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stlite App</title>
  <link rel="stylesheet" href="${STLITE_CSS}">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
    * { font-family: 'Lato', sans-serif !important; }
    h1 { font-size: 24px !important; color: '#722ed1' !important; }
    .stMainBlockContainer { padding: 3rem 1rem 10rem !important; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="module">
    import * as stlite from "${STLITE_JS}";
    stlite.mount(
      {
        entrypoint: "app.py",
        requirements: ["matplotlib", "numpy", "requests"],
        files: {
          "app.py": \`${pythonScript}\`,
          "pages/srcdoc.py": \`${pythonScript}\`,
        },
        streamlitConfig: {
          "theme.base": "light",
          "theme.primaryColor": "#531dab",
          "theme.backgroundColor": "#ffffff",
          "theme.secondaryBackgroundColor": "#fafafa",
          "theme.textColor": "#161616",
          "client.toolbarMode": "viewer",
          "client.showErrorDetails": false,
          "client.showSidebarNavigation": false
        }
      },
      document.getElementById("root")
    );
  </script>
</body>
</html>
  `

  return (
    <div className={ styles.relativeContainer }>
      {isSet(data?.data) && (
        <iframe
          sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
          srcDoc={ iframeHtml }
          style={ { width: '100%', height: '1000px', border: 'none' } }
        />
      )}
    </div>
  )
}

export default RapidDataApps
