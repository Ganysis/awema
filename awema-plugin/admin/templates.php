<?php
if (!defined('ABSPATH')) {
    exit;
}

// Récupérer les templates disponibles
$divi_handler = new Awema_Divi();
$templates = $divi_handler->get_available_templates();
?>

<div class="wrap">
    <h1><?php _e('Gestion des Templates AWEMA', 'awema'); ?></h1>
    
    <div class="awema-templates-container">
        
        <!-- Section Upload -->
        <div class="awema-config-section">
            <h3><?php _e('Importer un Template', 'awema'); ?></h3>
            <p><?php _e('Uploadez un fichier JSON de layout Divi pour l\'ajouter à la bibliothèque AWEMA.', 'awema'); ?></p>
            
            <form id="awema-upload-template" enctype="multipart/form-data">
                <?php wp_nonce_field('awema_upload_template', 'awema_template_nonce'); ?>
                
                <table class="form-table">
                    <tr>
                        <th scope="row">
                            <label for="template_file"><?php _e('Fichier Template', 'awema'); ?></label>
                        </th>
                        <td>
                            <input type="file" id="template_file" name="template_file" accept=".json" required>
                            <p class="description"><?php _e('Fichier JSON exporté depuis Divi Builder', 'awema'); ?></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="template_name"><?php _e('Nom du Template', 'awema'); ?></label>
                        </th>
                        <td>
                            <input type="text" id="template_name" name="template_name" class="regular-text" required>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="template_type"><?php _e('Type de Template', 'awema'); ?></label>
                        </th>
                        <td>
                            <select id="template_type" name="template_type" class="regular-text">
                                <option value="home"><?php _e('Page d\'Accueil', 'awema'); ?></option>
                                <option value="about"><?php _e('Page À Propos', 'awema'); ?></option>
                                <option value="services"><?php _e('Page Services', 'awema'); ?></option>
                                <option value="contact"><?php _e('Page Contact', 'awema'); ?></option>
                                <option value="service_local"><?php _e('Service Local', 'awema'); ?></option>
                                <option value="generic"><?php _e('Générique', 'awema'); ?></option>
                            </select>
                        </td>
                    </tr>
                </table>
                
                <p class="submit">
                    <input type="submit" class="button-primary" value="<?php _e('Importer Template', 'awema'); ?>">
                </p>
            </form>
        </div>
        
        <!-- Section Templates Existants -->
        <div class="awema-config-section">
            <h3><?php _e('Templates Disponibles', 'awema'); ?></h3>
            
            <?php if (!empty($templates)): ?>
                <div class="awema-templates-grid">
                    <?php foreach ($templates as $template): ?>
                        <div class="awema-template-card" data-template-id="<?php echo esc_attr($template['id']); ?>">
                            <h4><?php echo esc_html($template['name']); ?></h4>
                            
                            <div class="template-preview">
                                <span><?php _e('Aperçu Template', 'awema'); ?></span>
                            </div>
                            
                            <div class="template-info">
                                <p><strong><?php _e('Type:', 'awema'); ?></strong> <?php echo esc_html($template['type']); ?></p>
                                <p><strong><?php _e('ID:', 'awema'); ?></strong> <?php echo esc_html($template['id']); ?></p>
                            </div>
                            
                            <div class="template-actions">
                                <button class="button awema-preview-template" data-template-id="<?php echo esc_attr($template['id']); ?>">
                                    <?php _e('Aperçu', 'awema'); ?>
                                </button>
                                <button class="button awema-export-template" data-template-id="<?php echo esc_attr($template['id']); ?>">
                                    <?php _e('Exporter', 'awema'); ?>
                                </button>
                                <button class="button button-link-delete awema-delete-template" data-template-id="<?php echo esc_attr($template['id']); ?>">
                                    <?php _e('Supprimer', 'awema'); ?>
                                </button>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php else: ?>
                <div class="awema-no-templates">
                    <p><?php _e('Aucun template AWEMA-Ready trouvé.', 'awema'); ?></p>
                    <p><?php _e('Pour créer un template AWEMA-Ready:', 'awema'); ?></p>
                    <ol>
                        <li><?php _e('Créez votre layout dans Divi Builder', 'awema'); ?></li>
                        <li><?php _e('Utilisez les placeholders AWEMA ([awema_title], [awema_content], etc.)', 'awema'); ?></li>
                        <li><?php _e('Sauvegardez dans la bibliothèque Divi', 'awema'); ?></li>
                        <li><?php _e('Ajoutez la meta "_awema_ready" = "1" au layout', 'awema'); ?></li>
                    </ol>
                </div>
            <?php endif; ?>
        </div>
        
        <!-- Section Aide -->
        <div class="awema-config-section">
            <h3><?php _e('Guide des Placeholders AWEMA', 'awema'); ?></h3>
            
            <div class="awema-placeholders-guide">
                <div class="placeholder-category">
                    <h4><?php _e('Placeholders Généraux', 'awema'); ?></h4>
                    <ul>
                        <li><code>[awema_title]</code> - <?php _e('Titre de la page/section', 'awema'); ?></li>
                        <li><code>[awema_content]</code> - <?php _e('Contenu principal généré par l\'IA', 'awema'); ?></li>
                        <li><code>[awema_company_name]</code> - <?php _e('Nom de l\'entreprise', 'awema'); ?></li>
                        <li><code>[awema_contact_cta]</code> - <?php _e('Call-to-action de contact', 'awema'); ?></li>
                    </ul>
                </div>
                
                <div class="placeholder-category">
                    <h4><?php _e('Informations Entreprise', 'awema'); ?></h4>
                    <ul>
                        <li><code>[awema_services]</code> - <?php _e('Liste des services', 'awema'); ?></li>
                        <li><code>[awema_phone]</code> - <?php _e('Numéro de téléphone', 'awema'); ?></li>
                        <li><code>[awema_email]</code> - <?php _e('Adresse email', 'awema'); ?></li>
                        <li><code>[awema_locations]</code> - <?php _e('Zones d\'intervention', 'awema'); ?></li>
                    </ul>
                </div>
                
                <div class="placeholder-category">
                    <h4><?php _e('Modules Spéciaux', 'awema'); ?></h4>
                    <ul>
                        <li><code>[awema_services_grid]</code> - <?php _e('Grille des services', 'awema'); ?></li>
                        <li><code>[awema_testimonials]</code> - <?php _e('Témoignages clients', 'awema'); ?></li>
                        <li><code>[awema_google_reviews]</code> - <?php _e('Avis Google', 'awema'); ?></li>
                        <li><code>[awema_contact_form]</code> - <?php _e('Formulaire de contact', 'awema'); ?></li>
                        <li><code>[awema_service_areas]</code> - <?php _e('Zones de service', 'awema'); ?></li>
                    </ul>
                </div>
                
                <div class="placeholder-category">
                    <h4><?php _e('Classes CSS AWEMA', 'awema'); ?></h4>
                    <ul>
                        <li><code>.awema-primary-bg</code> - <?php _e('Fond couleur primaire', 'awema'); ?></li>
                        <li><code>.awema-secondary-bg</code> - <?php _e('Fond couleur secondaire', 'awema'); ?></li>
                        <li><code>.awema-primary-text</code> - <?php _e('Texte couleur primaire', 'awema'); ?></li>
                        <li><code>.awema-secondary-text</code> - <?php _e('Texte couleur secondaire', 'awema'); ?></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
