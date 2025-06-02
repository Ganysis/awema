<?php
if (!defined('ABSPATH')) {
    exit;
}

$project_id = isset($_GET['edit']) ? intval($_GET['edit']) : 0;
$project = null;

if ($project_id) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'awema_projects';
    $project = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE id = %d", $project_id));
}
?>

<div class="wrap">
    <h1><?php echo $project ? __('Éditer Projet', 'awema') : __('Nouveau Projet', 'awema'); ?></h1>
    
    <form id="awema-project-form" method="post">
        <?php wp_nonce_field('awema_save_project', 'awema_project_nonce'); ?>
        
        <div class="awema-form-container">
            <!-- Section 1: Informations Générales -->
            <div class="awema-section">
                <h2><?php _e('Informations Générales', 'awema'); ?></h2>
                
                <table class="form-table">
                    <tr>
                        <th scope="row">
                            <label for="project_name"><?php _e('Nom du Projet', 'awema'); ?></label>
                        </th>
                        <td>
                            <input type="text" id="project_name" name="project_name" 
                                   value="<?php echo $project ? esc_attr($project->project_name) : ''; ?>" 
                                   class="regular-text" required>
                        </td>
                    </tr>
                </table>
            </div>
            
            <!-- Section 2: Données Client -->
            <div class="awema-section">
                <h2><?php _e('Données Client', 'awema'); ?></h2>
                
                <table class="form-table">
                    <tr>
                        <th scope="row">
                            <label for="client_data"><?php _e('Données du Formulaire Client', 'awema'); ?></label>
                        </th>
                        <td>
                            <textarea id="client_data" name="client_data" rows="10" class="large-text code" 
                                      placeholder="Collez ici les données du formulaire client (JSON ou texte structuré)"><?php echo $project ? esc_textarea($project->client_data) : ''; ?></textarea>
                            <p class="description">
                                <?php _e('Collez les informations collectées via le formulaire centralisé (nom entreprise, services, localités, etc.)', 'awema'); ?>
                            </p>
                        </td>
                    </tr>
                </table>
            </div>
            
            <!-- Section 3: Personnalisation Visuelle -->
            <div class="awema-section">
                <h2><?php _e('Personnalisation Visuelle', 'awema'); ?></h2>
                
                <table class="form-table">
                    <tr>
                        <th scope="row">
                            <label for="primary_color"><?php _e('Couleur Primaire', 'awema'); ?></label>
                        </th>
                        <td>
                            <input type="color" id="primary_color" name="primary_color" 
                                   value="<?php echo $project ? esc_attr($project->primary_color) : '#000000'; ?>">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="secondary_color"><?php _e('Couleur Secondaire', 'awema'); ?></label>
                        </th>
                        <td>
                            <input type="color" id="secondary_color" name="secondary_color" 
                                   value="<?php echo $project ? esc_attr($project->secondary_color) : '#ffffff'; ?>">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="logo_upload"><?php _e('Logo Client', 'awema'); ?></label>
                        </th>
                        <td>
                            <input type="button" id="logo_upload" class="button" value="<?php _e('Choisir Logo', 'awema'); ?>">
                            <input type="hidden" id="logo_url" name="logo_url" 
                                   value="<?php echo $project ? esc_attr($project->logo_url) : ''; ?>">
                            <div id="logo_preview">
                                <?php if ($project && $project->logo_url): ?>
                                    <img src="<?php echo esc_url($project->logo_url); ?>" style="max-width: 200px; margin-top: 10px;">
                                <?php endif; ?>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            
            <!-- Section 4: Template Divi -->
            <div class="awema-section">
                <h2><?php _e('Template Divi', 'awema'); ?></h2>
                
                <table class="form-table">
                    <tr>
                        <th scope="row">
                            <label for="template_selection"><?php _e('Template AWEMA-Ready', 'awema'); ?></label>
                        </th>
                        <td>
                            <select id="template_selection" name="template_id" class="regular-text">
                                <option value=""><?php _e('Sélectionner un template...', 'awema'); ?></option>
                                <!-- Les templates seront chargés dynamiquement -->
                            </select>
                            <p class="description">
                                <?php _e('Choisissez un template Divi préalablement configuré pour AWEMA', 'awema'); ?>
                            </p>
                        </td>
                    </tr>
                </table>
            </div>
            
            <!-- Section 5: Configuration IA -->
            <div class="awema-section">
                <h2><?php _e('Configuration IA', 'awema'); ?></h2>
                
                <table class="form-table">
                    <tr>
                        <th scope="row">
                            <label for="ai_api_key"><?php _e('Clé API DeepSeek', 'awema'); ?></label>
                        </th>
                        <td>
                            <input type="password" id="ai_api_key" name="ai_api_key" 
                                   value="<?php echo $project ? esc_attr($project->ai_api_key) : ''; ?>" 
                                   class="regular-text">
                            <p class="description">
                                <?php _e('Clé API pour la génération de contenu via DeepSeek', 'awema'); ?>
                            </p>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        
        <p class="submit">
            <input type="submit" name="save_project" class="button-primary" 
                   value="<?php echo $project ? __('Mettre à Jour', 'awema') : __('Sauvegarder Projet', 'awema'); ?>">
            
            <?php if ($project): ?>
                <input type="submit" name="generate_site" class="button-secondary" 
                       value="<?php _e('Générer le Site', 'awema'); ?>" style="margin-left: 10px;">
            <?php endif; ?>
            
            <input type="hidden" name="project_id" value="<?php echo $project_id; ?>">
        </p>
    </form>
</div>

<script>
jQuery(document).ready(function($) {
    // Media uploader pour le logo
    $('#logo_upload').click(function(e) {
        e.preventDefault();
        
        var mediaUploader = wp.media({
            title: 'Choisir Logo',
            button: {
                text: 'Utiliser ce logo'
            },
            multiple: false
        });
        
        mediaUploader.on('select', function() {
            var attachment = mediaUploader.state().get('selection').first().toJSON();
            $('#logo_url').val(attachment.url);
            $('#logo_preview').html('<img src="' + attachment.url + '" style="max-width: 200px; margin-top: 10px;">');
        });
        
        mediaUploader.open();
    });
    
    // Charger les templates disponibles
    loadAvailableTemplates();
});

function loadAvailableTemplates() {
    // Cette fonction sera implémentée pour charger les templates Divi disponibles
    console.log('Chargement des templates...');
}
</script>