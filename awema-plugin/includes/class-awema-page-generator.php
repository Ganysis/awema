<?php
if (!defined('ABSPATH')) {
    exit;
}

class Awema_Page_Generator {
    
    private $created_pages = array();
    
    public function __construct() {
        // Constructor
    }
    
    public function create_basic_pages($client_data) {
        $this->created_pages = array();
        
        // Pages de base à créer
        $base_pages = array(
            'home' => array(
                'title' => $this->get_page_title('home', $client_data),
                'slug' => 'accueil',
                'template' => 'page',
                'is_front_page' => true
            ),
            'about' => array(
                'title' => 'À Propos',
                'slug' => 'a-propos',
                'template' => 'page'
            ),
            'services' => array(
                'title' => 'Nos Services',
                'slug' => 'nos-services',
                'template' => 'page'
            ),
            'contact' => array(
                'title' => 'Contact',
                'slug' => 'contact',
                'template' => 'page'
            )
        );
        
        // Créer les pages de base
        foreach ($base_pages as $page_type => $page_config) {
            $page_id = $this->create_page($page_config, $client_data);
            if ($page_id) {
                $this->created_pages[$page_id] = $page_type;
                
                // Définir comme page d'accueil si nécessaire
                if (isset($page_config['is_front_page']) && $page_config['is_front_page']) {
                    update_option('page_on_front', $page_id);
                    update_option('show_on_front', 'page');
                }
            }
        }
        
        // Créer les pages de services spécifiques
        if (isset($client_data['services']) && is_array($client_data['services'])) {
            $services_parent_id = $this->get_page_id_by_type('services');
            
            foreach ($client_data['services'] as $service) {
                $this->create_service_pages($service, $client_data, $services_parent_id);
            }
        }
        
        // Créer le menu principal
        $this->create_main_menu();
        
        return $this->created_pages;
    }
    
    private function create_page($page_config, $client_data) {
        // Vérifier si la page existe déjà
        $existing_page = get_page_by_path($page_config['slug']);
        if ($existing_page) {
            return $existing_page->ID;
        }
        
        $page_data = array(
            'post_title' => $page_config['title'],
            'post_name' => $page_config['slug'],
            'post_content' => $this->get_default_content($page_config),
            'post_status' => 'publish',
            'post_type' => 'page',
            'post_author' => get_current_user_id()
        );
        
        // Ajouter le parent si spécifié
        if (isset($page_config['parent_id'])) {
            $page_data['post_parent'] = $page_config['parent_id'];
        }
        
        $page_id = wp_insert_post($page_data);
        
        if ($page_id && !is_wp_error($page_id)) {
            // Ajouter les meta données AWEMA
            update_post_meta($page_id, '_awema_generated', '1');
            update_post_meta($page_id, '_awema_page_type', $page_config['type'] ?? 'basic');
            update_post_meta($page_id, '_awema_client_data', json_encode($client_data));
            
            // Activer Divi Builder
            update_post_meta($page_id, '_et_pb_use_builder', 'on');
            update_post_meta($page_id, '_et_pb_page_layout', 'et_full_width_page');
            
            return $page_id;
        }
        
        return false;
    }
    
    private function create_service_pages($service, $client_data, $parent_id) {
        $service_slug = sanitize_title($service);
        
        // Page service globale
        $global_service_config = array(
            'title' => $service,
            'slug' => $service_slug,
            'template' => 'page',
            'parent_id' => $parent_id,
            'type' => 'service_global'
        );
        
        $global_page_id = $this->create_page($global_service_config, $client_data);
        if ($global_page_id) {
            $this->created_pages[$global_page_id] = 'service_global';
        }
        
        // Pages services locales si des localités sont définies
        if (isset($client_data['locations']) && is_array($client_data['locations'])) {
            foreach ($client_data['locations'] as $location) {
                $local_service_config = array(
                    'title' => $service . ' à ' . $location,
                    'slug' => $service_slug . '-' . sanitize_title($location),
                    'template' => 'page',
                    'parent_id' => $global_page_id,
                    'type' => 'service_local'
                );
                
                $local_page_id = $this->create_page($local_service_config, $client_data);
                if ($local_page_id) {
                    $this->created_pages[$local_page_id] = 'service_local';
                    
                    // Ajouter des méta données spécifiques
                    update_post_meta($local_page_id, '_awema_service', $service);
                    update_post_meta($local_page_id, '_awema_location', $location);
                }
            }
        }
    }
    
    private function get_page_title($page_type, $client_data) {
        $company_name = isset($client_data['company_name']) ? $client_data['company_name'] : 'Votre Entreprise';
        
        switch ($page_type) {
            case 'home':
                return $company_name . ' - Entreprise BTP';
            default:
                return $company_name;
        }
    }
    
