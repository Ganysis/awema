<?php
if (!defined('ABSPATH')) {
    exit;
}

class Awema_SEO {
    
    public function __construct() {
        add_action('wp_head', array($this, 'add_schema_markup'));
        add_action('wp_head', array($this, 'add_custom_meta_tags'));
        add_filter('document_title_parts', array($this, 'modify_title'));
        add_action('save_post', array($this, 'generate_seo_content'));
    }
    
    public function add_schema_markup() {
        if (is_page()) {
            global $post;
            
            $is_awema_page = get_post_meta($post->ID, '_awema_generated', true);
            if (!$is_awema_page) {
                return;
            }
            
            $client_data_json = get_post_meta($post->ID, '_awema_client_data', true);
            $client_data = json_decode($client_data_json, true);
            
            if (!$client_data) {
                return;
            }
            
            $page_type = get_post_meta($post->ID, '_awema_page_type', true);
            
            // Schema LocalBusiness pour toutes les pages
            $this->output_local_business_schema($client_data);
            
            // Schema spécifique selon le type de page
            switch ($page_type) {
                case 'service_global':
                case 'service_local':
                    $this->output_service_schema($post, $client_data);
                    break;
                case 'contact':
                    $this->output_contact_schema($client_data);
                    break;
            }
        }
    }
    
    private function output_local_business_schema($client_data) {
        $company_name = isset($client_data['company_name']) ? $client_data['company_name'] : get_bloginfo('name');
        
        $schema = array(
            '@context' => 'https://schema.org',
            '@type' => 'LocalBusiness',
            'name' => $company_name,
            'url' => home_url(),
            'telephone' => isset($client_data['phone']) ? $client_data['phone'] : '',
            'email' => isset($client_data['email']) ? $client_data['email'] : '',
            'priceRange' => '€€',
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
                'name' => 'Services BTP',
                'itemListElement' => array()
            );
            
            foreach ($client_data['services'] as $index => $service) {
                $schema['hasOfferCatalog']['itemListElement'][] = array(
                    '@type' => 'Offer',
                    'position' => $index + 1,
                    'itemOffered' => array(
                        '@type' => 'Service',
                        'name' => $service,
                        'provider' => array(
                            '@type' => 'Organization',
                            'name' => $company_name
                        )
                    )
                );
            }
        }
        
