/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useContext } from 'react'
import { useAssetGetTextDataByIdQuery } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { useStyle } from './preview-container.styles'
import { isSet } from '@Pimcore/utils/helpers'
import { useAssetDraft } from '@Pimcore/modules/asset/hooks/use-asset-draft'

const STLITE_JS = 'https://cdn.jsdelivr.net/npm/@stlite/browser@0.80.1/build/stlite.js'
const STLITE_CSS = 'https://cdn.jsdelivr.net/npm/@stlite/browser@0.80.1/build/style.css'

const PreviewContainer = (): React.JSX.Element => {
  const assetContext = useContext(AssetContext)
  const { asset } = useAssetDraft(assetContext.id)
  const { data } = useAssetGetTextDataByIdQuery({ id: assetContext.id })
  const { styles } = useStyle()

  // Define the Python script for Streamlit
  const pythonScript = data?.data || `
import streamlit as st

st.set_page_config(page_title="🚀 Streamlit in Pimcore!", layout="wide")

st.title("🚀 Streamlit in Pimcore!")
st.write("This app runs inside an iframe using stlite!")
st.text_area("Edit your Python code here:")
  `

  // Define the full HTML content for the iframe
  const iframeHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Stlite App</title>
  <link rel="stylesheet" href="${STLITE_CSS}">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');
    * {
        font-family: 'Lato', sans-serif !important;
    }
    h1 {
        font-size: 24px !important;
        color: '#722ed1' !important;
    }
    .stMainBlockContainer {
      padding: 3rem 1rem 10rem !important;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="module">
    import * as stlite from "${STLITE_JS}";

    stlite.mount(
      {
        entrypoint: "app.py",
        requirements: ["matplotlib", "numpy"],
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
      {isSet(data) && (
        <iframe
          sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
          srcDoc={ iframeHtml }
          style={ { width: '100%', height: '1000px', border: 'none' } }
        />
      )}
    </div>
  )
}

export { PreviewContainer }
