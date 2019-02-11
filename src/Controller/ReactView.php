<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ReactView extends AbstractController
{
    /**
     * @Route("/", name="react_view")
     */
    public function index()
    {
        return $this->render('react_view/index.html.twig', [
            'controller_name' => 'ReactView',
        ]);
    }
}
