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

import { type AssetPermissions } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { type DataObjectPermissions } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import {
  api as baseApi
} from '@Pimcore/modules/element/element-api-slice.gen'
import { invalidatingTags, tagNames } from '@Pimcore/app/api/pimcore/tags'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.DATA_OBJECT_DETAIL, tagNames.ASSET_DETAIL],
  endpoints: {
    elementDelete: {
      invalidatesTags: (result, error, args) => invalidatingTags.ELEMENT_DETAIL(args.elementType, args.id)
    }
  }
})

export type ElementPermissions = AssetPermissions & DataObjectPermissions

export const {
  useElementDeleteMutation,
  useElementGetDeleteInfoQuery,
  useElementFolderCreateMutation,
  useElementGetContextPermissionsQuery,
  useElementGetIdByPathQuery,
  useElementGetSubtypeQuery,
  useElementResolveBySearchTermQuery,
  useLazyElementResolveBySearchTermQuery
} = api
