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

import { type Meta } from '@storybook/react'
import { ModalTitle } from '@Pimcore/components/modal/modal-title/modal-title'

const config: Meta = {
  title: 'Components/Feedback/ModalTitle',
  component: ModalTitle,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const ModalTitleWithIcon = {
  args: {
    iconName: 'x-circle',
    children: 'Modal Title With Icon'
  }
}

export const ModalTitleWithoutIcon = {
  args: {
    children: 'Modal Title With Icon'
  }
}