jQuery(document).ready(function($) {
    
    // Upload de template
    $('#awema-upload-template').on('submit', function(e) {
        e.preventDefault();
        uploadTemplate();
    });
    
    // Aperçu template
    $('.awema-preview-template').on('click', function() {
        var templateId = $(this).data('template-id');
        previewTemplate(templateId);
    });
    
    // Export template
    $('.awema-export-template').on('click', function() {
        var templateId = $(this).data('template-id');
        exportTemplate(templateId);
    });
    
    // Suppression template
    $('.awema-delete-template').on('click', function() {
        var templateId = $(this).data('template-id');
        deleteTemplate(templateId);
    });
    
    function uploadTemplate() {
        var formData = new FormData();
        var fileInput = document.getElementById('template_file');
        
        if (!fileInput.files[0]) {
            alert('Veuillez sélectionner un fichier');
            return;
        }
        
        formData.append('template_file', fileInput.files[0]);
        formData.append('template_name', $('#template_name').val());
        formData.append('template_type', $('#template_type').val());
        formData.append('action', 'awema_upload_template');
        formData.append('nonce', $('#awema_template_nonce').val());
        
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function() {
                $('input[type="submit"]').prop('disabled', true).val('Upload en cours...');
            },
            success: function(response) {
                if (response.success) {
                    alert('Template importé avec succès!');
                    location.reload();
                } else {
                    alert('Erreur: ' + response.data);
                }
            },
            error: function() {
                alert('Erreur lors de l\'upload');
            },
            complete: function() {
                $('input[type="submit"]').prop('disabled', false).val('Importer Template');
            }
        });
    }
    
    function previewTemplate(templateId) {
        // Ouvrir une fenêtre popup pour l'aperçu
        var previewUrl = '<?php echo admin_url('admin.php?page=awema-preview-template'); ?>&template_id=' + templateId;
        window.open(previewUrl, 'template_preview', 'width=1200,height=800,scrollbars=yes');
    }
    
    function exportTemplate(templateId) {
        var downloadUrl = '<?php echo admin_url('admin-ajax.php'); ?>?action=awema_export_template&template_id=' + templateId + '&nonce=<?php echo wp_create_nonce('awema_export_template'); ?>';
        
        // Créer un lien de téléchargement temporaire
        var a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'awema-template-' + templateId + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    
    function deleteTemplate(templateId) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce template?')) {
            return;
        }
        
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'awema_delete_template',
                template_id: templateId,
                nonce: '<?php echo wp_create_nonce('awema_delete_template'); ?>'
            },
            success: function(response) {
                if (response.success) {
                    $('[data-template-id="' + templateId + '"]').fadeOut(function() {
                        $(this).remove();
                    });
                } else {
                    alert('Erreur lors de la suppression: ' + response.data);
                }
            },
            error: function() {
                alert('Erreur de connexion');
            }
        });
    }
});
</script>

<style>
.awema-templates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.awema-template-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    background: #fff;
}

.awema-template-card h4 {
    margin-top: 0;
    margin-bottom: 15px;
}

.template-preview {
    width: 100%;
    height: 120px;
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    color: #666;
    font-style: italic;
}

.template-info {
    margin-bottom: 15px;
    font-size: 13px;
}

.template-info p {
    margin: 5px 0;
}

.template-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.awema-no-templates {
    text-align: center;
    padding: 40px;
    background: #f9f9f9;
    border-radius: 8px;
}

.awema-placeholders-guide {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.placeholder-category h4 {
    margin-bottom: 10px;
    color: #23282d;
}

.placeholder-category ul {
    list-style: none;
    padding: 0;
}

.placeholder-category li {
    margin-bottom: 8px;
    padding: 8px;
    background: #f7f7f7;
    border-left: 3px solid #0073aa;
}

.placeholder-category code {
    background: #23282d;
    color: #f1f1f1;
    padding: 2px 6px;
    border-radius: 3px;
    font-weight: bold;
}
</style>