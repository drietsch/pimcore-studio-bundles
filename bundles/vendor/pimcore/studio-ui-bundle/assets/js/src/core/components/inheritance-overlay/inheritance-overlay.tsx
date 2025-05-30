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

import React from 'react'
import { useInheritanceOverlayStyle } from '@Pimcore/components/inheritance-overlay/hooks/use-inheritance-overlay-style'
import cn from 'classnames'

export type InheritanceOverlayType = 'form-item-container' | 'form-element' | 'manual' | 'wrapper' | 'grid-cell' | false

export interface InheritanceOverlayProps {
  inherited?: boolean
  type?: InheritanceOverlayType
  className?: string
  children?: React.ReactNode
}

export const InheritanceOverlay = (props: InheritanceOverlayProps): JSX.Element => {
  const style = useInheritanceOverlayStyle(props)

  if (style === undefined) {
    return <></>
  }

  const classNames = cn(
    'inheritance-overlay',
    style,
    props.className
  )

  return (
    <span className={ classNames }>
      {props.children}
    </span>
  )
}
