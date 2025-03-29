<?php

namespace Pimcore\Bundle\StudioUiDemoPluginBundle\Controller;

use Pimcore\Controller\FrontendController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends FrontendController
{
    /**
     * @Route("/pimcore_studio_ui_demo_plugin")
     */
    public function indexAction(Request $request): Response
    {
        return new Response('Hello world from pimcore_studio_ui_demo_plugin');
    }
}
