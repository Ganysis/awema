<?php
if (!defined('ABSPATH')) {
    exit;
}

class Awema_Client_Form {
    
    public function __construct() {
        add_action('wp_ajax_awema_submit_client_form', array($this, 'handle_form_submission'));
        add_action('wp_ajax_nopriv_awema_submit_client_form', array($this, 'handle_form_submission'));
        add_shortcode('awema_client_form', array($this, 'render_form'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_public_scripts'));
    }
    
    public function enqueue_public_scripts() {
        if (has_shortcode(get_post()->post_content, 'awema_client_form')) {
            wp_enqueue_style('awema-client-form-css', AWEMA_PLUGIN_URL . 'assets/css/client-form.css', array(), AWEMA_VERSION);
            wp_enqueue_script('awema-client-form-js', AWEMA_PLUGIN_URL . 'assets/js/client-form.js', array('jquery'), AWEMA_VERSION, true);
            
            wp_localize_script('awema-client-form-js', 'awema_client_ajax', array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('awema_client_form_nonce')
            ));
        }
    }
    
    public function render_form($atts) {
        $atts = shortcode_atts(array(
            'title' => 'Créons ensemble votre site web',
            'description' => 'Remplissez ce formulaire pour que nous puissions créer le site web parfait pour votre entreprise.'
        ), $atts);
        
        ob_start();
        ?>
        <div class="awema-client-form-container">
            <div class="awema-form-header">
                <h2><?php echo esc_html($atts['title']); ?></h2>
                <p><?php echo esc_html($atts['description']); ?></p>
            </div>
            
            <form id="awema-client-form" class="awema-client-form">
                <?php wp_nonce_field('awema_client_form_nonce', 'awema_client_form_nonce'); ?>
                
                <!-- Section 1: Informations Entreprise -->
                <div class="awema-form-section">
                    <h3>Informations sur votre entreprise</h3>
                    
                    <div class="awema-form-row">
                        <div class="awema-form-field">
                            <label for="company_name">Nom de votre entreprise *</label>
                            <input type="text" id="company_name" name="company_name" required>
                        </div>
                        
                        <div class="awema-form-field">
                            <label for="industry_type">Secteur d'activité *</label>
                            <select id="industry_type" name="industry_type" required>
                                <option value="">Sélectionnez...</option>
                                <option value="plomberie">Plomberie</option>
                                <option value="electricite">Électricité</option>
                                <option value="maconnerie">Maçonnerie</option>
                                <option value="menuiserie">Menuiserie</option>
                                <option value="couverture">Couverture</option>
                                <option value="chauffage">Chauffage</option>
                                <option value="peinture">Peinture</option>
                                <option value="renovation">Rénovation générale</option>
                                <option value="autre">Autre</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="awema-form-row">
                        <div class="awema-form-field">
                            <label for="company_description">Description de votre activité</label>
                            <textarea id="company_description" name="company_description" rows="3" placeholder="Décrivez brièvement votre activité et votre expertise..."></textarea>
                        </div>
                    </div>
                </div>
                
                <!-- Section 2: Services -->
                <div class="awema-form-section">
                    <h3>Vos services</h3>
                    
                    <div class="awema-form-row">
                        <div class="awema-form-field">
                            <label for="main_services">Services principaux *</label>
                            <textarea id="main_services" name="main_services" rows="3" required placeholder="Listez vos services principaux (ex: Installation, Dépannage, Rénovation...)"></textarea>
                        </div>
                    </div>
                    
                    <div class="awema-form-row">
                        <div class="awema-form-field">
                            <label for="service_areas">Zones d'intervention *</label>
                            <textarea id="service_areas" name="service_areas" rows="2" required placeholder="Villes, départements où vous intervenez..."></textarea>
                        </div>
                    </div>
                    
                    <div class="awema-form-row">
                        <div class="awema-form-field">
                            <label for="emergency_service">Service d'urgence</label>
                            <select id="emergency_service" name="emergency_service">
                                <option value="non">Non</option>
                                <option value="oui">Oui, 24h/24</option>
                                <option value="oui_limite">Oui, horaires limités</option>
                            </select>
                        </div>
                        
                        <div class="awema-form-field">
                            <label for="certifications">Certifications/Labels</label>
                            <input type="text" id="certifications" name="certifications" placeholder="RGE, Qualibat, etc.">
                        </div>
                    </div>
                </div>
                
                <!-- Section 3: Contact -->
                <div class="awema-form-section">
                    <h3>Informations de contact</h3>
                    
                    <div class="awema-form-row">
                        <div class="awema-form-field">
                            <label for="contact_name">Nom du contact *</label>
                            <input type="text" id="contact_name" name="contact_name" required>
                        </div>
                        
                        <div class="awema-form-field">
                            <label for="contact_phone">Téléphone *</label>
                            <input type="tel" id="contact_phone" name="contact_phone" required>
                        </div>
                    </div>
                    
                    <div class="awema-form-row">
                        <div class="awema-form-field">
                            <label for="contact_email">Email *</label>
                            <input type="email" id="contact_email" name="contact_email" required>
                        </div>
                        
                        <div class="awema-form-field">
                            <label for="website_current">Site web actuel</label>
                            <input type="url" id="website_current" name="website_current" placeholder="https://...">
                        </div>
                    </div>
                    
                    <div class="awema-form-row">
                        <div class="awema-form-field">
                            <label for="business_address">Adresse de l'entreprise</label>
                            <textarea id="business_address" name="business_address" rows="2"></textarea>
                        </div>
                    </div>
                </div>
                
                <!-- Section 4: Préférences Site Web -->
                <div class="awema-form-section">
                    <h3>Préférences pour votre site web</h3>
                    
                    <div class="awema-form-row">
                        <div class="awema-form-field">
                            <label for="site_objectives">Objectifs du site *</label>
                            <div class="awema-checkbox-group">
                                <label><input type="checkbox" name="site_objectives[]" value="visibilite"> Améliorer ma visibilité</label>
                                <label><input type="checkbox" name="site_objectives[]" value="leads"> Générer des demandes de devis</label>
                                <label><input type="checkbox" name="site_objectives[]" value="confiance"> Renforcer ma crédibilité</label>
                                <label><input type="checkbox" name="site_objectives[]" value="communication"> Communiquer sur mes services</label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="awema-form-row">
                        <div class="awema-form-field">
                            <label for="color_preferences">Couleurs préférées</label>
                            <input type="text" id="color_preferences" name="color_preferences" placeholder="Bleu, rouge, vert... ou codes couleurs">
                        </div>
                        
                        <div class="awema-form-field">
                            <label for="style_preference">Style souhaité</label>
                            <select id="style_preference" name="style_preference">
                                <option value="">Pas de préférence</option>
                                <option value="moderne">Moderne et épuré</option>
                                <option value="traditionnel">Traditionnel</option>
                                <option value="professionnel">Professionnel sobre</option>
                                <option value="dynamique">Coloré et dynamique</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="awema-form-row">
                        <div class="awema-form-field">
                            <label for="special_features">Fonctionnalités souhaitées</label>
                            <div class="awema-checkbox-group">
                                <label><input type="checkbox" name="special_features[]" value="devis_en_ligne"> Demande de devis en ligne</label>
                                <label><input type="checkbox" name="special_features[]" value="galerie_photos"> Galerie de réalisations</label>
                                <label><input type="checkbox" name="special_features[]" value="temoignages"> Témoignages clients</label>
                                <label><input type="checkbox" name="special_features[]" value="blog"> Blog/Actualités</label>
                                <label><input type="checkbox" name="special_features[]" value="contact_urgence"> Bouton urgence visible</label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Section 5: Informations Complémentaires -->
                <div class="awema-form-section">
                    <h3>Informations complémentaires</h3>
                    
                    <div class="awema-form-row">
                        <div class="awema-form-field">
                            <label for="team_size">Taille de votre équipe</label>
                            <select id="team_size" name="team_size">
                                <option value="">Sélectionnez...</option>
                                <option value="solo">Travailleur indépendant</option>
                                <option value="2-5">2 à 5 employés</option>
                                <option value="6-15">6 à 15 employés</option>
                                <option value="15+">Plus de 15 employés</option>
                            </select>
                        </div>
                        
                        <div class="awema-form-field">
                            <label for="years_experience">Années d'expérience</label>
                            <input type="number" id="years_experience" name="years_experience" min="0" max="50">
                        </div>
                    </div>
                    
                    <div class="awema-form-row">
                        <div class="awema-form-field">
                            <label for="competitors">Concurrents ou sites que vous aimez</label>
                            <textarea id="competitors" name="competitors" rows="2" placeholder="Sites web de concurrents ou exemples qui vous plaisent..."></textarea>
                        </div>
                    </div>
                    
                    <div class="awema-form-row">
                        <div class="awema-form-field">
                            <label for="additional_info">Informations supplémentaires</label>
                            <textarea id="additional_info" name="additional_info" rows="3" placeholder="Tout ce que vous souhaitez nous préciser pour votre projet..."></textarea>
                        </div>
                    </div>
                </div>
                
                <div class="awema-form-submit">
                    <button type="submit" class="awema-submit-btn">
                        <span class="submit-text">Envoyer ma demande</span>
                        <span class="submit-loading" style="display: none;">Envoi en cours...</span>
                    </button>
                </div>
            </form>
            
            <div id="awema-form-result" class="awema-form-result" style="display: none;"></div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    public function handle_form_submission() {
        if (!wp_verify_nonce($_POST['awema_client_form_nonce'], 'awema_client_form_nonce')) {
            wp_send_json_error('Erreur de sécurité');
        }
        
        global $wpdb;
        $table_name = $wpdb->prefix . 'awema_client_submissions';
        
        $form_data = array(
            'company_name' => sanitize_text_field($_POST['company_name']),
            'industry_type' => sanitize_text_field($_POST['industry_type']),
            'company_description' => sanitize_textarea_field($_POST['company_description']),
            'main_services' => sanitize_textarea_field($_POST['main_services']),
            'service_areas' => sanitize_textarea_field($_POST['service_areas']),
            'emergency_service' => sanitize_text_field($_POST['emergency_service']),
            'certifications' => sanitize_text_field($_POST['certifications']),
            'contact_name' => sanitize_text_field($_POST['contact_name']),
            'contact_phone' => sanitize_text_field($_POST['contact_phone']),
            'contact_email' => sanitize_email($_POST['contact_email']),
            'website_current' => esc_url($_POST['website_current']),
            'business_address' => sanitize_textarea_field($_POST['business_address']),
            'site_objectives' => isset($_POST['site_objectives']) ? implode(',', array_map('sanitize_text_field', $_POST['site_objectives'])) : '',
            'color_preferences' => sanitize_text_field($_POST['color_preferences']),
            'style_preference' => sanitize_text_field($_POST['style_preference']),
            'special_features' => isset($_POST['special_features']) ? implode(',', array_map('sanitize_text_field', $_POST['special_features'])) : '',
            'team_size' => sanitize_text_field($_POST['team_size']),
            'years_experience' => intval($_POST['years_experience']),
            'competitors' => sanitize_textarea_field($_POST['competitors']),
            'additional_info' => sanitize_textarea_field($_POST['additional_info'])
        );
        
        $result = $wpdb->insert(
            $table_name,
            $form_data,
            array('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%d', '%s', '%s')
        );
        
        if ($result !== false) {
            $submission_id = $wpdb->insert_id;
            
            $this->send_notification_emails($form_data, $submission_id);
            
            wp_send_json_success(array(
                'message' => 'Votre demande a été envoyée avec succès ! Nous vous contacterons rapidement.',
                'submission_id' => $submission_id
            ));
        } else {
            wp_send_json_error('Erreur lors de l\'envoi. Veuillez réessayer.');
        }
    }
    
    private function send_notification_emails($form_data, $submission_id) {
        $admin_email = get_option('admin_email');
        $subject = 'Nouvelle demande de site web - ' . $form_data['company_name'];
        
        $message = "Nouvelle demande de création de site web reçue :\n\n";
        $message .= "Entreprise : " . $form_data['company_name'] . "\n";
        $message .= "Secteur : " . $form_data['industry_type'] . "\n";
        $message .= "Contact : " . $form_data['contact_name'] . "\n";
        $message .= "Email : " . $form_data['contact_email'] . "\n";
        $message .= "Téléphone : " . $form_data['contact_phone'] . "\n\n";
        $message .= "Voir tous les détails dans l'administration WordPress.\n";
        $message .= "ID de soumission : " . $submission_id;
        
        wp_mail($admin_email, $subject, $message);
        
        $client_subject = 'Confirmation de votre demande - ' . get_bloginfo('name');
        $client_message = "Bonjour " . $form_data['contact_name'] . ",\n\n";
        $client_message .= "Nous avons bien reçu votre demande de création de site web pour " . $form_data['company_name'] . ".\n\n";
        $client_message .= "Notre équipe va étudier votre projet et vous contacter rapidement.\n\n";
        $client_message .= "Cordialement,\n";
        $client_message .= get_bloginfo('name');
        
        wp_mail($form_data['contact_email'], $client_subject, $client_message);
    }
}

new Awema_Client_Form();