        echo '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_UNICODE) . '</script>' . "\n";
    }
    
    private function output_service_schema($post, $client_data) {
        $service_name = get_post_meta($post->ID, '_awema_service', true);
        $location = get_post_meta($post->ID, '_awema_location', true);
        
        if (!$service_name) {
            $service_name = $post->post_title;
        }
        
        $schema = array(
            '@context' => 'https://schema.org',
            '@type' => 'Service',
            'name' => $service_name,
            'provider' => array(
                '@type' => 'LocalBusiness',
                'name' => isset($client_data['company_name']) ? $client_data['company_name'] : get_bloginfo('name'),
                'telephone' => isset($client_data['phone']) ? $client_data['phone'] : '',
                'url' => home_url()
            ),
            'serviceType' => $service_name,
            'description' => wp_strip_all_tags(get_the_excerpt($post))
        );
        
        if ($location) {
            $schema['areaServed'] = array(
                '@type' => 'Place',
                'name' => $location
            );
        }
        
        echo '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_UNICODE) . '</script>' . "\n";
    }
    
    private function output_contact_schema($client_data) {
        $schema = array(
            '@context' => 'https://schema.org',
            '@type' => 'ContactPage',
            'name' => 'Contact - ' . (isset($client_data['company_name']) ? $client_data['company_name'] : get_bloginfo('name')),
            'url' => get_permalink(),
            'mainEntity' => array(
                '@type' => 'LocalBusiness',
                'name' => isset($client_data['company_name']) ? $client_data['company_name'] : get_bloginfo('name'),
                'telephone' => isset($client_data['phone']) ? $client_data['phone'] : '',
                'email' => isset($client_data['email']) ? $client_data['email'] : ''
            )
        );
        
        echo '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_UNICODE) . '</script>' . "\n";
    }
    
    public function add_custom_meta_tags() {
        if (is_page()) {
            global $post;
            
            $awema_title = get_post_meta($post->ID, '_awema_seo_title', true);
            $awema_description = get_post_meta($post->ID, '_awema_seo_description', true);
            
            if ($awema_description) {
                echo '<meta name="description" content="' . esc_attr($awema_description) . '">' . "\n";
                echo '<meta property="og:description" content="' . esc_attr($awema_description) . '">' . "\n";
            }
            
            // Open Graph
            echo '<meta property="og:type" content="website">' . "\n";
            echo '<meta property="og:url" content="' . esc_url(get_permalink()) . '">' . "\n";
            echo '<meta property="og:title" content="' . esc_attr($awema_title ?: get_the_title()) . '">' . "\n";
            
            // Twitter Card
            echo '<meta name="twitter:card" content="summary">' . "\n";
            echo '<meta name="twitter:title" content="' . esc_attr($awema_title ?: get_the_title()) . '">' . "\n";
            
            if ($awema_description) {
                echo '<meta name="twitter:description" content="' . esc_attr($awema_description) . '">' . "\n";
            }
        }
    }
    
    public function modify_title($title_parts) {
        if (is_page()) {
            global $post;
            
            $awema_title = get_post_meta($post->ID, '_awema_seo_title', true);
            if ($awema_title) {
                $title_parts['title'] = $awema_title;
            }
        }
        
        return $title_parts;
    }
    
    public function generate_seo_content($post_id) {
        if (get_post_type($post_id) !== 'page') {
            return;
        }
        
        $is_awema_page = get_post_meta($post_id, '_awema_generated', true);
        if (!$is_awema_page) {
            return;
        }
        
        // Éviter la boucle infinie
        if (defined('AWEMA_GENERATING_SEO') && AWEMA_GENERATING_SEO) {
            return;
        }
        define('AWEMA_GENERATING_SEO', true);
        
        $client_data_json = get_post_meta($post_id, '_awema_client_data', true);
        $client_data = json_decode($client_data_json, true);
        
        if (!$client_data) {
            return;
        }
        
        // Générer le contenu SEO avec l'IA
        try {
            $ai_api_key = $this->get_project_ai_key($post_id);
            if ($ai_api_key) {
                $ai_handler = new Awema_AI($ai_api_key);
                
                $page_content = get_post_field('post_content', $post_id);
                $page_type = get_post_meta($post_id, '_awema_page_type', true);
                
                $seo_data = $ai_handler->generate_seo_meta($page_type, $client_data, $page_content);
                
                if (isset($seo_data['title'])) {
                    update_post_meta($post_id, '_awema_seo_title', $seo_data['title']);
                }
                
                if (isset($seo_data['description'])) {
                    update_post_meta($post_id, '_awema_seo_description', $seo_data['description']);
                }
            }
        } catch (Exception $e) {
            error_log('Erreur génération SEO AWEMA: ' . $e->getMessage());
        }
    }
    
    private function get_project_ai_key($post_id) {
        // Récupérer la clé API du projet associé
        global $wpdb;
        $table_name = $wpdb->prefix . 'awema_projects';
        
        $project = $wpdb->get_row($wpdb->prepare(
            "SELECT ai_api_key FROM $table_name WHERE id = (
                SELECT project_id FROM {$wpdb->postmeta} 
                WHERE post_id = %d AND meta_key = '_awema_project_id'
            )",
            $post_id
        ));
        
        return $project ? $project->ai_api_key : '';
    }
    
    public function create_sitemap() {
        $awema_pages = get_posts(array(
            'post_type' => 'page',
            'posts_per_page' => -1,
            'post_status' => 'publish',
            'meta_query' => array(
                array(
                    'key' => '_awema_generated',
                    'value' => '1',
                    'compare' => '='
                )
            )
        ));
        
        $sitemap = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $sitemap .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        
        foreach ($awema_pages as $page) {
            $sitemap .= '<url>' . "\n";
            $sitemap .= '<loc>' . esc_url(get_permalink($page->ID)) . '</loc>' . "\n";
            $sitemap .= '<lastmod>' . date('c', strtotime($page->post_modified)) . '</lastmod>' . "\n";
            $sitemap .= '<changefreq>monthly</changefreq>' . "\n";
            $sitemap .= '<priority>0.8</priority>' . "\n";
            $sitemap .= '</url>' . "\n";
        }
        
        $sitemap .= '</urlset>';
        
        return $sitemap;
    }
    
    public function create_internal_links($post_id) {
        $post_content = get_post_field('post_content', $post_id);
        $client_data_json = get_post_meta($post_id, '_awema_client_data', true);
        $client_data = json_decode($client_data_json, true);
        
        if (!$client_data) {
            return;
        }
        
        // Récupérer les autres pages AWEMA
        $other_pages = get_posts(array(
            'post_type' => 'page',
            'posts_per_page' => -1,
            'post_status' => 'publish',
            'exclude' => array($post_id),
            'meta_query' => array(
                array(
                    'key' => '_awema_generated',
                    'value' => '1',
                    'compare' => '='
                )
            )
        ));
        
        $available_pages = array();
        foreach ($other_pages as $page) {
            $available_pages[] = $page->post_title;
        }
        
        try {
            $ai_api_key = $this->get_project_ai_key($post_id);
            if ($ai_api_key && !empty($available_pages)) {
                $ai_handler = new Awema_AI($ai_api_key);
                $suggested_links = $ai_handler->generate_internal_links($post_content, $available_pages);
                
                // Appliquer les liens suggérés
                $updated_content = $post_content;
                foreach ($suggested_links as $link) {
                    $target_page = get_page_by_title($link['page']);
                    if ($target_page) {
                        $link_html = '<a href="' . get_permalink($target_page->ID) . '">' . $link['text'] . '</a>';
                        $updated_content = str_replace($link['text'], $link_html, $updated_content);
                    }
                }
                
                if ($updated_content !== $post_content) {
                    wp_update_post(array(
                        'ID' => $post_id,
                        'post_content' => $updated_content
                    ));
                }
            }
        } catch (Exception $e) {
            error_log('Erreur création liens internes AWEMA: ' . $e->getMessage());
        }
    }
    
    public function generate_breadcrumbs($post_id) {
        $breadcrumbs = array();
        
        // Accueil
        $breadcrumbs[] = array(
            'title' => 'Accueil',
            'url' => home_url()
        );
        
        // Parents
        $parents = get_post_ancestors($post_id);
        $parents = array_reverse($parents);
        
        foreach ($parents as $parent_id) {
            $breadcrumbs[] = array(
                'title' => get_the_title($parent_id),
                'url' => get_permalink($parent_id)
            );
        }
        
        // Page actuelle
        $breadcrumbs[] = array(
            'title' => get_the_title($post_id),
            'url' => get_permalink($post_id),
            'current' => true
        );
        
        return $breadcrumbs;
    }
    
    public function output_breadcrumbs($post_id) {
        $breadcrumbs = $this->generate_breadcrumbs($post_id);
        
        echo '<nav aria-label="Fil d\'Ariane" class="awema-breadcrumbs">';
        echo '<ol itemscope itemtype="https://schema.org/BreadcrumbList">';
        
        foreach ($breadcrumbs as $index => $crumb) {
            $position = $index + 1;
            echo '<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">';
            
            if (isset($crumb['current']) && $crumb['current']) {
                echo '<span itemprop="name">' . esc_html($crumb['title']) . '</span>';
            } else {
                echo '<a itemprop="item" href="' . esc_url($crumb['url']) . '">';
                echo '<span itemprop="name">' . esc_html($crumb['title']) . '</span>';
                echo '</a>';
            }
            
            echo '<meta itemprop="position" content="' . $position . '">';
            echo '</li>';
            
            if (!isset($crumb['current'])) {
                echo ' > ';
            }
        }
        
        echo '</ol>';
        echo '</nav>';
    }
}