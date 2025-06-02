<?php
if (!defined('ABSPATH')) {
    exit;
}

class Awema_Ajax {
    
    public function __construct() {
        add_action('wp_ajax_awema_save_project', array($this, 'save_project'));
        add_action('wp_ajax_awema_generate_site', array($this, 'generate_site'));
        add_action('wp_ajax_awema_get_templates', array($this, 'get_templates'));
        add_action('wp_ajax_awema_test_ai_connection', array($this, 'test_ai_connection'));
    }
    
    public function save_project() {
        if (!wp_verify_nonce($_POST['nonce'], 'awema_nonce')) {
            wp_die('Nonce verification failed');
        }
        
        if (!current_user_can('manage_awema')) {
            wp_die('Insufficient permissions');
        }
        
        global $wpdb;
        $table_name = $wpdb->prefix . 'awema_projects';
        
        $project_data = array(
            'project_name' => sanitize_text_field($_POST['project_name']),
            'client_data' => sanitize_textarea_field($_POST['client_data']),
            'primary_color' => sanitize_hex_color($_POST['primary_color']),
            'secondary_color' => sanitize_hex_color($_POST['secondary_color']),
            'logo_url' => esc_url($_POST['logo_url']),
            'template_id' => sanitize_text_field($_POST['template_id']),
            'ai_api_key' => sanitize_text_field($_POST['ai_api_key'])
        );
        
        $project_id = intval($_POST['project_id']);
        
        if ($project_id > 0) {
            // Mise à jour
            $result = $wpdb->update(
                $table_name,
                $project_data,
                array('id' => $project_id),
                array('%s', '%s', '%s', '%s', '%s', '%s', '%s'),
                array('%d')
            );
        } else {
            // Nouveau projet
            $result = $wpdb->insert(
                $table_name,
                $project_data,
                array('%s', '%s', '%s', '%s', '%s', '%s', '%s')
            );
            $project_id = $wpdb->insert_id;
        }
        
        if ($result !== false) {
            wp_send_json_success(array(
                'message' => 'Projet sauvegardé avec succès',
                'project_id' => $project_id
            ));
        } else {
            wp_send_json_error('Erreur lors de la sauvegarde');
        }
    }
    
    public function generate_site() {
        if (!wp_verify_nonce($_POST['nonce'], 'awema_nonce')) {
            wp_die('Nonce verification failed');
        }
        
        if (!current_user_can('manage_awema')) {
            wp_die('Insufficient permissions');
        }
        
        $project_id = intval($_POST['project_id']);
        
        global $wpdb;
        $table_name = $wpdb->prefix . 'awema_projects';
        $project = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE id = %d", $project_id));
        
        if (!$project) {
            wp_send_json_error('Projet non trouvé');
        }
        
        try {
            // Initialiser les classes nécessaires
            $page_generator = new Awema_Page_Generator();
            $divi_handler = new Awema_Divi();
            $ai_handler = new Awema_AI($project->ai_api_key);
            
            // Étape 1: Analyser les données client
            $client_data = json_decode($project->client_data, true);
            if (!$client_data) {
                // Si ce n'est pas du JSON, traiter comme du texte
                $client_data = $this->parse_client_text($project->client_data);
            }
            
            // Étape 2: Créer les pages de base
            $pages_created = $page_generator->create_basic_pages($client_data);
            
            // Étape 3: Appliquer les templates Divi
            if ($project->template_id) {
                $divi_handler->apply_template_to_pages($project->template_id, $pages_created);
            }
            
            // Étape 4: Appliquer les couleurs
            $divi_handler->update_color_palette($project->primary_color, $project->secondary_color);
            
            // Étape 5: Générer le contenu avec l'IA
            foreach ($pages_created as $page_id => $page_type) {
                $content = $ai_handler->generate_content_for_page($page_type, $client_data);
                $divi_handler->inject_content_to_page($page_id, $content);
            }
            
            // Étape 6: Mettre à jour le statut du projet
            $wpdb->update(
                $table_name,
                array('status' => 'completed'),
                array('id' => $project_id),
                array('%s'),
                array('%d')
            );
            
            wp_send_json_success(array(
                'message' => 'Site généré avec succès',
                'pages_created' => count($pages_created)
            ));
            
        } catch (Exception $e) {
            wp_send_json_error('Erreur lors de la génération: ' . $e->getMessage());
        }
    }
    
    public function get_templates() {
        if (!wp_verify_nonce($_POST['nonce'], 'awema_nonce')) {
            wp_die('Nonce verification failed');
        }
        
        $divi_handler = new Awema_Divi();
        $templates = $divi_handler->get_available_templates();
        
        wp_send_json_success($templates);
    }
    
    public function test_ai_connection() {
        if (!wp_verify_nonce($_POST['nonce'], 'awema_nonce')) {
            wp_die('Nonce verification failed');
        }
        
        $api_key = sanitize_text_field($_POST['api_key']);
        
        try {
            $ai_handler = new Awema_AI($api_key);
            $test_result = $ai_handler->test_connection();
            
            if ($test_result) {
                wp_send_json_success('Connexion API réussie');
            } else {
                wp_send_json_error('Échec de la connexion API');
            }
        } catch (Exception $e) {
            wp_send_json_error('Erreur: ' . $e->getMessage());
        }
    }
    
    private function parse_client_text($text) {
        // Fonction pour parser le texte du formulaire client en structure utilisable
        $data = array();
        
        // Recherche des patterns communs
        if (preg_match('/nom[:\s]*([^\n]+)/i', $text, $matches)) {
            $data['company_name'] = trim($matches[1]);
        }
        
        if (preg_match('/services?[:\s]*([^\n]+)/i', $text, $matches)) {
            $data['services'] = array_map('trim', explode(',', $matches[1]));
        }
        
        if (preg_match('/localité[s]?[:\s]*([^\n]+)/i', $text, $matches)) {
            $data['locations'] = array_map('trim', explode(',', $matches[1]));
        }
        
        if (preg_match('/téléphone[:\s]*([^\n]+)/i', $text, $matches)) {
            $data['phone'] = trim($matches[1]);
        }
        
        if (preg_match('/email[:\s]*([^\n]+)/i', $text, $matches)) {
            $data['email'] = trim($matches[1]);
        }
        
        return $data;
    }
}

new Awema_Ajax();