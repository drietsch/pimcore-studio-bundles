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

import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    dragger: css`
      .ant-upload {
        padding: 0 !important;
        background: none;
        border-color: transparent;
        
        &:hover {
            border-color: transparent !important;
        }
        
        &.ant-upload-drag-hover {
            border-color: ${token.colorLinkHover} !important;
        }

        .ant-upload-drag-container {
          width: 100%;
        }
      }
    `
  }
})
