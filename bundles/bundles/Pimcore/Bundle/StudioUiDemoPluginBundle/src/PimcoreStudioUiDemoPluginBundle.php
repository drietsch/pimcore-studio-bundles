<?php

namespace Pimcore\Bundle\StudioUiDemoPluginBundle;

use Pimcore\Extension\Bundle\AbstractPimcoreBundle;

class PimcoreStudioUiDemoPluginBundle extends AbstractPimcoreBundle
{
    public function getPath(): string
    {
        return \dirname(__DIR__);
    }
}
