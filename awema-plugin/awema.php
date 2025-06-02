<?php
/**
 * Plugin Name: AWEMA - Automatisation WordPress pour Artisans BTP
 * Plugin URI: https://awema.fr
 * Description: Plugin pour automatiser la création de sites WordPress pour les artisans du BTP avec Divi
 * Version: 1.0.0
 * Author: AWEMA
 * Text Domain: awema
 * Domain Path: /languages
 */

if (!defined('ABSPATH')) {
    exit;
}

define('AWEMA_PLUGIN_URL', plugin_dir_url(__FILE__));
define('AWEMA_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('AWEMA_VERSION', '1.0.0');

class AwemaPlugin {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
        
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
    }
    
    public function init() {
        load_plugin_textdomain('awema', false, dirname(plugin_basename(__FILE__)) . '/languages');
        $this->create_user_roles();
    }
    
    public function activate() {
        $this->create_user_roles();
        $this->create_database_tables();
        flush_rewrite_rules();
    }
    
    public function deactivate() {
        flush_rewrite_rules();
    }
    
    public function create_user_roles() {
        if (!get_role('awema_manager')) {
            add_role('awema_manager', __('Gestionnaire AWEMA', 'awema'), array(
                'read' => true,
                'edit_posts' => true,
                'edit_pages' => true,
                'publish_posts' => true,
                'publish_pages' => true,
                'edit_published_posts' => true,
                'edit_published_pages' => true,
                'manage_awema' => true
            ));
        }
        
        // Ajouter la permission aux administrateurs
        $admin_role = get_role('administrator');
        if ($admin_role) {
            $admin_role->add_cap('manage_awema');
        }
    }
    
    public function create_database_tables() {
        global $wpdb;
        
        $charset_collate = $wpdb->get_charset_collate();
        
        // Table pour les projets
        $projects_table = $wpdb->prefix . 'awema_projects';
        $sql_projects = "CREATE TABLE $projects_table (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            project_name varchar(255) NOT NULL,
            client_data longtext NOT NULL,
            primary_color varchar(7) DEFAULT '#000000',
            secondary_color varchar(7) DEFAULT '#ffffff',
            logo_url varchar(255),
            template_id varchar(100),
            ai_api_key varchar(255),
            status varchar(20) DEFAULT 'draft',
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) $charset_collate;";
        
        // Table pour les soumissions clients
        $submissions_table = $wpdb->prefix . 'awema_client_submissions';
        $sql_submissions = "CREATE TABLE $submissions_table (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            company_name varchar(255) NOT NULL,
            industry_type varchar(100),
            company_description text,
            main_services text,
            service_areas text,
            emergency_service varchar(20),
            certifications varchar(255),
            contact_name varchar(255) NOT NULL,
            contact_phone varchar(50) NOT NULL,
            contact_email varchar(255) NOT NULL,
            website_current varchar(255),
            business_address text,
            site_objectives text,
            color_preferences varchar(255),
            style_preference varchar(100),
            special_features text,
            team_size varchar(50),
            years_experience int,
            competitors text,
            additional_info text,
            status varchar(20) DEFAULT 'pending',
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql_projects);
        dbDelta($sql_submissions);
    }
    
    public function add_admin_menu() {
        add_menu_page(
            __('AWEMA', 'awema'),
            __('AWEMA', 'awema'),
            'manage_awema',
            'awema-dashboard',
            array($this, 'admin_page'),
            'dashicons-building',
            30
        );
        
        add_submenu_page(
            'awema-dashboard',
            __('Nouveau Projet', 'awema'),
            __('Nouveau Projet', 'awema'),
            'manage_awema',
            'awema-new-project',
            array($this, 'new_project_page')
        );
        
        add_submenu_page(
            'awema-dashboard',
            __('Templates', 'awema'),
            __('Templates', 'awema'),
            'manage_awema',
            'awema-templates',
            array($this, 'templates_page')
        );
        
        add_submenu_page(
            'awema-dashboard',
            __('Configuration', 'awema'),
            __('Configuration', 'awema'),
            'manage_awema',
            'awema-settings',
            array($this, 'settings_page')
        );
    }
    
    public function enqueue_admin_scripts($hook) {
        if (strpos($hook, 'awema') !== false) {
            wp_enqueue_style('awema-admin-css', AWEMA_PLUGIN_URL . 'assets/css/admin.css', array(), AWEMA_VERSION);
            wp_enqueue_script('awema-admin-js', AWEMA_PLUGIN_URL . 'assets/js/admin.js', array('jquery'), AWEMA_VERSION, true);
            
            wp_localize_script('awema-admin-js', 'awema_ajax', array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('awema_nonce')
            ));
        }
    }
    
    public function admin_page() {
        include AWEMA_PLUGIN_PATH . 'admin/dashboard.php';
    }
    
    public function new_project_page() {
        include AWEMA_PLUGIN_PATH . 'admin/new-project.php';
    }
    
    public function templates_page() {
        include AWEMA_PLUGIN_PATH . 'admin/templates.php';
    }
    
    public function settings_page() {
        include AWEMA_PLUGIN_PATH . 'admin/settings.php';
    }
}

new AwemaPlugin();

// Inclure les classes principales
require_once AWEMA_PLUGIN_PATH . 'includes/class-awema-ajax.php';
require_once AWEMA_PLUGIN_PATH . 'includes/class-awema-ai.php';
require_once AWEMA_PLUGIN_PATH . 'includes/class-awema-divi.php';
require_once AWEMA_PLUGIN_PATH . 'includes/class-awema-seo.php';
require_once AWEMA_PLUGIN_PATH . 'includes/class-awema-page-generator.php';
require_once AWEMA_PLUGIN_PATH . 'includes/class-awema-client-form.php';