<?php
declare(strict_types=1);

/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

namespace Pimcore\Bundle\StudioUiBundle\Service;

/**
 * @internal
 */
interface StaticResourcesResolverInterface
{
    /**
     * @return string[]
     */
    public function getStudioCssFiles(): array;

    /**
     * @return string[]
     */
    public function getStudioJsFiles(): array;

    /**
     * @return string[]
     */
    public function getBundleCssFiles(): array;

    /**
     * @return string[]
     */
    public function getBundleJsFiles(): array;

    /**
     * @return string[]
     */
    public function getAdditionalCssFiles(): array;

    /**
     * @return string[]
     */
    public function getAdditionalJsFiles(): array;
}
