<?php

use Pimcore\Bundle\StudioUiBundle\PimcoreStudioUiBundle;
use Pimcore\Bundle\StudioBackendBundle\PimcoreStudioBackendBundle;
use Pimcore\Bundle\GenericDataIndexBundle\PimcoreGenericDataIndexBundle;
use Pimcore\Bundle\StudioUiDemoPluginBundle\PimcoreStudioUiDemoPluginBundle;

return [
    Pimcore\Bundle\SimpleBackendSearchBundle\PimcoreSimpleBackendSearchBundle::class => ['all' => true],
    PimcoreStudioUiBundle::class => ['all' => true],
    PimcoreStudioBackendBundle::class => ['all' => true],
    PimcoreGenericDataIndexBundle::class => ['all' => true],
    PimcoreStudioUiDemoPluginBundle::class => ['all' => true],
];
