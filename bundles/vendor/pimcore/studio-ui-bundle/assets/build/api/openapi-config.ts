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

import { type ConfigFile } from '@rtk-query/codegen-openapi'
import { EndpointMatcherFunction } from '@rtk-query/codegen-openapi/lib/types';

const pathMatcher = (pattern: RegExp): EndpointMatcherFunction => {
  return (name, definition) => {
    return pattern.test(definition.path);
  }
}

const config: ConfigFile = {
  schemaFile: './docs.jsonopenapi.json',
  apiFile: '../../js/src/core/app/api/pimcore/index.ts',
  apiImport: 'api',
  endpointOverrides: [
    {
      pattern: 'assetGetGrid',
      type: 'query',
    },
    {
      pattern: 'dataObjectGetGrid',
      type: 'query',
    },
    {
      pattern: 'noteGetCollection',
      type: 'query'
    },
    {
      pattern: 'assetGetSearch',
      type: 'query',
    },
    {
      pattern: 'dataObjectGetSearch',
      type: 'query',
    },
    {
      pattern: 'metadataGetCollection',
      type: 'query'
    }
  ],
  outputFiles: {
    '../../js/src/core/modules/asset/asset-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/assets?/i)
    },'../../js/src/core/modules/data-object/data-object-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/data-object?/i)
    },
    '../../js/src/core/modules/app/translations/translations-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/translation/i)
    },
    '../../js/src/core/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/properties/i)
    },
    '../../js/src/core/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/workflow/i)
    },
    '../../js/src/core/modules/auth/user/user-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/user/i)
    },
    '../../js/src/core/modules/user/user-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/user/i)
    },
    '../../js/src/core/modules/user/roles/roles-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/role/i)
    },
    '../../js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/version/i)
    },
    '../../js/src/core/modules/element/editor/shared-tab-manager/tabs/schedule/schedule-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/schedule/i)
    },
    '../../js/src/core/modules/element/element-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/elements/i)
    },
    '../../js/src/core/modules/element/editor/shared-tab-manager/tabs/dependencies/dependencies-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/dependencies/i)
    },
    '../../js/src/core/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/tag/i)
    },
    '../../js/src/core/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/note/i)
    },
    '../../js/src/core/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/settings-slice.gen.ts': {
      filterEndpoints: pathMatcher(/custom-metadata/i)
    },
    '../../js/src/core/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/metadata-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/metadata/i)
    },
    '../../js/src/core/modules/app/settings/settings-slice.gen.ts': {
      filterEndpoints: /settings/i
    },
    '../../js/src/core/modules/app/mercure-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/mercure/i)
    },
    '../../js/src/core/modules/asset/editor/types/asset-thumbnails-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/thumbnails/i)
    },
    '../../js/src/core/modules/auth/authorization-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/(login|logout)/i)
    },
    '../../js/src/core/modules/class-definition/class-definition-slice.gen.ts': {
      filterEndpoints: pathMatcher(/\/class\//i)
    },
    '../../js/src/core/modules/data-object/unit-slice.gen.ts': {
      filterEndpoints: pathMatcher(/\/unit\//i)
    },
    '../../js/src/core/modules/document/sites-slice.gen.ts': {
      filterEndpoints: pathMatcher(/\/documents\/sites\//i)
    },
    '../../js/src/core/modules/perspectives/perspectives-slice.gen.ts': {
      filterEndpoints: pathMatcher(/\/perspectives\//i)
    },
    '../../js/src/core/modules/search/search-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/\/search\/?/i)
    },
    '../../js/src/core/modules/data-object/classification-store/classification-store-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/\/classification-store\/?/i)
    },
    '../../js/src/core/modules/element/export-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/\/api\/export\/?/i)
    }
  },
  exportName: 'api',
  hooks: true,
  tag: true
}

export default config
