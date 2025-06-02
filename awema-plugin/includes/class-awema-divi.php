<?php
if (!defined('ABSPATH')) {
    exit;
}

class Awema_Divi {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
    }
    
    public function init() {
        // Vérifier si Divi est actif
        if (!$this->is_divi_active()) {
            add_action('admin_notices', array($this, 'divi_not_active_notice'));
        }
    }
    
    public function is_divi_active() {
        $theme = wp_get_theme();
        return $theme->get('Name') === 'Divi' || $theme->get('Template') === 'Divi';
    }
    
    public function divi_not_active_notice() {
        echo '<div class="notice notice-warning"><p>';
        _e('AWEMA nécessite le thème Divi pour fonctionner correctement.', 'awema');
        echo '</p></div>';
    }
    
    public function get_available_templates() {
        // Récupérer les layouts Divi de la bibliothèque
        $layouts = get_posts(array(
            'post_type' => 'et_pb_layout',
            'posts_per_page' => -1,
            'meta_query' => array(
                array(
                    'key' => '_awema_ready',
                    'value' => '1',
                    'compare' => '='
                )
            )
        ));
        
        $templates = array();
        foreach ($layouts as $layout) {
            $templates[] = array(
                'id' => $layout->ID,
                'name' => $layout->post_title,
                'type' => get_post_meta($layout->ID, '_awema_template_type', true)
            );
        }
        
        return $templates;
    }
    
    public function apply_template_to_pages($template_id, $pages) {
        $template_content = get_post_meta($template_id, '_et_pb_old_content', true);
        
        if (empty($template_content)) {
            throw new Exception('Template Divi non trouvé ou invalide');
        }
        
        foreach ($pages as $page_id => $page_type) {
            // Appliquer le template à la page
            update_post_meta($page_id, '_et_pb_use_builder', 'on');
            update_post_meta($page_id, '_et_pb_old_content', $template_content);
            
            // Marquer la page comme utilisant le builder Divi
            update_post_meta($page_id, '_et_pb_built_for_post_type', get_post_type($page_id));
        }
    }
    
    public function update_color_palette($primary_color, $secondary_color) {
        // Mettre à jour les couleurs globales de Divi
        $et_color_palette = get_option('et_divi', array());
        
        // Couleurs de base Divi
        $color_palette = array(
            'color_1' => $primary_color,
            'color_2' => $secondary_color,
            'color_3' => '#333333', // Texte
            'color_4' => '#ffffff', // Fond
        );
        
        foreach ($color_palette as $key => $color) {
            $et_color_palette['et_color_palette'][$key] = $color;
        }
        
        update_option('et_divi', $et_color_palette);
        
        // Créer du CSS personnalisé pour les couleurs
        $custom_css = $this->generate_color_css($primary_color, $secondary_color);
        $this->add_custom_css($custom_css);
    }
    
    private function generate_color_css($primary, $secondary) {
        return "
        /* AWEMA Custom Colors */
        :root {
            --awema-primary: {$primary};
            --awema-secondary: {$secondary};
        }
        
        .awema-primary-bg { background-color: {$primary} !important; }
        .awema-secondary-bg { background-color: {$secondary} !important; }
        .awema-primary-text { color: {$primary} !important; }
        .awema-secondary-text { color: {$secondary} !important; }
        
        /* Boutons AWEMA */
        .et_pb_button.awema-btn-primary {
            background-color: {$primary} !important;
            border-color: {$primary} !important;
        }
        
        .et_pb_button.awema-btn-secondary {
            background-color: {$secondary} !important;
            border-color: {$secondary} !important;
            color: {$primary} !important;
        }
        
        /* Sections AWEMA */
        .awema-section-primary {
            background-color: {$primary} !important;
        }
        
        .awema-section-secondary {
            background-color: {$secondary} !important;
        }
        ";
    }
    
    private function add_custom_css($css) {
        $existing_css = get_option('awema_custom_css', '');
        update_option('awema_custom_css', $existing_css . "\n" . $css);
        
        // Ajouter le CSS au thème
        add_action('wp_head', function() use ($css) {
            echo "<style type='text/css'>\n" . $css . "\n</style>\n";
        });
    }
    
    public function inject_content_to_page($page_id, $content_data) {
        $page_content = get_post_meta($page_id, '_et_pb_old_content', true);
        
        if (empty($page_content)) {
            return false;
        }
        
        // Parser le contenu Divi pour trouver les modules à remplir
        $updated_content = $this->replace_awema_placeholders($page_content, $content_data);
        
        // Mettre à jour le contenu de la page
        update_post_meta($page_id, '_et_pb_old_content', $updated_content);
        
        return true;
    }
    
    private function replace_awema_placeholders($content, $content_data) {
        // Remplacer les placeholders AWEMA dans le contenu Divi
        $placeholders = array(
            '[awema_title]' => isset($content_data['title']) ? $content_data['title'] : '',
            '[awema_content]' => isset($content_data['content']) ? $content_data['content'] : '',
            '[awema_company_name]' => isset($content_data['company_name']) ? $content_data['company_name'] : '',
            '[awema_services]' => isset($content_data['services']) ? implode(', ', $content_data['services']) : '',
            '[awema_phone]' => isset($content_data['phone']) ? $content_data['phone'] : '',
            '[awema_email]' => isset($content_data['email']) ? $content_data['email'] : '',
        );
        
        foreach ($placeholders as $placeholder => $value) {
            $content = str_replace($placeholder, $value, $content);
        }
        
        return $content;
    }
    
    public function create_awema_modules() {
        // Créer des modules Divi personnalisés pour AWEMA
        $modules = array(
            'awema_services_grid' => 'Grille de Services AWEMA',
            'awema_testimonials' => 'Témoignages Clients',
            'awema_contact_form' => 'Formulaire de Contact BTP',
            'awema_google_reviews' => 'Avis Google',
            'awema_service_areas' => 'Zones d\'Intervention'
        );
        
        foreach ($modules as $module_slug => $module_name) {
            $this->register_divi_module($module_slug, $module_name);
        }
    }
    
    private function register_divi_module($slug, $name) {
        // Code pour enregistrer un module Divi personnalisé
        // Ceci nécessiterait l'extension Divi Builder API
    }
    
    public function export_layout($page_id) {
        $content = get_post_meta($page_id, '_et_pb_old_content', true);
        
        if (empty($content)) {
            return false;
        }
        
        $export_data = array(
            'version' => AWEMA_VERSION,
            'content' => $content,
            'meta' => array(
                'page_id' => $page_id,
                'page_title' => get_the_title($page_id),
                'export_date' => current_time('mysql')
            )
        );
        
        return json_encode($export_data);
    }
    
    public function import_layout($json_data, $page_id) {
        $data = json_decode($json_data, true);
        
        if (!$data || !isset($data['content'])) {
            throw new Exception('Données d\'import invalides');
        }
        
        update_post_meta($page_id, '_et_pb_old_content', $data['content']);
        update_post_meta($page_id, '_et_pb_use_builder', 'on');
        
        return true;
    }
    
    public function get_page_modules($page_id) {
        $content = get_post_meta($page_id, '_et_pb_old_content', true);
        
        if (empty($content)) {
            return array();
        }
        
        // Parser les modules Divi de la page
        preg_match_all('/\[et_pb_(\w+)([^\]]*)\]/', $content, $matches);
        
        $modules = array();
        for ($i = 0; $i < count($matches[0]); $i++) {
            $modules[] = array(
                'type' => $matches[1][$i],
                'attributes' => $matches[2][$i],
                'full_shortcode' => $matches[0][$i]
            );
        }
        
        return $modules;
    }
}