    private function get_default_content($page_config) {
        // Contenu par défaut avec placeholders AWEMA
        switch ($page_config['type'] ?? 'basic') {
            case 'service_global':
                return '[awema_service_content] [awema_service_areas] [awema_contact_cta]';
            case 'service_local':
                return '[awema_local_service_content] [awema_local_testimonials] [awema_contact_form]';
            default:
                return '[awema_content] [awema_contact_cta]';
        }
    }
    
    private function get_page_id_by_type($type) {
        foreach ($this->created_pages as $page_id => $page_type) {
            if ($page_type === $type) {
                return $page_id;
            }
        }
        return 0;
    }
    
    private function create_main_menu() {
        // Créer le menu principal
        $menu_name = 'Menu Principal AWEMA';
        $menu_exists = wp_get_nav_menu_object($menu_name);
        
        if (!$menu_exists) {
            $menu_id = wp_create_nav_menu($menu_name);
        } else {
            $menu_id = $menu_exists->term_id;
        }
        
        if ($menu_id && !is_wp_error($menu_id)) {
            // Vider le menu existant
            $existing_items = wp_get_nav_menu_items($menu_id);
            foreach ($existing_items as $item) {
                wp_delete_post($item->ID, true);
            }
            
            // Ajouter les éléments de menu
            $menu_items = array(
                array('page_type' => 'home', 'title' => 'Accueil'),
                array('page_type' => 'about', 'title' => 'À Propos'),
                array('page_type' => 'services', 'title' => 'Nos Services'),
                array('page_type' => 'contact', 'title' => 'Contact')
            );
            
            $menu_order = 1;
            foreach ($menu_items as $item) {
                $page_id = $this->get_page_id_by_type($item['page_type']);
                if ($page_id) {
                    wp_update_nav_menu_item($menu_id, 0, array(
                        'menu-item-title' => $item['title'],
                        'menu-item-object' => 'page',
                        'menu-item-object-id' => $page_id,
                        'menu-item-type' => 'post_type',
                        'menu-item-status' => 'publish',
                        'menu-item-position' => $menu_order++
                    ));
                }
            }
            
            // Assigner le menu à l'emplacement principal
            $locations = get_theme_mod('nav_menu_locations');
            $locations['primary-menu'] = $menu_id;
            set_theme_mod('nav_menu_locations', $locations);
        }
    }
    
    public function create_service_schema($service, $client_data) {
        $company_name = isset($client_data['company_name']) ? $client_data['company_name'] : '';
        $phone = isset($client_data['phone']) ? $client_data['phone'] : '';
        $locations = isset($client_data['locations']) ? $client_data['locations'] : array();
        
        $schema = array(
            '@context' => 'https://schema.org',
            '@type' => 'Service',
            'name' => $service,
            'provider' => array(
                '@type' => 'LocalBusiness',
                'name' => $company_name,
                'telephone' => $phone
            ),
            'serviceType' => $service,
            'areaServed' => array()
        );
        
        foreach ($locations as $location) {
            $schema['areaServed'][] = array(
                '@type' => 'Place',
                'name' => $location
            );
        }
        
        return json_encode($schema);
    }
    
    public function create_local_business_schema($client_data) {
        $schema = array(
            '@context' => 'https://schema.org',
            '@type' => 'LocalBusiness',
            'name' => isset($client_data['company_name']) ? $client_data['company_name'] : '',
            'telephone' => isset($client_data['phone']) ? $client_data['phone'] : '',
            'email' => isset($client_data['email']) ? $client_data['email'] : '',
            'url' => home_url(),
            'serviceArea' => array()
        );
        
        if (isset($client_data['locations']) && is_array($client_data['locations'])) {
            foreach ($client_data['locations'] as $location) {
                $schema['serviceArea'][] = array(
                    '@type' => 'Place',
                    'name' => $location
                );
            }
        }
        
        if (isset($client_data['services']) && is_array($client_data['services'])) {
            $schema['hasOfferCatalog'] = array(
                '@type' => 'OfferCatalog',
                'name' => 'Services',
                'itemListElement' => array()
            );
            
            foreach ($client_data['services'] as $service) {
                $schema['hasOfferCatalog']['itemListElement'][] = array(
                    '@type' => 'Offer',
                    'itemOffered' => array(
                        '@type' => 'Service',
                        'name' => $service
                    )
                );
            }
        }
        
        return json_encode($schema);
    }
    
    public function get_created_pages() {
        return $this->created_pages;
    }
    
    public function delete_awema_pages() {
        // Supprimer toutes les pages générées par AWEMA
        $awema_pages = get_posts(array(
            'post_type' => 'page',
            'posts_per_page' => -1,
            'meta_query' => array(
                array(
                    'key' => '_awema_generated',
                    'value' => '1',
                    'compare' => '='
                )
            )
        ));
        
        foreach ($awema_pages as $page) {
            wp_delete_post($page->ID, true);
        }
        
        return count($awema_pages);
    }
}