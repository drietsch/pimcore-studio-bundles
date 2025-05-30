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
import { type UseCssContainerProps } from './use-css-container'

export const useCssContainerStyles = createStyles(({ token, css }, props: UseCssContainerProps) => {
  return {
    container: css`
      container: ${props.name} / ${props.type};
    `
  }
})
